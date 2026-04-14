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
    color: '#818cf8', border: 'rgba(99,102,241,0.18)', bg: 'rgba(99,102,241,0.07)',
  },
  {
    Icon: Clock, value: 12, suffix: 'h', label: 'Saved Per Week',
    sub: 'Per sales rep — no more manual data entry or chasing updates.',
    color: '#34d399', border: 'rgba(52,211,153,0.18)', bg: 'rgba(52,211,153,0.07)',
  },
  {
    Icon: DollarSign, value: 48, suffix: 'K', label: 'Annual ROI',
    sub: 'In recovered leads, faster deal cycles and reduced admin cost.',
    color: '#38bdf8', border: 'rgba(56,189,248,0.18)', bg: 'rgba(56,189,248,0.07)',
  },
  {
    Icon: Target, value: 3, suffix: 'x', label: 'Faster Closing',
    sub: 'Structured pipelines cut negotiation cycles dramatically.',
    color: '#fb923c', border: 'rgba(251,146,60,0.18)', bg: 'rgba(251,146,60,0.07)',
  },
]

const comparisons = [
  { area: 'Customer onboarding',    before: 'Manual entry across tools',     after: 'Single profile, instant setup',       saving: '–40 min each' },
  { area: 'Lead follow-up',         before: '30–40% leads forgotten',        after: '100% tracked & reminded',             saving: '+€12K / month' },
  { area: 'Monthly reporting',      before: '4–6 hours manual work',         after: 'Instant live dashboard',              saving: '–5h / month' },
  { area: 'Onboarding new reps',    before: '3–4 weeks to get up to speed',  after: 'Full history visible on day one',     saving: '–2 weeks' },
  { area: 'Customer re-engagement', before: 'Manually checking old notes',   after: 'Automated follow-up reminders',       saving: '+23% repeat' },
]

/* Animated counter card */
function StatCard({ stat }) {
  const cardRef = useRef(null)
  const valRef  = useRef(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 87%',
      once: true,
      onEnter: () => {
        const obj = { n: 0 }
        gsap.to(obj, {
          n: stat.value,
          duration: 2.2,
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
      <div
        className="absolute top-0 right-0 w-36 h-36 rounded-full blur-[80px] opacity-20 pointer-events-none"
        style={{ background: stat.color }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ background: stat.bg, border: `1px solid ${stat.border}` }}
      >
        <stat.Icon size={22} style={{ color: stat.color }} />
      </div>

      <div ref={valRef} className="text-[52px] font-black tracking-tight leading-none mb-2.5" style={{ color: stat.color }}>
        0{stat.suffix}
      </div>
      <p className="text-white font-bold text-base mb-1.5">{stat.label}</p>
      <p className="text-white/38 text-sm leading-relaxed">{stat.sub}</p>
    </div>
  )
}

export default function Benefits() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const statsRef   = useRef(null)
  const tableRef   = useRef(null)

  useGSAP(() => {
    /* Title */
    gsap.fromTo(
      titleRef.current.children,
      { y: 44, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      }
    )

    /* Stats */
    gsap.fromTo(
      statsRef.current.querySelectorAll('.stat-card'),
      { y: 55, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
      }
    )

    /* Table rows */
    gsap.fromTo(
      tableRef.current.querySelectorAll('.table-row'),
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: tableRef.current, start: 'top 80%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="benefits" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070b] via-[#0d0d1c] to-[#07070b]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-900/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-emerald-300 text-sm font-medium mb-7"
            style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)', opacity: 0 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Real Business Impact
          </div>

          <h2
            className="text-4xl md:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.08]"
            style={{ opacity: 0 }}
          >
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

        {/* Before / After table */}
        <div
          ref={tableRef}
          className="rounded-3xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Header row */}
          <div className="grid grid-cols-12 px-6 py-4 border-b border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="col-span-3 text-white/28 text-[11px] font-semibold uppercase tracking-widest">Area</div>
            <div className="col-span-4 text-red-400/55 text-[11px] font-semibold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/55" /> Before
            </div>
            <div className="col-span-3 text-emerald-400/55 text-[11px] font-semibold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/55" /> With FurniCRM
            </div>
            <div className="col-span-2 text-white/28 text-[11px] font-semibold uppercase tracking-widest text-right">Impact</div>
          </div>

          {comparisons.map((row, i) => (
            <div
              key={row.area}
              className="table-row grid grid-cols-12 px-6 py-5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors cursor-default"
              style={{ opacity: 0 }}
            >
              <div className="col-span-3 text-white font-semibold text-sm self-center">{row.area}</div>
              <div className="col-span-4 text-white/32 text-sm self-center line-through decoration-red-500/25">{row.before}</div>
              <div className="col-span-3 text-emerald-400 text-sm font-semibold self-center">{row.after}</div>
              <div className="col-span-2 text-right self-center">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-emerald-400 text-xs font-bold rounded-full"
                  style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)' }}
                >
                  <Zap size={9} />
                  {row.saving}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/22 text-sm">
            A team of{' '}
            <span className="text-white/52 font-semibold">5 salespeople</span> saves on average{' '}
            <span className="text-emerald-400 font-bold">60+ hours/week</span> — redirected to actual selling.
          </p>
        </div>
      </div>
    </section>
  )
}
