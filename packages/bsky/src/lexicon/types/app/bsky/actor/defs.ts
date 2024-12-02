/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs'
import * as AppBskyGraphDefs from '../graph/defs'
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef'

export const id = 'app.bsky.actor.defs'

export interface ProfileViewBasic {
  $type?: 'app.bsky.actor.defs#profileViewBasic'
  did: string
  handle: string
  displayName?: string
  avatar?: string
  associated?: ProfileAssociated
  viewer?: ViewerState
  labels?: ComAtprotoLabelDefs.Label[]
  createdAt?: string
}

export function isProfileViewBasic(v: unknown): v is $Typed<ProfileViewBasic> {
  return is$typed(v, id, 'profileViewBasic')
}

export function validateProfileViewBasic(v: unknown) {
  return lexicons.validate(
    `${id}#profileViewBasic`,
    v,
  ) as ValidationResult<ProfileViewBasic>
}

export interface ProfileView {
  $type?: 'app.bsky.actor.defs#profileView'
  did: string
  handle: string
  displayName?: string
  description?: string
  avatar?: string
  associated?: ProfileAssociated
  indexedAt?: string
  createdAt?: string
  viewer?: ViewerState
  labels?: ComAtprotoLabelDefs.Label[]
}

export function isProfileView(v: unknown): v is $Typed<ProfileView> {
  return is$typed(v, id, 'profileView')
}

export function validateProfileView(v: unknown) {
  return lexicons.validate(
    `${id}#profileView`,
    v,
  ) as ValidationResult<ProfileView>
}

export interface ProfileViewDetailed {
  $type?: 'app.bsky.actor.defs#profileViewDetailed'
  did: string
  handle: string
  displayName?: string
  description?: string
  avatar?: string
  banner?: string
  followersCount?: number
  followsCount?: number
  postsCount?: number
  associated?: ProfileAssociated
  joinedViaStarterPack?: AppBskyGraphDefs.StarterPackViewBasic
  indexedAt?: string
  createdAt?: string
  viewer?: ViewerState
  labels?: ComAtprotoLabelDefs.Label[]
  pinnedPost?: ComAtprotoRepoStrongRef.Main
}

export function isProfileViewDetailed(
  v: unknown,
): v is $Typed<ProfileViewDetailed> {
  return is$typed(v, id, 'profileViewDetailed')
}

export function validateProfileViewDetailed(v: unknown) {
  return lexicons.validate(
    `${id}#profileViewDetailed`,
    v,
  ) as ValidationResult<ProfileViewDetailed>
}

export interface ProfileAssociated {
  $type?: 'app.bsky.actor.defs#profileAssociated'
  lists?: number
  feedgens?: number
  starterPacks?: number
  labeler?: boolean
  chat?: ProfileAssociatedChat
}

export function isProfileAssociated(
  v: unknown,
): v is $Typed<ProfileAssociated> {
  return is$typed(v, id, 'profileAssociated')
}

export function validateProfileAssociated(v: unknown) {
  return lexicons.validate(
    `${id}#profileAssociated`,
    v,
  ) as ValidationResult<ProfileAssociated>
}

export interface ProfileAssociatedChat {
  $type?: 'app.bsky.actor.defs#profileAssociatedChat'
  allowIncoming: 'all' | 'none' | 'following' | (string & {})
}

export function isProfileAssociatedChat(
  v: unknown,
): v is $Typed<ProfileAssociatedChat> {
  return is$typed(v, id, 'profileAssociatedChat')
}

export function validateProfileAssociatedChat(v: unknown) {
  return lexicons.validate(
    `${id}#profileAssociatedChat`,
    v,
  ) as ValidationResult<ProfileAssociatedChat>
}

/** Metadata about the requesting account's relationship with the subject account. Only has meaningful content for authed requests. */
export interface ViewerState {
  $type?: 'app.bsky.actor.defs#viewerState'
  muted?: boolean
  mutedByList?: AppBskyGraphDefs.ListViewBasic
  blockedBy?: boolean
  blocking?: string
  blockingByList?: AppBskyGraphDefs.ListViewBasic
  following?: string
  followedBy?: string
  knownFollowers?: KnownFollowers
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

/** The subject's followers whom you also follow */
export interface KnownFollowers {
  $type?: 'app.bsky.actor.defs#knownFollowers'
  count: number
  followers: ProfileViewBasic[]
}

export function isKnownFollowers(v: unknown): v is $Typed<KnownFollowers> {
  return is$typed(v, id, 'knownFollowers')
}

export function validateKnownFollowers(v: unknown) {
  return lexicons.validate(
    `${id}#knownFollowers`,
    v,
  ) as ValidationResult<KnownFollowers>
}

export type Preferences = (
  | $Typed<AdultContentPref>
  | $Typed<ContentLabelPref>
  | $Typed<SavedFeedsPref>
  | $Typed<SavedFeedsPrefV2>
  | $Typed<PersonalDetailsPref>
  | $Typed<FeedViewPref>
  | $Typed<ThreadViewPref>
  | $Typed<InterestsPref>
  | $Typed<MutedWordsPref>
  | $Typed<HiddenPostsPref>
  | $Typed<BskyAppStatePref>
  | $Typed<LabelersPref>
  | $Typed<{ [k: string]: unknown }>
)[]

export interface AdultContentPref {
  $type?: 'app.bsky.actor.defs#adultContentPref'
  enabled: boolean
}

export function isAdultContentPref(v: unknown): v is $Typed<AdultContentPref> {
  return is$typed(v, id, 'adultContentPref')
}

export function validateAdultContentPref(v: unknown) {
  return lexicons.validate(
    `${id}#adultContentPref`,
    v,
  ) as ValidationResult<AdultContentPref>
}

export interface ContentLabelPref {
  $type?: 'app.bsky.actor.defs#contentLabelPref'
  /** Which labeler does this preference apply to? If undefined, applies globally. */
  labelerDid?: string
  label: string
  visibility: 'ignore' | 'show' | 'warn' | 'hide' | (string & {})
}

export function isContentLabelPref(v: unknown): v is $Typed<ContentLabelPref> {
  return is$typed(v, id, 'contentLabelPref')
}

export function validateContentLabelPref(v: unknown) {
  return lexicons.validate(
    `${id}#contentLabelPref`,
    v,
  ) as ValidationResult<ContentLabelPref>
}

export interface SavedFeed {
  $type?: 'app.bsky.actor.defs#savedFeed'
  id: string
  type: 'feed' | 'list' | 'timeline' | (string & {})
  value: string
  pinned: boolean
}

export function isSavedFeed(v: unknown): v is $Typed<SavedFeed> {
  return is$typed(v, id, 'savedFeed')
}

export function validateSavedFeed(v: unknown) {
  return lexicons.validate(`${id}#savedFeed`, v) as ValidationResult<SavedFeed>
}

export interface SavedFeedsPrefV2 {
  $type?: 'app.bsky.actor.defs#savedFeedsPrefV2'
  items: SavedFeed[]
}

export function isSavedFeedsPrefV2(v: unknown): v is $Typed<SavedFeedsPrefV2> {
  return is$typed(v, id, 'savedFeedsPrefV2')
}

export function validateSavedFeedsPrefV2(v: unknown) {
  return lexicons.validate(
    `${id}#savedFeedsPrefV2`,
    v,
  ) as ValidationResult<SavedFeedsPrefV2>
}

export interface SavedFeedsPref {
  $type?: 'app.bsky.actor.defs#savedFeedsPref'
  pinned: string[]
  saved: string[]
  timelineIndex?: number
}

export function isSavedFeedsPref(v: unknown): v is $Typed<SavedFeedsPref> {
  return is$typed(v, id, 'savedFeedsPref')
}

export function validateSavedFeedsPref(v: unknown) {
  return lexicons.validate(
    `${id}#savedFeedsPref`,
    v,
  ) as ValidationResult<SavedFeedsPref>
}

export interface PersonalDetailsPref {
  $type?: 'app.bsky.actor.defs#personalDetailsPref'
  /** The birth date of account owner. */
  birthDate?: string
}

export function isPersonalDetailsPref(
  v: unknown,
): v is $Typed<PersonalDetailsPref> {
  return is$typed(v, id, 'personalDetailsPref')
}

export function validatePersonalDetailsPref(v: unknown) {
  return lexicons.validate(
    `${id}#personalDetailsPref`,
    v,
  ) as ValidationResult<PersonalDetailsPref>
}

export interface FeedViewPref {
  $type?: 'app.bsky.actor.defs#feedViewPref'
  /** The URI of the feed, or an identifier which describes the feed. */
  feed: string
  /** Hide replies in the feed. */
  hideReplies?: boolean
  /** Hide replies in the feed if they are not by followed users. */
  hideRepliesByUnfollowed: boolean
  /** Hide replies in the feed if they do not have this number of likes. */
  hideRepliesByLikeCount?: number
  /** Hide reposts in the feed. */
  hideReposts?: boolean
  /** Hide quote posts in the feed. */
  hideQuotePosts?: boolean
}

export function isFeedViewPref(v: unknown): v is $Typed<FeedViewPref> {
  return is$typed(v, id, 'feedViewPref')
}

export function validateFeedViewPref(v: unknown) {
  return lexicons.validate(
    `${id}#feedViewPref`,
    v,
  ) as ValidationResult<FeedViewPref>
}

export interface ThreadViewPref {
  $type?: 'app.bsky.actor.defs#threadViewPref'
  /** Sorting mode for threads. */
  sort?:
    | 'oldest'
    | 'newest'
    | 'most-likes'
    | 'random'
    | 'hotness'
    | (string & {})
  /** Show followed users at the top of all replies. */
  prioritizeFollowedUsers?: boolean
}

export function isThreadViewPref(v: unknown): v is $Typed<ThreadViewPref> {
  return is$typed(v, id, 'threadViewPref')
}

export function validateThreadViewPref(v: unknown) {
  return lexicons.validate(
    `${id}#threadViewPref`,
    v,
  ) as ValidationResult<ThreadViewPref>
}

export interface InterestsPref {
  $type?: 'app.bsky.actor.defs#interestsPref'
  /** A list of tags which describe the account owner's interests gathered during onboarding. */
  tags: string[]
}

export function isInterestsPref(v: unknown): v is $Typed<InterestsPref> {
  return is$typed(v, id, 'interestsPref')
}

export function validateInterestsPref(v: unknown) {
  return lexicons.validate(
    `${id}#interestsPref`,
    v,
  ) as ValidationResult<InterestsPref>
}

export type MutedWordTarget = 'content' | 'tag' | (string & {})

/** A word that the account owner has muted. */
export interface MutedWord {
  $type?: 'app.bsky.actor.defs#mutedWord'
  id?: string
  /** The muted word itself. */
  value: string
  /** The intended targets of the muted word. */
  targets: MutedWordTarget[]
  /** Groups of users to apply the muted word to. If undefined, applies to all users. */
  actorTarget: 'all' | 'exclude-following' | (string & {})
  /** The date and time at which the muted word will expire and no longer be applied. */
  expiresAt?: string
}

export function isMutedWord(v: unknown): v is $Typed<MutedWord> {
  return is$typed(v, id, 'mutedWord')
}

export function validateMutedWord(v: unknown) {
  return lexicons.validate(`${id}#mutedWord`, v) as ValidationResult<MutedWord>
}

export interface MutedWordsPref {
  $type?: 'app.bsky.actor.defs#mutedWordsPref'
  /** A list of words the account owner has muted. */
  items: MutedWord[]
}

export function isMutedWordsPref(v: unknown): v is $Typed<MutedWordsPref> {
  return is$typed(v, id, 'mutedWordsPref')
}

export function validateMutedWordsPref(v: unknown) {
  return lexicons.validate(
    `${id}#mutedWordsPref`,
    v,
  ) as ValidationResult<MutedWordsPref>
}

export interface HiddenPostsPref {
  $type?: 'app.bsky.actor.defs#hiddenPostsPref'
  /** A list of URIs of posts the account owner has hidden. */
  items: string[]
}

export function isHiddenPostsPref(v: unknown): v is $Typed<HiddenPostsPref> {
  return is$typed(v, id, 'hiddenPostsPref')
}

export function validateHiddenPostsPref(v: unknown) {
  return lexicons.validate(
    `${id}#hiddenPostsPref`,
    v,
  ) as ValidationResult<HiddenPostsPref>
}

export interface LabelersPref {
  $type?: 'app.bsky.actor.defs#labelersPref'
  labelers: LabelerPrefItem[]
}

export function isLabelersPref(v: unknown): v is $Typed<LabelersPref> {
  return is$typed(v, id, 'labelersPref')
}

export function validateLabelersPref(v: unknown) {
  return lexicons.validate(
    `${id}#labelersPref`,
    v,
  ) as ValidationResult<LabelersPref>
}

export interface LabelerPrefItem {
  $type?: 'app.bsky.actor.defs#labelerPrefItem'
  did: string
}

export function isLabelerPrefItem(v: unknown): v is $Typed<LabelerPrefItem> {
  return is$typed(v, id, 'labelerPrefItem')
}

export function validateLabelerPrefItem(v: unknown) {
  return lexicons.validate(
    `${id}#labelerPrefItem`,
    v,
  ) as ValidationResult<LabelerPrefItem>
}

/** A grab bag of state that's specific to the bsky.app program. Third-party apps shouldn't use this. */
export interface BskyAppStatePref {
  $type?: 'app.bsky.actor.defs#bskyAppStatePref'
  activeProgressGuide?: BskyAppProgressGuide
  /** An array of tokens which identify nudges (modals, popups, tours, highlight dots) that should be shown to the user. */
  queuedNudges?: string[]
  /** Storage for NUXs the user has encountered. */
  nuxs?: Nux[]
}

export function isBskyAppStatePref(v: unknown): v is $Typed<BskyAppStatePref> {
  return is$typed(v, id, 'bskyAppStatePref')
}

export function validateBskyAppStatePref(v: unknown) {
  return lexicons.validate(
    `${id}#bskyAppStatePref`,
    v,
  ) as ValidationResult<BskyAppStatePref>
}

/** If set, an active progress guide. Once completed, can be set to undefined. Should have unspecced fields tracking progress. */
export interface BskyAppProgressGuide {
  $type?: 'app.bsky.actor.defs#bskyAppProgressGuide'
  guide: string
}

export function isBskyAppProgressGuide(
  v: unknown,
): v is $Typed<BskyAppProgressGuide> {
  return is$typed(v, id, 'bskyAppProgressGuide')
}

export function validateBskyAppProgressGuide(v: unknown) {
  return lexicons.validate(
    `${id}#bskyAppProgressGuide`,
    v,
  ) as ValidationResult<BskyAppProgressGuide>
}

/** A new user experiences (NUX) storage object */
export interface Nux {
  $type?: 'app.bsky.actor.defs#nux'
  id: string
  completed: boolean
  /** Arbitrary data for the NUX. The structure is defined by the NUX itself. Limited to 300 characters. */
  data?: string
  /** The date and time at which the NUX will expire and should be considered completed. */
  expiresAt?: string
}

export function isNux(v: unknown): v is $Typed<Nux> {
  return is$typed(v, id, 'nux')
}

export function validateNux(v: unknown) {
  return lexicons.validate(`${id}#nux`, v) as ValidationResult<Nux>
}
