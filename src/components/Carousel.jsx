import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
}

export default function Carousel({ cards = [], interval = 3000 }) {
    const [[index, direction], setState] = useState([0, 0])
    const [paused, setPaused] = useState(false)
    const [inView, setInView] = useState(false)
    const containerRef = useRef(null)

    const count = cards.length
    const go = (dir) => setState(([i]) => [(i + dir + count) % count, dir])
    const jump = (next) => setState(([i]) => [next, next > i ? 1 : -1])

    // hold on the first slide until the carousel is actually on screen,
    // and rewind to it whenever it scrolls back out of view
    useEffect(() => {
        const el = containerRef.current
        if (!el || typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setInView(true)
                else {
                    setInView(false)
                    setState([0, 0])
                }
            },
            { threshold: 0.35 },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (paused || !inView || count < 2 || !interval) return
        const id = setTimeout(() => setState(([i]) => [(i + 1) % count, 1]), interval)
        return () => clearTimeout(id)
    }, [index, paused, inView, count, interval])

    if (!count) return null

    const card = cards[index]
    const cta = card.to || card.href

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                    key={index}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                        if (info.offset.x < -60 || info.velocity.x < -400) go(1)
                        else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
                    }}
                    className="w-full min-h-[19rem] sm:min-h-[21rem] flex flex-col items-center justify-center text-center px-12 sm:px-20 py-6 cursor-grab active:cursor-grabbing"
                >
                    {card.icon && (
                        <p className={card.iconClass ?? 'text-gold text-3xl mb-4'}>{card.icon}</p>
                    )}

                    {card.eyebrow && (
                        <p className="font-heading tracking-[0.3em] uppercase text-gold text-xs sm:text-sm mb-3">
                            {card.eyebrow}
                        </p>
                    )}

                    <p className="font-display text-4xl sm:text-5xl text-maroon mb-4 whitespace-pre-line">
                        {card.title}
                    </p>

                    <p className="font-body text-maroon-dark/80 max-w-xl mx-auto leading-relaxed whitespace-pre-line">
                        {card.text}
                    </p>

                    {card.flourish && (
                        <div className="flex justify-center gap-2 mt-6 text-gold text-2xl">
                            <span>✿</span><span>✿</span><span>✿</span>
                        </div>
                    )}

                    {cta && card.to && (
                        <Link
                            to={card.to}
                            className="inline-block mt-8 px-6 py-3 rounded-full bg-gold text-maroon-dark font-heading font-semibold text-base shadow hover:bg-gold-light transition-colors"
                        >
                            {card.cta ?? 'View'}
                        </Link>
                    )}

                    {cta && !card.to && (
                        <a
                            href={card.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-8 px-6 py-3 rounded-full bg-gold text-maroon-dark font-heading font-semibold text-base shadow hover:bg-gold-light transition-colors"
                        >
                            {card.cta ?? 'Open'}
                        </a>
                    )}
                </motion.div>
            </AnimatePresence>

            <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold/60 text-maroon bg-cream/70 hover:bg-gold hover:text-maroon-dark transition-colors flex items-center justify-center"
            >
                ‹
            </button>
            <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next slide"
                className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold/60 text-maroon bg-cream/70 hover:bg-gold hover:text-maroon-dark transition-colors flex items-center justify-center"
            >
                ›
            </button>

            <div className="flex justify-center gap-3 mt-4">
                {cards.map((c, i) => (
                    <button
                        key={c.title ?? i}
                        type="button"
                        onClick={() => jump(i)}
                        aria-label={`Go to ${c.title ?? `slide ${i + 1}`}`}
                        aria-current={i === index}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? 'bg-maroon' : 'bg-maroon/25 hover:bg-maroon/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
