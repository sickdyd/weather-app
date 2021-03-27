import { useEffect, useState } from 'react'

const useCityQueryString: () => {
  cities: Array<string>
} = () => {
  const [cities, setCities] = useState<Array<string> | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const citiesArray = urlParams?.get('city')?.split(',')
      citiesArray?.length > 0 ? setCities(citiesArray) : null
    }
  }, [])

  return {
    cities
  }
}

export default useCityQueryString
