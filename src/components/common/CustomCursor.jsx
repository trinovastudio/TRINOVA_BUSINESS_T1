import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const isTouch = useMediaQuery('(pointer: coarse)')

  useEffect(() => {
    if (isTouch) return
    const dot = dotRef.current
    if (!dot) return

    function handleMove(e) {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        marginLeft: -4,
        marginTop: -4,
        borderRadius: '50%',
        background: 'var(--color-accent)',
        pointerEvents: 'none',
        zIndex: 'var(--z-cursor)',
        mixBlendMode: 'difference',
      }}
    />
  )
}
