import { useEffect, useState } from 'react'

const useCityQueryString: () => {
  cities: Array<string>
} = () => {
  const [cities, setCities] = useState<Array<string>>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      setCities(urlParams?.get('city')?.split(','))
    }
  }, [])

  return {
    cities
  }
}

export default useCityQueryString
