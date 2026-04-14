import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, CheckCircle2, Send, Phone, Mail, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* Magnetic button */
function MagneticBtn({ children, type, className, onClick }) {
  const wrapRef  = useRef(null)
  const innerRef = useRef(null)

  const onMove = (e) => {
    const { left, top, width, height } = wrapRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) * 0.2
    const y = (e.clientY - top - height / 2) * 0.2
    gsap.to(innerRef.current, { x, y, duration: 0.4, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.85, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block w-full">
      <button ref={innerRef} type={type} className={className} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

const perks = [
  'Personalized demo for your business',
  'No commitment required',
  'Assisted setup included',
  'Dedicated support',
]

export default function CTA() {
  const sectionRef = useRef(null)
  const copyRef    = useRef(null)
  const formRef    = useRef(null)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    gsap.fromTo(copyRef.current.children,
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.11, ease: 'power3.out',
        scrollTrigger: { trigger: copyRef.current, start: 'top 82%' } }
    )
    gsap.fromTo(formRef.current,
      { x: 35, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.95, ease: 'expo.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 82%' } }
    )
  }, { scope: sectionRef })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputCls = `
    w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200
    placeholder-white/22 font-medium
  `
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  }
  const inputFocusStyle = `focus:ring-2 focus:ring-indigo-500/30`

  return (
    <section ref={sectionRef} id="cta" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070b] via-[#0c0c1e] to-[#040406]" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(79,70,229,0.09) 0%, transparent 70%)' }} />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div ref={copyRef}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-indigo-300 text-sm font-medium mb-8"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', opacity: 0 }}
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Get Started Today
            </div>

            <h2
              className="text-4xl md:text-[52px] font-black tracking-tight text-white mb-6 leading-[1.08]"
              style={{ opacity: 0 }}
            >
              Transform your business
              <br />
              with{' '}
              <span className="text-gradient">FurniCRM</span>
            </h2>

            <p className="text-white/45 text-lg leading-relaxed mb-10" style={{ opacity: 0 }}>
              Book a free 30-minute demo. We'll show you how the CRM adapts to your structure,
              your products, and your team — live.
            </p>

            {/* Perks */}
            <ul className="space-y-3 mb-12" style={{ opacity: 0 }}>
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white/62">
                  <CheckCircle2 size={17} className="text-indigo-400 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            {/* Contact */}
            <div className="space-y-3" style={{ opacity: 0 }}>
              {[
                { Icon: Phone, text: '+39 xxx xxx xxxx', label: 'Call us directly' },
                { Icon: Mail,  text: 'demo@furnicrm.com', label: 'Send an email' },
                { Icon: MapPin, text: 'Available globally', label: 'Remote & on-site demos' },
              ].map(({ Icon, text, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.18)' }}
                  >
                    <Icon size={14} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white/72 text-sm font-medium">{text}</p>
                    <p className="text-white/30 text-xs">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            ref={formRef}
            className="rounded-3xl p-8 shine"
            style={{
              opacity: 0,
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
            }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)' }}
                >
                  <CheckCircle2 size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-black text-2xl mb-2">Request sent!</h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  We'll reach out within 24 hours to schedule your personalized demo.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h3 className="text-white font-black text-xl mb-1">Request Your Free Demo</h3>
                  <p className="text-white/38 text-sm">Fill in the form — we'll respond within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/40 text-[11px] font-semibold mb-1.5 uppercase tracking-wider">Name *</label>
                      <input
                        type="text" name="name" required
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="John Smith"
                        className={`${inputCls} ${inputFocusStyle}`}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-white/40 text-[11px] font-semibold mb-1.5 uppercase tracking-wider">Company *</label>
                      <input
                        type="text" name="company" required
                        value={form.company}
                        onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                        placeholder="Smith Furniture"
                        className={`${inputCls} ${inputFocusStyle}`}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/40 text-[11px] font-semibold mb-1.5 uppercase tracking-wider">Email *</label>
                    <input
                      type="email" name="email" required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="john@smithfurniture.com"
                      className={`${inputCls} ${inputFocusStyle}`}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-white/40 text-[11px] font-semibold mb-1.5 uppercase tracking-wider">Phone</label>
                    <input
                      type="tel" name="phone"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+1 xxx xxx xxxx"
                      className={`${inputCls} ${inputFocusStyle}`}
                      style={inputStyle}
                    />
                  </div>

                  <div className="pt-1">
                    <MagneticBtn
                      type="submit"
                      className="btn-primary w-full justify-center gap-2.5 text-base group"
                    >
                      <Send size={16} />
                      Request Free Demo
                      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </MagneticBtn>
                  </div>

                  <p className="text-white/22 text-xs text-center">
                    No lock-in. No hidden costs. Just a conversation.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
