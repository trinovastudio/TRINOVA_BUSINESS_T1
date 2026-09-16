import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const listener = (e) => setMatches(e.matches)
    mediaQueryList.addEventListener('change', listener)
    setMatches(mediaQueryList.matches)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [query])

  return matches
}
