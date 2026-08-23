import { useLang } from '../lib/LanguageContext'

export default function Footer() {
  const { t, w, couple } = useLang()

  return (
    <footer className="relative z-10 bg-maroon-dark text-cream/90 py-10 px-5 text-center">
      <p className="font-display text-3xl sm:text-4xl text-gold-light mb-2">
        {couple[0]} &amp; {couple[1]}
      </p>
      <p className="font-heading tracking-widest uppercase text-sm text-gold-light/80 mb-4">
        {w.hashtag}
      </p>
      <p className="text-sm text-cream/70 max-w-md mx-auto">
        {t('footerNote')}
      </p>
      <p className="text-xs text-cream/50 mt-6">
        {t('footerMade')} {w.weddingDateDisplay} · {w.city}
      </p>
    </footer>
  )
}
