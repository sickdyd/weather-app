import { useEffect, useRef } from 'react'

const useInterval = ({ callback, delay }: { callback: () => void; delay: number }): void => {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(intervalId)
  }, [delay])
}

export default useInterval
