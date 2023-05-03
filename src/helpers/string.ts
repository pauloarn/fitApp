export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const createUuid = () => {
  var dt = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}

export const getNumber = (text: string) => {
  return text.replace(/\D/g, '')
}

export const mask = (
  value: string,
  pattern: string,
  justNumber = false
): string => {
  if (!value) {
    return ''
  }
  let i = 0
  const v = justNumber ? getNumber(value) : value.toString()

  const resPattern = pattern.replace(/#/g, () => v[i++] || '#')

  const indexHash = resPattern.indexOf('#')

  if (indexHash === -1) return resPattern

  if (v[v.length - 1] !== resPattern[resPattern.length - 1]) {
    return resPattern.substring(0, resPattern.lastIndexOf(v[v.length - 1]) + 1)
  }
  if (indexHash !== -1) return resPattern.substring(0, indexHash)
  return resPattern
}
