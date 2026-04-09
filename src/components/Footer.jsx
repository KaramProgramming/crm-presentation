export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#060608]">
      <div className="max-w-7xl mx-auto section-padding py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span className="text-white font-bold tracking-tight">
              Furni<span className="text-gradient">CRM</span>
            </span>
          </div>

          <p className="text-white/30 text-sm text-center">
            CRM designed exclusively for the furniture industry.
          </p>

          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} FurniCRM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
