export const stringLimit = (text: string, limit = 15): string => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...'
  }
  return text
}
