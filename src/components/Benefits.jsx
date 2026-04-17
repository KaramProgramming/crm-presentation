import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { DollarSign, Clock, TrendingUp, Target, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    Icon: TrendingUp, value: 34, suffix: '%', label: 'Revenue Increase',
    sub: 'Average growth in close rate within the first 6 months.',
    color: '#d4a43a', border: 'rgba(212,164,58,0.18)', bg: 'rgba(212,164,58,0.07)',
    glow: 'rgba(212,164,58,0.12)',
  },
  {
    Icon: Clock, value: 12, suffix: 'h', label: 'Saved Per Week',
    sub: 'Per sales rep — no more manual data entry or chasing updates.',
    color: '#e8c87a', border: 'rgba(232,200,122,0.18)', bg: 'rgba(232,200,122,0.07)',
    glow: 'rgba(232,200,122,0.10)',
  },
  {
    Icon: DollarSign, value: 48, suffix: 'K', label: 'Annual ROI',
    sub: 'In recovered leads, faster deal cycles and reduced admin cost.',
    color: '#c99554', border: 'rgba(201,149,84,0.18)', bg: 'rgba(201,149,84,0.07)',
    glow: 'rgba(201,149,84,0.10)',
  },
  {
    Icon: Target, value: 3, suffix: '×', label: 'Faster Closing',
    sub: 'Structured pipelines cut negotiation cycles dramatically.',
    color: '#b8860b', border: 'rgba(184,134,11,0.18)', bg: 'rgba(184,134,11,0.07)',
    glow: 'rgba(184,134,11,0.10)',
  },
]

const comparisons = [
  { area: 'Customer onboarding', before: 'Manual entry across tools', after: 'Single profile, instant setup', saving: '−40 min each' },
  { area: 'Lead follow-up', before: '30–40% leads forgotten', after: '100% tracked & reminded', saving: '+€12K / mo' },
  { area: 'Monthly reporting', before: '4–6 hours manual work', after: 'Live dashboard, always fresh', saving: '−5h / month' },
  { area: 'Onboarding new reps', before: '3–4 weeks to get up to speed', after: 'Full history visible on day one', saving: '−2 weeks' },
  { area: 'Re-engagement', before: 'Manually checking old notes', after: 'Automated follow-up reminders', saving: '+23% repeat' },
]

function StatCard({ stat }) {
  const cardRef = useRef(null)
  const valRef = useRef(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 87%',
      once: true,
      onEnter: () => {
        const obj = { n: 0 }
        gsap.to(obj, {
          n: stat.value,
          duration: 2.4,
          ease: 'power2.out',
          onUpdate: () => {
            if (valRef.current) valRef.current.textContent = Math.round(obj.n) + stat.suffix
          },
        })
      },
    })
  })

  return (
    <div
      ref={cardRef}
      className="stat-card group relative rounded-2xl p-7 overflow-hidden shine"
      style={{ background: stat.bg, border: `1px solid ${stat.border}`, opacity: 0 }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 70% 60% at 20% 80%, ${stat.glow}, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105"
        style={{ background: stat.bg, border: `1px solid ${stat.border}` }}
      >
        <stat.Icon size={20} style={{ color: stat.color }} />
      </div>

      {/* Giant stat number */}
      <div
        ref={valRef}
        className="luxury-stat-num relative mb-1"
        style={{ fontSize: 'clamp(56px, 8vw, 80px)', color: stat.color, opacity: 0.95 }}
      >
        0{stat.suffix}
      </div>

      {/* Gold underline rule */}
      <div className="mb-4 w-8 h-px" style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />

      <p className="relative text-white font-bold text-base mb-2">{stat.label}</p>
      <p className="relative text-white/38 text-sm leading-relaxed">{stat.sub}</p>
    </div>
  )
}

export default function Benefits() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const statsRef = useRef(null)
  const tableRef = useRef(null)
  const summaryRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current.children,
      { y: 44, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      }
    )

    gsap.fromTo(
      statsRef.current.querySelectorAll('.stat-card'),
      { y: 55, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
      }
    )

    gsap.fromTo(
      tableRef.current.querySelectorAll('.comparison-card'),
      { y: 30, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: tableRef.current, start: 'top 80%' },
      }
    )

    gsap.fromTo(summaryRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: summaryRef.current, start: 'top 90%' } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="benefits" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#d4a43a]/4 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[#e8c87a] text-xs font-semibold tracking-widest uppercase mb-7"
            style={{ background: 'rgba(232,200,122,0.07)', border: '1px solid rgba(232,200,122,0.16)', opacity: 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a43a]" />
            Real Business Impact
          </div>

          <h2 className="font-display text-4xl md:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.04]" style={{ opacity: 0 }}>
            More revenue. More time.
            <br />
            <span className="text-gradient">Less chaos.</span>
          </h2>

          <p className="text-white/42 text-lg max-w-2xl mx-auto leading-relaxed" style={{ opacity: 0 }}>
            Average results reported by furniture companies that switched from spreadsheets to a dedicated CRM workflow.
          </p>
        </div>

        {/* Stat cards */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => <StatCard key={s.label} stat={s} />)}
        </div>

        {/* Before / After comparisons */}
        <div className="mb-8">
          <p className="text-center text-white/28 text-[11px] font-semibold uppercase tracking-[0.22em] mb-6">
            Day-to-day impact
          </p>

          <div ref={tableRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisons.map((row) => (
              <div
                key={row.area}
                className="comparison-card group rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{ background: 'rgba(255,255,255,0.024)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
              >
                {/* Area label */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38 mb-4">{row.area}</p>

                {/* Before */}
                <div
                  className="flex items-start gap-2.5 mb-2 p-3 rounded-xl"
                  style={{ background: 'rgba(100,60,20,0.18)', border: '1px solid rgba(160,110,50,0.14)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-white/20" />
                  <p className="text-white/32 text-sm line-through decoration-white/15">{row.before}</p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center my-1.5">
                  <div className="w-px h-4" style={{ background: 'linear-gradient(to bottom, rgba(212,164,58,0.2), rgba(212,164,58,0.5))' }} />
                </div>

                {/* After */}
                <div
                  className="flex items-start gap-2.5 p-3 rounded-xl"
                  style={{ background: 'rgba(212,164,58,0.08)', border: '1px solid rgba(212,164,58,0.16)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#d4a43a]" />
                  <p className="text-[#edd990] text-sm font-semibold">{row.after}</p>
                </div>

                {/* Saving badge */}
                <div className="mt-4 flex justify-end">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-[#d4a43a] text-[11px] font-bold rounded-full"
                    style={{ background: 'rgba(212,164,58,0.08)', border: '1px solid rgba(212,164,58,0.18)' }}
                  >
                    <Zap size={9} />
                    {row.saving}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div
          ref={summaryRef}
          className="text-center py-8 px-6 rounded-2xl"
          style={{ background: 'rgba(212,164,58,0.04)', border: '1px solid rgba(212,164,58,0.1)' }}
        >
          <p className="text-white/35 text-sm">
            A team of{' '}
            <span className="text-white/60 font-semibold">5 salespeople</span> saves on average{' '}
            <span className="text-[#e8c87a] font-bold text-base">60+ hours / week</span>
            {' '}— redirected to actual selling.
          </p>
        </div>
      </div>
    </section>
  )
}
