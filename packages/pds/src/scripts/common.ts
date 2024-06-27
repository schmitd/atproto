import { Keypair } from '@atproto/crypto'
import AppContext from '../context'

export const parseIntArg = (arg: string): number => {
  const parsed = parseInt(arg, 10)
  if (isNaN(parsed)) {
    throw new Error(`Invalid arg, expected number: ${arg}`)
  }
  return parsed
}

export const updatePlcSigningKey = async (
  ctx: AppContext,
  did: string,
  signingKey?: Keypair,
) => {
  const updateTo = signingKey ?? (await ctx.actorStore.keypair(did))
  const currSigningKey = await ctx.idResolver.did.resolveAtprotoKey(did, true)
  if (updateTo.did() === currSigningKey) {
    // already up to date
    return
  }
  if (ctx.entrywayAdminAgent) {
    await ctx.entrywayAdminAgent.api.com.atproto.admin.updateAccountSigningKey({
      did,
      signingKey: updateTo.did(),
    })
  } else {
    await ctx.plcClient.updateAtprotoKey(
      did,
      ctx.plcRotationKey,
      updateTo.did(),
    )
  }
}
