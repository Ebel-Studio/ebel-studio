import { useEffect, useRef } from 'react'

/**
 * Interactive dot grid — canvas based, no dependencies.
 * Dots near the cursor illuminate in Ebel Studio green (#1D9E75).
 * A slow ambient wave drifts across when the cursor is idle.
 */
export function DotGrid({ className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    /* ── Config ─────────────────────────────── */
    const GAP        = 28          // pixels between dots
    const DOT_BASE   = 1.4        // resting radius
    const DOT_MAX    = 5          // max radius near cursor
    const INFLUENCE  = 140        // cursor radius of influence (px)
    const COLOR_ON   = [59, 111, 232]   // #3B6FE8
    const COLOR_OFF  = [255, 255, 255] // white (low opacity when idle)
    const OPACITY_ON  = 1
    const OPACITY_OFF = 0.10

    let cols, rows, dots
    let mouse = { x: -9999, y: -9999 }
    let animId
    let tick = 0

    /* ── Build grid ──────────────────────────── */
    function build() {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width  = width  * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      cols = Math.ceil(width  / GAP) + 1
      rows = Math.ceil(height / GAP) + 1

      dots = []
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: c * GAP,
            y: r * GAP,
            radius: DOT_BASE,
            opacity: OPACITY_OFF,
            r: COLOR_OFF[0], g: COLOR_OFF[1], b: COLOR_OFF[2],
          })
        }
      }
    }

    /* ── Draw frame ──────────────────────────── */
    function draw() {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      tick++

      for (const d of dots) {
        const dx   = d.x - mouse.x
        const dy   = d.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        /* cursor influence */
        const proximity = Math.max(0, 1 - dist / INFLUENCE)

        /* ambient wave — radiates from top-left, slow drift */
        const waveOffset = (d.x * 0.012 + d.y * 0.012) - tick * 0.025
        const wave       = (Math.sin(waveOffset) * 0.5 + 0.5) * 0.06

        const strength = Math.max(proximity, wave)

        /* interpolate color */
        d.r = COLOR_OFF[0] + (COLOR_ON[0] - COLOR_OFF[0]) * strength
        d.g = COLOR_OFF[1] + (COLOR_ON[1] - COLOR_OFF[1]) * strength
        d.b = COLOR_OFF[2] + (COLOR_ON[2] - COLOR_OFF[2]) * strength

        d.radius  = DOT_BASE + (DOT_MAX - DOT_BASE) * proximity
        d.opacity = OPACITY_OFF + (OPACITY_ON - OPACITY_OFF) * strength

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.round(d.r)},${Math.round(d.g)},${Math.round(d.b)},${d.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    /* ── Events — listen on window so z-index never blocks ── */
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      // Only light up when cursor is within the canvas bounds
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse = { x, y }
      } else {
        mouse = { x: -9999, y: -9999 }
      }
    }
    function onResize() { build() }

    /* ── Init ────────────────────────────────── */
    build()
    draw()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className ?? ''}`}
      style={{ display: 'block' }}
    />
  )
}
