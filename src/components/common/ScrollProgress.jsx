import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: `${progress * 100}%`,
        background: 'var(--color-accent)',
        zIndex: 'var(--z-header)',
        transition: 'width 0.1s linear',
      }}
    />
  )
}
