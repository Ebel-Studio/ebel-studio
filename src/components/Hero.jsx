import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STYLES = `
  /* ── Pre-animation initial states (prevent flash on load) ── */
  .ch-card { transform: translateY(200vh) scale(0.92); }
  .ch-line1 { opacity: 0; visibility: hidden; }
  .ch-line2 { clip-path: inset(0 100% 0 0); }
  .ch-subkop { opacity: 0; visibility: hidden; }
  .ch-hint  { opacity: 0; visibility: hidden; }
  .ch-col-left, .ch-mockup,
  .ch-badge-a, .ch-badge-b, .ch-cta { opacity: 0; visibility: hidden; }
  .ch-phone, .ch-bubble { opacity: 0; }
  .mob-slide-1, .mob-slide-2 { opacity: 0; visibility: hidden; }
  .mob-editing-badge, .mob-live-badge, .mob-cursor, .mob-show-after { opacity: 0; visibility: hidden; }
  .mob-bubble { opacity: 0; }

  /* ── Grid background ──────────────────────────── */
  .ch-grid {
    background-size: 56px 56px;
    background-image:
      linear-gradient(to right, rgba(17,17,17,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(17,17,17,0.05) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
  }

  /* ── Card shell ───────────────────────────────── */
  .ch-card {
    background: linear-gradient(145deg, #1c2660 0%, #080d1c 100%);
    box-shadow:
      0 40px 100px -16px rgba(0,0,0,0.9),
      0 20px 40px -16px rgba(0,0,0,0.6),
      inset 0 1px 2px rgba(255,255,255,0.12),
      inset 0 -2px 4px rgba(0,0,0,0.9);
    border: 1px solid rgba(255,255,255,0.04);
    will-change: transform, border-radius;
  }

  /* ── Mouse-light sheen inside card ───────────── */
  .ch-sheen {
    position: absolute; inset: 0; border-radius: inherit;
    pointer-events: none; z-index: 2;
    background: radial-gradient(
      640px circle at var(--mx, 50%) var(--my, 50%),
      rgba(59,111,232,0.08) 0%, transparent 40%
    );
  }

  /* ── Floating glass badge ─────────────────────── */
  .ch-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.09),
      0 16px 32px -8px rgba(0,0,0,0.65),
      inset 0 1px 1px rgba(255,255,255,0.12);
  }

  /* ── Browser mockup ───────────────────────────── */
  .ch-browser {
    background: #0d1117;
    box-shadow:
      0 28px 56px -10px rgba(0,0,0,0.9),
      0 10px 20px -6px rgba(0,0,0,0.6),
      inset 0 0 0 1px rgba(255,255,255,0.05);
    border-radius: 10px;
    overflow: hidden;
  }

  /* ── Text treatments ──────────────────────────── */
  .ch-dark-text {
    color: #111111;
    text-shadow: 0 4px 16px rgba(17,17,17,0.07);
  }
  .ch-fade-text {
    background: linear-gradient(170deg, #1A1A2E 0%, rgba(26,26,46,0.38) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
  }
  .ch-white-text {
    background: linear-gradient(180deg, #ffffff 0%, #8fa3bb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0 6px 14px rgba(0,0,0,0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  }
`

/* ── Lumine shows preview — zoomed in, big & readable ───────────── */
function SitePreview() {
  const showsBefore = [
    { date: '10 APR', venue: 'Fundbureau',    city: 'Hamburg'   },
    { date: '26 APR', venue: 'Poppodium 013', city: 'Tilburg'   },
  ]
  const showsAfter = [
    { date: '29 MEI', venue: 'IJland',     city: 'Ams.' },
    { date: '03 JUN', venue: 'Thuishaven', city: 'Ams.' },
  ]

  const showRow = (extra = {}) => ({
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '13px 20px', borderRadius: '8px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    ...extra,
  })

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg,#07111a 0%,#0a1828 100%)',
      fontFamily: '"Inter",sans-serif',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative',
    }}>


      {/* Slim nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 22px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
        background: 'rgba(7,17,26,0.97)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://lumine-theta.vercel.app/LOGO/lumein%20logo.png"
            alt="Lumine — artist website logo"
            loading="lazy"
            style={{ height: '22px', width: 'auto', display: 'block', filter: 'drop-shadow(0 0 4px rgba(90,173,212,0.3))' }}
            draggable={false}
          />
        </div>
        <div style={{ display: 'flex', gap: '18px' }}>
          {['Music','Shows','About','Connect'].map(l => (
            <span key={l} style={{ fontSize: '0.55rem', color: l === 'Shows' ? '#5aadd4' : 'rgba(255,255,255,0.38)' }}>{l}</span>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,#5aadd4,#3d8fb5)', borderRadius: '20px', padding: '5px 14px', fontSize: '0.52rem', fontWeight: 700, color: '#07111a' }}>
          Claim a Spot
        </div>
      </div>

      {/* Shows section — fills all remaining space */}
      <div style={{ flex: 1, padding: '22px 22px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>Upcoming Shows</h2>
          {/* Right side — domain label swaps out for edit/live badge */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>lumine.nl</span>
            <div className="ch-editing-badge" style={{
              position: 'absolute', right: 0, whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'rgba(90,173,212,0.18)', border: '1px solid rgba(90,173,212,0.4)',
              borderRadius: '20px', padding: '3px 9px',
              fontSize: '0.55rem', color: '#5aadd4', fontWeight: 700,
              visibility: 'hidden', opacity: 0,
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5aadd4', display: 'inline-block', flexShrink: 0, animation: 'lPulse 1s ease-in-out infinite' }} />
              Ebel is aan het editen…
            </div>
            <div className="ch-live-badge" style={{
              position: 'absolute', right: 0, whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: '20px', padding: '3px 9px',
              fontSize: '0.55rem', color: '#4ade80', fontWeight: 700,
              visibility: 'hidden', opacity: 0,
            }}>✓ Live</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>

          {/* Google Docs cursor — vertical caret + name badge to the right at caret-top */}
          <div className="ch-cursor" style={{ position: 'relative', height: '3px', opacity: 0, overflow: 'visible', margin: '2px 6px', flexShrink: 0 }}>
            {/* Caret line */}
            <div style={{ position: 'absolute', left: 0, top: '-13px', width: '2px', height: '26px', background: '#5aadd4', borderRadius: '1px', animation: 'lCaretBlink 0.7s ease-in-out infinite' }} />
            {/* Name badge — to the right of the caret, at caret-top, stays within header gap */}
            <div style={{ position: 'absolute', left: '6px', top: '-13px', background: '#5aadd4', color: '#07111a', fontSize: '0.44rem', fontWeight: 800, padding: '2px 7px', borderRadius: '0 3px 3px 3px', whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>
              Ebel
            </div>
          </div>

          {/* New shows wrapper — starts collapsed, expands to reveal new rows above old ones */}
          <div className="ch-show-after-wrapper" style={{ overflow: 'hidden', maxHeight: '0px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {showsAfter.map((s, i) => (
              <div key={`a${i}`} className="ch-show-after" style={showRow({ opacity: 0, background: 'rgba(90,173,212,0.08)', border: '1px solid rgba(90,173,212,0.22)', borderLeft: '3px solid #5aadd4' })}>
                <span style={{ fontSize: '0.64rem', color: '#5aadd4', fontFamily: 'monospace', fontWeight: 600, minWidth: '60px' }}>{s.date}</span>
                <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, flex: 1, paddingLeft: '6px' }}>{s.venue}</span>
                <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.38)', minWidth: '58px', textAlign: 'right', flexShrink: 0 }}>{s.city}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.46rem', background: 'rgba(90,173,212,0.22)', color: '#5aadd4', borderRadius: '4px', padding: '2px 7px', fontWeight: 800, letterSpacing: '0.05em' }}>NEW</span>
                  <div style={{ background: 'rgba(90,173,212,0.12)', border: '1px solid rgba(90,173,212,0.28)', borderRadius: '20px', padding: '5px 14px', fontSize: '0.54rem', color: '#5aadd4', fontWeight: 600 }}>Tickets →</div>
                </div>
              </div>
            ))}
          </div>

          {/* Original shows — always visible, stay in place */}
          {showsBefore.map((s, i) => (
            <div key={`b${i}`} className="ch-show-before" style={showRow()}>
              <span style={{ fontSize: '0.64rem', color: '#5aadd4', fontFamily: 'monospace', fontWeight: 600, minWidth: '60px' }}>{s.date}</span>
              <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, flex: 1, paddingLeft: '14px' }}>{s.venue}</span>
              <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.38)', paddingRight: '16px' }}>{s.city}</span>
              <div style={{ background: 'rgba(90,173,212,0.12)', border: '1px solid rgba(90,173,212,0.25)', borderRadius: '20px', padding: '5px 14px', fontSize: '0.54rem', color: '#5aadd4', fontWeight: 600, flexShrink: 0 }}>
                Tickets →
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lCaretBlink { 0%,45%{opacity:1} 55%,100%{opacity:0.1} }
        @keyframes lPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
      `}</style>
    </div>
  )
}

/* ── Animated site preview for mobile slide 2 (mob-* GSAP classes) ─ */
function MobileSitePreviewAnimated() {
  const showsBefore = [
    { date: '10 APR', venue: 'Fundbureau',    city: 'Hamburg' },
    { date: '26 APR', venue: 'Poppodium 013', city: 'Tilburg' },
  ]
  const showsAfter = [
    { date: '29 MEI', venue: 'IJland',     city: 'Ams.' },
    { date: '03 JUN', venue: 'Thuishaven', city: 'Ams.' },
  ]

  const showRow = (extra = {}) => ({
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '13px 20px', borderRadius: '8px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    ...extra,
  })

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg,#07111a 0%,#0a1828 100%)',
      fontFamily: '"Inter",sans-serif',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 22px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
        background: 'rgba(7,17,26,0.97)',
      }}>
        <img src="https://lumine-theta.vercel.app/LOGO/lumein%20logo.png" alt="Lumine — artist website logo" loading="lazy"
          style={{ height: '22px', width: 'auto', display: 'block', filter: 'drop-shadow(0 0 4px rgba(90,173,212,0.3))' }}
          draggable={false} />
        <div style={{ display: 'flex', gap: '18px' }}>
          {['Music','Shows','About','Connect'].map(l => (
            <span key={l} style={{ fontSize: '0.55rem', color: l === 'Shows' ? '#5aadd4' : 'rgba(255,255,255,0.38)' }}>{l}</span>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,#5aadd4,#3d8fb5)', borderRadius: '20px', padding: '5px 14px', fontSize: '0.52rem', fontWeight: 700, color: '#07111a' }}>
          Claim a Spot
        </div>
      </div>

      {/* Shows */}
      <div style={{ flex: 1, padding: '22px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>Upcoming Shows</h2>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>lumine.nl</span>
            <div className="mob-editing-badge" style={{
              position: 'absolute', right: 0, whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'rgba(90,173,212,0.18)', border: '1px solid rgba(90,173,212,0.4)',
              borderRadius: '20px', padding: '3px 9px',
              fontSize: '0.55rem', color: '#5aadd4', fontWeight: 700,
              visibility: 'hidden', opacity: 0,
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5aadd4', display: 'inline-block', flexShrink: 0, animation: 'lPulse 1s ease-in-out infinite' }} />
              Ebel is aan het editen…
            </div>
            <div className="mob-live-badge" style={{
              position: 'absolute', right: 0, whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: '20px', padding: '3px 9px',
              fontSize: '0.55rem', color: '#4ade80', fontWeight: 700,
              visibility: 'hidden', opacity: 0,
            }}>✓ Live</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {/* Google Docs cursor */}
          <div className="mob-cursor" style={{ position: 'relative', height: '3px', opacity: 0, overflow: 'visible', margin: '2px 6px', flexShrink: 0 }}>
            <div style={{ position: 'absolute', left: 0, top: '-13px', width: '2px', height: '26px', background: '#5aadd4', borderRadius: '1px', animation: 'lCaretBlink 0.7s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', left: '6px', top: '-13px', background: '#5aadd4', color: '#07111a', fontSize: '0.44rem', fontWeight: 800, padding: '2px 7px', borderRadius: '0 3px 3px 3px', whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>Ebel</div>
          </div>

          {/* New shows wrapper */}
          <div className="mob-show-after-wrapper" style={{ overflow: 'hidden', maxHeight: '0px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {showsAfter.map((s, i) => (
              <div key={i} className="mob-show-after" style={showRow({ opacity: 0, background: 'rgba(90,173,212,0.08)', border: '1px solid rgba(90,173,212,0.22)', borderLeft: '3px solid #5aadd4' })}>
                <span style={{ fontSize: '0.64rem', color: '#5aadd4', fontFamily: 'monospace', fontWeight: 600, minWidth: '60px' }}>{s.date}</span>
                <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, flex: 1, paddingLeft: '6px' }}>{s.venue}</span>
                <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.38)', minWidth: '58px', textAlign: 'right', flexShrink: 0 }}>{s.city}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.46rem', background: 'rgba(90,173,212,0.22)', color: '#5aadd4', borderRadius: '4px', padding: '2px 7px', fontWeight: 800 }}>NEW</span>
                  <div style={{ background: 'rgba(90,173,212,0.12)', border: '1px solid rgba(90,173,212,0.28)', borderRadius: '20px', padding: '5px 12px', fontSize: '0.54rem', color: '#5aadd4', fontWeight: 600 }}>Tickets →</div>
                </div>
              </div>
            ))}
          </div>

          {/* Original shows */}
          {showsBefore.map((s, i) => (
            <div key={i} style={showRow()}>
              <span style={{ fontSize: '0.64rem', color: '#5aadd4', fontFamily: 'monospace', fontWeight: 600, minWidth: '60px' }}>{s.date}</span>
              <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, flex: 1, paddingLeft: '6px' }}>{s.venue}</span>
              <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.38)', minWidth: '58px', textAlign: 'right', flexShrink: 0 }}>{s.city}</span>
              <div style={{ background: 'rgba(90,173,212,0.12)', border: '1px solid rgba(90,173,212,0.25)', borderRadius: '20px', padding: '5px 12px', fontSize: '0.54rem', color: '#5aadd4', fontWeight: 600, flexShrink: 0 }}>Tickets →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Static site preview (no GSAP classes) for mobile slides ────── */
function StaticSitePreview({ live = false }) {
  const showsBefore = [
    { date: '10 APR', venue: 'Fundbureau',    city: 'Hamburg'   },
    { date: '26 APR', venue: 'Poppodium 013', city: 'Tilburg'   },
  ]
  const showsAfter = [
    { date: '29 MEI', venue: 'IJland',     city: 'Ams.' },
    { date: '03 JUN', venue: 'Thuishaven', city: 'Ams.' },
  ]
  const shows = live ? [...showsAfter, ...showsBefore] : showsBefore

  const showRow = (highlight = false) => ({
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '13px 20px', borderRadius: '8px',
    background: highlight ? 'rgba(90,173,212,0.08)' : 'rgba(255,255,255,0.04)',
    border: highlight ? '1px solid rgba(90,173,212,0.22)' : '1px solid rgba(255,255,255,0.07)',
    ...(highlight ? { borderLeft: '3px solid #5aadd4' } : {}),
  })

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg,#07111a 0%,#0a1828 100%)',
      fontFamily: '"Inter",sans-serif',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 22px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
        background: 'rgba(7,17,26,0.97)',
      }}>
        <img src="https://lumine-theta.vercel.app/LOGO/lumein%20logo.png" alt="Lumine — artist website logo" loading="lazy"
          style={{ height: '22px', width: 'auto', display: 'block', filter: 'drop-shadow(0 0 4px rgba(90,173,212,0.3))' }}
          draggable={false} />
        <div style={{ display: 'flex', gap: '18px' }}>
          {['Music','Shows','About','Connect'].map(l => (
            <span key={l} style={{ fontSize: '0.55rem', color: l === 'Shows' ? '#5aadd4' : 'rgba(255,255,255,0.38)' }}>{l}</span>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,#5aadd4,#3d8fb5)', borderRadius: '20px', padding: '5px 14px', fontSize: '0.52rem', fontWeight: 700, color: '#07111a' }}>
          Claim a Spot
        </div>
      </div>

      {/* Shows */}
      <div style={{ flex: 1, padding: '22px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>Upcoming Shows</h2>
          {live && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: '20px', padding: '3px 9px',
              fontSize: '0.55rem', color: '#4ade80', fontWeight: 700,
            }}>✓ Live</div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {shows.map((s, i) => {
            const isNew = live && i < showsAfter.length
            return (
              <div key={i} style={showRow(isNew)}>
                <span style={{ fontSize: '0.64rem', color: '#5aadd4', fontFamily: 'monospace', fontWeight: 600, minWidth: '60px' }}>{s.date}</span>
                <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, flex: 1, paddingLeft: '6px' }}>{s.venue}</span>
                <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.38)', minWidth: '58px', textAlign: 'right', flexShrink: 0 }}>{s.city}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
                  {isNew && <span style={{ fontSize: '0.46rem', background: 'rgba(90,173,212,0.22)', color: '#5aadd4', borderRadius: '4px', padding: '2px 7px', fontWeight: 800 }}>NEW</span>}
                  <div style={{ background: 'rgba(90,173,212,0.12)', border: '1px solid rgba(90,173,212,0.28)', borderRadius: '20px', padding: '5px 14px', fontSize: '0.54rem', color: '#5aadd4', fontWeight: 600 }}>Tickets →</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── WhatsApp-style phone mockup ─────────────────────────────────── */
const BUBBLES = [
  { side: 'client', text: 'Hey, ik heb wat aanpassingen\nvoor de site. Kun je die\ndoorvoeren?', time: '16:14' },
  { side: 'ai', text: 'Ja, is goed! Stuur maar op.', time: '16:14' },
  { side: 'client', text: '2 nieuwe shows: 29 mei\nIJland + 3 juni Thuishaven.\nEn mijn Insta-post erbij?', time: '16:14' },
  { side: 'ai', text: 'Klaar! Hier de preview 🔗\nKlopt alles zo? Dan zet\nik hem live.', time: '16:15' },
  { side: 'client', text: 'Ja, perfect. Doe maar!', time: '16:16' },
  { side: 'ai', text: '2 shows + post live ✓', time: '16:16', badge: '3 min' },
]

function PhoneMockup() {
  return (
    <div
      className="ch-phone hidden md:block"
      style={{
        position: 'absolute',
        bottom: '-24px',
        right: '8px',
        width: 'clamp(160px, 20vw, 220px)',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      {/* Phone frame */}
      <div style={{
        background: '#111b21',
        borderRadius: '28px',
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        boxShadow: '0 32px 72px -12px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>

        {/* WhatsApp top bar */}
        <div style={{
          background: '#202c33',
          padding: '8px 12px 7px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          {/* Avatar */}
          <div style={{
            width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #3B6FE8 0%, #1A1A2E 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', fontWeight: 700, color: '#fff',
            fontFamily: 'Inter, sans-serif',
          }}>
            E
          </div>
          {/* Name + subtitle */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#e9edef', fontFamily: 'Inter, sans-serif', lineHeight: 1.2 }}>
              Ebel
            </div>
            <div style={{ fontSize: '9px', color: '#00a884', fontFamily: 'Inter, sans-serif', lineHeight: 1.3 }}>
              AI Developer · online
            </div>
          </div>
          {/* WhatsApp icon dots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', opacity: 0.4 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#aebac1' }} />)}
          </div>
        </div>

        {/* Chat background with WhatsApp wallpaper feel */}
        <div style={{
          background: '#0b141a',
          padding: '8px 8px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          minHeight: '290px',
        }}>
          {/* Date stamp */}
          <div style={{
            textAlign: 'center', marginBottom: '2px',
          }}>
            <span style={{
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '6px',
              padding: '2px 7px',
              fontSize: '8px',
              color: '#8696a0',
              fontFamily: 'Inter, sans-serif',
            }}>Vandaag</span>
          </div>

          {BUBBLES.map((b, i) => {
            const isSent = b.side === 'client'
            return (
              <div
                key={i}
                className="ch-bubble"
                style={{
                  display: 'flex',
                  justifyContent: isSent ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '5px 8px 14px',
                  borderRadius: isSent
                    ? '8px 8px 2px 8px'
                    : '8px 8px 8px 2px',
                  background: isSent ? '#005c4b' : '#202c33',
                  position: 'relative',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}>
                  <p style={{
                    fontSize: '11px',
                    color: '#e9edef',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.4,
                    margin: 0,
                    whiteSpace: 'pre-line',
                  }}>
                    {b.text}
                  </p>

                  {/* Time + checkmarks */}
                  <div style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '7px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}>
                    <span style={{ fontSize: '8px', color: 'rgba(233,237,239,0.45)', fontFamily: 'Inter, sans-serif' }}>
                      {b.time}
                    </span>
                    {isSent && (
                      <span style={{ fontSize: '9px', color: '#53bdeb', lineHeight: 1 }}>✓✓</span>
                    )}
                  </div>

                  {/* Speed badge on last AI message */}
                  {b.badge && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-9px',
                      left: '6px',
                      background: '#1f2d25',
                      border: '1px solid #2a5e3a',
                      borderRadius: '8px',
                      padding: '1px 6px',
                      fontSize: '8px',
                      color: '#00a884',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}>
                      ⚡ {b.badge}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* WhatsApp input bar */}
        <div style={{
          background: '#202c33',
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{
            flex: 1, background: '#2a3942', borderRadius: '20px',
            padding: '5px 10px', fontSize: '9px',
            color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif',
          }}>
            Stuur een bericht
          </div>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#00a884', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0 }}>
            🎤
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Static phone for mobile slide 1 (all bubbles pre-visible) ───── */
function MobilePhoneSlide() {
  return (
    <div style={{
      background: '#111b21', borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.07)',
      overflow: 'hidden',
      boxShadow: '0 24px 56px -8px rgba(0,0,0,0.9)',
      width: '100%', maxWidth: '280px',
    }}>
      {/* Top bar */}
      <div style={{ background: '#202c33', padding: '8px 12px 7px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#3B6FE8,#1A1A2E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'Inter,sans-serif' }}>E</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#e9edef', fontFamily: 'Inter,sans-serif', lineHeight: 1.2 }}>Ebel</div>
          <div style={{ fontSize: '9px', color: '#00a884', fontFamily: 'Inter,sans-serif' }}>AI Developer · online</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', opacity: 0.4 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#aebac1' }} />)}
        </div>
      </div>
      {/* Chat */}
      <div style={{ background: '#0b141a', padding: '8px 8px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2px' }}>
          <span style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '6px', padding: '2px 7px', fontSize: '8px', color: '#8696a0', fontFamily: 'Inter,sans-serif' }}>Vandaag</span>
        </div>
        {BUBBLES.map((b, i) => {
          const isSent = b.side === 'client'
          return (
            <div key={i} className="mob-bubble" style={{ display: 'flex', justifyContent: isSent ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '85%', padding: '5px 8px 14px', position: 'relative',
                borderRadius: isSent ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
                background: isSent ? '#005c4b' : '#202c33',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}>
                <p style={{ fontSize: '11px', color: '#e9edef', fontFamily: 'Inter,sans-serif', lineHeight: 1.4, margin: 0, whiteSpace: 'pre-line' }}>{b.text}</p>
                <div style={{ position: 'absolute', bottom: '4px', right: '7px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <span style={{ fontSize: '8px', color: 'rgba(233,237,239,0.45)', fontFamily: 'Inter,sans-serif' }}>{b.time}</span>
                  {isSent && <span style={{ fontSize: '9px', color: '#53bdeb', lineHeight: 1 }}>✓✓</span>}
                </div>
                {b.badge && (
                  <div style={{ position: 'absolute', bottom: '-9px', left: '6px', background: '#1f2d25', border: '1px solid #2a5e3a', borderRadius: '8px', padding: '1px 6px', fontSize: '8px', color: '#00a884', fontFamily: 'Inter,sans-serif', fontWeight: 600, whiteSpace: 'nowrap' }}>⚡ {b.badge}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {/* Input bar */}
      <div style={{ background: '#202c33', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ flex: 1, background: '#2a3942', borderRadius: '20px', padding: '5px 10px', fontSize: '9px', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif' }}>Stuur een bericht</div>
        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#00a884', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0 }}>🎤</div>
      </div>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const mockupRef = useRef(null)
  const rafRef = useRef(0)

  /* ── Mouse sheen + mockup tilt ─────────────── */
  useEffect(() => {
    const onMove = (e) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (cardRef.current) {
          const r = cardRef.current.getBoundingClientRect()
          cardRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
          cardRef.current.style.setProperty('--my', `${e.clientY - r.top}px`)
        }
        if (mockupRef.current) {
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2
          gsap.to(mockupRef.current, {
            rotationY: xVal * 6,
            rotationX: -yVal * 6,
            ease: 'power3.out',
            duration: 1.8,
          })
        }
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* ── Scroll timeline ────────────────────────── */
  useEffect(() => {
    const mobile = window.innerWidth < 768

    const ctx = gsap.context(() => {

      /* ── Initial states */
      gsap.set('.ch-line1', { autoAlpha: 0, y: 34, scale: 0.93 })
      gsap.set('.ch-line2', { clipPath: 'inset(0 100% 0 0)' })
      gsap.set('.ch-subkop', { autoAlpha: 0, y: 14 })
      gsap.set('.ch-hint', { autoAlpha: 0 })
      gsap.set('.ch-card', { y: window.innerHeight + 120, scale: 0.92 })
      gsap.set(['.ch-col-left', '.ch-mockup', '.ch-badge-a', '.ch-badge-b'], { autoAlpha: 0 })
      gsap.set('.ch-cta', { autoAlpha: 0, scale: 0.95 })
      gsap.set('.ch-phone', { opacity: 0, y: 60, rotate: -8, scale: 0.88 })
      gsap.set('.ch-bubble', { opacity: 0, y: 8 })
      gsap.set('.ch-editing-badge', { autoAlpha: 0, scale: 0.9 })
      gsap.set('.ch-live-badge', { autoAlpha: 0, scale: 0.9 })
      gsap.set('.ch-cursor', { autoAlpha: 0 })
      gsap.set('.ch-show-after', { autoAlpha: 0, y: 6 })
      if (mobile) {
        gsap.set('.mob-slide-1', { autoAlpha: 0 })
        gsap.set('.mob-slide-2', { autoAlpha: 0 })
        gsap.set('.mob-bubble', { opacity: 0, y: 6 })
        gsap.set('.mob-editing-badge', { autoAlpha: 0, scale: 0.9 })
        gsap.set('.mob-live-badge', { autoAlpha: 0, scale: 0.9 })
        gsap.set('.mob-cursor', { autoAlpha: 0 })
        gsap.set('.mob-show-after', { autoAlpha: 0, y: 6 })
      }

      /* ── Page-load entrance */
      gsap.timeline({ delay: 0.2 })
        .to('.ch-line1', { autoAlpha: 1, y: 0, scale: 1, duration: 1.0, ease: 'expo.out' })
        .to('.ch-line2', { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power4.inOut' }, '-=0.7')
        .to('.ch-subkop', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .to('.ch-hint', { autoAlpha: 1, duration: 0.5 }, '-=0.1')

      /* ── Scroll-pinned cinematic timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=4000',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })

      // Phase 1 — hero text fades, card rises
      tl.to('.ch-hero-bg', { autoAlpha: 0, scale: 1.03, duration: 1.2, ease: 'power2.out' }, 0)
        .to('.ch-hint', { autoAlpha: 0, duration: 0.6 }, 0)
        .to('.ch-card', { y: 0, duration: 1.4, ease: 'power3.inOut' }, 0)

      // Phase 2 — card fills screen
      tl.to('.ch-card', { scale: 1, borderRadius: '0px', duration: 1.1, ease: 'power2.inOut' })

      if (mobile) {
        // ── Mobile: 3 slides — original site → WhatsApp → live editing → CTA
        tl
          // Hold on slide 0 (original site)
          .to({}, { duration: 0.6 })
          // Slide 0 → Slide 1 (WhatsApp)
          .to('.mob-slide-0', { autoAlpha: 0, x: -28, duration: 0.5, ease: 'power2.in' })
          .fromTo('.mob-slide-1',
            { autoAlpha: 0, x: 36 },
            { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.2'
          )
          // Bubbles pop in with stagger
          .to('.mob-bubble', { opacity: 1, y: 0, duration: 0.2, stagger: 0.1, ease: 'power3.out' })
          // Hold on slide 1
          .to({}, { duration: 0.8 })
          // Slide 1 → Slide 2 (live editing)
          .to('.mob-slide-1', { autoAlpha: 0, x: -28, duration: 0.5, ease: 'power2.in' })
          .fromTo('.mob-slide-2',
            { autoAlpha: 0, x: 36 },
            { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.2'
          )
          // Brief pause before editing starts
          .to({}, { duration: 0.4 })
          // ── Google Docs editing sequence ──
          .to('.mob-editing-badge', { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(1.4)' })
          .to('.mob-cursor', { autoAlpha: 1, duration: 0.15 })
          .to('.mob-show-after-wrapper', { maxHeight: 160, duration: 0.6, ease: 'power3.out' }, '+=0.15')
          .to('.mob-show-after', { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.18, ease: 'power3.out' }, '-=0.35')
          .to('.mob-cursor', { autoAlpha: 0, duration: 0.2 }, '+=0.15')
          .to('.mob-show-after', { borderLeftColor: 'rgba(90,173,212,0)', background: 'rgba(255,255,255,0.04)', duration: 0.4, ease: 'power2.out' }, '+=0.1')
          .to('.mob-editing-badge', { autoAlpha: 0, scale: 0.9, duration: 0.2 })
          .to('.mob-live-badge', { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(1.4)' })
          // Hold on final state
          .to({}, { duration: 0.5 })
          // Transition to CTA
          .to('.mob-slide-2', { autoAlpha: 0, y: -20, duration: 0.5, ease: 'power2.in' })
          .to('.ch-cta', { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'expo.out' }, '-=0.2')

      } else {
        // ── Desktop: mockup, badges, phone, editing sequence → CTA
        tl
          // Phase 3 — mockup + badges + copy enter
          .fromTo('.ch-mockup',
            { y: 120, rotationX: 18, rotationY: -8, autoAlpha: 0, scale: 0.8 },
            { y: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, duration: 1.5, ease: 'expo.out' },
            '-=0.4'
          )
          .fromTo('.ch-badge-a', { y: 30, autoAlpha: 0, scale: 0.85 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, ease: 'back.out(1.2)' }, '-=0.9')
          .fromTo('.ch-badge-b', { y: 30, autoAlpha: 0, scale: 0.85 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, ease: 'back.out(1.2)' }, '-=0.7')
          .fromTo('.ch-col-left', { x: -28, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.85, ease: 'power4.out' }, '-=0.65')
          // Phone floats in
          .fromTo('.ch-phone',
            { opacity: 0, y: 60, rotate: -8, scale: 0.88 },
            { opacity: 1, y: 0, rotate: -4, scale: 1, duration: 0.5, ease: 'expo.out' },
            '-=0.5'
          )
          // Bubbles stagger in
          .fromTo('.ch-bubble',
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.25, stagger: 0.09, ease: 'power3.out' },
            '-=0.2'
          )
          // Hold briefly
          .to({}, { duration: 0.3 })
          // ── AI editing sequence — Google Docs style ──
          .to('.ch-editing-badge', { autoAlpha: 1, scale: 1, x: 0, duration: 0.35, ease: 'back.out(1.4)' })
          .to('.ch-cursor', { autoAlpha: 1, duration: 0.15 })
          .to('.ch-show-after-wrapper', { maxHeight: 160, duration: 0.6, ease: 'power3.out' }, '+=0.15')
          .to('.ch-show-after', { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.18, ease: 'power3.out' }, '-=0.35')
          .to('.ch-cursor', { autoAlpha: 0, duration: 0.2 }, '+=0.15')
          .to('.ch-show-after', { borderLeftColor: 'rgba(90,173,212,0)', background: 'rgba(255,255,255,0.04)', duration: 0.5, ease: 'power2.out' }, '+=0.1')
          .to('.ch-editing-badge', { autoAlpha: 0, scale: 0.9, duration: 0.2 })
          .to('.ch-live-badge', { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(1.4)' })
          // Hold on final state
          .to({}, { duration: 0.7 })
          // Phase 4 — swap content → CTA
          .to(['.ch-col-left', '.ch-mockup', '.ch-badge-a', '.ch-badge-b'], {
            autoAlpha: 0, y: -20, scale: 0.93, duration: 0.75, ease: 'power2.in',
          })
          .to('.ch-phone', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, '<')
          .to('.ch-cta', { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'expo.out' }, '-=0.2')
      }

      // Phase 5 — card pulls back (both mobile and desktop)
      tl.to('.ch-card', {
          scale: mobile ? 0.92 : 0.79,
          borderRadius: mobile ? '24px' : '32px',
          duration: 1.3, ease: 'expo.inOut',
        }, '-=0.7')
        // Hold at CTA
        .to({}, { duration: 0.8 })
        // Phase 6 — card exits up
        .to('.ch-card', { y: -(window.innerHeight + 180), duration: 1.1, ease: 'power3.in' })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: '#F7F7F5', perspective: '1200px' }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Navbar sentinel */}
      <div id="hero-sentinel" className="absolute top-[80vh] inset-x-0 h-px pointer-events-none" />

      {/* Grid */}
      <div className="ch-grid absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

      {/* ── Hero text (light bg layer) ──────────────── */}
      <div className="ch-hero-bg absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">

        <h1
          className="ch-line1 ch-dark-text font-heading font-semibold"
          style={{ fontSize: 'clamp(2.2rem, 5.8vw, 5.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.08em' }}
        >
          Professional websites
        </h1>
        <p
          className="ch-line2 ch-fade-text font-heading font-semibold"
          style={{ fontSize: 'clamp(2.2rem, 5.8vw, 5.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
        >
          for artists, businesses &amp; holiday homes.
        </p>
        <p
          className="ch-subkop"
          style={{ marginTop: '1.1rem', fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)', color: 'rgba(17,17,17,0.52)', fontFamily: 'Inter, sans-serif', fontWeight: 400, maxWidth: '480px', lineHeight: 1.5 }}
        >
          Powered by AI I built myself — send a WhatsApp, changes go live in minutes.
        </p>
      </div>

      {/* ── Scroll hint ─────────────────────────────── */}
      <div
        className="ch-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[0.65rem] font-mono tracking-widest uppercase" style={{ color: 'rgba(17,17,17,0.28)' }}>
          Scroll
        </span>
        <div className="w-px h-7" style={{ background: 'linear-gradient(to bottom, rgba(17,17,17,0.22), transparent)' }} />
      </div>

      {/* ── Deep-navy card ──────────────────────────── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          ref={cardRef}
          className="ch-card relative flex items-center justify-center pointer-events-auto"
          style={{ width: '100%', height: '100%', borderRadius: '32px', overflow: 'hidden' }}
        >
          <div className="ch-sheen" aria-hidden="true" />

          {/* ── Mobile slides (3-step scroll story) ── */}

          {/* Slide 0: original site */}
          <div className="mob-slide-0 absolute inset-0 z-10 flex flex-col items-center justify-center md:hidden" style={{ padding: '52px 12px 12px' }}>
            <div style={{ width: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 28px 56px -10px rgba(0,0,0,0.9)', background: '#0d1117' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#1a1f30', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, flexShrink: 0 }} />)}
                <div style={{ flex: 1, margin: '0 8px', padding: '2px 8px', borderRadius: '20px', background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.28)', textAlign: 'center' }}>lumine.nl</div>
              </div>
              <div style={{ height: 'clamp(200px, 44vh, 340px)', overflow: 'hidden' }}>
                <StaticSitePreview live={false} />
              </div>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '14px' }}>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.92rem', fontWeight: 700, fontFamily: 'Inter, sans-serif', margin: 0, letterSpacing: '-0.01em' }}>
                I build websites. You manage them.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.36)', fontSize: '0.7rem', fontFamily: 'Inter, sans-serif', margin: '4px 0 0' }}>
                Fast to launch, always up to date — via WhatsApp.
              </p>
            </div>
          </div>

          {/* Slide 1: WhatsApp conversation */}
          <div className="mob-slide-1 absolute inset-0 z-10 flex flex-col items-center justify-center md:hidden" style={{ padding: '52px 24px 12px' }}>
            <MobilePhoneSlide />
            <div style={{ textAlign: 'center', paddingTop: '14px' }}>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.92rem', fontWeight: 700, fontFamily: 'Inter, sans-serif', margin: 0, letterSpacing: '-0.01em' }}>
                Updates? Just send a message.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.36)', fontSize: '0.7rem', fontFamily: 'Inter, sans-serif', margin: '4px 0 0' }}>
                You ask, Ebel AI handles it — 24/7, no invoice.
              </p>
            </div>
          </div>

          {/* Slide 2: live editing animation */}
          <div className="mob-slide-2 absolute inset-0 z-10 flex flex-col items-center justify-center md:hidden" style={{ padding: '52px 12px 12px' }}>
            <div style={{ width: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 28px 56px -10px rgba(0,0,0,0.9)', background: '#0d1117' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: '#1a1f30', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, flexShrink: 0 }} />)}
                <div style={{ flex: 1, margin: '0 8px', padding: '2px 8px', borderRadius: '20px', background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.48rem', color: 'rgba(255,255,255,0.28)', textAlign: 'center' }}>lumine.nl</div>
              </div>
              <div style={{ height: 'clamp(200px, 44vh, 340px)', overflow: 'hidden' }}>
                <MobileSitePreviewAnimated />
              </div>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '14px' }}>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.92rem', fontWeight: 700, fontFamily: 'Inter, sans-serif', margin: 0, letterSpacing: '-0.01em' }}>
                This is what an update looks like.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.36)', fontSize: '0.7rem', fontFamily: 'Inter, sans-serif', margin: '4px 0 0' }}>
                No hassle, no invoice, just live.
              </p>
            </div>
          </div>

          {/* ── 2-col content grid (desktop only) ──────────── */}
          <div
            className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-8
                       hidden md:flex flex-col justify-start gap-4
                       pt-[72px] pb-4
                       md:justify-evenly md:gap-0 md:pt-6 md:pb-6
                       lg:grid lg:grid-cols-[280px_1fr]
                       items-center lg:gap-8 z-10 lg:pt-0 lg:pb-0"
          >

            {/* Col 2 — browser mockup + phone */}
            <div
              className="ch-mockup order-1 lg:order-2 relative w-full h-[160px] sm:h-[300px] lg:h-[560px] flex items-center justify-center"
              style={{ perspective: '900px', overflow: 'visible' }}
            >
              <div
                ref={mockupRef}
                className="relative w-full max-w-[700px] ch-browser"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-1.5 px-3 py-2"
                  style={{ background: '#1a1f30', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: '#ff5f57' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#ffbd2e' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#28c840' }} />
                  <div
                    className="flex-1 mx-2 px-2 py-0.5 rounded-full text-center"
                    style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.28)' }}
                  >
                    lumine.nl
                  </div>
                </div>

                {/* Site preview */}
                <div className="site-preview-container" style={{ height: 'clamp(260px, 40vh, 460px)', overflow: 'hidden' }}>
                  <SitePreview />
                </div>
              </div>

              {/* Phone mockup — floats bottom-right of browser */}
              <PhoneMockup />

              {/* Badge A */}
              <div
                className="ch-badge-a ch-badge absolute top-2 left-2 lg:-left-6 rounded-2xl px-3 py-2.5 flex items-center gap-2.5"
                style={{ zIndex: 30 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(59,111,232,0.14)', border: '1px solid rgba(59,111,232,0.28)' }}
                >
                  <span style={{ fontSize: '0.78rem' }}>⚡</span>
                </div>
                <div>
                  <p className="text-white font-bold" style={{ fontSize: '0.66rem' }}>Live in minutes</p>
                  <p style={{ color: 'rgba(147,197,253,0.5)', fontSize: '0.54rem' }}>No dev needed</p>
                </div>
              </div>

              {/* Badge B */}
              <div
                className="ch-badge-b ch-badge absolute bottom-4 right-2 lg:-right-6 rounded-2xl px-3 py-2.5 flex items-center gap-2.5"
                style={{ zIndex: 30 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(59,111,232,0.14)', border: '1px solid rgba(59,111,232,0.28)' }}
                >
                  <span style={{ fontSize: '0.78rem' }}>✦</span>
                </div>
                <div>
                  <p className="text-white font-bold" style={{ fontSize: '0.66rem' }}>Always confirms first</p>
                  <p style={{ color: 'rgba(147,197,253,0.5)', fontSize: '0.54rem' }}>You stay in control</p>
                </div>
              </div>
            </div>

            {/* Col 1 — copy */}
            <div className="ch-col-left order-2 lg:order-1 flex flex-col justify-center text-left lg:text-left w-full px-2 lg:px-0 gap-3">

              {/* Label + heading */}
              <div>
                <p className="font-mono text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: 'rgba(59,111,232,0.7)' }}>AI site manager</p>
                <h3
                  className="text-white font-heading font-semibold leading-tight"
                  style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.9rem)', letterSpacing: '-0.02em' }}
                >
                  Your site.<br />Your control.
                </h3>
                <p className="hidden md:block mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.82rem', maxWidth: '220px' }}>
                  Stuur een WhatsApp — Ebel regelt de rest. Geen developer-factuur voor elk klein dingetje.
                </p>
              </div>

              {/* ── Mobile-only: WhatsApp conversation ── */}
              <div className="md:hidden rounded-2xl overflow-hidden" style={{ background: '#0b141a', border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Header */}
                <div style={{ background: '#202c33', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#3B6FE8,#1A1A2E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: '#fff', fontFamily: 'Inter,sans-serif' }}>E</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#e9edef', fontFamily: 'Inter,sans-serif', lineHeight: 1.2 }}>Ebel</div>
                    <div style={{ fontSize: '8.5px', color: '#00a884', fontFamily: 'Inter,sans-serif' }}>AI Developer · online</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', opacity: 0.35 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#aebac1' }} />)}
                  </div>
                </div>
                {/* Date stamp */}
                <div style={{ background: '#0b141a', padding: '6px 10px 4px', textAlign: 'center' }}>
                  <span style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '1px 7px', fontSize: '8px', color: '#8696a0', fontFamily: 'Inter,sans-serif' }}>Vandaag</span>
                </div>
                {/* Chat bubbles */}
                <div style={{ padding: '4px 8px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[
                    { side: 'client', text: 'Hey, ik heb wat aanpassingen\nvoor de site. Kun je die\ndoorvoeren?',             time: '16:14' },
                    { side: 'ai',     text: 'Ja, is goed! Stuur maar op.',                                                    time: '16:14' },
                    { side: 'client', text: '2 nieuwe shows: IJland\n+ Thuishaven. Post erbij?',                              time: '16:14' },
                    { side: 'ai',     text: 'Klaar! Hier de preview 🔗\nKlopt alles? Dan live.',                              time: '16:15' },
                    { side: 'client', text: 'Ja, perfect. Doe maar!',                                                         time: '16:16' },
                    { side: 'ai',     text: '2 shows + post live ✓',                                                          time: '16:16', badge: '3 min' },
                  ].map((b, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: b.side === 'client' ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '82%', padding: '4px 8px 13px', position: 'relative',
                        borderRadius: b.side === 'client' ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
                        background: b.side === 'client' ? '#005c4b' : '#202c33',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>
                        <p style={{ fontSize: '10.5px', color: '#e9edef', fontFamily: 'Inter,sans-serif', lineHeight: 1.38, margin: 0, whiteSpace: 'pre-line' }}>{b.text}</p>
                        <div style={{ position: 'absolute', bottom: '3px', right: '6px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          {b.badge && (
                            <span style={{ background: '#1f2d25', border: '1px solid #2a5e3a', borderRadius: '6px', padding: '1px 5px', fontSize: '7px', color: '#00a884', fontFamily: 'Inter,sans-serif', fontWeight: 600, marginRight: '2px' }}>⚡ {b.badge}</span>
                          )}
                          <span style={{ fontSize: '7.5px', color: 'rgba(233,237,239,0.4)', fontFamily: 'Inter,sans-serif' }}>{b.time}</span>
                          {b.side === 'client' && <span style={{ fontSize: '9px', color: '#53bdeb', lineHeight: 1 }}>✓✓</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-1.5">
                {[
                  ['✦', 'Live binnen minuten'],
                  ['✦', 'Altijd preview-check voor go-live'],
                  ['✦', 'Goedkoper dan een dev op standby'],
                  ['✦', 'Jij blijft zelf aan het stuur'],
                ].map(([icon, text], i) => (
                  <li key={text} className={i >= 2 ? 'hidden md:flex items-center gap-2' : 'flex items-center gap-2'}>
                    <span style={{ color: '#3B6FE8', fontSize: '0.55rem' }}>{icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.52)', fontSize: '0.75rem' }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── CTA overlay ── */}
          <div
            className="ch-cta absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
            style={{ zIndex: 50 }}
          >
            <h2
              className="ch-white-text font-heading font-semibold mb-5"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em' }}
            >
              Let's build something.
            </h2>
            <p
              className="mb-10 font-light leading-relaxed max-w-md"
              style={{ color: 'rgba(255,255,255,0.46)', fontSize: '1rem' }}
            >
              Send a WhatsApp or book a free intro call — no strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/31612345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base text-white"
                style={{ background: '#25D366', boxShadow: '0 12px 28px -4px rgba(37,211,102,0.45)' }}
              >
                WhatsApp me →
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
                style={{ border: '1px solid rgba(255,255,255,0.16)', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.04)' }}
              >
                See my work
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
