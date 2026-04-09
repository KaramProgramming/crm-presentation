import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Send, Phone, Mail, MapPin } from 'lucide-react'

const benefits = [
  'Personalized demo for your business',
  'No commitment required',
  'Assisted setup included',
  'Dedicated support',
]

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, wire to your backend or email service
    setSubmitted(true)
  }

  return (
    <section id="cta" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0c0c1e] to-[#060608]" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(79,70,229,0.12) 0%, transparent 70%)' }} />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              Get Started Today
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight"
            >
              Transform your business
              <br />
              with{' '}
              <span className="text-gradient">FurniCRM</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/55 text-lg leading-relaxed mb-10"
            >
              Book a free 30-minute demo. We will show you how the CRM
              adapts to your structure, your products, and your team.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3 mb-12"
            >
              {benefits.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.07 }}
                  className="flex items-center gap-3 text-white/70"
                >
                  <CheckCircle2 size={18} className="text-brand-400 shrink-0" />
                  {b}
                </motion.li>
              ))}
            </motion.ul>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              {[
                { icon: Phone, text: '+39 xxx xxx xxxx', label: 'Call us directly' },
                { icon: Mail, text: 'demo@furnicrm.com', label: 'Send us an email' },
                { icon: MapPin, text: 'Available globally', label: 'Remote & on-site demos' },
              ].map(({ icon: Icon, text, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-600/15 border border-brand-500/20 flex items-center justify-center">
                    <Icon size={15} className="text-brand-400" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">{text}</p>
                    <p className="text-white/35 text-xs">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-glass rounded-3xl border border-white/10 p-8 shadow-2xl"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-black text-2xl mb-2">Request sent!</h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  We will reach out within 24 hours to schedule your personalized demo.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-7">
                  <h3 className="text-white font-black text-xl mb-1">Request Your Free Demo</h3>
                  <p className="text-white/45 text-sm">Fill in the form — we will respond within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full bg-white/5 border border-white/10 focus:border-brand-500/50 focus:bg-white/8 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Smith Furniture Co."
                        className="w-full bg-white/5 border border-white/10 focus:border-brand-500/50 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@smithfurniture.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-brand-500/50 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 xxx xxx xxxx"
                      className="w-full bg-white/5 border border-white/10 focus:border-brand-500/50 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-all duration-200"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-2xl shadow-brand-900/50 transition-all duration-200 mt-2"
                  >
                    <Send size={16} />
                    Request Free Demo
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-white/30 text-xs text-center">
                    No lock-in. No hidden costs. Just a conversation.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
