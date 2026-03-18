import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function AnimatedHeading() {
  const [index, setIndex] = useState(0)
  const phrases = useMemo(() => [
    'jouw website?',
    'jouw huisstijl?',
    'een one-pager?',
    'jouw verhaal?',
    'snelle oplevering?',
  ], [])

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex(i => (i + 1) % phrases.length)
    }, 2200)
    return () => clearTimeout(id)
  }, [index, phrases])

  return (
    <h2 className="font-heading font-semibold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
      <span className="block" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
        Klaar voor
      </span>
      <span
        className="relative flex w-full justify-center overflow-hidden"
        style={{ height: 'clamp(3rem, 7vw, 5.5rem)' }}
      >
        {phrases.map((phrase, i) => (
          <motion.span
            key={i}
            className="absolute inset-x-0 flex justify-center items-center font-heading font-semibold"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              color: '#52B788',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', stiffness: 55, damping: 14 }}
            animate={
              index === i
                ? { y: 0, opacity: 1 }
                : { y: index > i ? -90 : 90, opacity: 0 }
            }
          >
            {phrase}
          </motion.span>
        ))}
      </span>
    </h2>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20"
      style={{ background: '#1A1A1A' }}
    >
      <div className="max-w-3xl mx-auto text-center contact-content">
        <p className="text-white/30 text-sm font-mono tracking-widest uppercase mb-6">
          Samenwerken
        </p>

        <AnimatedHeading />

        <p className="text-white/50 text-lg font-light mb-12 max-w-md mx-auto leading-relaxed">
          Heb je een project in gedachten? Stuur me een bericht — ik reageer binnen een dag.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/31612345678"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#2D6A4F] text-white text-base px-8 py-4 shadow-xl shadow-[#2D6A4F]/30"
          >
            <span className="btn-bg bg-[#1A3D2B]" />
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle size={18} /> WhatsApp
            </span>
          </a>

          <a
            href="mailto:hello@ebel.studio"
            className="btn border border-white/20 text-white text-base px-8 py-4"
          >
            <span className="btn-bg bg-white/08" />
            <span className="relative z-10 flex items-center gap-2">
              <Mail size={16} /> Stuur een mail
            </span>
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-white/08">
          {['Geen verplichtingen', 'Reactie binnen 24 uur', 'Gratis adviesgesprek'].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
              <span className="text-white/35 text-sm font-mono">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
