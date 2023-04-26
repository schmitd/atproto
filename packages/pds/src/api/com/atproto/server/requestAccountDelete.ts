import { InvalidRequestError } from '@atproto/xrpc-server'
import { Server } from '../../../../lexicon'
import AppContext from '../../../../context'
import { randomStr } from '@atproto/crypto'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.server.requestAccountDelete({
    auth: ctx.accessVerifierCheckTakedown,
    handler: async ({ auth }) => {
      const did = auth.credentials.did
      const token = getToken()
      const requestedAt = new Date().toISOString()
      const user = await ctx.services.account(ctx.db).getAccount(did)
      if (!user) {
        throw new InvalidRequestError('user not found')
      }
      await ctx.db.db
        .insertInto('delete_account_token')
        .values({ did, token, requestedAt })
        .onConflict((oc) =>
          oc.column('did').doUpdateSet({ token, requestedAt }),
        )
        .execute()
      await ctx.mailer.sendAccountDelete({ token }, { to: user.email })
    },
  })
}

const randFive = () => randomStr(5, 'base32').slice(0, 5)
const getToken = () => randFive() + '-' + randFive()
