export const getCityQueryString = (): Array<string> | null => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const cities = urlParams?.get('city')?.split(',')

    return cities
  }

  return null
}
