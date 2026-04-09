import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

// Unsplash free-use furniture & interior design photos
const photos = [
  {
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    label: 'Modern Living',
    speed: 0,
  },
  {
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    label: 'Premium Comfort',
    speed: -30,
  },
  {
    url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    label: 'Elegant Spaces',
    speed: 20,
  },
  {
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    label: 'Clean Design',
    speed: -15,
  },
]

function ParallaxCard({ photo, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [photo.speed * 2, photo.speed * -2])
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl group cursor-default"
      style={{ aspectRatio: index % 2 === 0 ? '3/4' : '2/3' }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
    >
      {/* Parallax image */}
      <motion.div
        style={{ y }}
        className="absolute inset-[-10%] w-[120%] h-[120%]"
      >
        <img
          src={photo.url}
          alt={photo.label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Gradient overlays — light touch, keep photo visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shimmer border */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-brand-500/40 transition-all duration-500" />

      {/* Label */}
      <div className="absolute bottom-4 left-4 right-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-white/90 text-xs font-semibold tracking-wide">{photo.label}</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function FurnitureShowcase() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-[#0a0a0f]">
      {/* Moving background texture */}
      <motion.div
        style={{
          y: bgY,
          backgroundImage:
            'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        className="absolute inset-[-5%] w-[110%] h-[110%] opacity-[0.03] pointer-events-none"
      />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-16"
        >
          <p className="text-white/30 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            The spaces your clients dream of
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Built for brands that{' '}
            <span className="text-gradient">inspire</span>
          </h2>
          <p className="text-white/40 mt-4 text-lg max-w-xl mx-auto">
            Your CRM should match the quality of what you sell.
          </p>
        </motion.div>

        {/* Masonry-style photo grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          {photos.map((photo, i) => (
            <ParallaxCard key={photo.label} photo={photo} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-white/25 text-sm italic max-w-lg mx-auto">
            "From the showroom floor to the delivery truck — one system to manage it all."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
