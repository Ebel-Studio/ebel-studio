import { Instagram, Linkedin, MessageCircle } from 'lucide-react'

export default function Footer() {
  const links = {
    Navigatie: ['Diensten', 'Werk', 'Over mij', 'Tarieven', 'Contact'],
    Diensten: ['Website op maat', 'Vakantieverhuur', 'Lokaal MKB', 'Onderhoud & retainer'],
    Legal: ['Privacybeleid', 'Algemene voorwaarden', 'Cookiebeleid'],
  }

  return (
    <footer
      className="bg-[#0F0F14] rounded-t-[4rem] mt-0"
    >
      <div className="px-8 md:px-12 lg:px-20 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <p className="font-sans font-bold text-white text-xl mb-3">Ebel Studio</p>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              Moderne websites voor lokale bedrijven en vakantieverhuurders in Noord-Holland. Gebouwd met AI, persoonlijk begeleid.
            </p>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2.5 bg-white/05 border border-white/08 rounded-full px-4 py-2 mb-6">
              <span className="status-dot">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" style={{ color: '#22c55e' }} />
              </span>
              <span className="text-white/60 text-xs font-mono">Beschikbaar voor nieuwe projecten</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/31612345678' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/06 border border-white/08 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 link-lift transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-white/25 text-xs font-mono tracking-widest uppercase mb-4">{category}</p>
              <ul className="flex flex-col gap-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/45 text-sm hover:text-white link-lift transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/06">
          <p className="text-white/20 text-xs font-mono">
            © 2025 Ebel Studio · KVK: 12345678 · Noord-Holland, NL
          </p>
          <p className="text-white/20 text-xs font-mono">
            Gebouwd door Ebel Studio — met AI 🤖
          </p>
        </div>
      </div>
    </footer>
  )
}
