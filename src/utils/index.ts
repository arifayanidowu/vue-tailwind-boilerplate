export const dataFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString()
}

export const formatCurrency = (currency: string = 'USD', amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export const isURL = (url: string) => {
  const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i
  return pattern.test(url)
}

export function debounce(func: Function, delay: number, limit: number) {
  let counter = 0
  let timeoutId: any

  return function (...args: any[]) {
    clearTimeout(timeoutId)
    // @ts-ignore
    const context = this
    if (counter < limit) {
      timeoutId = setTimeout(() => {
        func.apply(context, args)
        counter++
      }, delay)
    }
  }
}
