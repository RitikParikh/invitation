import { useEffect, useState } from 'react'

function getTimeLeft(target) {
  const diff = +new Date(target) - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  }
}

export default function Countdown({ target }) {
  const [time, setTime] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  if (time.done) {
    return <p className="font-heading text-xl text-gold-light">The celebration has begun! 🎉</p>
  }

  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-gold-light/40 rounded-xl px-3 sm:px-4 py-2 sm:py-3 min-w-[64px] sm:min-w-[76px]"
        >
          <span className="font-heading text-2xl sm:text-3xl text-gold-light font-semibold tabular-nums">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-cream/80 mt-1">{u.label}</span>
        </div>
      ))}
    </div>
  )
}
