import confetti from 'canvas-confetti'

// Wedding gold/maroon/cream palette so the burst matches the site.
const COLORS = ['#c9a227', '#e8c766', '#7a1f2b', '#f4a300', '#fdf6ec']

// A "party popper" burst: two angled streams firing outward from just
// below the bottom corners of the screen, like a pair of poppers going
// off, plus a small center burst for extra punch. Call this once right
// when the flower finishes being scratched clear.
export function fireRevealConfetti() {
  const duration = 1400
  const end = Date.now() + duration

  const common = {
    particleCount: 4,
    startVelocity: 45,
    spread: 55,
    colors: COLORS,
    ticks: 220,
    scalar: 1.1,
  }

  // center pop, straight up
  confetti({
    ...common,
    particleCount: 60,
    spread: 100,
    startVelocity: 55,
    origin: { x: 0.5, y: 0.6 },
    angle: 90,
  })

  // two poppers firing from the bottom corners toward the middle
  ;(function frame() {
    confetti({ ...common, angle: 60, origin: { x: 0, y: 1 } })
    confetti({ ...common, angle: 120, origin: { x: 1, y: 1 } })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}
