import { Instagram, Linkedin, MessageCircle } from 'lucide-react'

export default function Footer() {
  const links = {
    Navigate: [
      { label: 'Work',     href: '#werk' },
      { label: 'Services', href: '#diensten' },
      { label: 'About',    href: '#over' },
      { label: 'Pricing',  href: '#tarieven' },
      { label: 'Contact',  href: '#contact' },
    ],
    Contact: [
      { label: 'hello@ebel.studio', href: 'mailto:hello@ebel.studio' },
      { label: 'WhatsApp',          href: 'https://wa.me/31612345678', external: true },
      { label: 'Instagram',         href: '#' },
    ],
  }

  return (
    <footer className="bg-[#111111]">
      <div className="px-8 md:px-12 lg:px-20 pt-16 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-heading font-semibold text-white text-2xl mb-3" style={{ letterSpacing: '-0.02em' }}>
              Ebel
            </p>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-1">
              Modern. Fast. Honest.
            </p>
            <p className="text-white/25 text-sm leading-relaxed max-w-xs mb-6">
              Websites and visual identities for people who want to look professional online.
            </p>

            <div className="inline-flex items-center gap-2.5 bg-white/05 border border-white/08 rounded-full px-4 py-2 mb-6">
              <span className="status-dot">
                <span className="w-2 h-2 rounded-full bg-[#3B6FE8] inline-block" style={{ color: '#3B6FE8' }} />
              </span>
              <span className="text-white/60 text-xs font-mono">Available for new projects</span>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: Instagram,     label: 'Instagram', href: '#' },
                { icon: Linkedin,      label: 'LinkedIn',  href: '#' },
                { icon: MessageCircle, label: 'WhatsApp',  href: 'https://wa.me/31612345678', external: true },
              ].map(({ icon: Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="w-9 h-9 rounded-xl bg-white/06 border border-white/08 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 link-lift transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-white/25 text-xs font-mono tracking-widest uppercase mb-4">{category}</p>
              <ul className="flex flex-col gap-2.5">
                {items.map(({ label, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/45 text-sm hover:text-white link-lift transition-colors"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/06">
          <p className="text-white/20 text-xs font-mono">
            © 2026 Ebel · hello@ebel.studio
          </p>
          <p className="text-white/20 text-xs font-mono">
            Built by Ebel — with AI
          </p>
        </div>
      </div>
    </footer>
  )
}
