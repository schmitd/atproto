import http from 'node:http'
import { once } from 'node:events'
import getPort from 'get-port'
import {
  authWithApiKey,
  BsyncClient,
  BsyncService,
  createClient,
  Database,
  envToCfg,
} from '../src'
import {
  RcEntitlement,
  RcEventBody,
  RcGetSubscriberResponse,
} from '../src/purchases'
import { Code, ConnectError } from '@connectrpc/connect'

const revenueCatWebhookAuthorization = 'Bearer any-token'

describe('purchases', () => {
  let bsync: BsyncService
  let client: BsyncClient
  let bsyncUrl: string

  const actorDid = 'did:example:a'

  let revenueCatServer: http.Server
  let revenueCatApiMock: jest.Mock<RcGetSubscriberResponse>

  const TEN_MINUTES = 600_000
  const entitlementValid: RcEntitlement = {
    expires_date: new Date(Date.now() + TEN_MINUTES).toISOString(),
  }
  const entitlementExpired: RcEntitlement = {
    expires_date: new Date(Date.now() - TEN_MINUTES).toISOString(),
  }

  beforeAll(async () => {
    const revenueCatPort = await getPort()

    revenueCatApiMock = jest.fn()
    revenueCatServer = await createMockRevenueCatService(
      revenueCatPort,
      revenueCatApiMock,
    )

    bsync = await BsyncService.create(
      envToCfg({
        port: await getPort(),
        dbUrl: process.env.DB_POSTGRES_URL,
        dbSchema: 'bsync_purchases',
        apiKeys: ['key-1'],
        longPollTimeoutMs: 500,
        revenueCatV1ApiKey: 'any-key',
        revenueCatV1ApiUrl: `http://localhost:${revenueCatPort}`,
        revenueCatWebhookAuthorization,
        stripePriceIdMonthly: 'price_id_monthly',
        stripePriceIdYearly: 'price_id_yearly',
        stripeProductIdMonthly: 'product_id_monthly',
        stripeProductIdYearly: 'product_id_yearly',
      }),
    )

    bsyncUrl = `http://localhost:${bsync.ctx.cfg.service.port}`

    await bsync.ctx.db.migrateToLatestOrThrow()
    await bsync.start()
    client = createClient({
      httpVersion: '1.1',
      baseUrl: `http://localhost:${bsync.ctx.cfg.service.port}`,
      interceptors: [authWithApiKey('key-1')],
    })
  })

  afterAll(async () => {
    await bsync.destroy()
    revenueCatServer.close()
    await once(revenueCatServer, 'close')
  })

  beforeEach(async () => {
    await clearPurchases(bsync.ctx.db)
  })

  describe('webhook handler', () => {
    it('replies 403 if authorization is invalid', async () => {
      const response = await fetch(`${bsyncUrl}/webhooks/revenuecat`, {
        method: 'POST',
        body: JSON.stringify({ event: { app_user_id: actorDid } }),
        headers: {
          Authorization: `not ${revenueCatWebhookAuthorization}`,
          'Content-Type': 'application/json',
        },
      })

      expect(response.status).toBe(403)
      const body = await response.json()
      expect({ ...body }).toStrictEqual({
        error: 'Forbidden: invalid authentication for RevenueCat webhook',
        success: false,
      })
    })

    it('replies 400 if DID is invalid', async () => {
      const response = await callWebhook(bsyncUrl, buildWebhookBody('invalid'))

      expect(response.status).toBe(400)
      const body = await response.json()
      expect({ ...body }).toStrictEqual({
        error: 'Bad request: invalid DID in app_user_id',
        success: false,
      })
    })

    it('replies 400 if body is invalid', async () => {
      const response = await callWebhook(bsyncUrl, {
        any: 'thing ',
      } as unknown as RcEventBody)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect({ ...body }).toStrictEqual({
        error: 'Bad request: body schema validation failed',
        success: false,
      })
    })

    it('stores valid entitlements from the API response, excluding expired', async () => {
      revenueCatApiMock.mockReturnValueOnce({
        subscriber: {
          entitlements: { entitlementExpired },
          subscriptions: {},
        },
      })

      await callWebhook(bsyncUrl, buildWebhookBody(actorDid))

      const op0 = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op0).toStrictEqual({
        id: expect.any(Number),
        actorDid,
        entitlements: [],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toStrictEqual({
        actorDid,
        entitlements: [],
        fromId: op0.id,
      })

      revenueCatApiMock.mockReturnValueOnce({
        subscriber: {
          entitlements: { entitlementValid, entitlementExpired },
          subscriptions: {},
        },
      })

      await callWebhook(bsyncUrl, buildWebhookBody(actorDid))

      const op1 = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op1).toStrictEqual({
        id: expect.any(Number),
        actorDid,
        entitlements: ['entitlementValid'],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toStrictEqual({
        actorDid,
        entitlements: ['entitlementValid'],
        fromId: op1.id,
      })
    })

    it('sets empty array in the cache if no entitlements are present at all', async () => {
      revenueCatApiMock.mockReturnValue({
        subscriber: { entitlements: {}, subscriptions: {} },
      })

      await callWebhook(bsyncUrl, buildWebhookBody(actorDid))

      const op = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op).toStrictEqual({
        id: expect.any(Number),
        actorDid,
        entitlements: [],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toStrictEqual({
        actorDid,
        entitlements: [],
        fromId: op.id,
      })
    })
  })

  describe('addPurchaseOperation', () => {
    it('fails on bad inputs', async () => {
      await expect(
        client.addPurchaseOperation({
          actorDid: 'invalid',
        }),
      ).rejects.toStrictEqual(
        new ConnectError('actor_did must be a valid did', Code.InvalidArgument),
      )
    })

    it('stores valid entitlements from the API response, excluding expired', async () => {
      revenueCatApiMock.mockReturnValueOnce({
        subscriber: {
          entitlements: { entitlementExpired },
          subscriptions: {},
        },
      })

      await client.addPurchaseOperation({ actorDid })

      const op0 = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op0).toStrictEqual({
        id: expect.any(Number),
        actorDid,
        entitlements: [],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toStrictEqual({
        actorDid,
        entitlements: [],
        fromId: op0.id,
      })

      revenueCatApiMock.mockReturnValueOnce({
        subscriber: {
          entitlements: { entitlementValid, entitlementExpired },
          subscriptions: {},
        },
      })

      await client.addPurchaseOperation({ actorDid })

      const op1 = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op1).toStrictEqual({
        id: expect.any(Number),
        actorDid,
        entitlements: ['entitlementValid'],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toStrictEqual({
        actorDid,
        entitlements: ['entitlementValid'],
        fromId: op1.id,
      })
    })

    it('sets empty array in the cache if no entitlements are present at all', async () => {
      revenueCatApiMock.mockReturnValue({
        subscriber: { entitlements: {}, subscriptions: {} },
      })

      await client.addPurchaseOperation({ actorDid })

      const op = await bsync.ctx.db.db
        .selectFrom('purchase_op')
        .selectAll()
        .where('actorDid', '=', actorDid)
        .orderBy('id', 'desc')
        .executeTakeFirstOrThrow()

      expect(op).toStrictEqual({
        id: expect.any(Number),
        actorDid,
        entitlements: [],
        createdAt: expect.any(Date),
      })

      await expect(
        bsync.ctx.db.db
          .selectFrom('purchase_item')
          .selectAll()
          .where('actorDid', '=', actorDid)
          .executeTakeFirstOrThrow(),
      ).resolves.toStrictEqual({
        actorDid,
        entitlements: [],
        fromId: op.id,
      })
    })
  })

  describe('getActiveSubscriptions', () => {})

  describe('getSubscriptionGroup', () => {
    type Input = { group: string; platform: string }
    type Expected = { offerings: { id: string; product: string }[] }

    it('returns the expected data when input is correct', async () => {
      const t = async (input: Input, expected: Expected) => {
        const res = await client.getSubscriptionGroup(input)
        expect({
          offerings: res.offerings.map((o) => ({ ...o })),
        }).toStrictEqual(expected)
      }

      await t(
        { group: 'core', platform: 'android' },
        {
          offerings: [
            { id: 'coreMonthly', product: 'bluesky_plus_core_v1:monthly' },
            { id: 'coreAnnual', product: 'bluesky_plus_core_v1:annual' },
          ],
        },
      )

      await t(
        { group: 'core', platform: 'ios' },
        {
          offerings: [
            { id: 'coreMonthly', product: 'bluesky_plus_core_v1_monthly' },
            { id: 'coreAnnual', product: 'bluesky_plus_core_v1_annual' },
          ],
        },
      )

      // await t(
      //   { group: 'core', platform: 'web' },
      //   {
      //     offerings: [
      //       { id: 'coreMonthly', product: 'TODO' },
      //       { id: 'coreAnnual', product: 'TODO' },
      //     ],
      //   },
      // )
    })

    it('throws the expected error when input is incorrect', async () => {
      const t = async (input: Input, expected: string) => {
        await expect(client.getSubscriptionGroup(input)).rejects.toThrow(
          expected,
        )
      }

      await t(
        { group: 'wrong-group', platform: 'android' },
        `invalid 'group' input`,
      )
      await t(
        { group: 'core', platform: 'wrong-platform' },
        `invalid 'platform' input`,
      )
    })
  })
})

const clearPurchases = async (db: Database) => {
  await db.db.deleteFrom('purchase_item').execute()
  await db.db.deleteFrom('purchase_op').execute()
}

const buildWebhookBody = (actorDid: string): RcEventBody => ({
  api_version: '1.0',
  event: {
    app_user_id: actorDid,
    type: 'INITIAL_PURCHASE',
  },
})

const callWebhook = async (
  baseUrl: string,
  body: RcEventBody,
): Promise<Response> => {
  return fetch(`${baseUrl}/webhooks/revenuecat`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: revenueCatWebhookAuthorization,
      'Content-Type': 'application/json',
    },
  })
}

const createMockRevenueCatService = async (
  port: number,
  apiMock: jest.Mock<RcGetSubscriberResponse>,
): Promise<http.Server> => {
  const server = http.createServer((req, res) => {
    if (!req.url) {
      throw new Error('Unexpected empty URL in request to RevenueCat mock')
    }

    if (/^\/subscribers\/(.*)$/.test(req.url)) {
      const response = apiMock(req, res)
      res.statusCode = 200
      return res.end(JSON.stringify(response))
    }

    throw new Error('Unexpected URL in request to RevenueCat mock')
  })

  server.listen(port)
  await once(server, 'listening')
  return server
}
