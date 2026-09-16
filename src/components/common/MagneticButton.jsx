import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function MagneticButton({ children, strength = 24, className = '', ...props }) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  function handleMouseMove(e) {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x / strength}px, ${y / strength}px)`
  }

  function handleMouseLeave() {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', transition: 'transform 0.2s var(--ease-out)' }}
      {...props}
    >
      {children}
    </span>
  )
}
