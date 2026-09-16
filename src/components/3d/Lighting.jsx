export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={0.8} />
      <pointLight position={[6, 8, 10]} intensity={2.2} color="#a855f7" />
      <pointLight position={[-8, -6, 8]} intensity={1.4} color="#818cf8" />
    </>
  )
}
