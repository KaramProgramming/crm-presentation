import { useEffect, useRef } from 'react'

export default function PitchVideo() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const hasLeftRef = useRef(false)

  const replay = () => {
    const v = videoRef.current
    if (!v || v.readyState < 1) return
    v.currentTime = 0
    v.play().catch(() => {})
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.intersectionRatio < 0.35) {
          hasLeftRef.current = true
        }
        if (entry.intersectionRatio > 0.85 && hasLeftRef.current) {
          hasLeftRef.current = false
          replay()
        }
      },
      { threshold: [0, 0.35, 0.85] }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleEnded = (e) => {
    const v = e.currentTarget
    v.pause()
    v.currentTime = Math.max((v.duration || 0) - 0.05, 0)
  }

  const handleLoadedMetadata = () => {
    replay()
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#020204' }}
    >
      <video
        ref={videoRef}
        src="/pitch-video.mp4"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </section>
  )
}
