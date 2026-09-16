import Scene from '../../3d/Scene'
import GrowthLayer from '../../3d/objects/GrowthLayer'
import TechnologyLayer from '../../3d/objects/TechnologyLayer'
import MouseParallax from '../../3d/MouseParallax'

export default function EcosystemScene() {
  return (
    <Scene cameraPosition={[0, 0, 9]} style={{ opacity: 0.5 }}>
      <MouseParallax strength={0.15}>
        <GrowthLayer radius={3} />
        <TechnologyLayer radius={2.2} />
      </MouseParallax>
    </Scene>
  )
}
