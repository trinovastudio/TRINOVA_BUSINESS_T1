import Scene from '../../3d/Scene'
import ParticleField from '../../3d/ParticleField'
import MouseParallax from '../../3d/MouseParallax'

export default function IndustryWorld() {
  return (
    <Scene cameraPosition={[0, 0, 8]} style={{ opacity: 0.5 }}>
      <MouseParallax strength={0.15}>
        <ParticleField count={220} radius={7} />
      </MouseParallax>
    </Scene>
  )
}
