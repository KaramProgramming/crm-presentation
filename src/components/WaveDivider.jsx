export default function WaveDivider({ flip = false, topColor = '#0a0a0f', bottomColor = '#0a0a0f' }) {
  return (
    <div
      className="relative w-full overflow-hidden leading-none pointer-events-none"
      style={{ height: 90, marginTop: -1, marginBottom: -1 }}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top fill */}
        <path d="M0,0 L1440,0 L1440,45 C1200,90 960,0 720,45 C480,90 240,0 0,45 Z" fill={topColor} />
        {/* Bottom fill */}
        <path d="M0,45 C240,0 480,90 720,45 C960,0 1200,90 1440,45 L1440,90 L0,90 Z" fill={bottomColor} />
      </svg>
    </div>
  )
}
