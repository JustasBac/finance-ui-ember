export function roundNumber(number, decimals = 2) {
  const multiplier = Math.pow(10, decimals); //if decimals 2 than we want to have as result 100

  return Math.round((number + Number.EPSILON) * multiplier) / 100;
}
