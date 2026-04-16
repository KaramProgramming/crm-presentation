import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, TrendingUp, Users, Package } from 'lucide-react'

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
  const words = text.split(' ')

  return (
    <>
      {words.map((word, index) => (
        <span key={index} className="reveal-wrapper mr-[0.25em]">
          <span className="reveal-word">{word}</span>
        </span>
      ))}
    </>
  )
}

const metricCards = [
  { icon: TrendingUp, label: 'Monthly Revenue', value: '+34%', sub: 'vs previous month', color: '#d4a43a' },
  { icon: Users, label: 'New Customers', value: '128', sub: 'this quarter', color: '#34d399' },
  { icon: Package, label: 'Active Projects', value: '47', sub: 'in progress', color: '#cd7f32' },
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

  useGSAP(() => {
    const metricCardEls = sectionRef.current.querySelectorAll('.metric-card')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    })

    tl.fromTo(
      badgeRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
    )
      .fromTo(
        h1Ref.current.querySelectorAll('.reveal-word'),
        { y: 90, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.045, ease: 'power3.out' },
        '-=0.35'
      )
      .fromTo(
        subRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        '-=0.35'
      )
      .fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        '-=0.25'
      )
      .fromTo(
        proofRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.15'
      )
      .fromTo(
        cardRef.current,
        { x: 70, opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' },
        '-=1.0'
      )
      .fromTo(
        metricCardEls,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
        '-=0.7'
      )

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(bgRef.current, { y: self.progress * 130, ease: 'none' })
      },
    })

    gsap.to(metricCardEls, {
      y: -8,
      duration: 3.2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.9, from: 'start' },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform pointer-events-none scale-[1.12]">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[#1c1208]/60" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(95deg, rgba(7,7,11,0.88) 0%, rgba(7,7,11,0.5) 52%, rgba(7,7,11,0.12) 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-56" style={{ background: 'linear-gradient(to top, #180e04, transparent)' }} />
      <div className="absolute inset-x-0 top-0 h-28" style={{ background: 'linear-gradient(to bottom, #180e04, transparent)' }} />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,164,58,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,164,58,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-[#d4a43a]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-[#b8860b]/8 blur-[110px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:px-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div
            ref={badgeRef}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d4a43a]/20 bg-[#d4a43a]/8 px-4 py-2 text-sm font-medium text-[#e8c87a]"
            style={{ opacity: 0 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#d4a43a] animate-pulse" />
            CRM Built for Furniture Companies
          </div>

          <h1
            ref={h1Ref}
            className="mb-7 text-5xl font-black leading-[1.04] tracking-tight md:text-6xl lg:text-[76px]"
          >
            <SplitWords text="The CRM that" />
            <br />
            <span className="reveal-wrapper mr-[0.25em]">
              <span className="reveal-word text-gradient">understands</span>
            </span>
            <br />
            <SplitWords text="your furniture" />
            <span className="reveal-wrapper">
              <span className="reveal-word"> business</span>
            </span>
          </h1>

          <p
            ref={subRef}
            className="mb-10 max-w-[520px] text-lg leading-relaxed text-white/50 md:text-xl"
            style={{ opacity: 0 }}
          >
            Manage customers, orders, projects and analytics in one platform designed
            exclusively for furniture and interior design companies.
          </p>

          <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row" style={{ opacity: 0 }}>
            <MagneticBtn href="#cta" className="btn-primary">
              Request a Free Demo
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </MagneticBtn>

            <a href="#features" className="btn-secondary">
              Explore Features
            </a>
          </div>

          <div ref={proofRef} className="mt-12 flex items-center gap-6" style={{ opacity: 0 }}>
            <div className="flex -space-x-2.5">
              {['A', 'B', 'C', 'D'].map((letter, index) => (
                <div
                  key={index}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#180e04] text-xs font-bold text-white"
                  style={{ background: `hsl(${35 + index * 18}, 65%, 45%)` }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <div className="text-sm tracking-wide text-yellow-400">5.0 / 5</div>
              <p className="mt-0.5 text-sm text-white/38">Used by leading furniture companies</p>
            </div>
          </div>
        </div>

        <div className="hidden flex-col gap-3 lg:flex">
          <div
            ref={cardRef}
            className="glass shine overflow-hidden rounded-2xl border border-white/8 shadow-2xl"
            style={{ opacity: 0, boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.025] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/65" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/65" />
                <span className="h-3 w-3 rounded-full bg-green-500/65" />
              </div>
              <div className="ml-2 flex h-5 flex-1 items-center rounded-md bg-white/[0.045] px-2.5">
                <span className="font-mono text-xs text-white/28">furnicrm.app/dashboard</span>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/28">Dashboard Overview</p>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Active Clients', value: '1,284', delta: '+12%' },
                  { label: 'Open Deals', value: 'EUR94K', delta: '+8%' },
                  { label: 'Open Orders', value: '36', delta: '+5%' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-2.5">
                    <p className="mb-1 text-[10px] text-white/30">{stat.label}</p>
                    <p className="text-sm font-black text-white">{stat.value}</p>
                    <p className="text-[10px] font-bold text-emerald-400">{stat.delta}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.025] p-3">
                <p className="mb-2.5 text-[10px] text-white/28">Revenue - Last 6 months</p>
                <div className="flex h-11 items-end gap-1.5">
                  {[38, 62, 50, 72, 57, 88].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${height}%`,
                        background: index === 5
                          ? 'linear-gradient(to top, #b8860b, #d4a43a)'
                          : 'rgba(212,164,58,0.18)',
                      }}
                    />
                  ))}
                </div>
                <div className="mt-1.5 flex justify-between">
                  {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'].map((month) => (
                    <span key={month} className="text-[9px] text-white/22">{month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {metricCards.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.label}
                className="metric-card glass glass-hover shine flex cursor-default items-center gap-3.5 rounded-xl border border-white/[0.07] p-4"
                style={{ opacity: 0 }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}
                >
                  <Icon size={16} style={{ color: card.color }} />
                </div>
                <div>
                  <p className="text-xs text-white/38">{card.label}</p>
                  <p className="text-lg font-black leading-tight text-white">{card.value}</p>
                  <p className="text-xs text-white/28">{card.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 opacity-25">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-white/35 to-transparent" />
      </div>
    </section>
  )
}
