export const dataFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString()
}
