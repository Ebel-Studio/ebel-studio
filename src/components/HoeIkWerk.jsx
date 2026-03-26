import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    tag: 'The Intro',
    title: 'Your vision, my design',
    text: 'We start with a short conversation about your goals. Most clients don\'t know exactly what their dream site should look like — and that\'s completely fine. You share your story, I take the lead and craft a professional, tailor-made design from scratch.',
    color: '#3B6FE8',
    bgColor: 'rgba(59,111,232,0.08)',
    borderColor: 'rgba(59,111,232,0.18)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'The Build',
    title: 'Live before you know it',
    text: 'Once we\'re aligned, I build. No drawn-out timelines, no vague hour estimates. Within days a high-end, production-ready website rolls out of the pipeline and goes live — sharp and ready to convert.',
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.08)',
    borderColor: 'rgba(139,92,246,0.18)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'The WhatsApp Updates',
    title: 'No more loose invoices',
    text: 'Once your site is live, you get access to my custom-built AI Developer. Just WhatsApp your changes — a new show, a news item, a price update. It\'s live within minutes. No support tickets, no developer on standby.',
    badge: 'Inclusief Chrome-extensie — stuur updates direct vanuit je browser',
    color: '#22C55E',
    bgColor: 'rgba(34,197,94,0.08)',
    borderColor: 'rgba(34,197,94,0.18)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    num: '04',
    tag: 'The Maintenance',
    title: 'Worry-free hosting',
    text: 'One clear monthly fee — your site always runs at its best. I manage the cloud servers, install security updates, and keep training the AI system in the background. You focus on your work. The tech just runs.',
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.18)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
]

export default function HoeIkWerk() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.hiw-header', {
        y: 28, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      // Cards stagger
      gsap.from('.hiw-card', {
        y: 44, opacity: 0, duration: 0.8, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: '.hiw-grid', start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="werkwijze"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ background: 'linear-gradient(180deg, #0b0e1a 0%, #0d1121 100%)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="hiw-header mb-14 md:mb-20">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(59,111,232,0.7)' }}>
            Process
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-heading font-semibold text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Hoe het werkt
            </h2>
            <p className="text-white/35 text-sm leading-relaxed max-w-sm md:text-right">
              From first conversation to a site that runs itself — here's exactly what working with me looks like.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="hiw-grid grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {STEPS.map(({ num, tag, title, text, badge, color, bgColor, borderColor, icon }) => (
            <div
              key={num}
              className="hiw-card relative flex flex-col gap-5 rounded-2xl p-7 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${borderColor}`,
                borderTop: `1px solid ${borderColor}`,
              }}
            >
              {/* Subtle color glow in top-left corner */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: `radial-gradient(320px circle at -10% -10%, ${bgColor} 0%, transparent 60%)`,
                }}
              />

              {/* Top row: icon + number */}
              <div className="relative flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: bgColor, border: `1px solid ${borderColor}`, color }}
                >
                  {icon}
                </div>
                <span
                  className="font-heading font-semibold select-none"
                  style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1, color: 'rgba(255,255,255,0.05)' }}
                >
                  {num}
                </span>
              </div>

              {/* Tag + title + text */}
              <div className="relative flex flex-col gap-2 flex-1">
                <p className="font-mono text-[0.6rem] tracking-widest uppercase font-semibold" style={{ color }}>
                  {tag}
                </p>
                <h3
                  className="font-heading font-semibold text-white"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {text}
                </p>
                {badge && (
                  <div className="flex items-center gap-2 mt-2" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px', padding: '7px 12px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
                    </svg>
                    <span className="text-xs font-medium" style={{ color: '#22C55E' }}>{badge}</span>
                  </div>
                )}
              </div>

              {/* Bottom color bar */}
              <div
                className="relative h-px w-full rounded-full"
                style={{ background: `linear-gradient(to right, ${color}55, transparent)` }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
