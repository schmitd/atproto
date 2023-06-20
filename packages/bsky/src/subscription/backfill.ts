import PQueue from 'p-queue'
import { AtpAgent } from '@atproto/api'
import { Subscription } from '@atproto/xrpc-server'
import { OutputSchema as Message } from '../lexicon/types/com/atproto/sync/subscribeRepos'
import { ids, lexicons } from '../lexicon/lexicons'
import AppContext from '../context'
import { subLogger } from '../logger'
import { retryHttp } from '../util/retry'

const METHOD = ids.ComAtprotoSyncSubscribeRepos

export const backfillRepos = async (ctx: AppContext, concurrency: number) => {
  if (!ctx.cfg.repoProvider) {
    throw new Error('No repo provider for backfill')
  }
  // first, peek the stream to find the last event
  const cursor = await peekStream(ctx)
  if (cursor === null) {
    subLogger.info('already caught up, skipping backfill')
    return
  }

  // then run backfill
  await doBackfill(ctx, concurrency)

  // finally update our subscription state to reflect the fact that we're caught up with the previously peeked cursor
  const state = JSON.stringify({ cursor })
  await ctx.db.db
    .insertInto('subscription')
    .values({
      service: ctx.cfg.repoProvider,
      method: METHOD,
      state,
    })
    .onConflict((oc) =>
      oc.columns(['service', 'method']).doUpdateSet({ state }),
    )
    .execute()
}

export const peekStream = async (ctx: AppContext): Promise<number | null> => {
  const repoProvider = ctx.cfg.repoProvider
  if (!repoProvider) {
    throw new Error('No repo provider for backfill')
  }

  const sub = new Subscription({
    service: repoProvider,
    method: METHOD,
    validate: (val) => {
      return lexicons.assertValidXrpcMessage<Message>(METHOD, val)
    },
    getParams: async () => {
      const lastSeenCursor = await ctx.db.db
        .selectFrom('subscription')
        .where('service', '=', repoProvider)
        .where('method', '=', METHOD)
        .selectAll()
        .executeTakeFirst()
      return lastSeenCursor ? JSON.parse(lastSeenCursor.state) : { cursor: 0 }
    },
  })
  const first = await sub[Symbol.asyncIterator]().next()
  // first message should be an OutdatedCursor info msg
  if (
    first.done ||
    first.value.$type !== '#info' ||
    first.value.name !== 'OutdatedCursor'
  ) {
    return null
  }
  // second message should be an event with a sequence number
  const second = await sub[Symbol.asyncIterator]().next()
  if (second.done || typeof second.value.seq !== 'number') {
    throw new Error('Unexpected second event on stream', second.value)
  }
  return second.value.seq
}

export const doBackfill = async (ctx: AppContext, concurrency: number) => {
  const repoProvider = ctx.cfg.repoProvider
  if (!concurrency || !repoProvider) {
    throw new Error('Repo subscription does not support backfill')
  }

  const { services, db } = ctx
  const agent = new AtpAgent({ service: wsToHttp(repoProvider) })
  const queue = new PQueue({ concurrency })
  const reposSeen = new Set()

  // Paginate through all repos and queue them for processing.
  // Fetch next page once all items on the queue are in progress.
  let cursor: string | undefined
  do {
    const { data: page } = await retryHttp(() =>
      agent.api.com.atproto.sync.listRepos({
        cursor,
        limit: Math.min(2 * concurrency, 1000),
      }),
    )
    page.repos.forEach((repo) => {
      if (reposSeen.has(repo.did)) {
        // If a host has a bug that appears to cause a loop or duplicate work, we can bail.
        throw new Error(
          `Backfill from ${repoProvider} failed because repo for ${repo.did} was seen twice`,
        )
      }
      reposSeen.add(repo.did)
      queue
        .add(async () => {
          const now = new Date().toISOString()
          const result = await Promise.allSettled([
            services.indexing(db).indexHandle(repo.did, now),
            services.indexing(db).indexRepo(repo.did, repo.head),
          ])
          for (const item of result) {
            if (item.status === 'rejected') {
              subLogger.error(
                { err: item.reason, provider: repoProvider, repo },
                'repo subscription backfill failed on a repository',
              )
            }
          }
        })
        .catch((err) => {
          subLogger.error(
            { err, provider: repoProvider, repo },
            'repo subscription backfill failed on a repository',
          )
        })
    })
    cursor = page.cursor
    await queue.onEmpty() // Remaining items are in progress
  } while (cursor)

  // Wait until final batch finishes processing then update cursor.
  await queue.onIdle()
}

function wsToHttp(url: string) {
  if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
    return url
  }
  return url.replace('ws', 'http')
}
