// @generated by protoc-gen-es v1.6.0 with parameter "target=ts,import_extension="
// @generated from file bsync.proto (package bsync, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from '@bufbuild/protobuf'
import { Message, proto3, Timestamp } from '@bufbuild/protobuf'

/**
 * @generated from message bsync.MuteOperation
 */
export class MuteOperation extends Message<MuteOperation> {
  /**
   * @generated from field: string id = 1;
   */
  id = ''

  /**
   * @generated from field: bsync.MuteOperation.Type type = 2;
   */
  type = MuteOperation_Type.UNSPECIFIED

  /**
   * @generated from field: string actor_did = 3;
   */
  actorDid = ''

  /**
   * @generated from field: string subject = 4;
   */
  subject = ''

  constructor(data?: PartialMessage<MuteOperation>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.MuteOperation'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 2,
      name: 'type',
      kind: 'enum',
      T: proto3.getEnumType(MuteOperation_Type),
    },
    { no: 3, name: 'actor_did', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 4, name: 'subject', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): MuteOperation {
    return new MuteOperation().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): MuteOperation {
    return new MuteOperation().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): MuteOperation {
    return new MuteOperation().fromJsonString(jsonString, options)
  }

  static equals(
    a: MuteOperation | PlainMessage<MuteOperation> | undefined,
    b: MuteOperation | PlainMessage<MuteOperation> | undefined,
  ): boolean {
    return proto3.util.equals(MuteOperation, a, b)
  }
}

/**
 * @generated from enum bsync.MuteOperation.Type
 */
export enum MuteOperation_Type {
  /**
   * @generated from enum value: TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: TYPE_ADD = 1;
   */
  ADD = 1,

  /**
   * @generated from enum value: TYPE_REMOVE = 2;
   */
  REMOVE = 2,

  /**
   * @generated from enum value: TYPE_CLEAR = 3;
   */
  CLEAR = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(MuteOperation_Type)
proto3.util.setEnumType(MuteOperation_Type, 'bsync.MuteOperation.Type', [
  { no: 0, name: 'TYPE_UNSPECIFIED' },
  { no: 1, name: 'TYPE_ADD' },
  { no: 2, name: 'TYPE_REMOVE' },
  { no: 3, name: 'TYPE_CLEAR' },
])

/**
 * @generated from message bsync.AddMuteOperationRequest
 */
export class AddMuteOperationRequest extends Message<AddMuteOperationRequest> {
  /**
   * @generated from field: bsync.MuteOperation.Type type = 1;
   */
  type = MuteOperation_Type.UNSPECIFIED

  /**
   * @generated from field: string actor_did = 2;
   */
  actorDid = ''

  /**
   * @generated from field: string subject = 3;
   */
  subject = ''

  constructor(data?: PartialMessage<AddMuteOperationRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.AddMuteOperationRequest'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'type',
      kind: 'enum',
      T: proto3.getEnumType(MuteOperation_Type),
    },
    { no: 2, name: 'actor_did', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 3, name: 'subject', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): AddMuteOperationRequest {
    return new AddMuteOperationRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): AddMuteOperationRequest {
    return new AddMuteOperationRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): AddMuteOperationRequest {
    return new AddMuteOperationRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | AddMuteOperationRequest
      | PlainMessage<AddMuteOperationRequest>
      | undefined,
    b:
      | AddMuteOperationRequest
      | PlainMessage<AddMuteOperationRequest>
      | undefined,
  ): boolean {
    return proto3.util.equals(AddMuteOperationRequest, a, b)
  }
}

/**
 * @generated from message bsync.AddMuteOperationResponse
 */
export class AddMuteOperationResponse extends Message<AddMuteOperationResponse> {
  /**
   * @generated from field: bsync.MuteOperation operation = 1;
   */
  operation?: MuteOperation

  constructor(data?: PartialMessage<AddMuteOperationResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.AddMuteOperationResponse'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'operation', kind: 'message', T: MuteOperation },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): AddMuteOperationResponse {
    return new AddMuteOperationResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): AddMuteOperationResponse {
    return new AddMuteOperationResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): AddMuteOperationResponse {
    return new AddMuteOperationResponse().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | AddMuteOperationResponse
      | PlainMessage<AddMuteOperationResponse>
      | undefined,
    b:
      | AddMuteOperationResponse
      | PlainMessage<AddMuteOperationResponse>
      | undefined,
  ): boolean {
    return proto3.util.equals(AddMuteOperationResponse, a, b)
  }
}

/**
 * @generated from message bsync.ScanMuteOperationsRequest
 */
export class ScanMuteOperationsRequest extends Message<ScanMuteOperationsRequest> {
  /**
   * @generated from field: string cursor = 1;
   */
  cursor = ''

  /**
   * @generated from field: int32 limit = 2;
   */
  limit = 0

  constructor(data?: PartialMessage<ScanMuteOperationsRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.ScanMuteOperationsRequest'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'cursor', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'limit', kind: 'scalar', T: 5 /* ScalarType.INT32 */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): ScanMuteOperationsRequest {
    return new ScanMuteOperationsRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): ScanMuteOperationsRequest {
    return new ScanMuteOperationsRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): ScanMuteOperationsRequest {
    return new ScanMuteOperationsRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | ScanMuteOperationsRequest
      | PlainMessage<ScanMuteOperationsRequest>
      | undefined,
    b:
      | ScanMuteOperationsRequest
      | PlainMessage<ScanMuteOperationsRequest>
      | undefined,
  ): boolean {
    return proto3.util.equals(ScanMuteOperationsRequest, a, b)
  }
}

/**
 * @generated from message bsync.ScanMuteOperationsResponse
 */
export class ScanMuteOperationsResponse extends Message<ScanMuteOperationsResponse> {
  /**
   * @generated from field: repeated bsync.MuteOperation operations = 1;
   */
  operations: MuteOperation[] = []

  /**
   * @generated from field: string cursor = 2;
   */
  cursor = ''

  constructor(data?: PartialMessage<ScanMuteOperationsResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.ScanMuteOperationsResponse'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'operations',
      kind: 'message',
      T: MuteOperation,
      repeated: true,
    },
    { no: 2, name: 'cursor', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): ScanMuteOperationsResponse {
    return new ScanMuteOperationsResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): ScanMuteOperationsResponse {
    return new ScanMuteOperationsResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): ScanMuteOperationsResponse {
    return new ScanMuteOperationsResponse().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | ScanMuteOperationsResponse
      | PlainMessage<ScanMuteOperationsResponse>
      | undefined,
    b:
      | ScanMuteOperationsResponse
      | PlainMessage<ScanMuteOperationsResponse>
      | undefined,
  ): boolean {
    return proto3.util.equals(ScanMuteOperationsResponse, a, b)
  }
}

/**
 * @generated from message bsync.NotifOperation
 */
export class NotifOperation extends Message<NotifOperation> {
  /**
   * @generated from field: string id = 1;
   */
  id = ''

  /**
   * @generated from field: string actor_did = 2;
   */
  actorDid = ''

  /**
   * @generated from field: optional bool priority = 3;
   */
  priority?: boolean

  constructor(data?: PartialMessage<NotifOperation>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.NotifOperation'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'actor_did', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 3,
      name: 'priority',
      kind: 'scalar',
      T: 8 /* ScalarType.BOOL */,
      opt: true,
    },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): NotifOperation {
    return new NotifOperation().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): NotifOperation {
    return new NotifOperation().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): NotifOperation {
    return new NotifOperation().fromJsonString(jsonString, options)
  }

  static equals(
    a: NotifOperation | PlainMessage<NotifOperation> | undefined,
    b: NotifOperation | PlainMessage<NotifOperation> | undefined,
  ): boolean {
    return proto3.util.equals(NotifOperation, a, b)
  }
}

/**
 * @generated from message bsync.AddNotifOperationRequest
 */
export class AddNotifOperationRequest extends Message<AddNotifOperationRequest> {
  /**
   * @generated from field: string actor_did = 1;
   */
  actorDid = ''

  /**
   * @generated from field: optional bool priority = 2;
   */
  priority?: boolean

  constructor(data?: PartialMessage<AddNotifOperationRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.AddNotifOperationRequest'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'actor_did', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 2,
      name: 'priority',
      kind: 'scalar',
      T: 8 /* ScalarType.BOOL */,
      opt: true,
    },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): AddNotifOperationRequest {
    return new AddNotifOperationRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): AddNotifOperationRequest {
    return new AddNotifOperationRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): AddNotifOperationRequest {
    return new AddNotifOperationRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | AddNotifOperationRequest
      | PlainMessage<AddNotifOperationRequest>
      | undefined,
    b:
      | AddNotifOperationRequest
      | PlainMessage<AddNotifOperationRequest>
      | undefined,
  ): boolean {
    return proto3.util.equals(AddNotifOperationRequest, a, b)
  }
}

/**
 * @generated from message bsync.AddNotifOperationResponse
 */
export class AddNotifOperationResponse extends Message<AddNotifOperationResponse> {
  /**
   * @generated from field: bsync.NotifOperation operation = 1;
   */
  operation?: NotifOperation

  constructor(data?: PartialMessage<AddNotifOperationResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.AddNotifOperationResponse'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'operation', kind: 'message', T: NotifOperation },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): AddNotifOperationResponse {
    return new AddNotifOperationResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): AddNotifOperationResponse {
    return new AddNotifOperationResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): AddNotifOperationResponse {
    return new AddNotifOperationResponse().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | AddNotifOperationResponse
      | PlainMessage<AddNotifOperationResponse>
      | undefined,
    b:
      | AddNotifOperationResponse
      | PlainMessage<AddNotifOperationResponse>
      | undefined,
  ): boolean {
    return proto3.util.equals(AddNotifOperationResponse, a, b)
  }
}

/**
 * @generated from message bsync.ScanNotifOperationsRequest
 */
export class ScanNotifOperationsRequest extends Message<ScanNotifOperationsRequest> {
  /**
   * @generated from field: string cursor = 1;
   */
  cursor = ''

  /**
   * @generated from field: int32 limit = 2;
   */
  limit = 0

  constructor(data?: PartialMessage<ScanNotifOperationsRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.ScanNotifOperationsRequest'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'cursor', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'limit', kind: 'scalar', T: 5 /* ScalarType.INT32 */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): ScanNotifOperationsRequest {
    return new ScanNotifOperationsRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): ScanNotifOperationsRequest {
    return new ScanNotifOperationsRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): ScanNotifOperationsRequest {
    return new ScanNotifOperationsRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | ScanNotifOperationsRequest
      | PlainMessage<ScanNotifOperationsRequest>
      | undefined,
    b:
      | ScanNotifOperationsRequest
      | PlainMessage<ScanNotifOperationsRequest>
      | undefined,
  ): boolean {
    return proto3.util.equals(ScanNotifOperationsRequest, a, b)
  }
}

/**
 * @generated from message bsync.ScanNotifOperationsResponse
 */
export class ScanNotifOperationsResponse extends Message<ScanNotifOperationsResponse> {
  /**
   * @generated from field: repeated bsync.NotifOperation operations = 1;
   */
  operations: NotifOperation[] = []

  /**
   * @generated from field: string cursor = 2;
   */
  cursor = ''

  constructor(data?: PartialMessage<ScanNotifOperationsResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.ScanNotifOperationsResponse'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'operations',
      kind: 'message',
      T: NotifOperation,
      repeated: true,
    },
    { no: 2, name: 'cursor', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): ScanNotifOperationsResponse {
    return new ScanNotifOperationsResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): ScanNotifOperationsResponse {
    return new ScanNotifOperationsResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): ScanNotifOperationsResponse {
    return new ScanNotifOperationsResponse().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | ScanNotifOperationsResponse
      | PlainMessage<ScanNotifOperationsResponse>
      | undefined,
    b:
      | ScanNotifOperationsResponse
      | PlainMessage<ScanNotifOperationsResponse>
      | undefined,
  ): boolean {
    return proto3.util.equals(ScanNotifOperationsResponse, a, b)
  }
}

/**
 * @generated from message bsync.AddPurchaseOperationRequest
 */
export class AddPurchaseOperationRequest extends Message<AddPurchaseOperationRequest> {
  /**
   * @generated from field: string actor_did = 1;
   */
  actorDid = ''

  constructor(data?: PartialMessage<AddPurchaseOperationRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.AddPurchaseOperationRequest'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'actor_did', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): AddPurchaseOperationRequest {
    return new AddPurchaseOperationRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): AddPurchaseOperationRequest {
    return new AddPurchaseOperationRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): AddPurchaseOperationRequest {
    return new AddPurchaseOperationRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | AddPurchaseOperationRequest
      | PlainMessage<AddPurchaseOperationRequest>
      | undefined,
    b:
      | AddPurchaseOperationRequest
      | PlainMessage<AddPurchaseOperationRequest>
      | undefined,
  ): boolean {
    return proto3.util.equals(AddPurchaseOperationRequest, a, b)
  }
}

/**
 * @generated from message bsync.AddPurchaseOperationResponse
 */
export class AddPurchaseOperationResponse extends Message<AddPurchaseOperationResponse> {
  constructor(data?: PartialMessage<AddPurchaseOperationResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.AddPurchaseOperationResponse'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): AddPurchaseOperationResponse {
    return new AddPurchaseOperationResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): AddPurchaseOperationResponse {
    return new AddPurchaseOperationResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): AddPurchaseOperationResponse {
    return new AddPurchaseOperationResponse().fromJsonString(
      jsonString,
      options,
    )
  }

  static equals(
    a:
      | AddPurchaseOperationResponse
      | PlainMessage<AddPurchaseOperationResponse>
      | undefined,
    b:
      | AddPurchaseOperationResponse
      | PlainMessage<AddPurchaseOperationResponse>
      | undefined,
  ): boolean {
    return proto3.util.equals(AddPurchaseOperationResponse, a, b)
  }
}

/**
 * @generated from message bsync.Subscription
 */
export class Subscription extends Message<Subscription> {
  /**
   * @generated from field: string status = 1;
   */
  status = ''

  /**
   * @generated from field: string renewalStatus = 2;
   */
  renewalStatus = ''

  /**
   * @generated from field: string group = 3;
   */
  group = ''

  /**
   * @generated from field: string platform = 4;
   */
  platform = ''

  /**
   * @generated from field: string offering = 5;
   */
  offering = ''

  /**
   * @generated from field: google.protobuf.Timestamp periodEndsAt = 6;
   */
  periodEndsAt?: Timestamp

  /**
   * @generated from field: google.protobuf.Timestamp periodStartsAt = 7;
   */
  periodStartsAt?: Timestamp

  /**
   * @generated from field: google.protobuf.Timestamp purchasedAt = 8;
   */
  purchasedAt?: Timestamp

  constructor(data?: PartialMessage<Subscription>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.Subscription'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'status', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    {
      no: 2,
      name: 'renewalStatus',
      kind: 'scalar',
      T: 9 /* ScalarType.STRING */,
    },
    { no: 3, name: 'group', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 4, name: 'platform', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 5, name: 'offering', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 6, name: 'periodEndsAt', kind: 'message', T: Timestamp },
    { no: 7, name: 'periodStartsAt', kind: 'message', T: Timestamp },
    { no: 8, name: 'purchasedAt', kind: 'message', T: Timestamp },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): Subscription {
    return new Subscription().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): Subscription {
    return new Subscription().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): Subscription {
    return new Subscription().fromJsonString(jsonString, options)
  }

  static equals(
    a: Subscription | PlainMessage<Subscription> | undefined,
    b: Subscription | PlainMessage<Subscription> | undefined,
  ): boolean {
    return proto3.util.equals(Subscription, a, b)
  }
}

/**
 * @generated from message bsync.GetActiveSubscriptionsRequest
 */
export class GetActiveSubscriptionsRequest extends Message<GetActiveSubscriptionsRequest> {
  /**
   * @generated from field: string actor_did = 1;
   */
  actorDid = ''

  constructor(data?: PartialMessage<GetActiveSubscriptionsRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.GetActiveSubscriptionsRequest'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'actor_did', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): GetActiveSubscriptionsRequest {
    return new GetActiveSubscriptionsRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): GetActiveSubscriptionsRequest {
    return new GetActiveSubscriptionsRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): GetActiveSubscriptionsRequest {
    return new GetActiveSubscriptionsRequest().fromJsonString(
      jsonString,
      options,
    )
  }

  static equals(
    a:
      | GetActiveSubscriptionsRequest
      | PlainMessage<GetActiveSubscriptionsRequest>
      | undefined,
    b:
      | GetActiveSubscriptionsRequest
      | PlainMessage<GetActiveSubscriptionsRequest>
      | undefined,
  ): boolean {
    return proto3.util.equals(GetActiveSubscriptionsRequest, a, b)
  }
}

/**
 * @generated from message bsync.GetActiveSubscriptionsResponse
 */
export class GetActiveSubscriptionsResponse extends Message<GetActiveSubscriptionsResponse> {
  /**
   * @generated from field: repeated bsync.Subscription subscriptions = 1;
   */
  subscriptions: Subscription[] = []

  constructor(data?: PartialMessage<GetActiveSubscriptionsResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.GetActiveSubscriptionsResponse'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'subscriptions',
      kind: 'message',
      T: Subscription,
      repeated: true,
    },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): GetActiveSubscriptionsResponse {
    return new GetActiveSubscriptionsResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): GetActiveSubscriptionsResponse {
    return new GetActiveSubscriptionsResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): GetActiveSubscriptionsResponse {
    return new GetActiveSubscriptionsResponse().fromJsonString(
      jsonString,
      options,
    )
  }

  static equals(
    a:
      | GetActiveSubscriptionsResponse
      | PlainMessage<GetActiveSubscriptionsResponse>
      | undefined,
    b:
      | GetActiveSubscriptionsResponse
      | PlainMessage<GetActiveSubscriptionsResponse>
      | undefined,
  ): boolean {
    return proto3.util.equals(GetActiveSubscriptionsResponse, a, b)
  }
}

/**
 * @generated from message bsync.SubscriptionOffering
 */
export class SubscriptionOffering extends Message<SubscriptionOffering> {
  /**
   * @generated from field: string id = 1;
   */
  id = ''

  /**
   * @generated from field: string product = 2;
   */
  product = ''

  constructor(data?: PartialMessage<SubscriptionOffering>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.SubscriptionOffering'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'id', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'product', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): SubscriptionOffering {
    return new SubscriptionOffering().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): SubscriptionOffering {
    return new SubscriptionOffering().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): SubscriptionOffering {
    return new SubscriptionOffering().fromJsonString(jsonString, options)
  }

  static equals(
    a: SubscriptionOffering | PlainMessage<SubscriptionOffering> | undefined,
    b: SubscriptionOffering | PlainMessage<SubscriptionOffering> | undefined,
  ): boolean {
    return proto3.util.equals(SubscriptionOffering, a, b)
  }
}

/**
 * @generated from message bsync.GetSubscriptionGroupRequest
 */
export class GetSubscriptionGroupRequest extends Message<GetSubscriptionGroupRequest> {
  /**
   * @generated from field: string group = 1;
   */
  group = ''

  /**
   * @generated from field: string platform = 2;
   */
  platform = ''

  constructor(data?: PartialMessage<GetSubscriptionGroupRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.GetSubscriptionGroupRequest'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: 'group', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
    { no: 2, name: 'platform', kind: 'scalar', T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): GetSubscriptionGroupRequest {
    return new GetSubscriptionGroupRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): GetSubscriptionGroupRequest {
    return new GetSubscriptionGroupRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): GetSubscriptionGroupRequest {
    return new GetSubscriptionGroupRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | GetSubscriptionGroupRequest
      | PlainMessage<GetSubscriptionGroupRequest>
      | undefined,
    b:
      | GetSubscriptionGroupRequest
      | PlainMessage<GetSubscriptionGroupRequest>
      | undefined,
  ): boolean {
    return proto3.util.equals(GetSubscriptionGroupRequest, a, b)
  }
}

/**
 * @generated from message bsync.GetSubscriptionGroupResponse
 */
export class GetSubscriptionGroupResponse extends Message<GetSubscriptionGroupResponse> {
  /**
   * @generated from field: repeated bsync.SubscriptionOffering offerings = 1;
   */
  offerings: SubscriptionOffering[] = []

  constructor(data?: PartialMessage<GetSubscriptionGroupResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.GetSubscriptionGroupResponse'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: 'offerings',
      kind: 'message',
      T: SubscriptionOffering,
      repeated: true,
    },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): GetSubscriptionGroupResponse {
    return new GetSubscriptionGroupResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): GetSubscriptionGroupResponse {
    return new GetSubscriptionGroupResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): GetSubscriptionGroupResponse {
    return new GetSubscriptionGroupResponse().fromJsonString(
      jsonString,
      options,
    )
  }

  static equals(
    a:
      | GetSubscriptionGroupResponse
      | PlainMessage<GetSubscriptionGroupResponse>
      | undefined,
    b:
      | GetSubscriptionGroupResponse
      | PlainMessage<GetSubscriptionGroupResponse>
      | undefined,
  ): boolean {
    return proto3.util.equals(GetSubscriptionGroupResponse, a, b)
  }
}

/**
 * Ping
 *
 * @generated from message bsync.PingRequest
 */
export class PingRequest extends Message<PingRequest> {
  constructor(data?: PartialMessage<PingRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.PingRequest'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): PingRequest {
    return new PingRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): PingRequest {
    return new PingRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): PingRequest {
    return new PingRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a: PingRequest | PlainMessage<PingRequest> | undefined,
    b: PingRequest | PlainMessage<PingRequest> | undefined,
  ): boolean {
    return proto3.util.equals(PingRequest, a, b)
  }
}

/**
 * @generated from message bsync.PingResponse
 */
export class PingResponse extends Message<PingResponse> {
  constructor(data?: PartialMessage<PingResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = 'bsync.PingResponse'
  static readonly fields: FieldList = proto3.util.newFieldList(() => [])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): PingResponse {
    return new PingResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): PingResponse {
    return new PingResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): PingResponse {
    return new PingResponse().fromJsonString(jsonString, options)
  }

  static equals(
    a: PingResponse | PlainMessage<PingResponse> | undefined,
    b: PingResponse | PlainMessage<PingResponse> | undefined,
  ): boolean {
    return proto3.util.equals(PingResponse, a, b)
  }
}
