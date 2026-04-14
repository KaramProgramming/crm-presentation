import { useEffect, useRef } from 'react'
import scrollIntroVideo from '../../Generated video 1.mp4'

const TARGET_DURATION_SECONDS = 4.8

export default function VideoIntro() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const hasPlayedRef = useRef(false)
  const hasLeftIntroRef = useRef(false)

  const getPlaybackRate = (video) => {
    const duration = video.duration || TARGET_DURATION_SECONDS
    return Math.max(duration / TARGET_DURATION_SECONDS, 1)
  }

  const playIntro = () => {
    const video = videoRef.current
    if (!video || video.readyState < 1) {
      return
    }

    video.pause()
    video.playbackRate = getPlaybackRate(video)
    video.currentTime = 0
    video.play().catch(() => {})
  }

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!hasPlayedRef.current || !entry) {
          return
        }

        if (entry.intersectionRatio < 0.35) {
          hasLeftIntroRef.current = true
        }

        if (entry.intersectionRatio > 0.85 && hasLeftIntroRef.current) {
          hasLeftIntroRef.current = false
          playIntro()
        }
      },
      {
        threshold: [0, 0.35, 0.85],
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const handleLoadedMetadata = (event) => {
    const video = event.currentTarget
    video.playbackRate = getPlaybackRate(video)

    if (hasPlayedRef.current) {
      return
    }

    hasPlayedRef.current = true
    playIntro()
  }

  const handleEnded = (event) => {
    const video = event.currentTarget
    video.pause()
    video.currentTime = Math.max((video.duration || 0) - 0.05, 0)
  }

  return (
    <section ref={sectionRef} className="intro-stage relative overflow-hidden bg-[#020204]">
      <video
        ref={videoRef}
        src={scrollIntroVideo}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="intro-video absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/8" />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(7,7,11,0.02) 0%, rgba(7,7,11,0.02) 55%, rgba(7,7,11,0.22) 100%)',
        }}
      />
    </section>
  )
}
