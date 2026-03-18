import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, X, Send, Phone } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function ContactModal({ onClose }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ naam: '', bedrijf: '', email: '', omschrijving: '' })
  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.3 })
      gsap.from(modalRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const closeAnim = () => {
    gsap.to(modalRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-[#0F0F14]/70 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && closeAnim()}
    >
      <div
        ref={modalRef}
        className="bg-[#F1EFE8] rounded-[2rem] w-full max-w-lg p-8 relative shadow-2xl"
      >
        <button
          onClick={closeAnim}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#0F0F0E]/06 flex items-center justify-center hover:bg-[#0F0F0E]/10 transition-colors"
        >
          <X size={16} className="text-[#0F0F0E]/60" />
        </button>

        {!sent ? (
          <>
            <h3 className="font-sans font-bold text-[#0F0F0E] text-2xl mb-2">Stuur een bericht</h3>
            <p className="text-[#0F0F0E]/50 text-sm mb-6">Ik reageer doorgaans binnen een werkdag.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#0F0F0E]/50 text-xs font-mono uppercase tracking-wide mb-1.5 block">Naam</label>
                  <input
                    required
                    type="text"
                    placeholder="Jan Janssen"
                    value={form.naam}
                    onChange={e => setForm(f => ({ ...f, naam: e.target.value }))}
                    className="w-full bg-white border border-[#0F0F0E]/10 rounded-xl px-4 py-3 text-sm text-[#0F0F0E] placeholder-[#0F0F0E]/25 focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/40 transition"
                  />
                </div>
                <div>
                  <label className="text-[#0F0F0E]/50 text-xs font-mono uppercase tracking-wide mb-1.5 block">Bedrijf</label>
                  <input
                    type="text"
                    placeholder="Optioneel"
                    value={form.bedrijf}
                    onChange={e => setForm(f => ({ ...f, bedrijf: e.target.value }))}
                    className="w-full bg-white border border-[#0F0F0E]/10 rounded-xl px-4 py-3 text-sm text-[#0F0F0E] placeholder-[#0F0F0E]/25 focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/40 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#0F0F0E]/50 text-xs font-mono uppercase tracking-wide mb-1.5 block">E-mailadres</label>
                <input
                  required
                  type="email"
                  placeholder="jan@bedrijf.nl"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-white border border-[#0F0F0E]/10 rounded-xl px-4 py-3 text-sm text-[#0F0F0E] placeholder-[#0F0F0E]/25 focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/40 transition"
                />
              </div>

              <div>
                <label className="text-[#0F0F0E]/50 text-xs font-mono uppercase tracking-wide mb-1.5 block">Korte omschrijving</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Waar kan ik je mee helpen?"
                  value={form.omschrijving}
                  onChange={e => setForm(f => ({ ...f, omschrijving: e.target.value }))}
                  className="w-full bg-white border border-[#0F0F0E]/10 rounded-xl px-4 py-3 text-sm text-[#0F0F0E] placeholder-[#0F0F0E]/25 focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/40 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn bg-[#1D9E75] text-white text-sm px-6 py-3.5 justify-center mt-2 shadow-lg shadow-[#1D9E75]/25"
              >
                <span className="btn-bg bg-[#158a62]" />
                <span className="relative z-10 flex items-center gap-2">
                  Verstuur bericht <Send size={15} />
                </span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#1D9E75]/10 flex items-center justify-center mx-auto mb-6">
              <Send size={24} className="text-[#1D9E75]" />
            </div>
            <h3 className="font-sans font-bold text-[#0F0F0E] text-2xl mb-2">Bericht ontvangen!</h3>
            <p className="text-[#0F0F0E]/55 text-sm">Ik neem binnen een werkdag contact op. Tot snel!</p>
            <button
              onClick={closeAnim}
              className="btn bg-[#0F0F0E]/06 text-[#0F0F0E] text-sm px-6 py-3 mt-6"
            >
              <span className="relative z-10">Sluiten</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Animated cycling word in the Contact heading ── */
function AnimatedHeading() {
  const [index, setIndex] = useState(0)
  const phrases = useMemo(() => [
    'jouw website?',
    'meer klanten?',
    'online omzet?',
    'jouw verhaal?',
    'lokale groei?',
    'meer aanvragen?',
  ], [])

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex(i => (i + 1) % phrases.length)
    }, 2200)
    return () => clearTimeout(id)
  }, [index, phrases])

  return (
    <h2 className="font-serif italic text-white mb-6 leading-[1.05]">
      {/* Static first line */}
      <span
        className="block"
        style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', fontWeight: 600 }}
      >
        Klaar voor
      </span>

      {/* Animated cycling line */}
      <span
        className="relative flex w-full justify-center overflow-hidden"
        style={{ height: 'clamp(3.2rem, 8vw, 7rem)' }}
      >
        {phrases.map((phrase, i) => (
          <motion.span
            key={i}
            className="absolute inset-x-0 flex justify-center items-center font-serif italic"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 600,
              color: '#1D9E75',
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
  const [modalOpen, setModalOpen] = useState(false)

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
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="py-32 md:py-48 px-6 md:px-12 lg:px-20"
        style={{ background: '#0F0F14' }}
      >
        <div className="max-w-3xl mx-auto text-center contact-content">
          <p className="text-white/30 text-sm font-mono tracking-widest uppercase mb-6">
            Samenwerken
          </p>

          <AnimatedHeading />

          <p className="text-white/50 text-lg font-light mb-12 max-w-md mx-auto leading-relaxed">
            Ik denk graag mee over jouw website. Geen verplichtingen, geen verkooppraat — gewoon een eerlijk gesprek.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="btn bg-[#1D9E75] text-white text-base px-8 py-4 shadow-xl shadow-[#1D9E75]/30"
            >
              <span className="btn-bg bg-[#158a62]" />
              <span className="relative z-10 flex items-center gap-2">
                Stuur een bericht <ArrowRight size={18} />
              </span>
            </button>

            <a
              href="tel:+31612345678"
              className="btn border border-white/20 text-white text-base px-8 py-4"
            >
              <span className="btn-bg bg-white/08" />
              <span className="relative z-10 flex items-center gap-2">
                <Phone size={16} /> Bel direct: 06-12 34 56 78
              </span>
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-white/08">
            {['Geen verplichtingen', 'Reactie binnen 24 uur', 'Gratis adviesgesprek'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                <span className="text-white/35 text-sm font-mono">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
