import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function VideoIntro({ onEnter }) {
  const videoRef = useRef(null)
  const [ended, setEnded] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {})
  }, [])

  function handleEnded() {
    setEnded(true)
  }

  function handleEnter() {
    setVisible(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
    onEnter?.()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          {/* Video — no overlay during playback for full quality */}
          <video
            ref={videoRef}
            src="/showroom-intro.mp4"
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            onEnded={handleEnded}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          />

          {/* End-of-video text + CTA — only appears after video finishes */}
          <AnimatePresence>
            {ended && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(10,10,15,0.45) 0%, rgba(10,10,15,0.80) 100%)',
                }}
              >
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600/15 border border-brand-500/25 text-brand-300 text-sm font-medium mb-8"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                  The CRM Built for Furniture Businesses
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white mb-6 max-w-4xl"
                >
                  Your Showroom Deserves{' '}
                  <span className="text-gradient">More Than</span>
                  <br />
                  a{' '}
                  <span className="text-gradient">Spreadsheet.</span>
                </motion.h1>

                {/* Subline */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.7 }}
                  className="text-lg md:text-xl text-white/60 max-w-xl mb-12 leading-relaxed"
                >
                  Clients, orders, projects and analytics — one platform
                  built exclusively for furniture companies.
                </motion.p>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEnter}
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl shadow-2xl shadow-brand-900/60 transition-all duration-200 text-lg"
                >
                  Explore the Platform
                  <ArrowDown
                    size={20}
                    className="group-hover:translate-y-1 transition-transform"
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
