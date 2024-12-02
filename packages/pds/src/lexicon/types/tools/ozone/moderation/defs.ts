/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { lexicons } from '../../../../lexicons'
import { $Type, $Typed, is$typed, OmitKey } from '../../../../util'
import * as ComAtprotoAdminDefs from '../../../com/atproto/admin/defs'
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef'
import * as ChatBskyConvoDefs from '../../../chat/bsky/convo/defs'
import * as ComAtprotoModerationDefs from '../../../com/atproto/moderation/defs'
import * as ComAtprotoServerDefs from '../../../com/atproto/server/defs'
import * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs'

export const id = 'tools.ozone.moderation.defs'

export interface ModEventView {
  $type?: 'tools.ozone.moderation.defs#modEventView'
  id: number
  event:
    | $Typed<ModEventTakedown>
    | $Typed<ModEventReverseTakedown>
    | $Typed<ModEventComment>
    | $Typed<ModEventReport>
    | $Typed<ModEventLabel>
    | $Typed<ModEventAcknowledge>
    | $Typed<ModEventEscalate>
    | $Typed<ModEventMute>
    | $Typed<ModEventUnmute>
    | $Typed<ModEventMuteReporter>
    | $Typed<ModEventUnmuteReporter>
    | $Typed<ModEventEmail>
    | $Typed<ModEventResolveAppeal>
    | $Typed<ModEventDivert>
    | $Typed<ModEventTag>
    | $Typed<AccountEvent>
    | $Typed<IdentityEvent>
    | $Typed<RecordEvent>
    | $Typed<{ [k: string]: unknown }>
  subject:
    | $Typed<ComAtprotoAdminDefs.RepoRef>
    | $Typed<ComAtprotoRepoStrongRef.Main>
    | $Typed<ChatBskyConvoDefs.MessageRef>
    | $Typed<{ [k: string]: unknown }>
  subjectBlobCids: string[]
  createdBy: string
  createdAt: string
  creatorHandle?: string
  subjectHandle?: string
}

export function isModEventView(v: unknown): v is $Typed<ModEventView> {
  return is$typed(v, id, 'modEventView')
}

export function validateModEventView(v: unknown) {
  return lexicons.validate(
    `${id}#modEventView`,
    v,
  ) as ValidationResult<ModEventView>
}

export interface ModEventViewDetail {
  $type?: 'tools.ozone.moderation.defs#modEventViewDetail'
  id: number
  event:
    | $Typed<ModEventTakedown>
    | $Typed<ModEventReverseTakedown>
    | $Typed<ModEventComment>
    | $Typed<ModEventReport>
    | $Typed<ModEventLabel>
    | $Typed<ModEventAcknowledge>
    | $Typed<ModEventEscalate>
    | $Typed<ModEventMute>
    | $Typed<ModEventUnmute>
    | $Typed<ModEventMuteReporter>
    | $Typed<ModEventUnmuteReporter>
    | $Typed<ModEventEmail>
    | $Typed<ModEventResolveAppeal>
    | $Typed<ModEventDivert>
    | $Typed<ModEventTag>
    | $Typed<AccountEvent>
    | $Typed<IdentityEvent>
    | $Typed<RecordEvent>
    | $Typed<{ [k: string]: unknown }>
  subject:
    | $Typed<RepoView>
    | $Typed<RepoViewNotFound>
    | $Typed<RecordView>
    | $Typed<RecordViewNotFound>
    | $Typed<{ [k: string]: unknown }>
  subjectBlobs: BlobView[]
  createdBy: string
  createdAt: string
}

export function isModEventViewDetail(
  v: unknown,
): v is $Typed<ModEventViewDetail> {
  return is$typed(v, id, 'modEventViewDetail')
}

export function validateModEventViewDetail(v: unknown) {
  return lexicons.validate(
    `${id}#modEventViewDetail`,
    v,
  ) as ValidationResult<ModEventViewDetail>
}

export interface SubjectStatusView {
  $type?: 'tools.ozone.moderation.defs#subjectStatusView'
  id: number
  subject:
    | $Typed<ComAtprotoAdminDefs.RepoRef>
    | $Typed<ComAtprotoRepoStrongRef.Main>
    | $Typed<{ [k: string]: unknown }>
  hosting?:
    | $Typed<AccountHosting>
    | $Typed<RecordHosting>
    | $Typed<{ [k: string]: unknown }>
  subjectBlobCids?: string[]
  subjectRepoHandle?: string
  /** Timestamp referencing when the last update was made to the moderation status of the subject */
  updatedAt: string
  /** Timestamp referencing the first moderation status impacting event was emitted on the subject */
  createdAt: string
  reviewState: SubjectReviewState
  /** Sticky comment on the subject. */
  comment?: string
  muteUntil?: string
  muteReportingUntil?: string
  lastReviewedBy?: string
  lastReviewedAt?: string
  lastReportedAt?: string
  /** Timestamp referencing when the author of the subject appealed a moderation action */
  lastAppealedAt?: string
  takendown?: boolean
  /** True indicates that the a previously taken moderator action was appealed against, by the author of the content. False indicates last appeal was resolved by moderators. */
  appealed?: boolean
  suspendUntil?: string
  tags?: string[]
}

export function isSubjectStatusView(
  v: unknown,
): v is $Typed<SubjectStatusView> {
  return is$typed(v, id, 'subjectStatusView')
}

export function validateSubjectStatusView(v: unknown) {
  return lexicons.validate(
    `${id}#subjectStatusView`,
    v,
  ) as ValidationResult<SubjectStatusView>
}

export type SubjectReviewState =
  | 'lex:tools.ozone.moderation.defs#reviewOpen'
  | 'lex:tools.ozone.moderation.defs#reviewEscalated'
  | 'lex:tools.ozone.moderation.defs#reviewClosed'
  | 'lex:tools.ozone.moderation.defs#reviewNone'
  | (string & {})

/** Moderator review status of a subject: Open. Indicates that the subject needs to be reviewed by a moderator */
export const REVIEWOPEN = `${id}#reviewOpen`
/** Moderator review status of a subject: Escalated. Indicates that the subject was escalated for review by a moderator */
export const REVIEWESCALATED = `${id}#reviewEscalated`
/** Moderator review status of a subject: Closed. Indicates that the subject was already reviewed and resolved by a moderator */
export const REVIEWCLOSED = `${id}#reviewClosed`
/** Moderator review status of a subject: Unnecessary. Indicates that the subject does not need a review at the moment but there is probably some moderation related metadata available for it */
export const REVIEWNONE = `${id}#reviewNone`

/** Take down a subject permanently or temporarily */
export interface ModEventTakedown {
  $type?: 'tools.ozone.moderation.defs#modEventTakedown'
  comment?: string
  /** Indicates how long the takedown should be in effect before automatically expiring. */
  durationInHours?: number
  /** If true, all other reports on content authored by this account will be resolved (acknowledged). */
  acknowledgeAccountSubjects?: boolean
}

export function isModEventTakedown(v: unknown): v is $Typed<ModEventTakedown> {
  return is$typed(v, id, 'modEventTakedown')
}

export function validateModEventTakedown(v: unknown) {
  return lexicons.validate(
    `${id}#modEventTakedown`,
    v,
  ) as ValidationResult<ModEventTakedown>
}

/** Revert take down action on a subject */
export interface ModEventReverseTakedown {
  $type?: 'tools.ozone.moderation.defs#modEventReverseTakedown'
  /** Describe reasoning behind the reversal. */
  comment?: string
}

export function isModEventReverseTakedown(
  v: unknown,
): v is $Typed<ModEventReverseTakedown> {
  return is$typed(v, id, 'modEventReverseTakedown')
}

export function validateModEventReverseTakedown(v: unknown) {
  return lexicons.validate(
    `${id}#modEventReverseTakedown`,
    v,
  ) as ValidationResult<ModEventReverseTakedown>
}

/** Resolve appeal on a subject */
export interface ModEventResolveAppeal {
  $type?: 'tools.ozone.moderation.defs#modEventResolveAppeal'
  /** Describe resolution. */
  comment?: string
}

export function isModEventResolveAppeal(
  v: unknown,
): v is $Typed<ModEventResolveAppeal> {
  return is$typed(v, id, 'modEventResolveAppeal')
}

export function validateModEventResolveAppeal(v: unknown) {
  return lexicons.validate(
    `${id}#modEventResolveAppeal`,
    v,
  ) as ValidationResult<ModEventResolveAppeal>
}

/** Add a comment to a subject */
export interface ModEventComment {
  $type?: 'tools.ozone.moderation.defs#modEventComment'
  comment: string
  /** Make the comment persistent on the subject */
  sticky?: boolean
}

export function isModEventComment(v: unknown): v is $Typed<ModEventComment> {
  return is$typed(v, id, 'modEventComment')
}

export function validateModEventComment(v: unknown) {
  return lexicons.validate(
    `${id}#modEventComment`,
    v,
  ) as ValidationResult<ModEventComment>
}

/** Report a subject */
export interface ModEventReport {
  $type?: 'tools.ozone.moderation.defs#modEventReport'
  comment?: string
  /** Set to true if the reporter was muted from reporting at the time of the event. These reports won't impact the reviewState of the subject. */
  isReporterMuted?: boolean
  reportType: ComAtprotoModerationDefs.ReasonType
}

export function isModEventReport(v: unknown): v is $Typed<ModEventReport> {
  return is$typed(v, id, 'modEventReport')
}

export function validateModEventReport(v: unknown) {
  return lexicons.validate(
    `${id}#modEventReport`,
    v,
  ) as ValidationResult<ModEventReport>
}

/** Apply/Negate labels on a subject */
export interface ModEventLabel {
  $type?: 'tools.ozone.moderation.defs#modEventLabel'
  comment?: string
  createLabelVals: string[]
  negateLabelVals: string[]
}

export function isModEventLabel(v: unknown): v is $Typed<ModEventLabel> {
  return is$typed(v, id, 'modEventLabel')
}

export function validateModEventLabel(v: unknown) {
  return lexicons.validate(
    `${id}#modEventLabel`,
    v,
  ) as ValidationResult<ModEventLabel>
}

export interface ModEventAcknowledge {
  $type?: 'tools.ozone.moderation.defs#modEventAcknowledge'
  comment?: string
}

export function isModEventAcknowledge(
  v: unknown,
): v is $Typed<ModEventAcknowledge> {
  return is$typed(v, id, 'modEventAcknowledge')
}

export function validateModEventAcknowledge(v: unknown) {
  return lexicons.validate(
    `${id}#modEventAcknowledge`,
    v,
  ) as ValidationResult<ModEventAcknowledge>
}

export interface ModEventEscalate {
  $type?: 'tools.ozone.moderation.defs#modEventEscalate'
  comment?: string
}

export function isModEventEscalate(v: unknown): v is $Typed<ModEventEscalate> {
  return is$typed(v, id, 'modEventEscalate')
}

export function validateModEventEscalate(v: unknown) {
  return lexicons.validate(
    `${id}#modEventEscalate`,
    v,
  ) as ValidationResult<ModEventEscalate>
}

/** Mute incoming reports on a subject */
export interface ModEventMute {
  $type?: 'tools.ozone.moderation.defs#modEventMute'
  comment?: string
  /** Indicates how long the subject should remain muted. */
  durationInHours: number
}

export function isModEventMute(v: unknown): v is $Typed<ModEventMute> {
  return is$typed(v, id, 'modEventMute')
}

export function validateModEventMute(v: unknown) {
  return lexicons.validate(
    `${id}#modEventMute`,
    v,
  ) as ValidationResult<ModEventMute>
}

/** Unmute action on a subject */
export interface ModEventUnmute {
  $type?: 'tools.ozone.moderation.defs#modEventUnmute'
  /** Describe reasoning behind the reversal. */
  comment?: string
}

export function isModEventUnmute(v: unknown): v is $Typed<ModEventUnmute> {
  return is$typed(v, id, 'modEventUnmute')
}

export function validateModEventUnmute(v: unknown) {
  return lexicons.validate(
    `${id}#modEventUnmute`,
    v,
  ) as ValidationResult<ModEventUnmute>
}

/** Mute incoming reports from an account */
export interface ModEventMuteReporter {
  $type?: 'tools.ozone.moderation.defs#modEventMuteReporter'
  comment?: string
  /** Indicates how long the account should remain muted. Falsy value here means a permanent mute. */
  durationInHours?: number
}

export function isModEventMuteReporter(
  v: unknown,
): v is $Typed<ModEventMuteReporter> {
  return is$typed(v, id, 'modEventMuteReporter')
}

export function validateModEventMuteReporter(v: unknown) {
  return lexicons.validate(
    `${id}#modEventMuteReporter`,
    v,
  ) as ValidationResult<ModEventMuteReporter>
}

/** Unmute incoming reports from an account */
export interface ModEventUnmuteReporter {
  $type?: 'tools.ozone.moderation.defs#modEventUnmuteReporter'
  /** Describe reasoning behind the reversal. */
  comment?: string
}

export function isModEventUnmuteReporter(
  v: unknown,
): v is $Typed<ModEventUnmuteReporter> {
  return is$typed(v, id, 'modEventUnmuteReporter')
}

export function validateModEventUnmuteReporter(v: unknown) {
  return lexicons.validate(
    `${id}#modEventUnmuteReporter`,
    v,
  ) as ValidationResult<ModEventUnmuteReporter>
}

/** Keep a log of outgoing email to a user */
export interface ModEventEmail {
  $type?: 'tools.ozone.moderation.defs#modEventEmail'
  /** The subject line of the email sent to the user. */
  subjectLine: string
  /** The content of the email sent to the user. */
  content?: string
  /** Additional comment about the outgoing comm. */
  comment?: string
}

export function isModEventEmail(v: unknown): v is $Typed<ModEventEmail> {
  return is$typed(v, id, 'modEventEmail')
}

export function validateModEventEmail(v: unknown) {
  return lexicons.validate(
    `${id}#modEventEmail`,
    v,
  ) as ValidationResult<ModEventEmail>
}

/** Divert a record's blobs to a 3rd party service for further scanning/tagging */
export interface ModEventDivert {
  $type?: 'tools.ozone.moderation.defs#modEventDivert'
  comment?: string
}

export function isModEventDivert(v: unknown): v is $Typed<ModEventDivert> {
  return is$typed(v, id, 'modEventDivert')
}

export function validateModEventDivert(v: unknown) {
  return lexicons.validate(
    `${id}#modEventDivert`,
    v,
  ) as ValidationResult<ModEventDivert>
}

/** Add/Remove a tag on a subject */
export interface ModEventTag {
  $type?: 'tools.ozone.moderation.defs#modEventTag'
  /** Tags to be added to the subject. If already exists, won't be duplicated. */
  add: string[]
  /** Tags to be removed to the subject. Ignores a tag If it doesn't exist, won't be duplicated. */
  remove: string[]
  /** Additional comment about added/removed tags. */
  comment?: string
}

export function isModEventTag(v: unknown): v is $Typed<ModEventTag> {
  return is$typed(v, id, 'modEventTag')
}

export function validateModEventTag(v: unknown) {
  return lexicons.validate(
    `${id}#modEventTag`,
    v,
  ) as ValidationResult<ModEventTag>
}

/** Logs account status related events on a repo subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
export interface AccountEvent {
  $type?: 'tools.ozone.moderation.defs#accountEvent'
  comment?: string
  /** Indicates that the account has a repository which can be fetched from the host that emitted this event. */
  active: boolean
  status?:
    | 'unknown'
    | 'deactivated'
    | 'deleted'
    | 'takendown'
    | 'suspended'
    | 'tombstoned'
    | (string & {})
  timestamp: string
}

export function isAccountEvent(v: unknown): v is $Typed<AccountEvent> {
  return is$typed(v, id, 'accountEvent')
}

export function validateAccountEvent(v: unknown) {
  return lexicons.validate(
    `${id}#accountEvent`,
    v,
  ) as ValidationResult<AccountEvent>
}

/** Logs identity related events on a repo subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
export interface IdentityEvent {
  $type?: 'tools.ozone.moderation.defs#identityEvent'
  comment?: string
  handle?: string
  pdsHost?: string
  tombstone?: boolean
  timestamp: string
}

export function isIdentityEvent(v: unknown): v is $Typed<IdentityEvent> {
  return is$typed(v, id, 'identityEvent')
}

export function validateIdentityEvent(v: unknown) {
  return lexicons.validate(
    `${id}#identityEvent`,
    v,
  ) as ValidationResult<IdentityEvent>
}

/** Logs lifecycle event on a record subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
export interface RecordEvent {
  $type?: 'tools.ozone.moderation.defs#recordEvent'
  comment?: string
  op: 'create' | 'update' | 'delete' | (string & {})
  cid?: string
  timestamp: string
}

export function isRecordEvent(v: unknown): v is $Typed<RecordEvent> {
  return is$typed(v, id, 'recordEvent')
}

export function validateRecordEvent(v: unknown) {
  return lexicons.validate(
    `${id}#recordEvent`,
    v,
  ) as ValidationResult<RecordEvent>
}

export interface RepoView {
  $type?: 'tools.ozone.moderation.defs#repoView'
  did: string
  handle: string
  email?: string
  relatedRecords: { [_ in string]: unknown }[]
  indexedAt: string
  moderation: Moderation
  invitedBy?: ComAtprotoServerDefs.InviteCode
  invitesDisabled?: boolean
  inviteNote?: string
  deactivatedAt?: string
  threatSignatures?: ComAtprotoAdminDefs.ThreatSignature[]
}

export function isRepoView(v: unknown): v is $Typed<RepoView> {
  return is$typed(v, id, 'repoView')
}

export function validateRepoView(v: unknown) {
  return lexicons.validate(`${id}#repoView`, v) as ValidationResult<RepoView>
}

export interface RepoViewDetail {
  $type?: 'tools.ozone.moderation.defs#repoViewDetail'
  did: string
  handle: string
  email?: string
  relatedRecords: { [_ in string]: unknown }[]
  indexedAt: string
  moderation: ModerationDetail
  labels?: ComAtprotoLabelDefs.Label[]
  invitedBy?: ComAtprotoServerDefs.InviteCode
  invites?: ComAtprotoServerDefs.InviteCode[]
  invitesDisabled?: boolean
  inviteNote?: string
  emailConfirmedAt?: string
  deactivatedAt?: string
  threatSignatures?: ComAtprotoAdminDefs.ThreatSignature[]
}

export function isRepoViewDetail(v: unknown): v is $Typed<RepoViewDetail> {
  return is$typed(v, id, 'repoViewDetail')
}

export function validateRepoViewDetail(v: unknown) {
  return lexicons.validate(
    `${id}#repoViewDetail`,
    v,
  ) as ValidationResult<RepoViewDetail>
}

export interface RepoViewNotFound {
  $type?: 'tools.ozone.moderation.defs#repoViewNotFound'
  did: string
}

export function isRepoViewNotFound(v: unknown): v is $Typed<RepoViewNotFound> {
  return is$typed(v, id, 'repoViewNotFound')
}

export function validateRepoViewNotFound(v: unknown) {
  return lexicons.validate(
    `${id}#repoViewNotFound`,
    v,
  ) as ValidationResult<RepoViewNotFound>
}

export interface RecordView {
  $type?: 'tools.ozone.moderation.defs#recordView'
  uri: string
  cid: string
  value: { [_ in string]: unknown }
  blobCids: string[]
  indexedAt: string
  moderation: Moderation
  repo: RepoView
}

export function isRecordView(v: unknown): v is $Typed<RecordView> {
  return is$typed(v, id, 'recordView')
}

export function validateRecordView(v: unknown) {
  return lexicons.validate(
    `${id}#recordView`,
    v,
  ) as ValidationResult<RecordView>
}

export interface RecordViewDetail {
  $type?: 'tools.ozone.moderation.defs#recordViewDetail'
  uri: string
  cid: string
  value: { [_ in string]: unknown }
  blobs: BlobView[]
  labels?: ComAtprotoLabelDefs.Label[]
  indexedAt: string
  moderation: ModerationDetail
  repo: RepoView
}

export function isRecordViewDetail(v: unknown): v is $Typed<RecordViewDetail> {
  return is$typed(v, id, 'recordViewDetail')
}

export function validateRecordViewDetail(v: unknown) {
  return lexicons.validate(
    `${id}#recordViewDetail`,
    v,
  ) as ValidationResult<RecordViewDetail>
}

export interface RecordViewNotFound {
  $type?: 'tools.ozone.moderation.defs#recordViewNotFound'
  uri: string
}

export function isRecordViewNotFound(
  v: unknown,
): v is $Typed<RecordViewNotFound> {
  return is$typed(v, id, 'recordViewNotFound')
}

export function validateRecordViewNotFound(v: unknown) {
  return lexicons.validate(
    `${id}#recordViewNotFound`,
    v,
  ) as ValidationResult<RecordViewNotFound>
}

export interface Moderation {
  $type?: 'tools.ozone.moderation.defs#moderation'
  subjectStatus?: SubjectStatusView
}

export function isModeration(v: unknown): v is $Typed<Moderation> {
  return is$typed(v, id, 'moderation')
}

export function validateModeration(v: unknown) {
  return lexicons.validate(
    `${id}#moderation`,
    v,
  ) as ValidationResult<Moderation>
}

export interface ModerationDetail {
  $type?: 'tools.ozone.moderation.defs#moderationDetail'
  subjectStatus?: SubjectStatusView
}

export function isModerationDetail(v: unknown): v is $Typed<ModerationDetail> {
  return is$typed(v, id, 'moderationDetail')
}

export function validateModerationDetail(v: unknown) {
  return lexicons.validate(
    `${id}#moderationDetail`,
    v,
  ) as ValidationResult<ModerationDetail>
}

export interface BlobView {
  $type?: 'tools.ozone.moderation.defs#blobView'
  cid: string
  mimeType: string
  size: number
  createdAt: string
  details?:
    | $Typed<ImageDetails>
    | $Typed<VideoDetails>
    | $Typed<{ [k: string]: unknown }>
  moderation?: Moderation
}

export function isBlobView(v: unknown): v is $Typed<BlobView> {
  return is$typed(v, id, 'blobView')
}

export function validateBlobView(v: unknown) {
  return lexicons.validate(`${id}#blobView`, v) as ValidationResult<BlobView>
}

export interface ImageDetails {
  $type?: 'tools.ozone.moderation.defs#imageDetails'
  width: number
  height: number
}

export function isImageDetails(v: unknown): v is $Typed<ImageDetails> {
  return is$typed(v, id, 'imageDetails')
}

export function validateImageDetails(v: unknown) {
  return lexicons.validate(
    `${id}#imageDetails`,
    v,
  ) as ValidationResult<ImageDetails>
}

export interface VideoDetails {
  $type?: 'tools.ozone.moderation.defs#videoDetails'
  width: number
  height: number
  length: number
}

export function isVideoDetails(v: unknown): v is $Typed<VideoDetails> {
  return is$typed(v, id, 'videoDetails')
}

export function validateVideoDetails(v: unknown) {
  return lexicons.validate(
    `${id}#videoDetails`,
    v,
  ) as ValidationResult<VideoDetails>
}

export interface AccountHosting {
  $type?: 'tools.ozone.moderation.defs#accountHosting'
  status:
    | 'takendown'
    | 'suspended'
    | 'deleted'
    | 'deactivated'
    | 'unknown'
    | (string & {})
  updatedAt?: string
  createdAt?: string
  deletedAt?: string
  deactivatedAt?: string
  reactivatedAt?: string
}

export function isAccountHosting(v: unknown): v is $Typed<AccountHosting> {
  return is$typed(v, id, 'accountHosting')
}

export function validateAccountHosting(v: unknown) {
  return lexicons.validate(
    `${id}#accountHosting`,
    v,
  ) as ValidationResult<AccountHosting>
}

export interface RecordHosting {
  $type?: 'tools.ozone.moderation.defs#recordHosting'
  status: 'deleted' | 'unknown' | (string & {})
  updatedAt?: string
  createdAt?: string
  deletedAt?: string
}

export function isRecordHosting(v: unknown): v is $Typed<RecordHosting> {
  return is$typed(v, id, 'recordHosting')
}

export function validateRecordHosting(v: unknown) {
  return lexicons.validate(
    `${id}#recordHosting`,
    v,
  ) as ValidationResult<RecordHosting>
}
