import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMousePosition } from '../../hooks/useMousePosition'

export default function MouseParallax({ children, strength = 0.4 }) {
  const groupRef = useRef(null)
  const mouse = useMousePosition()

  useFrame(() => {
    if (!groupRef.current) return
    const targetX = mouse.ny * strength
    const targetY = mouse.nx * strength
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05
  })

  return <group ref={groupRef}>{children}</group>
}
