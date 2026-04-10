import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const solutions = [
  {
    problem: 'Scattered data & spreadsheets',
    solution: 'Everything in one single platform',
    detail: 'Customers, orders, projects and communications — all centralized. Instant access from any device, anytime.',
    color: 'from-brand-600/20 to-purple-600/10',
    borderColor: 'border-brand-500/20',
    accentColor: 'text-brand-400',
  },
  {
    problem: 'Lost leads',
    solution: 'Sales pipeline always under control',
    detail: 'Every contact is tracked from the first inquiry through to delivery. No customer ever slips through the cracks again.',
    color: 'from-emerald-600/20 to-teal-600/10',
    borderColor: 'border-emerald-500/20',
    accentColor: 'text-emerald-400',
  },
  {
    problem: 'Hours wasted on admin',
    solution: 'Streamlined workflows, zero wasted time',
    detail: 'All customer data, order history and project notes live in one place. Your team stops searching and starts selling.',
    color: 'from-sky-600/20 to-blue-600/10',
    borderColor: 'border-sky-500/20',
    accentColor: 'text-sky-400',
  },
  {
    problem: 'No visibility into data',
    solution: 'Real-time analytics dashboard',
    detail: 'KPIs, revenue trends, top-selling products and salesperson performance. Make decisions based on real data, not gut feelings.',
    color: 'from-violet-600/20 to-purple-600/10',
    borderColor: 'border-violet-500/20',
    accentColor: 'text-violet-400',
  },
]

function SolutionRow({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
    >
      {/* Text side */}
      <div className="flex-1 space-y-4">
        <div className="inline-flex items-center gap-2 text-white/40 text-sm font-medium">
          <span className="line-through">{item.problem}</span>
          <ArrowRight size={14} />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          {item.solution}
        </h3>
        <p className="text-white/55 leading-relaxed">{item.detail}</p>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 size={16} className={item.accentColor} />
          <span className="text-white/60">Included in the base plan</span>
        </div>
      </div>

      {/* Visual side */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 bg-gradient-to-br ${item.color} border ${item.borderColor} rounded-2xl p-8 card-shine`}
      >
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 + index * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className={`w-2 h-2 rounded-full ${item.accentColor.replace('text-', 'bg-')} opacity-80`} />
              <div
                className="h-3 bg-white/10 rounded-full"
                style={{ width: `${65 + (i * 15 + index * 7) % 30}%` }}
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7 + index * 0.05 }}
            className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br ${item.color} border ${item.borderColor} text-sm font-semibold ${item.accentColor}`}
          >
            <CheckCircle2 size={14} />
            Active & working
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Solution() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="solution" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto section-padding">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            Our Solution
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5"
          >
            A system built
            <br />
            <span className="text-gradient">for furniture sales</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            We didn't adapt a generic CRM to fit your industry.
            We built something specifically for furniture companies, from the ground up.
          </motion.p>
        </div>

        {/* Solution rows */}
        <div className="space-y-20">
          {solutions.map((item, i) => (
            <SolutionRow key={item.solution} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
