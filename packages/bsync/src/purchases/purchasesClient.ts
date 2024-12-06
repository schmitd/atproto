import { Subscription } from '../proto/bsync_pb'
import { RcSubscription, RevenueCatClient } from './revenueCatClient'

export enum PlatformId {
  Web = 'web',
  iOS = 'ios',
  Android = 'android',
}

export enum SubscriptionGroupId {
  Core = 'core',
}

export enum SubscriptionOfferingId {
  CoreMonthly = 'coreMonthly',
  CoreAnnual = 'coreAnnual',
}

export type PurchasesClientOpts = {
  revenueCatV1ApiKey: string
  revenueCatV1ApiUrl: string
  revenueCatWebhookAuthorization: string
  stripePriceIdMonthly: string
  stripePriceIdYearly: string
  stripeProductIdMonthly: string
  stripeProductIdYearly: string
}

export class PurchasesClient {
  private revenueCatClient: RevenueCatClient
  private STRIPE_PRODUCTS: { coreMonthly: string; coreAnnual: string }

  /**
   * All of our purchaseable product IDs for all platforms.
   */
  private PRODUCTS: {
    web: { coreMonthly: string; coreAnnual: string }
    ios: { coreMonthly: string; coreAnnual: string }
    android: { coreMonthly: string; coreAnnual: string }
  }

  /**
   * Manual groupings of products into "Subscription Groups", mimicking the way
   * Apple does it.
   */
  private GROUPS: {
    core: {
      web: { id: SubscriptionOfferingId; product: string }[]
      ios: { id: SubscriptionOfferingId; product: string }[]
      android: { id: SubscriptionOfferingId; product: string }[]
    }
  }

  constructor(opts: PurchasesClientOpts) {
    this.revenueCatClient = new RevenueCatClient({
      v1ApiKey: opts.revenueCatV1ApiKey,
      v1ApiUrl: opts.revenueCatV1ApiUrl,
      webhookAuthorization: opts.revenueCatWebhookAuthorization,
    })

    this.STRIPE_PRODUCTS = {
      [SubscriptionOfferingId.CoreMonthly]: opts.stripeProductIdMonthly,
      [SubscriptionOfferingId.CoreAnnual]: opts.stripeProductIdYearly,
    }

    this.PRODUCTS = {
      [PlatformId.Web]: {
        [SubscriptionOfferingId.CoreMonthly]: opts.stripePriceIdMonthly,
        [SubscriptionOfferingId.CoreAnnual]: opts.stripePriceIdYearly,
      },
      [PlatformId.iOS]: {
        [SubscriptionOfferingId.CoreMonthly]: 'bluesky_plus_core_v1_monthly',
        [SubscriptionOfferingId.CoreAnnual]: 'bluesky_plus_core_v1_annual',
      },
      [PlatformId.Android]: {
        [SubscriptionOfferingId.CoreMonthly]: 'bluesky_plus_core_v1:monthly',
        [SubscriptionOfferingId.CoreAnnual]: 'bluesky_plus_core_v1:annual',
      },
    }

    this.GROUPS = {
      [SubscriptionGroupId.Core]: {
        [PlatformId.Web]: [
          {
            id: SubscriptionOfferingId.CoreMonthly,
            product:
              this.PRODUCTS[PlatformId.Web][SubscriptionOfferingId.CoreMonthly],
          },
          {
            id: SubscriptionOfferingId.CoreAnnual,
            product:
              this.PRODUCTS[PlatformId.Web][SubscriptionOfferingId.CoreAnnual],
          },
        ],
        [PlatformId.iOS]: [
          {
            id: SubscriptionOfferingId.CoreMonthly,
            product:
              this.PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreMonthly],
          },
          {
            id: SubscriptionOfferingId.CoreAnnual,
            product:
              this.PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreAnnual],
          },
        ],
        [PlatformId.Android]: [
          {
            id: SubscriptionOfferingId.CoreMonthly,
            product:
              this.PRODUCTS[PlatformId.Android][
                SubscriptionOfferingId.CoreMonthly
              ],
          },
          {
            id: SubscriptionOfferingId.CoreAnnual,
            product:
              this.PRODUCTS[PlatformId.Android][
                SubscriptionOfferingId.CoreAnnual
              ],
          },
        ],
      },
    }
  }

  isRcWebhookAuthorizationValid(authorization: string | undefined): boolean {
    return this.revenueCatClient.isWebhookAuthorizationValid(authorization)
  }

  parseSubscriptionGroup = (group: string): SubscriptionGroupId | undefined => {
    switch (group) {
      case 'core':
        return SubscriptionGroupId.Core
      default:
        return undefined
    }
  }

  parsePlatform = (platform: string): PlatformId | undefined => {
    switch (platform) {
      case 'web':
        return PlatformId.Web
      case 'ios':
        return PlatformId.iOS
      case 'android':
        return PlatformId.Android
      default:
        return undefined
    }
  }

  getOfferings(groupId: SubscriptionGroupId, platformId: PlatformId) {
    return this.GROUPS[groupId][platformId]
  }

  async getEntitlements(did: string): Promise<string[]> {
    const { subscriber } = await this.revenueCatClient.getSubscriber(did)

    const now = Date.now()
    return Object.entries(subscriber.entitlements)
      .filter(
        ([_, entitlement]) =>
          now < new Date(entitlement.expires_date).valueOf(),
      )
      .map(([entitlementIdentifier]) => entitlementIdentifier)
  }

  async getSubscriptions(did: string): Promise<Subscription[]> {
    const { subscriber } = await this.revenueCatClient.getSubscriber(did)

    const subscriptions = Object.entries(subscriber.subscriptions)

    return subscriptions
      .map(this.createSubscriptionObject)
      .filter(Boolean) as Subscription[]
  }

  private createSubscriptionObject = ([productId, s]: [
    string,
    RcSubscription,
  ]): Subscription | undefined => {
    const platform = this.parsePlatformFromSubscriptionStore(s.store)
    if (!platform) return undefined
    const fullProductId =
      platform === 'android'
        ? `${productId}:${s.product_plan_identifier}`
        : productId
    const group = this.parseSubscriptionGroupFromStoreIdentifier(fullProductId)
    if (!group) return undefined

    const now = new Date()
    const expiresAt = new Date(s.expires_date)

    let status = 'unknown'
    if (s.auto_resume_date) {
      if (now > expiresAt) {
        status = 'paused'
      }
    } else if (now > expiresAt) {
      status = 'expired'
    } else if (now < expiresAt) {
      status = 'active'
    }

    let renewalStatus = 'unknown'
    if (s.auto_resume_date) {
      if (now < expiresAt) {
        renewalStatus = 'will_pause'
      } else if (now > expiresAt) {
        renewalStatus = 'will_renew'
      }
    } else if (now < expiresAt) {
      renewalStatus = 'will_renew'
      if (s.unsubscribe_detected_at) {
        renewalStatus = 'will_not_renew'
      }
    } else if (now > expiresAt) {
      renewalStatus = 'will_not_renew'
    }

    let periodEndsAt = s.expires_date
    if (s.auto_resume_date) {
      if (now > expiresAt) {
        periodEndsAt = s.auto_resume_date
      }
    }

    const offering =
      this.parseSubscriptionOfferingIdFromStoreIdentifier(fullProductId)
    if (!offering) return undefined

    return Subscription.fromJson({
      status,
      renewalStatus,
      group,
      platform,
      offering,
      periodEndsAt: periodEndsAt,
      periodStartsAt: s.purchase_date,
      purchasedAt: s.original_purchase_date,
    })
  }

  private parsePlatformFromSubscriptionStore = (
    store: string,
  ): PlatformId | undefined => {
    switch (store) {
      case 'stripe':
        return PlatformId.Web
      case 'app_store':
        return PlatformId.iOS
      case 'play_store':
        return PlatformId.Android
      default:
        return undefined
    }
  }

  private parseSubscriptionOfferingIdFromStoreIdentifier = (
    identifier: string,
  ): SubscriptionOfferingId | undefined => {
    switch (identifier) {
      case this.STRIPE_PRODUCTS[SubscriptionOfferingId.CoreMonthly]:
      case this.PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreMonthly]:
      case this.PRODUCTS[PlatformId.Android][
        SubscriptionOfferingId.CoreMonthly
      ]:
        return SubscriptionOfferingId.CoreMonthly
      case this.STRIPE_PRODUCTS[SubscriptionOfferingId.CoreAnnual]:
      case this.PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreAnnual]:
      case this.PRODUCTS[PlatformId.Android][SubscriptionOfferingId.CoreAnnual]:
        return SubscriptionOfferingId.CoreAnnual
      default:
        return undefined
    }
  }

  private parseSubscriptionGroupFromStoreIdentifier = (
    identifier: string,
  ): SubscriptionGroupId | undefined => {
    switch (identifier) {
      case this.STRIPE_PRODUCTS[SubscriptionOfferingId.CoreMonthly]:
      case this.STRIPE_PRODUCTS[SubscriptionOfferingId.CoreAnnual]:
      case this.PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreMonthly]:
      case this.PRODUCTS[PlatformId.iOS][SubscriptionOfferingId.CoreAnnual]:
      case this.PRODUCTS[PlatformId.Android][
        SubscriptionOfferingId.CoreMonthly
      ]:
      case this.PRODUCTS[PlatformId.Android][SubscriptionOfferingId.CoreAnnual]:
        return SubscriptionGroupId.Core
      default:
        return undefined
    }
  }
}
