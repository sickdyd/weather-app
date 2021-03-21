export const getCityQueryString = (): string | null => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const city = urlParams?.get('city')

    return city
  }

  return null
}
