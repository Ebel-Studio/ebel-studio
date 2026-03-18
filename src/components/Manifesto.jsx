import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const sectionRef = useRef(null)
  const wordsRef = useRef([])
  const line1Ref = useRef(null)

  const dramaticWords = [
    { text: 'Ik', accent: false },
    { text: 'lever', accent: false },
    { text: 'resultaat.', accent: true },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle line 1 fade in
      gsap.from(line1Ref.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Word-by-word reveal for dramatic line
      wordsRef.current.forEach((word, i) => {
        if (!word) return
        gsap.from(word, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ background: '#0F0F14' }}
    >
      {/* Background texture image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=60&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(15,15,20,0.88)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">

        {/* Neutral statement */}
        <p
          ref={line1Ref}
          className="text-white/35 text-base md:text-xl font-sans font-light mb-10 max-w-lg"
        >
          De meeste webdesigners leveren: een mooie pagina. Een presentatie. Een visitekaartje zonder call-to-action.
        </p>

        {/* Dramatic statement */}
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          {dramaticWords.map((word, i) => (
            <span
              key={i}
              ref={el => (wordsRef.current[i] = el)}
              className={`font-serif italic leading-none ${
                word.accent
                  ? 'text-[#1D9E75]'
                  : 'text-white'
              }`}
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                fontWeight: 600,
              }}
            >
              {word.text}
            </span>
          ))}
        </div>

        {/* Supporting copy */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Snelheid', text: 'Van briefing tot live website in 5 tot 10 werkdagen.' },
            { label: 'Strategie', text: 'Niet alleen bouwen — samen nadenken over conversie en vindbaarheid.' },
            { label: 'Eerlijkheid', text: 'Geen verborgen kosten, geen vage deadlines, geen excuses.' },
          ].map((item, i) => (
            <div key={i} className="border-t border-white/10 pt-6">
              <p className="text-[#1D9E75] text-xs font-mono tracking-widest uppercase mb-3">{item.label}</p>
              <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
