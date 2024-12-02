/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import * as AppBskyActorDefs from '../actor/defs'
import * as AppBskyEmbedImages from '../embed/images'
import * as AppBskyEmbedVideo from '../embed/video'
import * as AppBskyEmbedExternal from '../embed/external'
import * as AppBskyEmbedRecord from '../embed/record'
import * as AppBskyEmbedRecordWithMedia from '../embed/recordWithMedia'
import * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs'
import * as AppBskyRichtextFacet from '../richtext/facet'
import * as AppBskyGraphDefs from '../graph/defs'

export const id = 'app.bsky.feed.defs'

export interface PostView {
  $type?: 'app.bsky.feed.defs#postView'
  uri: string
  cid: string
  author: AppBskyActorDefs.ProfileViewBasic
  record: { [_ in string]: unknown }
  embed?:
    | $Typed<AppBskyEmbedImages.View>
    | $Typed<AppBskyEmbedVideo.View>
    | $Typed<AppBskyEmbedExternal.View>
    | $Typed<AppBskyEmbedRecord.View>
    | $Typed<AppBskyEmbedRecordWithMedia.View>
    | $Typed<{ [k: string]: unknown }>
  replyCount?: number
  repostCount?: number
  likeCount?: number
  quoteCount?: number
  indexedAt: string
  viewer?: ViewerState
  labels?: ComAtprotoLabelDefs.Label[]
  threadgate?: ThreadgateView
}

export function isPostView(v: unknown): v is $Typed<PostView> {
  return is$typed(v, id, 'postView')
}

export function validatePostView(v: unknown) {
  return lexicons.validate(`${id}#postView`, v) as ValidationResult<PostView>
}

/** Metadata about the requesting account's relationship with the subject content. Only has meaningful content for authed requests. */
export interface ViewerState {
  $type?: 'app.bsky.feed.defs#viewerState'
  repost?: string
  like?: string
  threadMuted?: boolean
  replyDisabled?: boolean
  embeddingDisabled?: boolean
  pinned?: boolean
}

export function isViewerState(v: unknown): v is $Typed<ViewerState> {
  return is$typed(v, id, 'viewerState')
}

export function validateViewerState(v: unknown) {
  return lexicons.validate(
    `${id}#viewerState`,
    v,
  ) as ValidationResult<ViewerState>
}

export interface FeedViewPost {
  $type?: 'app.bsky.feed.defs#feedViewPost'
  post: PostView
  reply?: ReplyRef
  reason?:
    | $Typed<ReasonRepost>
    | $Typed<ReasonPin>
    | $Typed<{ [k: string]: unknown }>
  /** Context provided by feed generator that may be passed back alongside interactions. */
  feedContext?: string
}

export function isFeedViewPost(v: unknown): v is $Typed<FeedViewPost> {
  return is$typed(v, id, 'feedViewPost')
}

export function validateFeedViewPost(v: unknown) {
  return lexicons.validate(
    `${id}#feedViewPost`,
    v,
  ) as ValidationResult<FeedViewPost>
}

export interface ReplyRef {
  $type?: 'app.bsky.feed.defs#replyRef'
  root:
    | $Typed<PostView>
    | $Typed<NotFoundPost>
    | $Typed<BlockedPost>
    | $Typed<{ [k: string]: unknown }>
  parent:
    | $Typed<PostView>
    | $Typed<NotFoundPost>
    | $Typed<BlockedPost>
    | $Typed<{ [k: string]: unknown }>
  grandparentAuthor?: AppBskyActorDefs.ProfileViewBasic
}

export function isReplyRef(v: unknown): v is $Typed<ReplyRef> {
  return is$typed(v, id, 'replyRef')
}

export function validateReplyRef(v: unknown) {
  return lexicons.validate(`${id}#replyRef`, v) as ValidationResult<ReplyRef>
}

export interface ReasonRepost {
  $type?: 'app.bsky.feed.defs#reasonRepost'
  by: AppBskyActorDefs.ProfileViewBasic
  indexedAt: string
}

export function isReasonRepost(v: unknown): v is $Typed<ReasonRepost> {
  return is$typed(v, id, 'reasonRepost')
}

export function validateReasonRepost(v: unknown) {
  return lexicons.validate(
    `${id}#reasonRepost`,
    v,
  ) as ValidationResult<ReasonRepost>
}

export interface ReasonPin {
  $type?: 'app.bsky.feed.defs#reasonPin'
}

export function isReasonPin(v: unknown): v is $Typed<ReasonPin> {
  return is$typed(v, id, 'reasonPin')
}

export function validateReasonPin(v: unknown) {
  return lexicons.validate(`${id}#reasonPin`, v) as ValidationResult<ReasonPin>
}

export interface ThreadViewPost {
  $type?: 'app.bsky.feed.defs#threadViewPost'
  post: PostView
  parent?:
    | $Typed<ThreadViewPost>
    | $Typed<NotFoundPost>
    | $Typed<BlockedPost>
    | $Typed<{ [k: string]: unknown }>
  replies?: (
    | $Typed<ThreadViewPost>
    | $Typed<NotFoundPost>
    | $Typed<BlockedPost>
    | $Typed<{ [k: string]: unknown }>
  )[]
}

export function isThreadViewPost(v: unknown): v is $Typed<ThreadViewPost> {
  return is$typed(v, id, 'threadViewPost')
}

export function validateThreadViewPost(v: unknown) {
  return lexicons.validate(
    `${id}#threadViewPost`,
    v,
  ) as ValidationResult<ThreadViewPost>
}

export interface NotFoundPost {
  $type?: 'app.bsky.feed.defs#notFoundPost'
  uri: string
  notFound: true
}

export function isNotFoundPost(v: unknown): v is $Typed<NotFoundPost> {
  return is$typed(v, id, 'notFoundPost')
}

export function validateNotFoundPost(v: unknown) {
  return lexicons.validate(
    `${id}#notFoundPost`,
    v,
  ) as ValidationResult<NotFoundPost>
}

export interface BlockedPost {
  $type?: 'app.bsky.feed.defs#blockedPost'
  uri: string
  blocked: true
  author: BlockedAuthor
}

export function isBlockedPost(v: unknown): v is $Typed<BlockedPost> {
  return is$typed(v, id, 'blockedPost')
}

export function validateBlockedPost(v: unknown) {
  return lexicons.validate(
    `${id}#blockedPost`,
    v,
  ) as ValidationResult<BlockedPost>
}

export interface BlockedAuthor {
  $type?: 'app.bsky.feed.defs#blockedAuthor'
  did: string
  viewer?: AppBskyActorDefs.ViewerState
}

export function isBlockedAuthor(v: unknown): v is $Typed<BlockedAuthor> {
  return is$typed(v, id, 'blockedAuthor')
}

export function validateBlockedAuthor(v: unknown) {
  return lexicons.validate(
    `${id}#blockedAuthor`,
    v,
  ) as ValidationResult<BlockedAuthor>
}

export interface GeneratorView {
  $type?: 'app.bsky.feed.defs#generatorView'
  uri: string
  cid: string
  did: string
  creator: AppBskyActorDefs.ProfileView
  displayName: string
  description?: string
  descriptionFacets?: AppBskyRichtextFacet.Main[]
  avatar?: string
  likeCount?: number
  acceptsInteractions?: boolean
  labels?: ComAtprotoLabelDefs.Label[]
  viewer?: GeneratorViewerState
  indexedAt: string
}

export function isGeneratorView(v: unknown): v is $Typed<GeneratorView> {
  return is$typed(v, id, 'generatorView')
}

export function validateGeneratorView(v: unknown) {
  return lexicons.validate(
    `${id}#generatorView`,
    v,
  ) as ValidationResult<GeneratorView>
}

export interface GeneratorViewerState {
  $type?: 'app.bsky.feed.defs#generatorViewerState'
  like?: string
}

export function isGeneratorViewerState(
  v: unknown,
): v is $Typed<GeneratorViewerState> {
  return is$typed(v, id, 'generatorViewerState')
}

export function validateGeneratorViewerState(v: unknown) {
  return lexicons.validate(
    `${id}#generatorViewerState`,
    v,
  ) as ValidationResult<GeneratorViewerState>
}

export interface SkeletonFeedPost {
  $type?: 'app.bsky.feed.defs#skeletonFeedPost'
  post: string
  reason?:
    | $Typed<SkeletonReasonRepost>
    | $Typed<SkeletonReasonPin>
    | $Typed<{ [k: string]: unknown }>
  /** Context that will be passed through to client and may be passed to feed generator back alongside interactions. */
  feedContext?: string
}

export function isSkeletonFeedPost(v: unknown): v is $Typed<SkeletonFeedPost> {
  return is$typed(v, id, 'skeletonFeedPost')
}

export function validateSkeletonFeedPost(v: unknown) {
  return lexicons.validate(
    `${id}#skeletonFeedPost`,
    v,
  ) as ValidationResult<SkeletonFeedPost>
}

export interface SkeletonReasonRepost {
  $type?: 'app.bsky.feed.defs#skeletonReasonRepost'
  repost: string
}

export function isSkeletonReasonRepost(
  v: unknown,
): v is $Typed<SkeletonReasonRepost> {
  return is$typed(v, id, 'skeletonReasonRepost')
}

export function validateSkeletonReasonRepost(v: unknown) {
  return lexicons.validate(
    `${id}#skeletonReasonRepost`,
    v,
  ) as ValidationResult<SkeletonReasonRepost>
}

export interface SkeletonReasonPin {
  $type?: 'app.bsky.feed.defs#skeletonReasonPin'
}

export function isSkeletonReasonPin(
  v: unknown,
): v is $Typed<SkeletonReasonPin> {
  return is$typed(v, id, 'skeletonReasonPin')
}

export function validateSkeletonReasonPin(v: unknown) {
  return lexicons.validate(
    `${id}#skeletonReasonPin`,
    v,
  ) as ValidationResult<SkeletonReasonPin>
}

export interface ThreadgateView {
  $type?: 'app.bsky.feed.defs#threadgateView'
  uri?: string
  cid?: string
  record?: { [_ in string]: unknown }
  lists?: AppBskyGraphDefs.ListViewBasic[]
}

export function isThreadgateView(v: unknown): v is $Typed<ThreadgateView> {
  return is$typed(v, id, 'threadgateView')
}

export function validateThreadgateView(v: unknown) {
  return lexicons.validate(
    `${id}#threadgateView`,
    v,
  ) as ValidationResult<ThreadgateView>
}

export interface Interaction {
  $type?: 'app.bsky.feed.defs#interaction'
  item?: string
  event?:
    | 'app.bsky.feed.defs#requestLess'
    | 'app.bsky.feed.defs#requestMore'
    | 'app.bsky.feed.defs#clickthroughItem'
    | 'app.bsky.feed.defs#clickthroughAuthor'
    | 'app.bsky.feed.defs#clickthroughReposter'
    | 'app.bsky.feed.defs#clickthroughEmbed'
    | 'app.bsky.feed.defs#interactionSeen'
    | 'app.bsky.feed.defs#interactionLike'
    | 'app.bsky.feed.defs#interactionRepost'
    | 'app.bsky.feed.defs#interactionReply'
    | 'app.bsky.feed.defs#interactionQuote'
    | 'app.bsky.feed.defs#interactionShare'
    | (string & {})
  /** Context on a feed item that was originally supplied by the feed generator on getFeedSkeleton. */
  feedContext?: string
}

export function isInteraction(v: unknown): v is $Typed<Interaction> {
  return is$typed(v, id, 'interaction')
}

export function validateInteraction(v: unknown) {
  return lexicons.validate(
    `${id}#interaction`,
    v,
  ) as ValidationResult<Interaction>
}

/** Request that less content like the given feed item be shown in the feed */
export const REQUESTLESS = `${id}#requestLess`
/** Request that more content like the given feed item be shown in the feed */
export const REQUESTMORE = `${id}#requestMore`
/** User clicked through to the feed item */
export const CLICKTHROUGHITEM = `${id}#clickthroughItem`
/** User clicked through to the author of the feed item */
export const CLICKTHROUGHAUTHOR = `${id}#clickthroughAuthor`
/** User clicked through to the reposter of the feed item */
export const CLICKTHROUGHREPOSTER = `${id}#clickthroughReposter`
/** User clicked through to the embedded content of the feed item */
export const CLICKTHROUGHEMBED = `${id}#clickthroughEmbed`
/** Feed item was seen by user */
export const INTERACTIONSEEN = `${id}#interactionSeen`
/** User liked the feed item */
export const INTERACTIONLIKE = `${id}#interactionLike`
/** User reposted the feed item */
export const INTERACTIONREPOST = `${id}#interactionRepost`
/** User replied to the feed item */
export const INTERACTIONREPLY = `${id}#interactionReply`
/** User quoted the feed item */
export const INTERACTIONQUOTE = `${id}#interactionQuote`
/** User shared the feed item */
export const INTERACTIONSHARE = `${id}#interactionShare`
