import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Mail, RefreshCw, UserPlus, Bell, Sparkles, Workflow, Plug } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const flows = [
  {
    step: '01', Icon: Mail,
    color: '#f3dfb2', border: 'rgba(243,223,178,0.2)', bg: 'rgba(243,223,178,0.07)',
    title: 'Incoming email',
    desc: 'A potential customer sends an inquiry email to your sales address.',
  },
  {
    step: '02', Icon: RefreshCw,
    color: '#e8c87a', border: 'rgba(232,200,122,0.2)', bg: 'rgba(232,200,122,0.07)',
    title: 'Automation triggered',
    desc: 'The workflow detects the email and extracts name, contact details and the request.',
  },
  {
    step: '03', Icon: UserPlus,
    color: '#d4a43a', border: 'rgba(212,164,58,0.2)', bg: 'rgba(212,164,58,0.07)',
    title: 'Customer created in CRM',
    desc: 'A new customer profile is automatically created with all available data pre-filled.',
  },
  {
    step: '04', Icon: Bell,
    color: '#b8860b', border: 'rgba(184,134,11,0.2)', bg: 'rgba(184,134,11,0.07)',
    title: 'Sales rep notified',
    desc: 'Your salesperson instantly receives a notification with the full lead context. Zero leads lost.',
  },
]

const integrations = [
  { name: 'n8n', desc: 'Workflow automation', icon: '⚙', color: 'rgba(232,180,80,0.18)', border: 'rgba(232,180,80,0.22)' },
  { name: 'Email', desc: 'Gmail / Outlook', icon: '✉', color: 'rgba(66,133,244,0.14)', border: 'rgba(66,133,244,0.2)' },
  { name: 'WhatsApp', desc: 'Direct messaging', icon: '💬', color: 'rgba(37,211,102,0.14)', border: 'rgba(37,211,102,0.2)' },
  { name: 'Zapier', desc: 'SaaS connections', icon: '⚡', color: 'rgba(255,74,51,0.14)', border: 'rgba(255,74,51,0.2)' },
  { name: 'Sheets', desc: 'Data export', icon: '📊', color: 'rgba(52,168,83,0.14)', border: 'rgba(52,168,83,0.2)' },
  { name: 'Webhooks', desc: 'Custom API', icon: '🔗', color: 'rgba(212,164,58,0.14)', border: 'rgba(212,164,58,0.2)' },
]

export default function Automation() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const flowRef = useRef(null)
  const intRef = useRef(null)
  const bannerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(titleRef.current.children,
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' } }
    )

    gsap.fromTo(flowRef.current.querySelectorAll('.flow-card'),
      { y: 55, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: flowRef.current, start: 'top 82%' } }
    )

    gsap.fromTo(intRef.current.querySelectorAll('.int-card'),
      { scale: 0.88, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.65, stagger: 0.07, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: intRef.current, start: 'top 84%' } }
    )

    gsap.fromTo(bannerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: bannerRef.current, start: 'top 88%' } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="automation" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#d4a43a]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#b8860b]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div ref={titleRef} className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#e8c87a] text-sm font-medium mb-7"
            style={{ background: 'rgba(212,164,58,0.08)', border: '1px solid rgba(212,164,58,0.18)', opacity: 0 }}
          >
            <Sparkles size={14} className="text-[#d4a43a]" />
            Automation and Integrations
          </div>
          <h2 className="font-display text-4xl md:text-[58px] font-black tracking-tight text-white mb-5 leading-[1.08]" style={{ opacity: 0 }}>
            The CRM works
            <br />
            <span className="text-gradient">even while you sleep</span>
          </h2>
          <p className="text-white/42 text-lg max-w-2xl mx-auto" style={{ opacity: 0 }}>
            With automation integrations, repetitive tasks are handled automatically. Your team stays focused on what matters: closing deals.
          </p>
        </div>

        <div ref={flowRef} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <div
              className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,164,58,0.25) 20%, rgba(212,164,58,0.25) 80%, transparent)' }}
            />

            {flows.map((flow) => (
              <div
                key={flow.step}
                className="flow-card relative rounded-2xl p-6 text-center shine transition-transform duration-300 hover:-translate-y-2"
                style={{ opacity: 0, background: flow.bg, border: `1px solid ${flow.border}` }}
              >
                <span className="absolute top-4 right-4 text-xs font-black text-white/[0.06] tracking-widest">{flow.step}</span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: flow.bg, border: `1px solid ${flow.border}` }}
                >
                  <flow.Icon size={22} style={{ color: flow.color }} />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{flow.title}</h3>
                <p className="text-white/42 text-xs leading-relaxed">{flow.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#e8c87a] text-sm font-semibold"
              style={{ background: 'rgba(212,164,58,0.08)', border: '1px solid rgba(212,164,58,0.18)' }}
            >
              <Workflow size={14} />
              All of this happens in under 30 seconds, automatically
            </span>
          </div>
        </div>

        <div>
          <p className="text-center text-white/32 text-xs font-semibold uppercase tracking-[0.22em] mb-8">
            Integrates with your existing tools
          </p>

          <div ref={intRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((int) => (
              <div
                key={int.name}
                className="int-card group rounded-2xl p-5 text-center cursor-default shine transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ opacity: 0, background: int.color, border: `1px solid ${int.border}` }}
              >
                <div className="text-2xl mb-2.5">{int.icon}</div>
                <p className="text-white font-bold text-sm">{int.name}</p>
                <p className="text-white/38 text-xs mt-0.5">{int.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={bannerRef}
          className="mt-12 rounded-2xl p-8 text-center"
          style={{
            opacity: 0,
            background: 'linear-gradient(135deg, rgba(212,164,58,0.08), rgba(184,115,51,0.08), rgba(212,164,58,0.08))',
            border: '1px solid rgba(212,164,58,0.18)',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(212,164,58,0.12)', border: '1px solid rgba(212,164,58,0.22)' }}
          >
            <Plug size={22} className="text-[#d4a43a]" />
          </div>
          <h3 className="text-white font-black text-xl mb-2">Built for the future</h3>
          <p className="text-white/42 text-sm max-w-lg mx-auto leading-relaxed">
            The open architecture lets you add new automations and integrations at any time - no coding required, no platform switch needed.
          </p>
        </div>
      </div>
    </section>
  )
}
