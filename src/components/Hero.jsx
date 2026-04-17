import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Building2, CheckCircle2, Package, TrendingUp } from 'lucide-react'
import showroomImage from '../../1775912781689-bx2uwxp4g3h.jpg'

gsap.registerPlugin(ScrollTrigger)

function MagneticBtn({ children, href, className }) {
  const wrapRef = useRef(null)
  const innerRef = useRef(null)

  const onMove = (event) => {
    const { left, top, width, height } = wrapRef.current.getBoundingClientRect()
    const x = (event.clientX - left - width / 2) * 0.14
    const y = (event.clientY - top - height / 2) * 0.14

    gsap.to(innerRef.current, { x, y, duration: 0.35, ease: 'power2.out' })
  }

  const onLeave = () => {
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' })
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

const proofCards = [
  {
    icon: Building2,
    title: 'Showroom to delivery',
    body: 'One clear client timeline for sales, design, operations, and after-sales follow-up.',
  },
  {
    icon: Package,
    title: 'Catalog-aware quoting',
    body: 'Products, finishes, variants, and custom requests stay linked inside every quote and order.',
  },
  {
    icon: TrendingUp,
    title: 'Executive visibility',
    body: 'Revenue, stalled deals, and team workload become visible without chasing updates.',
  },
]

const previewStats = [
  { label: 'Open quotations', value: '18' },
  { label: 'Projects in delivery', value: '06' },
  { label: 'Follow-ups today', value: '11' },
]

const workflowRows = [
  {
    step: '01',
    title: 'New showroom enquiry',
    detail: 'Villa Orizzonte requested a bespoke living room proposal.',
    status: 'Quote in review',
  },
  {
    step: '02',
    title: 'Premium quotation tracked',
    detail: 'Materials, finishes, and pricing remain attached to the client record.',
    status: 'Awaiting approval',
  },
  {
    step: '03',
    title: 'Delivery and follow-up planned',
    detail: 'Sales, logistics, and management see the same operating view.',
    status: 'Ready to schedule',
  },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const photoLeftRef = useRef(null)
  const photoRightRef = useRef(null)
  const lightRef = useRef(null)
  const badgeRef = useRef(null)
  const h1Ref = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const proofRef = useRef(null)
  const cardRef = useRef(null)
  const watermarkRef = useRef(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const proofCardEls = sectionRef.current.querySelectorAll('.hero-proof-card')
    const workflowEls = sectionRef.current.querySelectorAll('.hero-workflow-row')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      watermarkRef.current,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
      0
    )
      .fromTo(
        badgeRef.current,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.16
      )
      .fromTo(
        h1Ref.current.querySelectorAll('.reveal-word'),
        { y: 92, opacity: 0, skewY: 2 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.86, stagger: 0.04 },
        0.34
      )
      .fromTo(
        subRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.66 },
        0.76
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.64 },
        0.9
      )
      .fromTo(
        proofCardEls,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        1.02
      )
      .fromTo(
        cardRef.current,
        { x: 72, opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, duration: 1.05, ease: 'expo.out' },
        0.48
      )
      .fromTo(
        workflowEls,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.58, stagger: 0.08 },
        0.94
      )

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(bgRef.current, { y: self.progress * 42, ease: 'none' })
        gsap.set(photoLeftRef.current, { y: self.progress * 32, ease: 'none' })
        gsap.set(photoRightRef.current, { y: self.progress * -36, ease: 'none' })
        gsap.set(lightRef.current, { y: self.progress * 26, ease: 'none' })
        gsap.set(watermarkRef.current, { y: self.progress * 24, ease: 'none' })
      },
    })

    if (prefersReducedMotion) {
      return
    }

    gsap.to(photoLeftRef.current, {
      xPercent: 5,
      yPercent: 6,
      rotation: -7.5,
      duration: 18,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    gsap.to(photoRightRef.current, {
      xPercent: -5,
      yPercent: -4,
      rotation: 7.5,
      duration: 22,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    gsap.to(lightRef.current, {
      opacity: 0.42,
      duration: 14,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform pointer-events-none scale-[1.06]">
        <img
          src={showroomImage}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(5, 5, 5, 0.92) 0%, rgba(8, 8, 8, 0.78) 34%, rgba(10, 8, 7, 0.48) 100%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 118% 84% at 18% 48%, rgba(6, 6, 6, 0.92) 0%, rgba(8, 7, 6, 0.56) 42%, transparent 68%)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-64"
        style={{ background: 'linear-gradient(to top, rgba(4, 4, 4, 0.92), transparent)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-36"
        style={{ background: 'linear-gradient(to bottom, rgba(4, 4, 4, 0.88), transparent)' }}
      />

      <div
        ref={lightRef}
        className="absolute inset-0 luxury-hero-light pointer-events-none"
      />

      <div
        ref={photoLeftRef}
        className="absolute left-[-5%] top-[18%] hidden lg:block h-[54vh] w-[22vw] overflow-hidden rounded-[34px] luxury-hero-photo-panel luxury-hero-photo-panel--left"
      >
        <img
          src={showroomImage}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: '16% center' }}
        />
      </div>

      <div
        ref={photoRightRef}
        className="absolute right-[2%] top-[10%] hidden xl:block h-[58vh] w-[20vw] overflow-hidden rounded-[34px] luxury-hero-photo-panel luxury-hero-photo-panel--right"
      >
        <img
          src={showroomImage}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: '82% center' }}
        />
      </div>

      <div
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span
          className="font-display font-bold tracking-[0.22em] text-transparent"
          style={{
            fontSize: 'clamp(110px, 16vw, 260px)',
            lineHeight: 1,
            WebkitTextStroke: '1px rgba(255,255,255,0.045)',
          }}
        >
          ITALIA
        </span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:px-10 lg:grid-cols-[minmax(0,1fr)_460px]">
        <div className="max-w-3xl">
          <div
            ref={badgeRef}
            className="mb-8 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e8c87a]"
            style={{ background: 'rgba(212,164,58,0.08)', borderColor: 'rgba(212,164,58,0.24)', opacity: 0 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#d4a43a]" />
            Designed for furniture companies in Italy
          </div>

          <h1
            ref={h1Ref}
            className="mb-8 font-display font-black leading-[0.98] tracking-tight text-white"
            style={{ fontSize: 'clamp(48px, 6.4vw, 92px)' }}
          >
            <SplitWords text="The CRM for" />
            <br />
            <span className="reveal-wrapper mr-[0.24em]">
              <span className="reveal-word text-gradient">premium furniture</span>
            </span>
            <br />
            <SplitWords text="sales and delivery" />
          </h1>

          <div className="divider-gold mb-8 w-40" />

          <p
            ref={subRef}
            className="mb-10 max-w-[640px] text-lg leading-relaxed text-white/62 md:text-[22px]"
            style={{ opacity: 0 }}
          >
            From the first showroom enquiry to the final installation, keep every client,
            quote, order, and follow-up inside one elegant system designed around how
            furniture companies actually operate.
          </p>

          <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row sm:items-center" style={{ opacity: 0 }}>
            <MagneticBtn href="#cta" className="btn-primary group">
              Book a Private Demo
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </MagneticBtn>
            <a href="#demo" className="btn-secondary">
              See the Product Flow
            </a>
          </div>

          <p className="mt-4 text-sm text-white/42">
            Configured around your sales process, catalog logic, and team structure.
          </p>

          <div ref={proofRef} className="mt-12 grid gap-4 md:grid-cols-3">
            {proofCards.map((card) => {
              const Icon = card.icon

              return (
                <div
                  key={card.title}
                  className="hero-proof-card rounded-[22px] p-5"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ background: 'rgba(212,164,58,0.08)', border: '1px solid rgba(212,164,58,0.2)' }}
                  >
                    <Icon size={18} className="text-[#d4a43a]" />
                  </div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/30">
                    {card.title}
                  </p>
                  <p className="text-sm leading-relaxed text-white/62">
                    {card.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="hidden lg:block">
          <div
            ref={cardRef}
            className="gradient-border-card overflow-hidden"
            style={{
              opacity: 0,
              background: 'rgba(14, 10, 7, 0.76)',
              boxShadow: '0 44px 120px rgba(0, 0, 0, 0.58), 0 0 0 1px rgba(255, 255, 255, 0.03)',
            }}
          >
            <div className="relative h-[250px] overflow-hidden">
              <img
                src={showroomImage}
                alt="Premium furniture showroom"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120b06] via-[#120b06]/38 to-transparent" />
              <div className="absolute left-5 top-5">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78"
                  style={{ background: 'rgba(12, 10, 8, 0.62)', border: '1px solid rgba(255, 255, 255, 0.12)' }}
                >
                  Illustrative CRM view
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e8c87a]">
                  Premium retail workflow
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/72">
                  Quotations, bespoke projects, and after-sales follow-up in one calm operating view.
                </p>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div className="grid grid-cols-3 gap-3">
                {previewStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl px-4 py-3"
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.07)' }}
                  >
                    <p className="mb-1 text-[11px] uppercase tracking-[0.16em] text-white/28">{stat.label}</p>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div
                className="rounded-[24px] p-4"
                style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Today&apos;s operating view</p>
                    <p className="text-xs text-white/32">A sample of how the CRM keeps the team aligned.</p>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e8c87a]">
                    Configured sample
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {workflowRows.map((row) => (
                    <div
                      key={row.step}
                      className="hero-workflow-row flex items-center gap-3 rounded-2xl p-3"
                      style={{ background: 'rgba(255, 248, 235, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xs font-semibold text-[#e8c87a]"
                        style={{ background: 'rgba(212, 164, 58, 0.08)', border: '1px solid rgba(212, 164, 58, 0.18)' }}
                      >
                        {row.step}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">{row.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-white/40">{row.detail}</p>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold text-[#d9c080]"
                        style={{ background: 'rgba(212, 164, 58, 0.08)', border: '1px solid rgba(212, 164, 58, 0.18)' }}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="flex items-start gap-3 rounded-[22px] px-4 py-4"
                style={{ background: 'rgba(212, 164, 58, 0.08)', border: '1px solid rgba(212, 164, 58, 0.18)' }}
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#d4a43a]" />
                <p className="text-sm leading-relaxed text-white/72">
                  Adapted to your showroom model, product structure, pricing rules, and team responsibilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
        style={{ opacity: 0.22 }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">Discover</span>
        <div className="h-12 w-px" style={{ background: 'linear-gradient(to bottom, rgba(212,164,58,0.5), transparent)' }} />
      </div>
    </section>
  )
}
