import { mapDefined } from '@atproto/common'
import { Server } from '../../../../lexicon'
import { QueryParams } from '../../../../lexicon/types/app/bsky/feed/getRepostedBy'
import AppContext from '../../../../context'
import { createPipeline } from '../../../../pipeline'
import { HydrationState, Hydrator } from '../../../../hydration/hydrator'
import { Views } from '../../../../views'
import { parseString } from '../../../../hydration/util'
import { creatorFromUri } from '../../../../views/util'
import { clearlyBadCursor } from '../../../util'

export default function (server: Server, ctx: AppContext) {
  const getRepostedBy = createPipeline(
    skeleton,
    hydration,
    noBlocks,
    presentation,
  )
  server.app.bsky.feed.getRepostedBy({
    auth: ctx.authVerifier.standardOptional,
    handler: async ({ params, auth }) => {
      const viewer = auth.credentials.iss
      const result = await getRepostedBy({ ...params, viewer }, ctx)

      return {
        encoding: 'application/json',
        body: result,
      }
    },
  })
}

const skeleton = async (inputs: {
  ctx: Context
  params: Params
}): Promise<Skeleton> => {
  const { ctx, params } = inputs
  if (clearlyBadCursor(params.cursor)) {
    return { reposts: [] }
  }
  const res = await ctx.hydrator.dataplane.getRepostsBySubject({
    subject: { uri: params.uri, cid: params.cid },
    cursor: params.cursor,
    limit: params.limit,
  })
  return {
    reposts: res.uris,
    cursor: parseString(res.cursor),
  }
}

const hydration = async (inputs: {
  ctx: Context
  params: Params
  skeleton: Skeleton
}) => {
  const { ctx, params, skeleton } = inputs
  return await ctx.hydrator.hydrateReposts(skeleton.reposts, params.viewer)
}

const noBlocks = (inputs: {
  ctx: Context
  skeleton: Skeleton
  hydration: HydrationState
}) => {
  const { ctx, skeleton, hydration } = inputs
  skeleton.reposts = skeleton.reposts.filter((uri) => {
    const creator = creatorFromUri(uri)
    return !ctx.views.viewerBlockExists(creator, hydration)
  })
  return skeleton
}

const presentation = (inputs: {
  ctx: Context
  params: Params
  skeleton: Skeleton
  hydration: HydrationState
}) => {
  const { ctx, params, skeleton, hydration } = inputs
  const repostViews = mapDefined(skeleton.reposts, (uri) => {
    const repost = hydration.reposts?.get(uri)
    if (!repost?.record) {
      return
    }
    const creatorDid = creatorFromUri(uri)
    return ctx.views.profile(creatorDid, hydration)
  })
  return {
    repostedBy: repostViews,
    cursor: skeleton.cursor,
    uri: params.uri,
    cid: params.cid,
  }
}

type Context = {
  hydrator: Hydrator
  views: Views
}

type Params = QueryParams & { viewer: string | null }

type Skeleton = {
  reposts: string[]
  cursor?: string
}
