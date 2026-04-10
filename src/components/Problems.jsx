import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FileSpreadsheet,
  PhoneMissed,
  Clock,
  BarChart2,
  MessageSquareX,
  Shuffle,
} from 'lucide-react'

const problems = [
  {
    icon: FileSpreadsheet,
    color: 'text-red-400',
    bg: 'from-red-500/15 to-orange-500/5',
    border: 'border-red-500/20',
    title: 'Scattered spreadsheets & paper',
    desc: "Orders on Excel, customers on paper, projects over WhatsApp. No unified view of your business.",
  },
  {
    icon: PhoneMissed,
    color: 'text-orange-400',
    bg: 'from-orange-500/15 to-yellow-500/5',
    border: 'border-orange-500/20',
    title: 'Leads lost in the chaos',
    desc: 'An interested customer reaches out, but gets buried in emails and messages before you can respond.',
  },
  {
    icon: Clock,
    color: 'text-yellow-400',
    bg: 'from-yellow-500/15 to-amber-500/5',
    border: 'border-yellow-500/20',
    title: 'Hours wasted on admin work',
    desc: 'Your team spends hours copying data, re-entering customer information, and searching through old messages.',
  },
  {
    icon: BarChart2,
    color: 'text-purple-400',
    bg: 'from-purple-500/15 to-violet-500/5',
    border: 'border-purple-500/20',
    title: 'Zero real analytics',
    desc: "You don't know which products sell best, which salesperson performs better, or when seasonal peaks hit.",
  },
  {
    icon: MessageSquareX,
    color: 'text-pink-400',
    bg: 'from-pink-500/15 to-rose-500/5',
    border: 'border-pink-500/20',
    title: 'Fragmented internal communication',
    desc: 'Sales reps don\'t know what the technician said. Customers get different answers from different people.',
  },
  {
    icon: Shuffle,
    color: 'text-cyan-400',
    bg: 'from-cyan-500/15 to-blue-500/5',
    border: 'border-cyan-500/20',
    title: 'No standardized process',
    desc: "Every salesperson works their own way. There's no shared workflow from first contact to delivery.",
  },
]

function ProblemCard({ problem, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = problem.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`bg-glass bg-glass-hover card-shine rounded-2xl p-6 border ${problem.border} cursor-default group`}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${problem.bg} border ${problem.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} className={problem.color} />
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{problem.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{problem.desc}</p>
    </motion.div>
  )
}

export default function Problems() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="problems" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d18] to-[#0a0a0f]" />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-400" />
            The Problem Today
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5"
          >
            The furniture industry deserves
            <br />
            <span className="text-gradient-warm">better tools</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Most furniture companies still rely on tools built for other industries —
            or worse, no system at all.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} problem={p} index={i} />
          ))}
        </div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-white/35 text-base">
            If you recognize at least <span className="text-white/70 font-semibold">3 of these problems</span>, your company is losing revenue every single day.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
