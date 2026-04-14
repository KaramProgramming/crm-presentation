import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' } }
    )
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="relative" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#040406', opacity: 0 }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/25">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span className="text-white font-black tracking-tight">
              Furni<span className="text-gradient">CRM</span>
            </span>
          </a>

          <p className="text-white/25 text-sm text-center">
            CRM designed exclusively for the furniture industry.
          </p>

          <p className="text-white/18 text-sm">
            © {new Date().getFullYear()} FurniCRM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
