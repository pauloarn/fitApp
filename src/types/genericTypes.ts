import { ServerCodeType } from './serverCodes'

export type ObjectKeys<T> = {
  [K in keyof T]: T[K] extends () => any ? never : K
}[keyof T]

export type Null<T> = T | null
export type Undefined<T> = undefined | T
export type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}

export type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base]

export type ServerData<T> = ServerDataSuccess<T> | ServerDataError

export interface Pageable<T> {
  content: T[]
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  first: boolean
  sort: null
  numberOfElements: number
}

export interface ServerDataCommon {
  statusCode: number
  messageCode: ServerCodeType
  message: string
}

export interface ServerDataSuccess<T> extends ServerDataCommon {
  success: true
  body: T
}
export interface ServerDataError extends ServerDataCommon {
  success: false
  body: Null<any>
}
