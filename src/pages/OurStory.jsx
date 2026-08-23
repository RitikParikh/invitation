import { motion } from 'framer-motion'
import { useLang } from '../lib/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function OurStory() {
  const { t, w } = useLang()

  return (
    <div className="min-h-screen pt-24 pb-16 bg-cream">
      {/* header */}
      <section className="text-center px-5 mb-16">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-heading tracking-[0.3em] uppercase text-[#e36393] font-bold text-xs sm:text-sm mb-3"
        >
          {t('storyEyebrow')}
        </motion.p>
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-5xl sm:text-6xl text-maroon"
        >
          {t('storyTitle')}
        </motion.h1>
      </section>

      {/* timeline */}
      <section className="max-w-3xl mx-auto px-5 mb-24">
        <div className="relative border-l-2 border-gold/40 pl-8 space-y-12">
          {w.story.map((item, i) => (
            <motion.div
              key={item.year}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gold border-4 border-cream shadow" />
              <p className="font-heading text-gold text-sm tracking-widest mb-1">{item.year}</p>
              <h3 className="font-heading text-2xl text-maroon-dark font-semibold mb-2">{item.title}</h3>
              <p className="text-maroon-dark/75 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* events schedule */}
      <section className="bg-blush py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl text-maroon text-center mb-4"
          >
            {t('scheduleTitle')}
          </motion.h2>
          <p className="text-center text-maroon-dark/70 mb-12 max-w-xl mx-auto">
            {t('scheduleSubtitle')}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {w.events.map((ev, i) => (
              <motion.div
                key={ev.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl shadow-md p-6 border border-gold/20 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-2 mb-3 text-gold text-lg">✿</div>
                <h3 className="font-heading text-xl font-semibold text-maroon mb-2">{ev.name}</h3>
                <p className="text-sm text-maroon-dark/60 mb-1">{ev.date} · {ev.time}</p>
                <p className="text-sm text-maroon-dark/60 mb-3">{ev.venue}</p>
                <p className="text-sm text-maroon-dark/80 leading-relaxed">{ev.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* venue */}
      <section className="max-w-3xl mx-auto px-5 py-16 text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <p className="font-heading tracking-[0.3em] uppercase text-gold text-xs sm:text-sm mb-3">
            {t('venueEyebrow')}
          </p>
          <h2 className="font-display text-4xl text-maroon mb-3">{w.venue}</h2>
          <p className="text-maroon-dark/75 mb-6">{w.address}</p>
          <a
            href={w.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-3 rounded-full bg-maroon text-cream font-heading font-semibold hover:bg-maroon-dark transition-colors"
          >
            {t('mapsCta')}
          </a>
        </motion.div>
      </section>
    </div>
  )
}
