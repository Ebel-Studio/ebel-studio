import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Discovery',
    text: 'You tell me what you need. I ask the right questions. No complicated briefing process.',
  },
  {
    num: '02',
    title: 'Design & build',
    text: 'I use the latest AI tools to deliver fast and sharp. First version ready within days.',
  },
  {
    num: '03',
    title: 'Launch',
    text: 'Approval, small tweaks, and you\'re live. You get full access to everything.',
  },
]

export default function HoeIkWerk() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stap-item', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-[#1A1A2E] text-sm font-mono tracking-widest uppercase mb-3">Process</p>
          <h2 className="font-heading font-semibold text-[#111111]" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            How I work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map(({ num, title, text }, i) => (
            <div
              key={num}
              className="stap-item relative flex flex-col gap-5 py-8 md:py-0 md:pr-12"
              style={{
                borderTop: '1px solid rgba(26,26,26,0.08)',
                borderRight: i < steps.length - 1 ? '1px solid rgba(26,26,26,0.08)' : 'none',
                paddingLeft: i === 0 ? 0 : '3rem',
              }}
            >
              <span
                className="font-heading font-semibold text-[#1A1A2E]/20"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {num}
              </span>
              <div>
                <h3 className="font-heading font-semibold text-[#111111] mb-3" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                  {title}
                </h3>
                <p className="text-[#111111]/55 text-sm leading-relaxed max-w-xs">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
