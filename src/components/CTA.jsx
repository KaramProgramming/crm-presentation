import { useEffect, useRef, useState } from 'react'
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

const countryDialCodes = {
  AD: '+376', AE: '+971', AF: '+93', AG: '+1', AI: '+1', AL: '+355', AM: '+374', AO: '+244',
  AR: '+54', AS: '+1', AT: '+43', AU: '+61', AW: '+297', AX: '+358', AZ: '+994', BA: '+387',
  BB: '+1', BD: '+880', BE: '+32', BF: '+226', BG: '+359', BH: '+973', BI: '+257', BJ: '+229',
  BL: '+590', BM: '+1', BN: '+673', BO: '+591', BQ: '+599', BR: '+55', BS: '+1', BT: '+975',
  BW: '+267', BY: '+375', BZ: '+501', CA: '+1', CC: '+61', CD: '+243', CF: '+236', CG: '+242',
  CH: '+41', CI: '+225', CK: '+682', CL: '+56', CM: '+237', CN: '+86', CO: '+57', CR: '+506',
  CU: '+53', CV: '+238', CW: '+599', CX: '+61', CY: '+357', CZ: '+420', DE: '+49', DJ: '+253',
  DK: '+45', DM: '+1', DO: '+1', DZ: '+213', EC: '+593', EE: '+372', EG: '+20', EH: '+212',
  ER: '+291', ES: '+34', ET: '+251', FI: '+358', FJ: '+679', FK: '+500', FM: '+691', FO: '+298',
  FR: '+33', GA: '+241', GB: '+44', GD: '+1', GE: '+995', GF: '+594', GG: '+44', GH: '+233',
  GI: '+350', GL: '+299', GM: '+220', GN: '+224', GP: '+590', GQ: '+240', GR: '+30', GT: '+502',
  GU: '+1', GW: '+245', GY: '+592', HK: '+852', HN: '+504', HR: '+385', HT: '+509', HU: '+36',
  ID: '+62', IE: '+353', IL: '+972', IM: '+44', IN: '+91', IO: '+246', IQ: '+964', IR: '+98',
  IS: '+354', IT: '+39', JE: '+44', JM: '+1', JO: '+962', JP: '+81', KE: '+254', KG: '+996',
  KH: '+855', KI: '+686', KM: '+269', KN: '+1', KP: '+850', KR: '+82', KW: '+965', KY: '+1',
  KZ: '+7', LA: '+856', LB: '+961', LC: '+1', LI: '+423', LK: '+94', LR: '+231', LS: '+266',
  LT: '+370', LU: '+352', LV: '+371', LY: '+218', MA: '+212', MC: '+377', MD: '+373', ME: '+382',
  MF: '+590', MG: '+261', MH: '+692', MK: '+389', ML: '+223', MM: '+95', MN: '+976', MO: '+853',
  MP: '+1', MQ: '+596', MR: '+222', MS: '+1', MT: '+356', MU: '+230', MV: '+960', MW: '+265',
  MX: '+52', MY: '+60', MZ: '+258', NA: '+264', NC: '+687', NE: '+227', NF: '+672', NG: '+234',
  NI: '+505', NL: '+31', NO: '+47', NP: '+977', NR: '+674', NU: '+683', NZ: '+64', OM: '+968',
  PA: '+507', PE: '+51', PF: '+689', PG: '+675', PH: '+63', PK: '+92', PL: '+48', PM: '+508',
  PR: '+1', PS: '+970', PT: '+351', PW: '+680', PY: '+595', QA: '+974', RE: '+262', RO: '+40',
  RS: '+381', RU: '+7', RW: '+250', SA: '+966', SB: '+677', SC: '+248', SD: '+249', SE: '+46',
  SG: '+65', SH: '+290', SI: '+386', SJ: '+47', SK: '+421', SL: '+232', SM: '+378', SN: '+221',
  SO: '+252', SR: '+597', SS: '+211', ST: '+239', SV: '+503', SX: '+1', SY: '+963', SZ: '+268',
  TC: '+1', TD: '+235', TG: '+228', TH: '+66', TJ: '+992', TK: '+690', TL: '+670', TM: '+993',
  TN: '+216', TO: '+676', TR: '+90', TT: '+1', TV: '+688', TW: '+886', TZ: '+255', UA: '+380',
  UG: '+256', US: '+1', UY: '+598', UZ: '+998', VA: '+39', VC: '+1', VE: '+58', VG: '+1',
  VI: '+1', VN: '+84', VU: '+678', WF: '+681', WS: '+685', XK: '+383', YE: '+967', YT: '+262',
  ZA: '+27', ZM: '+260', ZW: '+263',
}

export default function CTA() {
  const sectionRef = useRef(null)
  const copyRef    = useRef(null)
  const formRef    = useRef(null)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' })
  const [phoneMeta, setPhoneMeta] = useState({ countryCode: '', dialCode: '' })
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

  useEffect(() => {
    let isActive = true

    const applyDialCode = (countryCode) => {
      const dialCode = countryDialCodes[countryCode]

      if (!dialCode || !isActive) return

      setPhoneMeta({ countryCode, dialCode })

      setForm((prev) => {
        if (prev.phone.trim()) return prev
        return { ...prev, phone: `${dialCode} ` }
      })
    }

    const detectDialCode = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        if (!response.ok) throw new Error('Failed to resolve IP location')

        const data = await response.json()
        applyDialCode(data.country_code)
      } catch {
        const localeCountry = Intl.DateTimeFormat()
          .resolvedOptions()
          .locale
          ?.split('-')
          ?.at(-1)
          ?.toUpperCase()

        applyDialCode(localeCountry)
      }
    }

    detectDialCode()

    return () => {
      isActive = false
    }
  }, [])

  const flagFromCountryCode = (countryCode) => {
    if (!countryCode || countryCode.length !== 2) return ''

    return countryCode
      .toUpperCase()
      .split('')
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join('')
  }

  const phoneFlag = flagFromCountryCode(phoneMeta.countryCode)

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
  const inputFocusStyle = `focus:ring-2 focus:ring-[#d4a43a]/25`

  return (
    <section ref={sectionRef} id="cta" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(184,134,11,0.07) 0%, transparent 70%)' }} />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,164,58,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,164,58,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div ref={copyRef}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#e8c87a] text-sm font-medium mb-8"
              style={{ background: 'rgba(212,164,58,0.08)', border: '1px solid rgba(212,164,58,0.18)', opacity: 0 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#d4a43a] animate-pulse" />
              Get Started Today
            </div>

            <h2
              className="font-display font-black tracking-tight text-white mb-6 leading-[1.04]"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', opacity: 0 }}
            >
              Transform your business
              <br />
              <span className="text-gradient">starting today</span>
            </h2>

            <p className="text-white/45 text-lg leading-relaxed mb-10" style={{ opacity: 0 }}>
              Book a free 30-minute demo. We'll show you how the CRM adapts to your structure,
              your products, and your team — live.
            </p>

            {/* Perks */}
            <ul className="space-y-3 mb-12" style={{ opacity: 0 }}>
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white/62">
                  <CheckCircle2 size={17} className="text-[#d4a43a] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            {/* Contact */}
            <div className="space-y-3" style={{ opacity: 0 }}>
              {[
                { Icon: Phone, text: '+39 xxx xxx xxxx', label: 'Call us directly' },
                { Icon: Mail,  text: 'demo@yourcrm.com', label: 'Send an email' },
                { Icon: MapPin, text: 'Available globally', label: 'Remote & on-site demos' },
              ].map(({ Icon, text, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(212,164,58,0.08)', border: '1px solid rgba(212,164,58,0.18)' }}
                  >
                    <Icon size={14} className="text-[#d4a43a]" />
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
            className="gradient-border-card p-8"
            style={{
              opacity: 0,
              boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(212,164,58,0.05)',
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
                    <div
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={inputStyle}
                    >
                      <div
                        className="flex items-center gap-2 shrink-0 pr-3 border-r text-white/80"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <span className="text-lg leading-none" aria-hidden="true">{phoneFlag || '🌍'}</span>
                        <span className="text-sm font-semibold">{phoneMeta.dialCode || '+'}</span>
                      </div>
                      <input
                        type="tel" name="phone"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+961 70 123 456"
                        className={`${inputCls} ${inputFocusStyle} !bg-transparent !border-0 !ring-0 px-0 py-0`}
                        style={{ background: 'transparent', border: 'none' }}
                      />
                    </div>
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
