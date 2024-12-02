/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, is$typed } from '../../../../util'

export const id = 'app.bsky.unspecced.defs'

export interface SkeletonSearchPost {
  uri: string
  [k: string]: unknown
}

export function isSkeletonSearchPost(v: unknown): v is SkeletonSearchPost & {
  $type: $Type<'app.bsky.unspecced.defs', 'skeletonSearchPost'>
} {
  return is$typed(v, id, 'skeletonSearchPost')
}

export function validateSkeletonSearchPost(v: unknown) {
  return lexicons.validate(
    `${id}#skeletonSearchPost`,
    v,
  ) as ValidationResult<SkeletonSearchPost>
}

export interface SkeletonSearchActor {
  did: string
  [k: string]: unknown
}

export function isSkeletonSearchActor(v: unknown): v is SkeletonSearchActor & {
  $type: $Type<'app.bsky.unspecced.defs', 'skeletonSearchActor'>
} {
  return is$typed(v, id, 'skeletonSearchActor')
}

export function validateSkeletonSearchActor(v: unknown) {
  return lexicons.validate(
    `${id}#skeletonSearchActor`,
    v,
  ) as ValidationResult<SkeletonSearchActor>
}

export interface SkeletonSearchStarterPack {
  uri: string
  [k: string]: unknown
}

export function isSkeletonSearchStarterPack(
  v: unknown,
): v is SkeletonSearchStarterPack {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'app.bsky.unspecced.defs#skeletonSearchStarterPack'
  )
}

export function validateSkeletonSearchStarterPack(
  v: unknown,
): ValidationResult {
  return lexicons.validate(
    'app.bsky.unspecced.defs#skeletonSearchStarterPack',
    v,
  )
}
