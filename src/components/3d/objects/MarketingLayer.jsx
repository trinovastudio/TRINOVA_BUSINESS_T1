import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function MarketingLayer({ radius = 3.1, tilt = 0.2, speed = 0.16, color = '#c9ffe3' }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })

  return (
    <group ref={ref} rotation={[tilt, -0.4, 0.2]}>
      <mesh>
        <torusGeometry args={[radius, 0.005, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}
