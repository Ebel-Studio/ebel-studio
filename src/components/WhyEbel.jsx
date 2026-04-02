import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const POINTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: '#25D366',
    title: 'Updates via WhatsApp',
    text: 'New show, price change, new photos — send a WhatsApp and it\'s live within minutes. No invoice, no support ticket, no waiting on a call.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    color: '#3B6FE8',
    title: 'Live within days',
    text: 'No drawn-out timelines, no vague hour estimates. AI-assisted build means faster delivery — without cutting corners on the design.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    color: '#F59E0B',
    title: 'Honest price',
    text: 'Built with AI tools = lower overhead. Designed by someone with a real design education = no quality compromise. Agency results, freelancer rates.',
  },
]

export default function WhyEbel() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-header', {
        y: 24, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
      })
      gsap.from('.why-point', {
        y: 36, opacity: 0, duration: 0.75, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-6 md:px-12 lg:px-20"
      style={{ background: '#111827' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="why-header mb-14 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(59,111,232,0.7)' }}>
              Why Ebel
            </p>
            <h2
              className="font-heading font-semibold text-white"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Every developer can build you a website.
              <br />
              <span style={{ color: 'rgba(255,255,255,0.38)' }}>Here's what's different.</span>
            </h2>
          </div>
        </div>

        {/* 3 points */}
        <div className="why-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {POINTS.map(({ icon, color, title, text }) => (
            <div
              key={title}
              className="why-point flex flex-col gap-4 rounded-2xl p-7"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}
              >
                {icon}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.44)' }}>
                  {text}
                </p>
              </div>
              <div className="h-px w-full rounded-full mt-auto" style={{ background: `linear-gradient(to right, ${color}44, transparent)` }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
