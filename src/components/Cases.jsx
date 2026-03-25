import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ── Canvas 0: Lumine — Music Equalizer (cyan Lumine palette) ─── */
function LumineEqualizerCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const BAR_COUNT = 36
    const targets = Array.from({ length: BAR_COUNT }, () => Math.random())
    const current = Array.from({ length: BAR_COUNT }, () => Math.random() * 0.3)
    const speeds  = Array.from({ length: BAR_COUNT }, () => 0.02 + Math.random() * 0.04)

    // Randomise targets continuously
    const updateTargets = () => {
      targets.forEach((_, i) => {
        if (Math.random() < 0.08) {
          targets[i] = 0.08 + Math.random() * 0.92
        }
      })
    }
    const targetInterval = setInterval(updateTargets, 180)

    const draw = () => {
      const w = canvas.width  = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const gap    = 3
      const barW   = (w - gap * (BAR_COUNT - 1)) / BAR_COUNT
      const cyan   = '90, 173, 212'   // #5aadd4

      current.forEach((val, i) => {
        // Ease toward target
        current[i] += (targets[i] - val) * speeds[i]
        const barH = current[i] * h * 0.85
        const x    = i * (barW + gap)
        const y    = h - barH

        // Gradient fill: bright top → dim bottom
        const grad = ctx.createLinearGradient(x, y, x, h)
        grad.addColorStop(0,   `rgba(${cyan}, 0.90)`)
        grad.addColorStop(0.5, `rgba(${cyan}, 0.45)`)
        grad.addColorStop(1,   `rgba(${cyan}, 0.10)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.roundRect(x, y, barW, barH, [2, 2, 0, 0])
        ctx.fill()

        // Glow on tall bars
        if (current[i] > 0.6) {
          ctx.shadowBlur  = 12
          ctx.shadowColor = `rgba(${cyan}, 0.6)`
          ctx.fill()
          ctx.shadowBlur  = 0
        }
      })

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(targetInterval)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

/* ── Canvas 1: Rotating house floor plan ─────────────────────── */
function FloorplanCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0, raf

    const draw = () => {
      const w = canvas.width  = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.translate(w / 2, h / 2)
      ctx.rotate(frame * 0.003)

      const rooms = [
        { x: -70, y: -50, w: 120, h: 80 },
        { x: -70, y: 40,  w: 60,  h: 60 },
        { x: 0,   y: 40,  w: 60,  h: 60 },
        { x: 60,  y: -50, w: 80,  h: 80 },
      ]
      rooms.forEach(r => {
        ctx.strokeStyle = 'rgba(29, 158, 117, 0.5)'
        ctx.lineWidth   = 1.5
        ctx.strokeRect(r.x, r.y, r.w, r.h)
        ctx.fillStyle   = 'rgba(29, 158, 117, 0.05)'
        ctx.fillRect(r.x, r.y, r.w, r.h)
      })
      ctx.strokeStyle = 'rgba(29, 158, 117, 0.3)'
      ctx.lineWidth   = 1
      ctx.beginPath()
      ctx.arc(-70, -10, 20, -Math.PI / 2, 0)
      ctx.stroke()
      ctx.restore()
      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

/* ── Canvas 2: Horizontal scan line over dot grid ────────────── */
function ScanlineCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let scanX = 0, raf

    const draw = () => {
      const w = canvas.width  = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      const cols = 12, rows = 8
      const cW = w / cols, cH = h / rows

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * cW + cW / 2
          const cy = r * cH + cH / 2
          const intensity = Math.max(0, 1 - Math.abs(cx - scanX) / (cW * 3))
          ctx.fillStyle = `rgba(29, 158, 117, ${0.15 + intensity * 0.6})`
          ctx.beginPath()
          ctx.arc(cx, cy, 2 + intensity * 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      const grad = ctx.createLinearGradient(scanX - 60, 0, scanX + 60, 0)
      grad.addColorStop(0,   'rgba(29,158,117,0)')
      grad.addColorStop(0.5, 'rgba(29,158,117,0.4)')
      grad.addColorStop(1,   'rgba(29,158,117,0)')
      ctx.fillStyle = grad
      ctx.fillRect(scanX - 60, 0, 120, h)
      scanX = (scanX + 1.5) % w
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

/* ── Canvas 3: HvAB Community Network — drijvende nodes + lijnen */
function CommunityNetworkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let nodes = []

    const NAVY  = '61, 84, 159'   // #3D549F
    const AMBER = '238, 187, 55'  // #EEBB37
    const NODE_COUNT = 18
    const CONNECT_DIST = 80

    const init = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x:   Math.random() * w,
        y:   Math.random() * h,
        vx:  (Math.random() - 0.5) * 0.5,
        vy:  (Math.random() - 0.5) * 0.5,
        r:   2.5 + Math.random() * 2.5,
        // every 4th node is an amber "hub"
        hub: i % 4 === 0,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    init()

    const draw = () => {
      const w = canvas.width  = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight

      // Re-init if canvas resized significantly
      if (nodes.length === 0) init()

      ctx.clearRect(0, 0, w, h)

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.03
        // Bounce
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      })

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.45
            // Hub connections get amber tint
            const isHubLink = nodes[i].hub || nodes[j].hub
            ctx.strokeStyle = isHubLink
              ? `rgba(${AMBER}, ${alpha * 0.9})`
              : `rgba(${NAVY},  ${alpha})`
            ctx.lineWidth = isHubLink ? 1.2 : 0.8
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulseFactor = 1 + Math.sin(n.pulse) * 0.2

        if (n.hub) {
          // Amber hub: glow ring
          ctx.shadowBlur  = 10
          ctx.shadowColor = `rgba(${AMBER}, 0.7)`
          ctx.fillStyle   = `rgba(${AMBER}, 0.85)`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * pulseFactor, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          // Navy satellite node
          ctx.fillStyle = `rgba(${NAVY}, 0.70)`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

/* ── Data ─────────────────────────────────────────────────────── */
const cases = [
  {
    number:    '00',
    tag:       'Muziekartiest',
    title:     'LUMINE — Jesse Klinkhamer',
    headline:  'Een cinematisch portfolio dat de muziek ademt.',
    desc:      'Volledig maatwerk voor opkomend muziekartiest Jesse Klinkhamer. Film grain overlay, GSAP-scroll animaties, animated stats counters, live show-agenda met automatisch vervagende past-shows — alles gebouwd vanuit één briefing.',
    stats: [
      { value: '100%',   label: 'Custom design'      },
      { value: 'GSAP',   label: 'Animatie-engine'    },
      { value: '5 dgn',  label: 'Van brief tot live' },
    ],
    tech: ['React', 'GSAP', 'Bebas Neue', 'Film Grain', 'Vercel'],
    CanvasComp: LumineEqualizerCanvas,
    image:    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80&auto=format&fit=crop',
    liveUrl:  'https://lumine-theta.vercel.app/',
    accent:   '#5aadd4',   // Lumine's own cyan
    cardBg:   '#07111a',   // Lumine's own navy bg
    featured: true,
  },
  {
    number:    '01',
    tag:       'Vakantieverhuur',
    title:     'Vakantiehuisje Schoorl',
    headline:  'Van Google zoektocht tot boekingsaanvraag in 3 klikken.',
    desc:      'Een persoonlijk vakantieverhuurder in Noord-Holland stond onzichtbaar online. Na lancering: vol geboekt in het eerste seizoen.',
    stats: [
      { value: '+340%', label: 'Organisch bereik'  },
      { value: '3 kliks', label: 'Naar boeking'    },
      { value: '5 dgn',   label: 'Oplevering'      },
    ],
    tech: ['Vite', 'Tailwind', 'Vercel', 'Google Maps'],
    CanvasComp: FloorplanCanvas,
    image:   'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80&auto=format&fit=crop',
    liveUrl: null,
    accent:  '#1D9E75',
    cardBg:  '#16161C',
    featured: false,
  },
  {
    number:    '02',
    tag:       'Boutique Verblijf',
    title:     'Studio Klein Schoorl',
    headline:  'Karaktervolle site die het verhaal van de plek vertelt.',
    desc:      'Een uniek boutique-verblijf verdiende een site die even bijzonder was als de locatie zelf. Storytelling-first design.',
    stats: [
      { value: '4.9/5', label: 'Review score'       },
      { value: '+180%', label: 'Directe aanvragen'  },
      { value: '7 dgn', label: 'Van brief tot live' },
    ],
    tech: ['React', 'GSAP', 'CMS', 'Vercel'],
    CanvasComp: ScanlineCanvas,
    image:   'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80&auto=format&fit=crop',
    liveUrl: null,
    accent:  '#1D9E75',
    cardBg:  '#16161C',
    featured: false,
  },
  {
    number:    '03',
    tag:       'Civieke Organisatie',
    title:     'Huis van Actief Burgerschap NHN',
    headline:  'Mensen verbinden. Initiatieven versterken. Gemeenschappen bouwen.',
    desc:      'Een volledig maatwerk platform voor een civieke organisatie in Noord-Holland Noord. Interactieve Leaflet-kaart met custom house-pin markers, Framer Motion scroll-animaties, animated stats, en een warm design dat overheidssite-saaiheid doorbreekt.',
    stats: [
      { value: '5',     label: 'Regio-locaties op kaart' },
      { value: 'FM',    label: 'Framer Motion'           },
      { value: '8 dgn', label: 'Van brief tot live'      },
    ],
    tech: ['React', 'TypeScript', 'Framer Motion', 'Leaflet', 'Tailwind v4', 'Vercel'],
    CanvasComp: CommunityNetworkCanvas,
    image:   'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop',
    liveUrl: 'https://huis-van-actief-burgerschap.vercel.app/',
    accent:  '#EEBB37',
    cardBg:  '#1a1f35',
    featured: false,
  },
]

/* ── Component ────────────────────────────────────────────────── */
export default function Cases() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const underlineRef = useRef(null)
  const cardRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Section heading fade-up
      gsap.from(headingRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })

      // Lumine-inspired underline reveal on section title
      gsap.fromTo(underlineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.1,
          ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        }
      )

      // Card scale/blur stack effect on scroll
      const cards = cardRefs.current.filter(Boolean)
      cards.forEach((card, i) => {
        if (i === 0) return
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const prev = cards[i - 1]
            if (!prev) return
            gsap.set(prev, {
              scale:   1 - self.progress * 0.05,
              filter:  `blur(${self.progress * 8}px)`,
              opacity: 1 - self.progress * 0.4,
            })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="werk" ref={sectionRef} className="bg-[#0F0F0E] py-24">

      {/* Section heading */}
      <div ref={headingRef} className="px-6 md:px-12 lg:px-20 mb-16">
        <p className="text-white/30 text-sm font-mono tracking-widest uppercase mb-4">Cases</p>
        <div className="relative inline-block">
          <h2 className="font-sans font-bold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            Werk dat
            <span className="font-serif italic text-[#1D9E75]"> voor zich spreekt.</span>
          </h2>
          {/* Underline reveal — Lumine pattern */}
          <span
            ref={underlineRef}
            className="absolute -bottom-2 left-0 right-0 h-px bg-[#1D9E75]/40"
            style={{ display: 'block', transformOrigin: 'left center' }}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4 px-4 md:px-8 lg:px-12">
        {cases.map((c, i) => {
          const Canvas = c.CanvasComp
          return (
            <div
              key={i}
              ref={el => (cardRefs.current[i] = el)}
              className="relative rounded-[2rem] overflow-hidden border border-white/05 group"
              style={{
                minHeight: c.featured ? '85vh' : '72vh',
                background: c.cardBg,
                willChange: 'transform',
              }}
            >
              {/* Lumine-inspired: glow on hover via box-shadow */}
              <div
                className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
                style={{ boxShadow: `inset 0 0 80px ${c.accent}18` }}
              />

              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  style={{ opacity: c.featured ? 0.12 : 0.18 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: c.featured
                      ? `linear-gradient(to right, ${c.cardBg} 35%, ${c.cardBg}88 70%, ${c.cardBg}40)`
                      : `linear-gradient(to top, ${c.cardBg} 40%, ${c.cardBg}cc 70%, transparent)`,
                  }}
                />
              </div>

              {/* Featured badge */}
              {c.featured && (
                <div className="absolute top-8 left-8 z-10">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-semibold tracking-widest uppercase"
                    style={{ background: `${c.accent}20`, color: c.accent, border: `1px solid ${c.accent}40` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: c.accent }} />
                    Live project
                  </span>
                </div>
              )}

              {/* Canvas animation — top right */}
              <div
                className="absolute z-10 canvas-card"
                style={{
                  top: c.featured ? '5rem' : '2rem',
                  right: '2rem',
                  width: c.featured ? '40%' : '45%',
                  maxWidth: c.featured ? '480px' : '320px',
                  height: c.featured ? '200px' : '160px',
                  opacity: 0.75,
                }}
              >
                <Canvas />
              </div>

              {/* Content */}
              <div
                className="relative z-10 flex flex-col justify-end p-8 md:p-12"
                style={{ minHeight: c.featured ? '85vh' : '72vh' }}
              >
                <div className="max-w-2xl">

                  {/* Number + tag */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-white/25 text-sm">{c.number}</span>
                    <span className="w-px h-4 bg-white/15" />
                    <span
                      className="text-xs font-mono tracking-widest uppercase"
                      style={{ color: c.accent }}
                    >
                      {c.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-sans font-bold text-white mb-3 ${
                      c.featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
                    }`}
                  >
                    {c.title}
                  </h3>

                  {/* Headline quote */}
                  <p className="font-serif italic text-white/80 text-xl md:text-2xl mb-4 leading-snug">
                    "{c.headline}"
                  </p>

                  {/* Description */}
                  <p className="text-white/45 text-sm leading-relaxed mb-7 max-w-lg">{c.desc}</p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {c.tech.map(t => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full"
                        style={{
                          background: `${c.accent}15`,
                          color: `${c.accent}cc`,
                          border: `1px solid ${c.accent}25`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-8 mb-8">
                    {c.stats.map((stat, j) => (
                      <div key={j}>
                        <p
                          className="font-bold text-xl font-mono"
                          style={{ color: j === 0 ? c.accent : 'white' }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-white/30 text-xs font-mono mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    {c.liveUrl && (
                      <a
                        href={c.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn text-sm px-5 py-2.5 text-white font-semibold"
                        style={{
                          background: c.accent,
                          boxShadow: `0 8px 24px ${c.accent}40`,
                        }}
                      >
                        <span
                          className="btn-bg"
                          style={{ background: 'rgba(255,255,255,0.15)' }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          Bekijk live site <ExternalLink size={14} />
                        </span>
                      </a>
                    )}
                    <button className="btn border border-white/15 text-white/65 hover:text-white text-sm px-5 py-2.5">
                      <span className="btn-bg bg-white/08" />
                      <span className="relative z-10 flex items-center gap-2">
                        Case bekijken <ArrowUpRight size={14} />
                      </span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
