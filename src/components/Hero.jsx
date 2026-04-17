import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, TrendingUp, Users, Package, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function MagneticBtn({ children, href, className }) {
  const wrapRef = useRef(null)
  const innerRef = useRef(null)

  const onMove = (event) => {
    const { left, top, width, height } = wrapRef.current.getBoundingClientRect()
    const x = (event.clientX - left - width / 2) * 0.22
    const y = (event.clientY - top - height / 2) * 0.22
    gsap.to(innerRef.current, { x, y, duration: 0.45, ease: 'power2.out' })
  }

  const onLeave = () => {
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.85, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <a ref={innerRef} href={href} className={className}>
        {children}
      </a>
    </div>
  )
}

function SplitWords({ text }) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <span key={index} className="reveal-wrapper mr-[0.24em]">
          <span className="reveal-word">{word}</span>
        </span>
      ))}
    </>
  )
}

const metricCards = [
  { icon: TrendingUp, label: 'Revenue Growth', value: '+34%', sub: 'vs. prior month', color: '#d4a43a' },
  { icon: Users, label: 'New Clients', value: '128', sub: 'this quarter', color: '#34d399' },
  { icon: Package, label: 'Active Orders', value: '47', sub: 'in progress', color: '#cd7f32' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const badgeRef = useRef(null)
  const h1Ref = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const proofRef = useRef(null)
  const cardRef = useRef(null)
  const watermarkRef = useRef(null)

  useGSAP(() => {
    const metricCardEls = sectionRef.current.querySelectorAll('.metric-card')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(watermarkRef.current,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
      0
    )
    .fromTo(badgeRef.current,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75 },
      0.2
    )
    .fromTo(h1Ref.current.querySelectorAll('.reveal-word'),
      { y: 100, opacity: 0, skewY: 3 },
      { y: 0, opacity: 1, skewY: 0, duration: 0.9, stagger: 0.04 },
      0.45
    )
    .fromTo(subRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      0.85
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65 },
      1.0
    )
    .fromTo(proofRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55 },
      1.14
    )
    .fromTo(cardRef.current,
      { x: 80, opacity: 0, scale: 0.94 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' },
      0.5
    )
    .fromTo(metricCardEls,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, stagger: 0.11, ease: 'power3.out' },
      0.72
    )

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(bgRef.current, { y: self.progress * 80, ease: 'none' })
        gsap.set(watermarkRef.current, { y: self.progress * 35, ease: 'none' })
      },
    })

    gsap.to(metricCardEls, {
      y: -9,
      duration: 3.4,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.95, from: 'start' },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Parallax bg image */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform pointer-events-none scale-[1.14]">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layered dark overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,5,2,0.96) 0%, rgba(12,8,4,0.78) 45%, rgba(8,5,2,0.45) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 20% 50%, rgba(28,18,8,0.88) 0%, transparent 65%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-64" style={{ background: 'linear-gradient(to top, #180e04, transparent)' }} />
      <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #180e04 0%, transparent 100%)' }} />

      {/* Subtle gold grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,164,58,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,164,58,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: 0.028,
        }}
      />

      {/* Atmosphere orbs */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#d4a43a]/8 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 h-[380px] w-[380px] rounded-full bg-[#8b6508]/7 blur-[130px] pointer-events-none" />

      {/* Giant watermark */}
      <div
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span
          className="font-display font-black tracking-tighter text-transparent"
          style={{
            fontSize: 'clamp(180px, 28vw, 420px)',
            lineHeight: 1,
            WebkitTextStroke: '1px rgba(212,164,58,0.045)',
          }}
        >
          CRM
        </span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:px-10 lg:grid-cols-[1fr_400px]">
        {/* LEFT — Copy */}
        <div>
          {/* Badge */}
          <div
            ref={badgeRef}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-xs font-semibold tracking-widest uppercase text-[#e8c87a]"
            style={{ background: 'rgba(212,164,58,0.07)', borderColor: 'rgba(212,164,58,0.22)', opacity: 0 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a43a] animate-pulse" />
            CRM Built for Furniture Companies
          </div>

          {/* Headline */}
          <h1
            ref={h1Ref}
            className="mb-8 font-display font-black leading-[1.01] tracking-tight text-white"
            style={{ fontSize: 'clamp(44px, 6.5vw, 88px)' }}
          >
            <SplitWords text="The CRM that" />
            <br />
            <span className="reveal-wrapper mr-[0.24em]">
              <span className="reveal-word text-gradient">understands</span>
            </span>
            <br />
            <SplitWords text="your furniture" />
            <span className="reveal-wrapper">
              <span className="reveal-word"> business</span>
            </span>
          </h1>

          {/* Thin gold rule */}
          <div className="divider-gold mb-8 w-32" />

          <p
            ref={subRef}
            className="mb-10 max-w-[540px] text-lg leading-relaxed text-white/48 md:text-xl"
            style={{ opacity: 0 }}
          >
            Manage customers, orders, projects and analytics in one platform designed
            exclusively for furniture and interior design companies.
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row" style={{ opacity: 0 }}>
            <MagneticBtn href="#cta" className="btn-primary group">
              Request a Free Demo
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1.5" />
            </MagneticBtn>
            <a href="#features" className="btn-secondary">
              Explore Features
            </a>
          </div>

          {/* Social proof */}
          <div ref={proofRef} className="mt-12 flex items-center gap-6" style={{ opacity: 0 }}>
            <div className="flex -space-x-3">
              {['A', 'B', 'C', 'D'].map((letter, index) => (
                <div
                  key={index}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#180e04] text-xs font-black text-white shadow-lg"
                  style={{ background: `hsl(${30 + index * 20}, 60%, 42%)` }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="pl-1">
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="#d4a43a" className="text-[#d4a43a]" />
                ))}
                <span className="text-[#d4a43a] text-xs font-bold ml-1">5.0</span>
              </div>
              <p className="text-sm text-white/35">Used by leading furniture companies</p>
            </div>
          </div>
        </div>

        {/* RIGHT — Dashboard card */}
        <div className="hidden flex-col gap-3 lg:flex">
          {/* Main dashboard card */}
          <div
            ref={cardRef}
            className="gradient-border-card overflow-hidden"
            style={{ opacity: 0, boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(212,164,58,0.04)' }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="ml-2 flex h-5 flex-1 items-center rounded-md px-2.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="font-mono text-[10px] text-white/24">yourcrm.app/dashboard</span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/26">Dashboard Overview</p>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Active Clients', value: '1,284', delta: '+12%' },
                  { label: 'Open Deals', value: '€94K', delta: '+8%' },
                  { label: 'Open Orders', value: '36', delta: '+5%' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="mb-1 text-[9px] text-white/28">{stat.label}</p>
                    <p className="text-sm font-black text-white">{stat.value}</p>
                    <p className="text-[10px] font-bold text-[#d4a43a]">{stat.delta}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[10px] text-white/26">Revenue — Last 6 months</p>
                  <span className="text-[10px] text-[#d4a43a] font-bold">+94%</span>
                </div>
                <div className="flex h-12 items-end gap-1.5">
                  {[38, 62, 50, 72, 57, 94].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${height}%`,
                        background: index === 5
                          ? 'linear-gradient(to top, #8b6508, #f0d078)'
                          : index >= 4
                          ? 'rgba(212,164,58,0.28)'
                          : 'rgba(212,164,58,0.12)',
                      }}
                    />
                  ))}
                </div>
                <div className="mt-1.5 flex justify-between">
                  {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'].map((m) => (
                    <span key={m} className="text-[9px] text-white/20">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Metric cards */}
          {metricCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.label}
                className="metric-card luxury-card shine flex cursor-default items-center gap-4 p-4"
                style={{ opacity: 0 }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${card.color}14`, border: `1px solid ${card.color}26` }}
                >
                  <Icon size={16} style={{ color: card.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-white/36 mb-0.5">{card.label}</p>
                  <p className="text-xl font-black leading-tight text-white">{card.value}</p>
                  <p className="text-[10px] text-white/26">{card.sub}</p>
                </div>
                <div className="w-px h-8 rule-gold-v" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5" style={{ opacity: 0.22 }}>
        <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white">Scroll</span>
        <div className="h-12 w-px" style={{ background: 'linear-gradient(to bottom, rgba(212,164,58,0.5), transparent)' }} />
      </div>
    </section>
  )
}
