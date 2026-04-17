import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Problems', href: '#problems' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Automation', href: '#automation' },
  { label: 'Analytics', href: '#analytics' },
]

export default function Footer() {
  const footerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' } }
    )
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="relative overflow-hidden" style={{ opacity: 0 }}>
      {/* Gold divider */}
      <div className="divider-gold" />

      <div className="absolute inset-0 luxury-section-bg" />
      <div className="absolute inset-0 luxury-crystal-walls pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="#" className="inline-flex items-center gap-2.5 group mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#d4a43a]/25"
                style={{ background: 'linear-gradient(135deg, #d4a43a 0%, #8b6508 100%)' }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" fill="white" fillOpacity="0.92" />
                </svg>
              </div>
            </a>
            <p className="text-white/28 text-sm leading-relaxed max-w-[220px]">
              CRM designed exclusively for the furniture and interior design industry.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/22 text-[10px] font-semibold uppercase tracking-[0.2em] mb-4">Navigation</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/36 hover:text-white/72 text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA block */}
          <div>
            <p className="text-white/22 text-[10px] font-semibold uppercase tracking-[0.2em] mb-4">Get Started</p>
            <p className="text-white/35 text-sm leading-relaxed mb-5">
              Ready to see what a purpose-built CRM can do for your business?
            </p>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[#1a1008] text-sm font-bold rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #f0d078 0%, #d4a43a 55%, #a07820 100%)',
                boxShadow: '0 4px 20px rgba(212,164,58,0.25)',
              }}
            >
              Request Free Demo
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-gold mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/18 text-xs">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-white/14 text-xs">
            Built for the furniture industry.
          </p>
        </div>
      </div>
    </footer>
  )
}
