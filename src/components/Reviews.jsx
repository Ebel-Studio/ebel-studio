import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    name: 'Bertus & Marian Koops',
    company: 'Vakantiehuisje Schoorl',
    avatar: 'BK',
    color: '#1D9E75',
    rating: 5,
    date: 'maart 2025',
    text: 'Binnen een week stonden we online. Ebel had echt door wat wij nodig hadden — niet te ingewikkeld, gewoon een duidelijke site die boekingen binnenbrengt. We hadden al na drie dagen de eerste aanvraag via de site. Aanrader!',
  },
  {
    name: 'Lotte van der Berg',
    company: 'Studio Klein Schoorl',
    avatar: 'LB',
    color: '#22c55e',
    rating: 5,
    date: 'februari 2025',
    text: 'Professioneel, persoonlijk en hij snapt echt wat je nodig hebt. Ebel heeft mijn visie perfect vertaald naar een site die precies de sfeer van ons verblijf uitstraalt. Gasten complimenteren de site regelmatig.',
  },
  {
    name: 'Klaas Hoekstra',
    company: 'Hoekstra Bouw & Renovatie',
    avatar: 'KH',
    color: '#f59e0b',
    rating: 5,
    date: 'januari 2025',
    text: 'Snel, betaalbaar, en staat als een huis. Ik was sceptisch over AI-gedreven webdesign, maar het eindresultaat overtrof mijn verwachtingen. Inmiddels krijg ik drie keer zo veel aanvragen via Google.',
  },
]

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
      ))}
    </div>
  )
}

export default function Reviews() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.12,
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
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F1EFE8]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="text-[#0F0F0E]/40 text-sm font-mono tracking-widest uppercase mb-4">
              Reviews
            </p>
            <h2 className="font-sans font-bold text-[#0F0F0E] text-4xl md:text-5xl tracking-tight leading-tight">
              Wat klanten
              <span className="font-serif italic text-[#1D9E75]"> zeggen.</span>
            </h2>
          </div>

          {/* Average badge */}
          <div className="flex items-center gap-4 bg-white rounded-2xl border border-[#0F0F0E]/08 px-6 py-4 shadow-sm w-fit">
            <div>
              <p className="font-mono font-bold text-3xl text-[#0F0F0E] leading-none">5.0</p>
              <p className="text-[#0F0F0E]/40 text-xs font-mono mt-0.5">Gemiddeld</p>
            </div>
            <div>
              <Stars count={5} />
              <p className="text-[#0F0F0E]/40 text-xs font-mono mt-1">Google Reviews</p>
            </div>
          </div>
        </div>

        {/* Review cards — horizontal scroll on mobile */}
        <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible snap-x snap-mandatory">
          {reviews.map((review, i) => (
            <div
              key={i}
              ref={el => (cardRefs.current[i] = el)}
              className="card-surface p-6 flex flex-col gap-4 min-w-[85vw] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink"
            >
              {/* Stars + date */}
              <div className="flex items-center justify-between">
                <Stars count={review.rating} />
                <span className="text-[#0F0F0E]/30 text-xs font-mono">{review.date}</span>
              </div>

              {/* Review text */}
              <p className="text-[#0F0F0E]/70 text-sm leading-relaxed flex-1">
                "{review.text}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#0F0F0E]/06">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: review.color }}
                >
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#0F0F0E] text-sm leading-tight">{review.name}</p>
                  <p className="text-[#0F0F0E]/40 text-xs">{review.company}</p>
                </div>
                {/* Google G icon */}
                <div className="ml-auto">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
