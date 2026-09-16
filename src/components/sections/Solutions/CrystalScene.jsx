import Scene from '../../3d/Scene'
import MouseParallax from '../../3d/MouseParallax'
import CrystalCore from '../../3d/objects/CrystalCore'

/**
 * Lightweight, non-draggable variant of the crystal core — used as the
 * accent visual on each solution detail page hero, tinted per solution.
 */
export default function CrystalScene({ accent = '#8e5ccb', color = '#d0bcff' }) {
  return (
    <Scene cameraPosition={[0, 0, 7.5]}>
      <MouseParallax strength={0.25}>
        <CrystalCore color={color} accent={accent} scale={0.85} />
      </MouseParallax>
    </Scene>
  )
}
