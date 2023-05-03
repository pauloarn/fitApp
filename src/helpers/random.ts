export const selectNumberInRange = (maxLimit: number) => {
  let rand = Math.random() * maxLimit
  rand = Math.floor(rand)

  return rand
}
