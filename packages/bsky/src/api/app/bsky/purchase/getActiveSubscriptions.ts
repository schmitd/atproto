import { Server } from '../../../../lexicon'
import AppContext from '../../../../context'
import { Subscription as ProtoSubscription } from '../../../../proto/bsync_pb'
import { Subscription as XrpcSubscription } from '../../../../lexicon/types/app/bsky/purchase/getActiveSubscriptions'

export default function (server: Server, ctx: AppContext) {
  server.app.bsky.purchase.getActiveSubscriptions({
    auth: ctx.authVerifier.standard,
    handler: async ({ auth }) => {
      const viewer = auth.credentials.iss

      const { subscriptions } = await ctx.bsyncClient.getActiveSubscriptions({
        actorDid: viewer,
      })
      return {
        encoding: 'application/json',
        body: {
          subscriptions: subscriptions.map(subscriptionProtoToXrpc),
        },
      }
    },
  })
}

const subscriptionProtoToXrpc = (
  subscription: ProtoSubscription,
): XrpcSubscription => ({
  ...subscription,
  periodEndsAt: subscription.periodEndsAt?.toDate().toISOString(),
  periodStartsAt: subscription.periodStartsAt?.toDate().toISOString(),
  purchasedAt: subscription.purchasedAt?.toDate().toISOString(),
})
