import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MessageSquare, Paintbrush, Code2, Rocket, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01', Icon: MessageSquare,
    color: '#38bdf8', border: 'rgba(56,189,248,0.2)', bg: 'rgba(56,189,248,0.07)',
    title: 'We listen to you',
    desc: 'We sit down with your team and map your exact workflow — every step, every pain point, every process unique to your business.',
  },
  {
    number: '02', Icon: Paintbrush,
    color: '#a78bfa', border: 'rgba(167,139,250,0.2)', bg: 'rgba(167,139,250,0.07)',
    title: 'We design it together',
    desc: "We translate your needs into a concrete feature plan. You see exactly what will be built before we write a single line of code.",
  },
  {
    number: '03', Icon: Code2,
    color: '#818cf8', border: 'rgba(99,102,241,0.2)', bg: 'rgba(99,102,241,0.07)',
    title: 'We build it for you',
    desc: 'Custom fields, custom views, custom automations — whatever your business needs, it gets built directly into your CRM.',
  },
  {
    number: '04', Icon: Rocket,
    color: '#34d399', border: 'rgba(52,211,153,0.2)', bg: 'rgba(52,211,153,0.07)',
    title: 'We ship & support it',
    desc: 'The feature goes live. We train your team, collect feedback, and iterate. This is an ongoing partnership — not a one-time delivery.',
  },
]

const examples = [
  'Custom order status flow per product category',
  'Automatic supplier notification on new orders',
  'Room-based project grouping for interior designers',
  'Delivery scheduling calendar in customer profiles',
  'Custom margin calculator per client tier',
  'WhatsApp message log attached to each customer',
  'Showroom visit tracking and follow-up workflow',
  'Multi-branch inventory visibility per sales rep',
]

export default function CustomDev() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const stepsRef   = useRef(null)
  const bottomRef  = useRef(null)

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

    /* Steps */
    gsap.fromTo(
      stepsRef.current.querySelectorAll('.step-card'),
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 82%' },
      }
    )

    /* Bottom */
    gsap.fromTo(
      bottomRef.current.querySelectorAll('.reveal-item'),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: bottomRef.current, start: 'top 80%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="custom" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070b] via-[#0e0b1e] to-[#07070b]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-indigo-800/8 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-indigo-300 text-sm font-medium mb-7"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', opacity: 0 }}
          >
            <Sparkles size={14} className="text-indigo-400" />
            Our Biggest Differentiator
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-[60px] font-black tracking-tight text-white mb-6 leading-[1.05]"
            style={{ opacity: 0 }}
          >
            We don't sell you software.
            <br />
            <span className="text-gradient">We build yours.</span>
          </h2>

          <p className="text-white/45 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ opacity: 0 }}>
            Every furniture company works differently. We work{' '}
            <span className="text-white font-semibold">with you</span> to identify exactly what you need — then build it
            into your CRM. No workarounds. No limits.
          </p>
        </div>

        {/* 4-step process */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-24 relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.28) 20%, rgba(99,102,241,0.28) 80%, transparent)' }}
          />

          {steps.map((step) => (
            <div
              key={step.title}
              className="step-card group relative rounded-2xl p-6 shine transition-transform duration-300 hover:-translate-y-2"
              style={{ opacity: 0, background: step.bg, border: `1px solid ${step.border}` }}
            >
              <span className="absolute top-4 right-5 text-4xl font-black text-white/[0.04] select-none leading-none">
                {step.number}
              </span>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: step.bg, border: `1px solid ${step.border}` }}
              >
                <step.Icon size={22} style={{ color: step.color }} />
              </div>
              <h3 className="text-white font-black text-base mb-3">{step.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Examples + copy */}
        <div ref={bottomRef} className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left copy */}
          <div className="reveal-item" style={{ opacity: 0 }}>
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Real examples we've built</p>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6 leading-tight">
              If your business needs it,
              <br />we build it — full stop.
            </h3>
            <p className="text-white/45 leading-relaxed mb-8">
              These are real features requested by furniture companies and shipped directly into their CRM.
              Your list will be different — and that's exactly the point.
            </p>
            <div className="space-y-3">
              {[
                { text: 'No request is too specific', sub: 'We\'ve built for single showrooms and multi-branch groups alike.' },
                { text: 'Direct line to the dev team', sub: 'You talk to the people who write the code — no ticket queues.' },
                { text: 'Your CRM evolves with you', sub: 'New workflow? New market? We adapt your system alongside you.' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-4 rounded-xl px-5 py-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <ShieldCheck size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">{item.text}</p>
                    <p className="text-white/35 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right examples */}
          <div
            className="reveal-item rounded-2xl p-6 shine"
            style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Code2 size={15} className="text-indigo-400" />
              <p className="text-white font-bold text-sm">Custom features — shipped for real clients</p>
            </div>
            <div className="space-y-0">
              {examples.map((ex, i) => (
                <div
                  key={ex}
                  className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0"
                >
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-white/58 text-sm">{ex}</span>
                </div>
              ))}
            </div>
            <p className="text-white/22 text-xs mt-4 text-center">+ anything you need that isn't on this list</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="reveal-item mt-16 rounded-2xl p-10 text-center relative overflow-hidden"
          style={{ opacity: 0, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.22)' }}
        >
          <p className="text-white/38 text-xs font-semibold uppercase tracking-[0.2em] mb-3">The bottom line</p>
          <p className="text-white font-black text-2xl md:text-3xl mb-7 tracking-tight">
            You will never be told{' '}
            <span className="text-gradient">"we can't do that."</span>
          </p>
          <a
            href="#cta"
            className="btn-primary inline-flex"
          >
            Tell us what you need
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
