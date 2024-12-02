/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs'
import * as AppBskyActorDefs from '../actor/defs'
import * as AppBskyRichtextFacet from '../richtext/facet'
import * as AppBskyFeedDefs from '../feed/defs'

export const id = 'app.bsky.graph.defs'

export interface ListViewBasic {
  $type?: 'app.bsky.graph.defs#listViewBasic'
  uri: string
  cid: string
  name: string
  purpose: ListPurpose
  avatar?: string
  listItemCount?: number
  labels?: ComAtprotoLabelDefs.Label[]
  viewer?: ListViewerState
  indexedAt?: string
}

export function isListViewBasic(v: unknown): v is $Typed<ListViewBasic> {
  return is$typed(v, id, 'listViewBasic')
}

export function validateListViewBasic(v: unknown) {
  return lexicons.validate(
    `${id}#listViewBasic`,
    v,
  ) as ValidationResult<ListViewBasic>
}

export interface ListView {
  $type?: 'app.bsky.graph.defs#listView'
  uri: string
  cid: string
  creator: AppBskyActorDefs.ProfileView
  name: string
  purpose: ListPurpose
  description?: string
  descriptionFacets?: AppBskyRichtextFacet.Main[]
  avatar?: string
  listItemCount?: number
  labels?: ComAtprotoLabelDefs.Label[]
  viewer?: ListViewerState
  indexedAt: string
}

export function isListView(v: unknown): v is $Typed<ListView> {
  return is$typed(v, id, 'listView')
}

export function validateListView(v: unknown) {
  return lexicons.validate(`${id}#listView`, v) as ValidationResult<ListView>
}

export interface ListItemView {
  $type?: 'app.bsky.graph.defs#listItemView'
  uri: string
  subject: AppBskyActorDefs.ProfileView
}

export function isListItemView(v: unknown): v is $Typed<ListItemView> {
  return is$typed(v, id, 'listItemView')
}

export function validateListItemView(v: unknown) {
  return lexicons.validate(
    `${id}#listItemView`,
    v,
  ) as ValidationResult<ListItemView>
}

export interface StarterPackView {
  $type?: 'app.bsky.graph.defs#starterPackView'
  uri: string
  cid: string
  record: { [_ in string]: unknown }
  creator: AppBskyActorDefs.ProfileViewBasic
  list?: ListViewBasic
  listItemsSample?: ListItemView[]
  feeds?: AppBskyFeedDefs.GeneratorView[]
  joinedWeekCount?: number
  joinedAllTimeCount?: number
  labels?: ComAtprotoLabelDefs.Label[]
  indexedAt: string
}

export function isStarterPackView(v: unknown): v is $Typed<StarterPackView> {
  return is$typed(v, id, 'starterPackView')
}

export function validateStarterPackView(v: unknown) {
  return lexicons.validate(
    `${id}#starterPackView`,
    v,
  ) as ValidationResult<StarterPackView>
}

export interface StarterPackViewBasic {
  $type?: 'app.bsky.graph.defs#starterPackViewBasic'
  uri: string
  cid: string
  record: { [_ in string]: unknown }
  creator: AppBskyActorDefs.ProfileViewBasic
  listItemCount?: number
  joinedWeekCount?: number
  joinedAllTimeCount?: number
  labels?: ComAtprotoLabelDefs.Label[]
  indexedAt: string
}

export function isStarterPackViewBasic(
  v: unknown,
): v is $Typed<StarterPackViewBasic> {
  return is$typed(v, id, 'starterPackViewBasic')
}

export function validateStarterPackViewBasic(v: unknown) {
  return lexicons.validate(
    `${id}#starterPackViewBasic`,
    v,
  ) as ValidationResult<StarterPackViewBasic>
}

export type ListPurpose =
  | 'app.bsky.graph.defs#modlist'
  | 'app.bsky.graph.defs#curatelist'
  | 'app.bsky.graph.defs#referencelist'
  | (string & {})

/** A list of actors to apply an aggregate moderation action (mute/block) on. */
export const MODLIST = `${id}#modlist`
/** A list of actors used for curation purposes such as list feeds or interaction gating. */
export const CURATELIST = `${id}#curatelist`
/** A list of actors used for only for reference purposes such as within a starter pack. */
export const REFERENCELIST = `${id}#referencelist`

export interface ListViewerState {
  $type?: 'app.bsky.graph.defs#listViewerState'
  muted?: boolean
  blocked?: string
}

export function isListViewerState(v: unknown): v is $Typed<ListViewerState> {
  return is$typed(v, id, 'listViewerState')
}

export function validateListViewerState(v: unknown) {
  return lexicons.validate(
    `${id}#listViewerState`,
    v,
  ) as ValidationResult<ListViewerState>
}

/** indicates that a handle or DID could not be resolved */
export interface NotFoundActor {
  $type?: 'app.bsky.graph.defs#notFoundActor'
  actor: string
  notFound: true
}

export function isNotFoundActor(v: unknown): v is $Typed<NotFoundActor> {
  return is$typed(v, id, 'notFoundActor')
}

export function validateNotFoundActor(v: unknown) {
  return lexicons.validate(
    `${id}#notFoundActor`,
    v,
  ) as ValidationResult<NotFoundActor>
}

/** lists the bi-directional graph relationships between one actor (not indicated in the object), and the target actors (the DID included in the object) */
export interface Relationship {
  $type?: 'app.bsky.graph.defs#relationship'
  did: string
  /** if the actor follows this DID, this is the AT-URI of the follow record */
  following?: string
  /** if the actor is followed by this DID, contains the AT-URI of the follow record */
  followedBy?: string
}

export function isRelationship(v: unknown): v is $Typed<Relationship> {
  return is$typed(v, id, 'relationship')
}

export function validateRelationship(v: unknown) {
  return lexicons.validate(
    `${id}#relationship`,
    v,
  ) as ValidationResult<Relationship>
}
