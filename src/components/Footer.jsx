import { wedding } from '../weddingConfig'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-maroon-dark text-cream/90 py-10 px-5 text-center">
      <p className="font-display text-3xl sm:text-4xl text-gold-light mb-2">
          {wedding.groomFirst} &amp; {wedding.brideFirst}
      </p>
      <p className="font-heading tracking-widest uppercase text-sm text-gold-light/80 mb-4">
        {wedding.hashtag}
      </p>
      <p className="text-sm text-cream/70 max-w-md mx-auto">
        With love and gratitude, we invite you to celebrate the beginning of our forever.
      </p>
      <p className="text-xs text-cream/50 mt-6">
        Made with ❤️ for {wedding.weddingDateDisplay} · {wedding.city}
      </p>
    </footer>
  )
}
