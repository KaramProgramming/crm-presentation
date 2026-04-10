import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MessageSquare, Paintbrush, Code2, Rocket,
  CheckCircle2, Sparkles, ArrowRight, ShieldCheck,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    color: 'text-sky-400',
    bg: 'from-sky-600/20 to-blue-600/5',
    border: 'border-sky-500/25',
    glow: 'shadow-sky-500/20',
    title: 'We listen to you',
    desc: 'We sit down with your team and map your exact workflow — every step, every pain point, every process that makes your business unique.',
  },
  {
    number: '02',
    icon: Paintbrush,
    color: 'text-violet-400',
    bg: 'from-violet-600/20 to-purple-600/5',
    border: 'border-violet-500/25',
    glow: 'shadow-violet-500/20',
    title: 'We design it together',
    desc: "We translate your needs into a concrete feature plan. You see exactly what will be built before we write a single line of code — no surprises.",
  },
  {
    number: '03',
    icon: Code2,
    color: 'text-brand-400',
    bg: 'from-brand-600/20 to-indigo-600/5',
    border: 'border-brand-500/25',
    glow: 'shadow-brand-500/20',
    title: 'We build it for you',
    desc: 'Our team develops the feature directly into your CRM. Custom fields, custom views, custom automations — whatever your business needs, it gets built.',
  },
  {
    number: '04',
    icon: Rocket,
    color: 'text-emerald-400',
    bg: 'from-emerald-600/20 to-teal-600/5',
    border: 'border-emerald-500/25',
    glow: 'shadow-emerald-500/20',
    title: 'We ship & support it',
    desc: 'The feature goes live in your CRM. We train your team, collect feedback, and keep iterating. This is not a one-time delivery — it is an ongoing partnership.',
  },
]

const examples = [
  'Custom order status flow per product category',
  'Automatic supplier notification on new orders',
  'Room-based project grouping for interior designers',
  'Delivery scheduling calendar integrated into customer profiles',
  'Custom margin calculator per client tier',
  'WhatsApp message log attached to each customer',
  'Showroom visit tracking and follow-up workflow',
  'Multi-branch inventory visibility per sales rep',
]

export default function CustomDev() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: '-80px' })

  return (
    <section id="custom" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0e0b1e] to-[#0a0a0f]" />

      {/* Big ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-800/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-violet-800/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">

        {/* ── Header ── */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-6"
          >
            <Sparkles size={14} className="text-brand-400" />
            Our Biggest Differentiator
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]"
          >
            We don't sell you software.
            <br />
            <span className="text-gradient">We build yours.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Every furniture company works differently. We work <span className="text-white font-semibold">with you</span> to
            identify exactly what you need — then we build it directly into your CRM.
            No workarounds. No compromises. No limits.
          </motion.p>
        </div>

        {/* ── 4-step process ── */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20 relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3) 20%, rgba(99,102,241,0.3) 80%, transparent)' }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 35 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative bg-gradient-to-br ${step.bg} border ${step.border} rounded-2xl p-6 card-shine shadow-lg ${step.glow}`}
              >
                {/* Step number watermark */}
                <span className="absolute top-4 right-5 text-4xl font-black text-white/5 select-none leading-none">
                  {step.number}
                </span>

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.bg} border ${step.border} flex items-center justify-center mb-5`}>
                  <Icon size={22} className={step.color} />
                </div>

                <h3 className="text-white font-black text-lg mb-3 leading-tight">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* ── Custom features examples ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">
              Real examples of what we've built
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6 leading-tight">
              If your business needs it,
              we build it — full stop.
            </h3>
            <p className="text-white/50 leading-relaxed mb-8">
              These are real features requested by furniture companies and shipped directly into their CRM.
              Your list will be different — and that's exactly the point.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { text: 'No feature request is too specific', sub: 'We have built for single-location showrooms and multi-branch groups alike' },
                { text: 'Direct line to the development team', sub: 'You talk to the people who write the code — no ticket system, no generic support' },
                { text: 'Your CRM evolves as your business does', sub: 'New workflow? New market? We adapt your system alongside you' },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-white/4 border border-white/8 rounded-xl px-5 py-4"
                >
                  <ShieldCheck size={18} className="text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">{item.text}</p>
                    <p className="text-white/40 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — examples grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-glass rounded-2xl border border-white/8 p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Code2 size={16} className="text-brand-400" />
              <p className="text-white font-bold">Custom features — shipped for real clients</p>
            </div>
            <div className="space-y-2">
              {examples.map((ex, i) => (
                <motion.div
                  key={ex}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0"
                >
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white/65 text-sm">{ex}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-white/25 text-xs mt-4 text-center">
              + anything you need that isn't on this list
            </p>
          </motion.div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 relative overflow-hidden rounded-2xl border border-brand-500/30 bg-gradient-to-r from-brand-600/15 via-violet-600/10 to-brand-600/15 p-8 text-center"
        >
          {/* Subtle animated shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

          <p className="text-white/50 text-sm uppercase tracking-widest font-semibold mb-3">
            The bottom line
          </p>
          <p className="text-white font-black text-2xl md:text-3xl mb-6 tracking-tight">
            You will never be told <span className="text-gradient">"we can't do that."</span>
          </p>
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl shadow-2xl shadow-brand-900/50 transition-all duration-200"
          >
            Tell us what you need
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
