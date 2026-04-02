import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    emoji: '⬛',
    title: 'Websites',
    color: '#3B6FE8',
    bg: 'rgba(59,111,232,0.07)',
    border: 'rgba(59,111,232,0.18)',
    text: 'Custom-built sites — no templates. I build for artists, local businesses, holiday homes, and creatives who want to stand out online.',
    niches: ['Artist & Musician', 'Holiday Home', 'Business', 'Creative & Portfolio'],
    features: [
      'Mobile-first, production-ready code',
      'SEO + Google Analytics included',
      'Delivered within days, not months',
      'WhatsApp AI updates built in',
    ],
  },
  {
    num: '02',
    emoji: '◈',
    title: 'Branding',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.07)',
    border: 'rgba(139,92,246,0.18)',
    text: 'A logo anyone can copy. A brand nobody can. I design visual identities that are sharp, intentional, and built to last — from the logo to the full system.',
    niches: [],
    features: [
      'Logo design (primary + variants)',
      'Color palette & typography system',
      'Brand guidelines document',
      'Ready for web, print & social',
    ],
  },
]

export default function Services() {
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
    <section id="services" ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#F7F7F5' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[#1A1A2E] text-sm font-mono tracking-widest uppercase mb-3">Services</p>
          <h2 className="font-heading font-semibold text-[#111111]" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            What I build
          </h2>
          <p className="text-[#111111]/45 mt-2 text-sm max-w-md leading-relaxed">
            Custom websites and brand identities — built to last and easy to maintain.
          </p>
        </div>

        {/* 3-pillar grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {SERVICES.map(({ num, emoji, title, color, bg, border, text, niches, features }) => (
            <div
              key={num}
              className="dienst-card relative flex flex-col gap-5 rounded-2xl p-7 overflow-hidden"
              style={{
                background: '#fff',
                border: `1px solid ${border}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Subtle glow */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `radial-gradient(280px circle at -10% -10%, ${bg} 0%, transparent 60%)`,
              }} />

              {/* Top row */}
              <div className="relative flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  {emoji}
                </div>
                <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(17,17,17,0.18)' }}>{num}</span>
              </div>

              {/* Title + text */}
              <div className="relative">
                <h3 className="font-heading font-semibold text-[#111111] mb-2" style={{ fontSize: '1.2rem', letterSpacing: '-0.02em', color }}>
                  {title}
                </h3>
                <p className="text-[#111111]/55 text-sm leading-relaxed">{text}</p>
              </div>

              {/* Niche tags (Websites only) */}
              {niches.length > 0 && (
                <div className="relative flex flex-wrap gap-1.5">
                  {niches.map(n => (
                    <span key={n} className="px-2.5 py-1 rounded-full text-[0.65rem] font-medium"
                      style={{ background: bg, color, border: `1px solid ${border}` }}>
                      {n}
                    </span>
                  ))}
                </div>
              )}

              {/* Features */}
              <ul className="relative flex flex-col gap-1.5 flex-1">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: color, opacity: 0.7 }} />
                    <span className="text-[#111111]/50 text-xs leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="relative pt-4 border-t" style={{ borderColor: 'rgba(17,17,17,0.06)' }}>
                <a href="#contact" className="text-sm font-semibold link-lift inline-flex items-center gap-1" style={{ color }}>
                  Get a quote →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance banner */}
        <div
          className="dienst-maintenance rounded-2xl px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: '#1A1A2E', border: '1px solid rgba(59,111,232,0.15)' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: 'rgba(59,111,232,0.15)' }}>
              <span style={{ fontSize: '1rem' }}>🔧</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-0.5">Hosting & maintenance included in every plan</p>
              <p className="text-white/40 text-xs leading-relaxed max-w-lg">
                Uptime monitoring, security updates, and content changes on request — all handled. From €29/mo.
              </p>
            </div>
          </div>
          <a href="#pricing" className="text-[#3B6FE8] text-sm font-semibold link-lift shrink-0 whitespace-nowrap">
            See plans →
          </a>
        </div>

      </div>
    </section>
  )
}
