import { useEffect, useRef } from 'react'

function useInterval(callback, delay): void {
  const savedCallback = useRef<any>()

  // Remember the latest callback.
  useEffect((): void => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect((): void | (() => void) => {
    function tick(): void {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return (): void => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
