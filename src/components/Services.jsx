import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NICHES = [
  {
    tag: '01',
    emoji: '🎵',
    title: 'Artist & Musician',
    text: 'Your music, your brand — one URL. Built for artists who need more than a link-in-bio.',
    features: [
      'Shows & events page with ticket links',
      'Promoter booking form via Formspree',
      'Streaming links (Spotify, Apple Music)',
      'EPK / press section',
      'Merch & releases page',
      'Email list capture',
    ],
  },
  {
    tag: '02',
    emoji: '🏡',
    title: 'Holiday Home',
    text: 'Stop paying Airbnb commissions. A direct booking page that looks better and costs less long-term.',
    features: [
      'Photo gallery with lightbox',
      'Availability & booking inquiry form',
      'Location + Google Maps embed',
      'House features & amenities',
      'Guest reviews section',
      'Multi-language support',
    ],
  },
  {
    tag: '03',
    emoji: '🏪',
    title: 'Business',
    text: 'For shops, studios, and services that want to be found and trusted online — without the agency price tag.',
    features: [
      'Services overview & pricing',
      'Google Maps + opening hours',
      'Appointment booking form',
      'Reviews & testimonials',
      'Blog / news section',
      'SEO + Google Analytics',
    ],
  },
  {
    tag: '04',
    emoji: '✦',
    title: 'Creative & Portfolio',
    text: 'Show your work the way it deserves. A sharp, custom portfolio that gets you hired.',
    features: [
      'Work showcase (up to 6 projects)',
      'Case studies with process & outcomes',
      'Services & rates page',
      'Contact form via Formspree',
      'Blog / articles',
      'Scroll animations & custom typography',
    ],
  },
]

export default function Diensten() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dienst-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
      gsap.from('.dienst-maintenance', {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.dienst-maintenance', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="diensten" ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#F7F7F5' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[#1A1A2E] text-sm font-mono tracking-widest uppercase mb-3">What I build</p>
          <h2 className="font-heading font-semibold text-[#111111]" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Wat ik bouw
          </h2>
          <p className="text-[#111111]/45 mt-2 text-sm max-w-md leading-relaxed">
            Every site is custom-built — no templates. Pick the type that fits, then choose your plan.
          </p>
        </div>

        {/* Niche cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          {NICHES.map(({ tag, emoji, title, text, features }) => (
            <div key={tag} className="dienst-card card-surface p-7 flex flex-col gap-5">

              {/* Top row */}
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(26,26,46,0.06)' }}
                >
                  {emoji}
                </div>
                <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(17,17,17,0.2)' }}>{tag}</span>
              </div>

              {/* Title + text */}
              <div>
                <h3 className="font-heading font-semibold text-[#111111] mb-2" style={{ fontSize: '1.15rem', letterSpacing: '-0.02em' }}>
                  {title}
                </h3>
                <p className="text-[#111111]/50 text-sm leading-relaxed">{text}</p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-1.5 flex-1">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#3B6FE8', opacity: 0.7 }} />
                    <span className="text-[#111111]/50 text-xs leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="pt-4 border-t border-[#111111]/06">
                <a href="#contact" className="text-[#1A1A2E] text-sm font-semibold link-lift inline-flex items-center gap-1">
                  Get a quote →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance included banner */}
        <div
          className="dienst-maintenance rounded-2xl px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: '#1A1A2E', border: '1px solid rgba(59,111,232,0.15)' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: 'rgba(59,111,232,0.15)' }}
            >
              <span style={{ fontSize: '1rem' }}>🔧</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-0.5">Maintenance included in every plan</p>
              <p className="text-white/40 text-xs leading-relaxed max-w-lg">
                Hosting, uptime monitoring, security updates, and content changes on request — all handled. From €29/mo depending on your plan.
              </p>
            </div>
          </div>
          <a
            href="#plan"
            className="text-[#3B6FE8] text-sm font-semibold link-lift shrink-0 whitespace-nowrap"
          >
            See plans →
          </a>
        </div>

      </div>
    </section>
  )
}
