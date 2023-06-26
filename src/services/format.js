export const formatValue = (val, min = 2, max = 4) => new Intl.NumberFormat(
  'en-US',
  {minimumFractionDigits: min, maximumFractionDigits: max},
).format(val)

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const fromBase = (input, baseDecimals = 9) => {
  const value = input / 10 ** baseDecimals

  return value
}
