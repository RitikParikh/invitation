import { useEffect, useRef, useState } from 'react'

// how long the page rests before moving on
export const AUTO_SCROLL_DELAY = 5000

// each move, as a share of the screen height:
const MIN_STEP = 0.5 // section edges closer than this are skipped, so every move is a real one
const MAX_STEP = 0.8 // a long section is read a screen at a time, not skipped

// The next resting point: the next section's top (under the fixed navbar) at least
// half a screen down, but never more than ~one screen further down.
function nextStop() {
    const y = window.scrollY
    const screen = window.innerHeight
    let next = Infinity
    for (const el of document.querySelectorAll('main section, main footer')) {
        const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
        const top = el.getBoundingClientRect().top + y - offset
        if (top > y + screen * MIN_STEP && top < next) next = top
    }
    const bottom = document.documentElement.scrollHeight - screen
    return Math.min(next, y + screen * MAX_STEP, bottom)
}

/**
 * Moves the page down every AUTO_SCROLL_DELAY ms once `ready`.
 * The first touch / wheel / key / click by the guest switches it off for good —
 * from then on they scroll themselves.
 * At the bottom it simply waits (nothing further to show).
 */
export function useAutoScroll(ready) {
    const timer = useRef(null)
    const [stopped, setStopped] = useState(false)

    useEffect(() => {
        if (!ready || stopped) return

        const schedule = () => {
            clearTimeout(timer.current)
            timer.current = setTimeout(step, AUTO_SCROLL_DELAY)
        }

        function step() {
            if (!document.hidden) {
                const target = nextStop()
                if (target > window.scrollY + 2) window.scrollTo({ top: target, behavior: 'smooth' })
            }
            schedule()
        }

        const stop = () => setStopped(true)
        const events = ['touchstart', 'wheel', 'keydown', 'pointerdown']
        events.forEach((e) => window.addEventListener(e, stop, { passive: true }))
        schedule()
        return () => {
            clearTimeout(timer.current)
            events.forEach((e) => window.removeEventListener(e, stop))
        }
    }, [ready, stopped])
}
