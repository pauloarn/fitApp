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
