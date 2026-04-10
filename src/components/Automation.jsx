import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowRight, UserPlus, Bell, RefreshCw, Sparkles, Workflow, Plug } from 'lucide-react'

const flows = [
  {
    step: '01',
    icon: Mail,
    color: 'text-sky-400',
    bg: 'from-sky-600/20 to-blue-600/5',
    border: 'border-sky-500/20',
    title: 'Incoming email',
    desc: 'A potential customer sends an inquiry email to your sales address.',
  },
  {
    step: '02',
    icon: RefreshCw,
    color: 'text-violet-400',
    bg: 'from-violet-600/20 to-purple-600/5',
    border: 'border-violet-500/20',
    title: 'Automation triggered',
    desc: 'The n8n workflow detects the email and automatically extracts the name, contact details and request.',
  },
  {
    step: '03',
    icon: UserPlus,
    color: 'text-brand-400',
    bg: 'from-brand-600/20 to-indigo-600/5',
    border: 'border-brand-500/20',
    title: 'Customer created in CRM',
    desc: 'A new customer profile is automatically created with all available data pre-filled.',
  },
  {
    step: '04',
    icon: Bell,
    color: 'text-emerald-400',
    bg: 'from-emerald-600/20 to-teal-600/5',
    border: 'border-emerald-500/20',
    title: 'Sales rep notified',
    desc: 'Your salesperson instantly receives a notification with the full lead context. Zero leads lost.',
  },
]

const integrations = [
  { name: 'n8n', desc: 'Workflow automation', icon: '⚡' },
  { name: 'Email', desc: 'Gmail / Outlook', icon: '📧' },
  { name: 'WhatsApp', desc: 'Direct messaging', icon: '💬' },
  { name: 'Zapier', desc: 'SaaS connections', icon: '⚡' },
  { name: 'Google Sheets', desc: 'Data export', icon: '📊' },
  { name: 'Webhooks', desc: 'Custom API', icon: '🔗' },
]

export default function Automation() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const flowRef = useRef(null)
  const flowInView = useInView(flowRef, { once: true, margin: '-80px' })

  return (
    <section id="automation" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-900/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-brand-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-6"
          >
            <Sparkles size={14} className="text-violet-400" />
            Automation & Integrations
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5"
          >
            The CRM works
            <br />
            <span className="text-gradient">even while you sleep</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            With automation integrations, repetitive tasks are handled automatically.
            Your team stays focused on what matters: closing deals.
          </motion.p>
        </div>

        {/* Flow diagram */}
        <div ref={flowRef} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent pointer-events-none" />

            {flows.map((flow, i) => {
              const Icon = flow.icon
              return (
                <motion.div
                  key={flow.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={flowInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center text-center"
                >
                  {i < flows.length - 1 && (
                    <div className="lg:hidden flex justify-center my-3">
                      <ArrowRight size={20} className="text-white/20 rotate-90 md:rotate-0" />
                    </div>
                  )}

                  <div className={`relative w-full bg-gradient-to-br ${flow.bg} border ${flow.border} rounded-2xl p-6 card-shine`}>
                    <span className="absolute top-4 right-4 text-xs font-black text-white/20 tracking-widest">
                      {flow.step}
                    </span>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${flow.bg} border ${flow.border} flex items-center justify-center mx-auto mb-4`}>
                      <Icon size={22} className={flow.color} />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{flow.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{flow.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={flowInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600/10 border border-brand-500/20 rounded-full text-brand-300 text-sm font-semibold">
              <Workflow size={14} />
              All of this happens in under 30 seconds, automatically
            </span>
          </motion.div>
        </div>

        {/* Integrations grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-white/50 text-sm font-semibold uppercase tracking-widest mb-8"
          >
            Integrates with your existing tools
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((int, i) => (
              <motion.div
                key={int.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="bg-glass bg-glass-hover rounded-2xl p-5 border border-white/8 text-center card-shine cursor-default"
              >
                <div className="text-3xl mb-2">{int.icon}</div>
                <p className="text-white font-bold text-sm">{int.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{int.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future-ready banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-violet-600/15 via-brand-600/15 to-purple-600/15 border border-brand-500/20 rounded-2xl p-8 text-center"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-brand-600/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
            <Plug size={22} className="text-violet-400" />
          </div>
          <h3 className="text-white font-black text-xl mb-2">Built for the future</h3>
          <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
            The open architecture of the CRM lets you add new automations and integrations
            at any time — no coding required, no platform switch needed.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
