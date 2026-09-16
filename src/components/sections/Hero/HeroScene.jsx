import Scene from '../../3d/Scene'
import ParticleField from '../../3d/ParticleField'
import ParallaxController from '../../3d/ParallaxController'
import BusinessCore from '../../3d/objects/BusinessCore'
import EcosystemNodes from '../../3d/objects/EcosystemNodes'
import StrategyLayer from '../../3d/objects/StrategyLayer'
import GrowthLayer from '../../3d/objects/GrowthLayer'

export default function HeroScene() {
  return (
    <Scene cameraPosition={[0, 0, 8]}>
      <ParticleField count={220} radius={7} color="#ddb8ff" />
      <ParallaxController mouseStrength={0.35} scrollStrength={2}>
        <BusinessCore radius={1.1} color="#d0bcff" />
        <EcosystemNodes />
        <StrategyLayer radius={3.1} color="#a078ff" />
        <GrowthLayer radius={3.6} color="#c0c1ff" />
      </ParallaxController>
    </Scene>
  )
}
