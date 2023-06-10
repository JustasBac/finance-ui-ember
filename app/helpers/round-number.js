export function roundNumber(number, decimals) {
  const multiplier = decimals * 10; //if decimals 2 than we want to have as result 100
  return Math.round((number + Number.EPSILON) * multiplier) / 100;
}
