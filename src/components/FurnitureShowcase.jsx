import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  {
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    label: 'Modern Living',
    aspect: '3/4',
  },
  {
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    label: 'Premium Comfort',
    aspect: '2/3',
  },
  {
    url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    label: 'Elegant Spaces',
    aspect: '3/4',
  },
  {
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    label: 'Clean Design',
    aspect: '2/3',
  },
]

export default function FurnitureShowcase() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const gridRef    = useRef(null)

  useGSAP(() => {
    /* Title parallax + reveal */
    gsap.fromTo(
      titleRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      }
    )

    /* Cards stagger up */
    const cards = gridRef.current.querySelectorAll('.photo-card')
    gsap.fromTo(
      cards,
      { y: 70, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.11, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      }
    )

    /* Subtle parallax on each photo's inner image */
    cards.forEach((card) => {
      const img = card.querySelector('.photo-inner')
      gsap.to(img, {
        y: '18%',
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-[#180e04]">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,164,58,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,164,58,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Orbs */}
      <div className="absolute top-1/4 left-0 w-[480px] h-[480px] bg-[#d4a43a]/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[420px] h-[420px] bg-[#b8860b]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ opacity: 0 }}>
            The spaces your clients dream of
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight" style={{ opacity: 0 }}>
            Built for brands that{' '}
            <span className="text-gradient">inspire</span>
          </h2>
          <p className="text-white/38 text-lg max-w-md mx-auto" style={{ opacity: 0 }}>
            Your CRM should match the quality of what you sell.
          </p>
        </div>

        {/* Photo grid */}
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {photos.map((photo, i) => (
            <div
              key={photo.label}
              className="photo-card relative overflow-hidden rounded-2xl group cursor-default shine"
              style={{ aspectRatio: photo.aspect, opacity: 0 }}
            >
              {/* Parallax image */}
              <div className="photo-inner absolute inset-[-12%] w-[124%] h-[124%] will-change-transform">
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1208]/80 via-transparent to-transparent transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[#d4a43a]/0 group-hover:bg-[#d4a43a]/8 transition-all duration-500" />

              {/* Ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/8 group-hover:ring-[#d4a43a]/30 transition-all duration-500" />

              {/* Label */}
              <div className="absolute bottom-4 left-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.1] backdrop-blur-md rounded-full border border-white/12">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4a43a] animate-pulse" />
                  <span className="text-white/85 text-xs font-semibold tracking-wide">{photo.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <p className="text-center text-white/20 text-sm italic mt-14 max-w-lg mx-auto">
          "From the showroom floor to the delivery truck — one system to manage it all."
        </p>
      </div>
    </section>
  )
}
