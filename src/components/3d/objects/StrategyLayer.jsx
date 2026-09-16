import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function StrategyLayer({ radius = 2.1, tilt = 0.5, speed = 0.12, color = '#c9c9ff' }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })

  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}
