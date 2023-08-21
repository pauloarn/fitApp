class QueryBuilder {
  private isRemoveEmptyOrNullValue = false
  private query: string[] = []

  addQuery(key: string, value: any) {
    if (this.isRemoveEmptyOrNullValue && [undefined, null, ''].includes(value))
      return this
    this.query.push(`${key}=${value}`)
    return this
  }

  setPage(page: number) {
    this.query.push(`page=${page}`)
    return this
  }

  setSize(size: number) {
    this.query.push(`size=${size}`)
    return this
  }

  setOrderBy(field: string, direction: 'asc' | 'desc') {
    this.query.push(`orderBy=${field}:${direction}`)
    return this
  }

  haveQuery() {
    return this.query.length > 1
  }

  removeEmptyValue() {
    this.isRemoveEmptyOrNullValue = true
    return this
  }

  build(): string {
    return `?${this.query.join('&')}`
  }
}

export default QueryBuilder
