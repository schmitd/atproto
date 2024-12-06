import { Code, ConnectError, ServiceImpl } from '@connectrpc/connect'
import { Service } from '../proto/bsync_connect'
import { GetSubscriptionGroupResponse } from '../proto/bsync_pb'
import AppContext from '../context'
import { authWithApiKey } from './auth'

export default (ctx: AppContext): Partial<ServiceImpl<typeof Service>> => ({
  async getSubscriptionGroup(req, handlerCtx) {
    authWithApiKey(ctx, handlerCtx)

    const { purchasesClient } = ctx
    if (!purchasesClient) {
      throw new Error('PurchasesClient is not configured on bsync')
    }

    const { group, platform } = req

    const groupId = purchasesClient.parseSubscriptionGroup(group)
    if (!groupId) {
      throw new ConnectError(`invalid 'group' input`, Code.InvalidArgument)
    }

    const platformId = purchasesClient.parsePlatform(platform)
    if (!platformId) {
      throw new ConnectError(`invalid 'platform' input`, Code.InvalidArgument)
    }

    const offerings = purchasesClient.getOfferings(groupId, platformId)

    return new GetSubscriptionGroupResponse({
      offerings,
    })
  },
})
