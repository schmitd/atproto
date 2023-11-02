import { Server } from '../../../../lexicon'
import AppContext from '../../../../context'
import { authPassthru } from './util'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.admin.getModerationEvents({
    auth: ctx.roleVerifier,
    handler: async ({ req, params }) => {
      const { data: result } =
        await ctx.appViewAgent.com.atproto.admin.getModerationEvents(
          params,
          authPassthru(req),
        )
      return {
        encoding: 'application/json',
        body: result,
      }
    },
  })
}
