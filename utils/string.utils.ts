const formatMoney = (number: number | string | null): string => {
  if (!number) return '$0'
  return number.toLocaleString('en-US', { style: 'currency', currency: 'usd' })
}

const formatAmount = (number: number | string | null): string => {
  const numberString = convertToString(number)
  if (numberString === '0') return numberString
  if (numberString.length >= 4)
    return `${(parseFloat(numberString) / 1000).toString()}K`
  return numberString
}

const convertToString = (number: any): string => {
  if (typeof number === 'string') return number
  try {
    return number.toString()
  } catch (error) {
    return '0'
  }
}

export { formatMoney, formatAmount, convertToString }
