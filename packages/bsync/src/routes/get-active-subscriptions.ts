import { Code, ConnectError, ServiceImpl } from '@connectrpc/connect'
import { Service } from '../proto/bsync_connect'
import { GetActiveSubscriptionsResponse } from '../proto/bsync_pb'
import AppContext from '../context'
import { authWithApiKey } from './auth'
import { isValidDid } from './util'

export default (ctx: AppContext): Partial<ServiceImpl<typeof Service>> => ({
  async getActiveSubscriptions(req, handlerCtx) {
    authWithApiKey(ctx, handlerCtx)
    const { purchasesClient } = ctx
    const { actorDid } = req

    if (!isValidDid(actorDid)) {
      throw new ConnectError(
        'actor_did must be a valid did',
        Code.InvalidArgument,
      )
    }

    if (!purchasesClient) {
      throw new Error('PurchasesClient is not configured on bsync')
    }

    const subscriptions = await purchasesClient.getSubscriptions(actorDid)

    return new GetActiveSubscriptionsResponse({
      subscriptions,
    })
  },
})
