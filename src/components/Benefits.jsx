import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { DollarSign, Clock, TrendingUp, Target, ArrowUp, Zap } from 'lucide-react'

/* ── Animated counter hook ── */
function useCountUp(target, duration = 1800, shouldStart = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, shouldStart])
  return value
}

/* ── Big ROI stat card ── */
function StatCard({ icon: Icon, value, suffix, label, sub, color, bg, border, delay, started }) {
  const count = useCountUp(value, 1800, started)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative bg-gradient-to-br ${bg} border ${border} rounded-2xl p-7 card-shine overflow-hidden`}
    >
      {/* Background glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 ${color.replace('text-', 'bg-')}`} />

      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bg} border ${border} flex items-center justify-center mb-5`}>
        <Icon size={22} className={color} />
      </div>

      <div className="flex items-end gap-1 mb-2">
        <span className={`text-5xl font-black tracking-tight ${color}`}>{count}{suffix}</span>
      </div>
      <p className="text-white font-bold text-lg leading-tight mb-1">{label}</p>
      <p className="text-white/45 text-sm leading-relaxed">{sub}</p>
    </motion.div>
  )
}

const stats = [
  {
    icon: TrendingUp,
    value: 34,
    suffix: '%',
    label: 'Average Revenue Increase',
    sub: 'Companies report higher close rates within the first 6 months of adopting the CRM.',
    color: 'text-brand-400',
    bg: 'from-brand-600/15 to-purple-600/5',
    border: 'border-brand-500/20',
    delay: 0,
  },
  {
    icon: Clock,
    value: 12,
    suffix: 'h',
    label: 'Hours Saved Per Week',
    sub: 'Per sales rep — no more manual data entry, chasing updates, or re-entering customer information.',
    color: 'text-emerald-400',
    bg: 'from-emerald-600/15 to-teal-600/5',
    border: 'border-emerald-500/20',
    delay: 0.1,
  },
  {
    icon: DollarSign,
    value: 48,
    suffix: 'K',
    label: 'Average Annual ROI',
    sub: 'In recovered lost leads, faster deal cycles and reduced admin cost per team member.',
    color: 'text-sky-400',
    bg: 'from-sky-600/15 to-blue-600/5',
    border: 'border-sky-500/20',
    delay: 0.2,
  },
  {
    icon: Target,
    value: 3,
    suffix: 'x',
    label: 'Faster Deal Closing',
    sub: 'Structured pipelines and instant data access cut negotiation cycles dramatically.',
    color: 'text-accent-400',
    bg: 'from-orange-600/15 to-red-600/5',
    border: 'border-orange-500/20',
    delay: 0.3,
  },
]

const comparisons = [
  {
    area: 'New customer onboarding',
    before: 'Manual entry across tools',
    after: 'Single profile, instant setup',
    saving: '–40 min each',
    color: 'text-brand-400',
  },
  {
    area: 'Lead follow-up',
    before: '30–40% leads forgotten',
    after: '100% tracked & reminded',
    saving: '+€12K / month avg.',
    color: 'text-emerald-400',
  },
  {
    area: 'Monthly reporting',
    before: '4–6 hours manual work',
    after: 'Instant, live dashboard',
    saving: '–5h every month',
    color: 'text-sky-400',
  },
  {
    area: 'New salesperson onboarding',
    before: '3–4 weeks to get up to speed',
    after: 'Full history visible day one',
    saving: '–2 weeks ramp-up',
    color: 'text-violet-400',
  },
  {
    area: 'Customer re-engagement',
    before: 'Manually checking old notes',
    after: 'Automated follow-up reminders',
    saving: '+23% repeat sales',
    color: 'text-accent-400',
  },
]

export default function Benefits() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  return (
    <section id="benefits" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1c] to-[#0a0a0f]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-brand-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">

        {/* ── Header ── */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-6"
          >
            <ArrowUp size={14} className="text-emerald-400" />
            Real Business Impact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5"
          >
            More revenue.
            <br />
            <span className="text-gradient">More time. Less chaos.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            These are not estimates. They are the average results reported by furniture companies
            that switched from spreadsheets to a dedicated CRM workflow.
          </motion.p>
        </div>

        {/* ── Stat cards ── */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} started={statsInView} />
          ))}
        </div>

        {/* ── Before / After comparison table ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="bg-glass rounded-3xl border border-white/8 overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-12 px-6 py-4 border-b border-white/8 bg-white/3">
            <div className="col-span-3 text-white/40 text-xs font-semibold uppercase tracking-widest">Area</div>
            <div className="col-span-4 text-red-400/70 text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500/60" /> Before
            </div>
            <div className="col-span-3 text-emerald-400/70 text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500/60" /> With FurniCRM
            </div>
            <div className="col-span-2 text-white/40 text-xs font-semibold uppercase tracking-widest text-right">Impact</div>
          </div>

          {comparisons.map((row, i) => (
            <motion.div
              key={row.area}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="grid grid-cols-12 px-6 py-5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors group"
            >
              <div className="col-span-3 text-white font-semibold text-sm self-center">{row.area}</div>
              <div className="col-span-4 text-white/40 text-sm self-center line-through decoration-red-500/40">{row.before}</div>
              <div className={`col-span-3 text-sm font-semibold self-center ${row.color}`}>{row.after}</div>
              <div className="col-span-2 text-right self-center">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
                  <Zap size={10} />
                  {row.saving}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-white/35 text-base">
            A furniture company with <span className="text-white/70 font-semibold">5 salespeople</span> saves an average of{' '}
            <span className="text-emerald-400 font-bold">60+ hours per week</span> — that's a full-time employee's workload redirected to selling.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
