import { ContainerScroll } from './ui/container-scroll-animation'
import { ExternalLink } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   LumineMockup — exact recreation van lumine-theta.vercel.app hero
   Gebaseerd op de echte broncode:

   Achtergrond: /images/Hero achtergrond.jpg @ position 68% center
   Gradient overlay:
     rgba(7,17,26,.88) 0% → rgba(7,17,26,.45) 38% →
     rgba(7,17,26,.10) 65% → rgba(7,17,26,.25) 100%
   Logo: /LOGO/lumein logo.png (chalk-script SVG/PNG)
   Layout: padding-top 8rem, logo + tagline links (36%)
   Scroll indicator: absolute bottom-left
   Socials: absolute bottom-right, horizontal flex
   ───────────────────────────────────────────────────────────────── */
function LumineMockup() {
  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{
        /* Echte Lumine achtergrond foto */
        backgroundImage: "url('https://lumine-theta.vercel.app/images/Hero%20achtergrond.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: '68% center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#07111a',
        fontFamily: 'Inter, DM Sans, sans-serif',
      }}
    >
      {/* ── Exacte gradient overlay uit de broncode ─────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to right,
            rgba(7, 17, 26, 0.88) 0%,
            rgba(7, 17, 26, 0.45) 38%,
            rgba(7, 17, 26, 0.10) 65%,
            rgba(7, 17, 26, 0.25) 100%
          )`,
        }}
      />

      {/* ── Film grain (4% opacity, identiek aan origineel) ──── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── NAVBAR (fixed top) ───────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between"
        style={{ padding: '1rem 1.5rem' }}
      >
        <a
          style={{
            fontFamily: 'Bebas Neue, DM Sans, sans-serif',
            fontSize: '1rem',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.08em',
            textDecoration: 'none',
          }}
        >
          LUMINE
        </a>
        <div className="flex items-center gap-4">
          {['MUSIC', 'SHOWS', 'ABOUT', 'CONNECT'].map(item => (
            <span
              key={item}
              style={{
                color: 'rgba(255,255,255,0.88)',
                fontSize: '0.55rem',
                letterSpacing: '0.16em',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO CONTENT — links uitgelijnd, 36% breed ────────── */}
      <div
        className="absolute z-20"
        style={{
          /* padding-top: 8rem → geschaald naar ~35% van hoogte in de kaart */
          top: '28%',
          left: '5%',
          width: '36%',
        }}
      >
        {/* Echte Lumine logo afbeelding — chalk-script */}
        <img
          src="https://lumine-theta.vercel.app/LOGO/lumein%20logo.png"
          alt="Lumine — artist website logo"
          loading="lazy"
          style={{
            width: '100%',
            maxWidth: '260px',
            display: 'block',
            marginLeft: '-2%',
            marginBottom: '0.8rem',
            filter: 'drop-shadow(0 0 8px rgba(90,173,212,0.15))',
          }}
          draggable={false}
        />

        {/* Tagline — identiek aan origineel */}
        <p
          style={{
            fontSize: '0.72rem',
            color: '#7a98ae',
            maxWidth: '280px',
            lineHeight: 1.6,
          }}
        >
          Electronic music rooted in emotion.
        </p>
      </div>

      {/* ── SCROLL INDICATOR — absolute bottom-left ─────────── */}
      <div
        className="absolute z-20 flex items-center gap-2"
        style={{ bottom: '1.5rem', left: '1.5rem' }}
      >
        {/* Verticale lijn */}
        <div
          style={{
            width: '1px',
            height: '28px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          }}
        />
        <span
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.48rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Scroll
        </span>
      </div>

      {/* ── SOCIALS — absolute bottom-right, horizontal ──────── */}
      <div
        className="absolute z-20 flex items-center"
        style={{ bottom: '1.5rem', right: '1.5rem', gap: '1rem' }}
      >
        {/* Spotify */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#7a98ae">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 14.65c-.2.3-.6.4-.9.2-2.45-1.5-5.55-1.85-9.2-1-.35.1-.65-.05-.9-.4-.05-.35.1-.65.4-.7.35-.1 4.35-.55 7.1 1.15.3.2.4.65.2.95zm1.25-2.75c-.25.4-.75.5-1.15.25-2.8-1.75-7.1-2.25-10.4-1.2-.4.15-.85-.1-1-.5-.15-.4.1-.85.5-1 3.7-1.2 8.4-.65 11.65 1.35.4.25.5.8.25 1.15zm.1-2.9c-3.35-2-8.9-2.2-12.1-1.2-.5.15-1-.15-1.15-.65-.15-.5.15-1 .65-1.15 3.7-1.1 9.85-.9 13.75 1.4.45.25.6.85.35 1.3-.25.45-.85.6-1.3.35z"/>
        </svg>
        {/* Instagram */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a98ae" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.8" fill="#7a98ae" stroke="none"/>
        </svg>
        {/* TikTok */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#7a98ae">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
        </svg>
        {/* SoundCloud */}
        <svg width="16" height="11" viewBox="0 0 32 16" fill="#7a98ae">
          <path d="M0 11.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.15 0-.3.02-.43.05C1.38 9.06.8 8.1.8 7c0-1.6 1.3-2.9 2.9-2.9.24 0 .47.03.68.08C5.06 2.17 6.97.8 9.2.8c2 0 3.76 1.12 4.64 2.78.4-.16.83-.25 1.28-.25C17.28 3.33 19 5.05 19 7.17s-1.72 3.84-3.88 3.84H4c-.06 0-.13 0-.19.01A1.98 1.98 0 0 0 0 11.5z"/>
        </svg>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Lumine Showcase Section
   ───────────────────────────────────────────────────────────────── */
export default function LumineShowcase() {
  const deliverables = [
    'Concert waitlist via email capture',
    'Booking flow: promoters send requests directly',
    'Shows overview (upcoming + past) with social links',
    'Animated streaming statistics',
    'Sony / Epic Records branding',
    'Mobile-first, fully custom design',
  ]

  return (
    <section className="overflow-hidden" style={{ background: '#F7F7F5' }}>
      <ContainerScroll
        titleComponent={
          <div className="mb-4 text-left max-w-4xl mx-auto">
            <p className="text-[#3B6FE8] text-sm font-mono tracking-widest uppercase mb-4">
              Recent work
            </p>
            <h2
              className="font-heading font-semibold mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', letterSpacing: '-0.02em', lineHeight: 1.1, color: '#111111' }}
            >
              Lumine —{' '}
              <span style={{ color: '#5aadd4' }}>Dutch Electronic Artist</span>
            </h2>
            <p className="text-base md:text-lg font-light max-w-2xl mb-6 leading-relaxed" style={{ color: 'rgba(17,17,17,0.55)' }}>
              Jesse had no central online presence. I built a fully custom website with a booking flow, concert waitlist, releases, shows, and Sony/Epic branding — everything on one URL.
            </p>

            {/* Deliverables list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 max-w-2xl">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#1A1A2E', marginTop: '0.25rem', flexShrink: 0, fontSize: '0.7rem' }}>▸</span>
                  <span className="text-sm leading-relaxed" style={{ color: 'rgba(17,17,17,0.5)' }}>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://lumine-theta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex font-semibold text-sm px-6 py-3"
              style={{ background: '#5aadd4', color: '#07111a' }}
            >
              <span className="btn-bg" style={{ background: 'rgba(255,255,255,0.18)' }} />
              <span className="relative z-10 flex items-center gap-2">
                View the site → <ExternalLink size={14} />
              </span>
            </a>
          </div>
        }
      >
        <LumineMockup />
      </ContainerScroll>
    </section>
  )
}
