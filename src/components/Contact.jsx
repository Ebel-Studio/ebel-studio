import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function AnimatedHeading() {
  const [index, setIndex] = useState(0)
  const phrases = useMemo(() => [
    'working together?',
    'an artist website?',
    'a business site?',
    'a fast turnaround?',
    'your story online?',
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
        Ready for
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
              color: '#3B6FE8',
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
      style={{ background: '#111111' }}
    >
      <div className="max-w-3xl mx-auto text-center contact-content">
        <p className="text-white/30 text-sm font-mono tracking-widest uppercase mb-6">
          Let's talk
        </p>

        <AnimatedHeading />

        <p className="text-white/50 text-lg font-light mb-12 max-w-md mx-auto leading-relaxed">
          Send a WhatsApp and I'll get back to you within a few hours. Prefer a call? That works too.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/31612345678"
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-white text-base px-8 py-4 shadow-xl shadow-[#25D366]/20"
            style={{ background: '#25D366' }}
          >
            <span className="btn-bg" style={{ background: '#1aad54' }} />
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle size={16} /> WhatsApp me
            </span>
          </a>

          <a
            href="mailto:hello@ebel.studio"
            className="inline-flex items-center justify-center gap-2 text-white/45 text-sm font-medium px-6 py-4"
            style={{ letterSpacing: '-0.01em' }}
          >
            <Mail size={15} /> hello@ebel.studio
          </a>
        </div>

        <p className="text-white/25 text-sm font-mono mt-6">hello@ebel.studio</p>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-10 border-t border-white/08">
          {['No obligation', 'Reply within 24 hours', 'Free intro call'].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A2E]" />
              <span className="text-white/35 text-sm font-mono">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
