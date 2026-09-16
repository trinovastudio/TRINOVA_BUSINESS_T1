import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Camera from './Camera'
import Lighting from './Lighting'

export default function Scene({ children, cameraPosition = [0, 0, 8], className = '', style }) {
  return (
    <div className={`scene ${className}`} style={{ position: 'absolute', inset: 0, zIndex: 'var(--z-scene)', ...style }}>
      <Canvas dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
        <Camera position={cameraPosition} />
        <Lighting />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}
