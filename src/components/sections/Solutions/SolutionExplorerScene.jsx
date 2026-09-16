import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import SolutionExplorerCore from '../../3d/objects/SolutionExplorerCore'
import './SolutionExplorerScene.css'

export default function SolutionExplorerScene({ items, activeIndex, onSelect }) {
  const mouseRef = useRef({ x: 0, y: 0 })

  const onPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }
  const onPointerLeave = () => {
    mouseRef.current.x = 0
    mouseRef.current.y = 0
  }

  return (
    <div className="solution-explorer-scene" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ fov: 40, position: [0, 0, 11] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 7]} intensity={1.5} />
        <pointLight color="#a855f7" intensity={3.5} distance={30} position={[0, 0, 4]} />
        <SolutionExplorerCore items={items} activeIndex={activeIndex} onSelect={onSelect} mouseRef={mouseRef} />
      </Canvas>
      <div className="solution-explorer-scene__badge">
        <span className="solution-explorer-scene__dot" aria-hidden="true" />
        Click a node to open that solution
      </div>
    </div>
  )
}
