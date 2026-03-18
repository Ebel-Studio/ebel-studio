import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Zap, Phone } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ── Card 1: Website Shuffler ─────────────────────────────────── */
function WebsiteShuffler() {
  const [active, setActive] = useState(0)
  const items = [
    { label: 'Vakantieverhuur', color: '#1D9E75', bars: [70, 85, 55, 90, 65] },
    { label: 'Lokaal MKB', color: '#22c55e', bars: [55, 70, 80, 60, 75] },
    { label: 'Horeca & Diensten', color: '#f59e0b', bars: [80, 60, 70, 85, 50] },
  ]

  useEffect(() => {
    const t = setInterval(() => setActive(v => (v + 1) % items.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative h-44 flex items-center justify-center">
      {items.map((item, i) => {
        const offset = (i - active + items.length) % items.length
        const isTop = offset === 0
        const isMid = offset === 1
        const isBot = offset === 2

        return (
          <div
            key={i}
            className="absolute w-full rounded-2xl border border-[#0F0F0E]/08 bg-[#F1EFE8] p-3 overflow-hidden"
            style={{
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isTop
                ? 'translateY(0) scale(1)'
                : isMid
                ? 'translateY(16px) scale(0.95)'
                : 'translateY(30px) scale(0.90)',
              opacity: isTop ? 1 : isMid ? 0.6 : 0.3,
              zIndex: isTop ? 3 : isMid ? 2 : 1,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
                style={{ background: item.color + '20', color: item.color }}
              >
                {item.label}
              </span>
              <span className="text-[10px] font-mono text-[#0F0F0E]/30">ebelstudio.nl</span>
            </div>
            <div className="flex items-end gap-1.5 h-10">
              {item.bars.map((h, j) => (
                <div
                  key={j}
                  className="flex-1 rounded-sm"
                  style={{ height: `${h}%`, background: item.color + '40' }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Card 2: AI Typewriter ────────────────────────────────────── */
function AITypewriter() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)

  const lines = [
    '> Analyseren merkidentiteit...',
    '> Genereren wireframes...',
    '> Schrijven landingspagina copy...',
    '> Bouwen React componenten...',
    '> Optimaliseren voor Google...',
    '> Deploy naar Vercel ✓',
    '> Live in 5 dagen. ✓',
  ]

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => {
        setDisplayedLines([])
        setCurrentLine('')
        setLineIdx(0)
        setCharIdx(0)
        setDone(false)
      }, 3000)
      return () => clearTimeout(t)
    }

    if (lineIdx >= lines.length) {
      setDone(true)
      return
    }

    const line = lines[lineIdx]

    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setCurrentLine(prev => prev + line[charIdx])
        setCharIdx(c => c + 1)
      }, 40)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line])
        setCurrentLine('')
        setLineIdx(i => i + 1)
        setCharIdx(0)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [charIdx, lineIdx, done])

  const isSuccess = (line) => line.includes('✓')

  return (
    <div className="bg-[#0F0F14] rounded-2xl p-4 h-44 overflow-hidden font-mono text-xs flex flex-col">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#1D9E75] status-dot" style={{ color: '#1D9E75' }} />
        <span className="text-[#1D9E75] text-[10px] tracking-widest uppercase font-semibold">Live Build</span>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-0.5">
        {displayedLines.slice(-5).map((line, i) => (
          <div
            key={i}
            className={`${isSuccess(line) ? 'text-[#22c55e]' : 'text-white/40'}`}
          >
            {line}
          </div>
        ))}
        {currentLine && (
          <div className="text-white/80 flex items-center gap-0">
            {currentLine}
            <span className="cursor-blink text-[#1D9E75] font-bold">▋</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Card 3: Scheduler ────────────────────────────────────────── */
function Scheduler() {
  const [selectedDay, setSelectedDay] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [animStep, setAnimStep] = useState(0)
  const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
  const targetDay = 2 // Wo

  useEffect(() => {
    const steps = [
      () => setAnimStep(1),        // cursor visible
      () => setSelectedDay(targetDay), // day selected
      () => setAnimStep(2),        // move to button
      () => setConfirmed(true),    // confirmed
      () => {                      // reset
        setSelectedDay(null)
        setConfirmed(false)
        setAnimStep(0)
      },
    ]
    const delays = [500, 1000, 1800, 2500, 4500]
    const timers = steps.map((fn, i) => setTimeout(fn, delays[i]))
    const loop = setInterval(() => {
      setAnimStep(1)
      const inner = steps.map((fn, i) => setTimeout(fn, delays[i]))
      return () => inner.forEach(clearTimeout)
    }, 5500)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(loop)
    }
  }, [])

  return (
    <div className="bg-[#F1EFE8] rounded-2xl border border-[#0F0F0E]/06 p-4 h-44 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[#0F0F0E]/50 text-xs font-mono">Inplannen gesprek</span>
        <span className="text-[#0F0F0E]/30 text-[10px] font-mono">april 2025</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <button
            key={i}
            className={`rounded-xl py-1.5 text-xs font-semibold transition-all duration-300 ${
              selectedDay === i
                ? 'bg-[#1D9E75] text-white scale-95 shadow-md shadow-[#1D9E75]/30'
                : 'bg-white/80 text-[#0F0F0E]/50 hover:bg-[#1D9E75]/10'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      <div
        className={`btn text-sm py-2 px-4 justify-center transition-all duration-500 ${
          animStep >= 2
            ? 'bg-[#1D9E75] text-white shadow-md shadow-[#1D9E75]/30 scale-[1.02]'
            : 'bg-white border border-[#0F0F0E]/10 text-[#0F0F0E]/50'
        }`}
        style={{ borderRadius: '0.75rem' }}
      >
        <span className="relative z-10">
          {confirmed ? '✓ Afspraak bevestigd!' : 'Bevestig afspraak'}
        </span>
      </div>
    </div>
  )
}

/* ── Main Services Section ────────────────────────────────────── */
const cardData = [
  {
    number: '01',
    icon: Globe,
    title: 'Websites op maat',
    desc: 'Van vakantieverhuurders tot lokale winkeliers — ik bouw sites die bezoekers omzetten in klanten.',
    component: WebsiteShuffler,
  },
  {
    number: '02',
    icon: Zap,
    title: 'AI-gedreven workflow',
    desc: 'Sneller, slimmer, voordeliger. Zonder concessies aan kwaliteit.',
    component: AITypewriter,
  },
  {
    number: '03',
    icon: Phone,
    title: 'Persoonlijk contact',
    desc: 'Geen grote organisatie. Één aanspreekpunt, directe communicatie, snel geschakeld.',
    component: Scheduler,
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="diensten"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F1EFE8]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <p className="text-[#0F0F0E]/40 text-sm font-mono tracking-widest uppercase mb-4">
            Diensten
          </p>
          <h2 className="font-sans font-bold text-[#0F0F0E] text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight max-w-xl">
            Alles wat je nodig hebt,
            <span className="font-serif italic text-[#1D9E75]"> in één hand.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardData.map((card, i) => {
            const Comp = card.component
            const Icon = card.icon
            return (
              <div
                key={i}
                ref={el => (cardsRef.current[i] = el)}
                className="card-surface p-6 flex flex-col gap-5 group hover:shadow-xl hover:shadow-black/08 transition-shadow duration-300"
              >
                {/* Number + icon */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[#0F0F0E]/15 text-5xl font-bold leading-none">
                    {card.number}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#1D9E75]/10 flex items-center justify-center">
                    <Icon size={18} className="text-[#1D9E75]" />
                  </div>
                </div>

                {/* Interactive component */}
                <Comp />

                {/* Title + desc */}
                <div>
                  <h3 className="font-sans font-bold text-[#0F0F0E] text-xl mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[#0F0F0E]/55 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
