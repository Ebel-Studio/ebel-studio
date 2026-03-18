import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Music, Wrench } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    icon: Globe,
    title: 'Website + huisstijl',
    text: 'Een complete online identiteit. Moderne website van 1–5 pagina\'s, logo, kleurpalet en lettertypes. Live binnen een week.',
    price: 'Vanaf €450',
    tag: '01',
  },
  {
    icon: Music,
    title: 'Artiest one-pager',
    text: 'Strakke one-page site voor muzikanten en creatieven. Bio, foto\'s, social links en booking. Snel en gericht.',
    price: 'Vanaf €275',
    tag: '02',
  },
  {
    icon: Wrench,
    title: 'Onderhoud & updates',
    text: 'Ik houd je site live en up-to-date. Kleine aanpassingen, technisch beheer, altijd bereikbaar.',
    price: '€35 / maand',
    tag: '03',
  },
]

export default function Diensten() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dienst-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
      id="diensten"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ background: '#F8F6F1' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-[#2D6A4F] text-sm font-mono tracking-widest uppercase mb-3">Wat ik doe</p>
          <h2
            className="font-heading font-semibold text-[#1A1A1A]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Diensten
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, title, text, price, tag }) => (
            <div key={tag} className="dienst-card card-surface p-8 flex flex-col gap-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F]/08 flex items-center justify-center">
                  <Icon size={20} className="text-[#2D6A4F]" />
                </div>
                <span className="font-mono text-xs text-[#1A1A1A]/25 tracking-widest">{tag}</span>
              </div>
              <div className="flex-1">
                <h3
                  className="font-heading font-semibold text-[#1A1A1A] mb-3"
                  style={{ fontSize: '1.2rem', letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <p className="text-[#1A1A1A]/55 text-sm leading-relaxed">{text}</p>
              </div>
              <div className="pt-4 border-t border-[#1A1A1A]/06">
                <span className="font-heading font-semibold text-[#2D6A4F]" style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                  {price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
