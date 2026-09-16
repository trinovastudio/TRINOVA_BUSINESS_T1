import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ScrollParallax({ children, strength = 3 }) {
  const groupRef = useRef(null)
  const progress = useScrollProgress()

  useFrame(() => {
    if (!groupRef.current) return
    const targetY = -progress * strength
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08
  })

  return <group ref={groupRef}>{children}</group>
}
