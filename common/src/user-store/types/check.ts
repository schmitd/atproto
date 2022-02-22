import { isCID, assure, isObject, isString } from '../../common/types/check'
import { Commit, Root, IdMapping, Post, Follow } from './index.js'

export const isRoot = (obj: unknown): obj is Root => {
  return (
    isObject(obj) &&
    typeof obj.did === 'string' &&
    isCID(obj.posts) &&
    isCID(obj.relationships) &&
    isCID(obj.interactions)
  )
}

export const assureRoot = (obj: unknown): Root => {
  return assure(obj, 'Root', isRoot)
}

export const isCommit = (obj: unknown): obj is Commit => {
  return isObject(obj) && isCID(obj.root) && ArrayBuffer.isView(obj.sig)
}

export const assureCommit = (obj: unknown): Commit => {
  return assure(obj, 'Commit', isCommit)
}

export const isIdMapping = (obj: unknown): obj is IdMapping => {
  return isObject(obj) && Object.values(obj).every(isCID)
}

export const assureIdMapping = (obj: unknown): IdMapping => {
  return assure(obj, 'IdMapping', isIdMapping)
}

export const isPost = (obj: unknown): obj is Post => {
  return (
    isObject(obj) &&
    isString(obj.id) &&
    isString(obj.author) &&
    isString(obj.text) &&
    isString(obj.time)
  )
}

export const assurePost = (obj: unknown): Post => {
  return assure(obj, 'Post', isPost)
}

export const isFollow = (obj: unknown): obj is Follow => {
  return isObject(obj) && isString(obj.username) && isString(obj.did)
}

export const assureFollow = (obj: unknown): Follow => {
  return assure(obj, 'Follow', isFollow)
}
