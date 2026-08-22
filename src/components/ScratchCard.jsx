import { useRef, useLayoutEffect, useState, useCallback } from 'react'

// Flat scratch-layer color + text color — edit these two to change the look.
const SCRATCH_COLOR = '#c9a227'
const SCRATCH_TEXT_COLOR = '#1c1c1a'

// Builds a 5-petal flower outline as a CSS clip-path() path string, in
// pixel coordinates matching the element's own rendered size. Each petal
// tip has a small heart-style cleft: a second harmonic pulls the radius
// in right at the tip's center angle and pushes it back out just either
// side, so instead of one smooth round bump each petal reads as two
// small lobes meeting at a notch — a heart shape. Using a literal pixel
// path (rather than an external SVG <clipPath> reference) is far more
// consistently supported across browsers.
function flowerPathD(w, h) {
  if (!w || !h) return ''
  const cx = w / 2
  const cy = h / 2
  const R = Math.min(w, h) * 0.5
  const petals = 5
  const base = 0.85
  const amp = 0.17
  const notch = -0.09 // more negative than -amp/4 so a dip forms right at each petal's tip
  const minSafe = 0.62 // radius (as a fraction of R) guaranteed clear at every angle, for content text
  const steps = 200
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2
    const psi = petals * theta
    const raw = base + amp * Math.cos(psi) + notch * Math.cos(2 * psi)
    const r = R * Math.max(minSafe, raw)
    const x = cx + r * Math.cos(theta)
    const y = cy + r * Math.sin(theta)
    d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)} `
  }
  return `${d}Z`
}

/**
 * ScratchCard
 * A single big flower-shaped canvas (clipped with a computed CSS
 * clip-path() outline, see flowerPathD above), filled with a flat sage
 * color and "SCRATCH TO REVEAL" baked into the graphic. Dragging across
 * it (mouse or touch) reveals the content underneath; once enough is
 * cleared it fades out and calls onReveal().
 */
export default function ScratchCard({ onReveal, threshold = 0.35, children }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPoint = useRef(null)
  const revealed = useRef(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  // useLayoutEffect (not useEffect) so the size — and therefore the flower
  // clip-path — is known before the browser paints. Otherwise the card
  // briefly renders as a plain square and then "pops" into the flower
  // shape once the size is measured.
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  const drawFlowerLayer = useCallback((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)

    // flat solid fill, same tone as the reference invitation
    ctx.fillStyle = SCRATCH_COLOR
    ctx.fillRect(0, 0, w, h)

    // baked-in "scratch to reveal" copy
    const baseSize = Math.min(w, h)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = SCRATCH_TEXT_COLOR
    ctx.font = `200 ${baseSize * 0.09}px 'Cormorant Garamond', serif`
    if ('letterSpacing' in ctx) ctx.letterSpacing = '2px'
    ctx.fillText('SCRATCH TO', w / 2, h / 2 - baseSize * 0.06)
    ctx.fillText('REVEAL', w / 2, h / 2 + baseSize * 0.06)
  }, [])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    drawFlowerLayer(ctx, dimensions.width, dimensions.height)
    revealed.current = false
    setHidden(false)
    setFading(false)
  }, [dimensions, drawFlowerLayer])

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const point = e.touches ? e.touches[0] : e
    return {
      x: point.clientX - rect.left,
      y: point.clientY - rect.top,
    }
  }

  const brush = () => Math.min(dimensions.width, dimensions.height) * 0.11

  const scratchAt = (x, y, ctx) => {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, brush(), 0, Math.PI * 2)
    ctx.fill()
  }

  const scratchLine = (from, to, ctx) => {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = brush() * 2
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
  }

  const checkRevealAmount = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || revealed.current) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const sampleStep = 10
    let cleared = 0
    let total = 0
    const data = ctx.getImageData(0, 0, width, height).data
    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const idx = (y * width + x) * 4 + 3
        total++
        if (data[idx] < 40) cleared++
      }
    }
    if (total > 0 && cleared / total > threshold) {
      revealed.current = true
      setFading(true)
      onReveal && onReveal()
      setTimeout(() => setHidden(true), 700)
    }
  }, [threshold, onReveal])

  const handleStart = (e) => {
    e.preventDefault()
    isDrawing.current = true
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const pos = getPos(e)
    lastPoint.current = pos
    scratchAt(pos.x, pos.y, ctx)
    checkRevealAmount()
  }

  const handleMove = (e) => {
    if (!isDrawing.current) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const pos = getPos(e)
    if (lastPoint.current) scratchLine(lastPoint.current, pos, ctx)
    scratchAt(pos.x, pos.y, ctx)
    lastPoint.current = pos
    checkRevealAmount()
  }

  const handleEnd = () => {
    isDrawing.current = false
    lastPoint.current = null
  }

  const pathD = flowerPathD(dimensions.width, dimensions.height)
  const clip = pathD ? `path("${pathD}")` : undefined

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none touch-none"
      style={{ clipPath: clip, WebkitClipPath: clip }}
    >
      {/* content underneath, also confined to the flower silhouette */}
      <div className="absolute inset-0 flex items-center justify-center bg-cream">{children}</div>

      {!hidden && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 cursor-pointer transition-opacity duration-700 ease-out"
          style={{ opacity: fading ? 0 : 1 }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      )}
    </div>
  )
}
