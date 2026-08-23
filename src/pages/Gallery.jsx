import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../lib/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Gallery() {
  const [form, setForm] = useState({
    name: '',
    guests: '1',
    attending: 'yes',
    events: [],
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const { t, w } = useLang()

  const toggleEvent = (name) => {
    setForm((f) => ({
      ...f,
      events: f.events.includes(name) ? f.events.filter((e) => e !== name) : [...f.events, name],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend wired up yet — replace with an API call / form service (e.g. Formspree, EmailJS) when ready.
    console.log('RSVP submitted:', form)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-cream">
      {/* <section className="text-center px-5 mb-14"> */}
        {/* <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-heading tracking-[0.3em] uppercase text-gold text-xs sm:text-sm mb-3"
        >
          Kindly Respond
        </motion.p>
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-5xl sm:text-6xl text-maroon"
        >
          RSVP
        </motion.h1> */}
      {/* </section> */}

      {/* RSVP form */}
      {/* <section className="max-w-xl mx-auto px-5 mb-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white rounded-2xl shadow-lg border border-gold/20 p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <p className="text-5xl mb-4">💐</p>
                <h3 className="font-heading text-2xl text-maroon font-semibold mb-2">
                  Thank you, {form.name || 'friend'}!
                </h3>
                <p className="text-maroon-dark/75">
                  Your response has been recorded. We can't wait to celebrate with you.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" exit={{ opacity: 0 }}>
                <div>
                  <label className="block text-sm font-heading font-semibold text-maroon-dark mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-gold/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-maroon-dark mb-1">
                    Will you be attending?
                  </label>
                  <div className="flex gap-3">
                    {['yes', 'no'].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setForm({ ...form, attending: val })}
                        className={`flex-1 rounded-lg border px-4 py-2.5 font-heading capitalize transition-colors ${
                          form.attending === val
                            ? 'bg-gold text-maroon-dark border-gold font-semibold'
                            : 'border-gold/30 text-maroon-dark/70'
                        }`}
                      >
                        {val === 'yes' ? 'Joyfully Yes' : 'Regretfully No'}
                      </button>
                    ))}
                  </div>
                </div>

                {form.attending === 'yes' && (
                  <>
                    <div>
                      <label className="block text-sm font-heading font-semibold text-maroon-dark mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        className="w-full rounded-lg border border-gold/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-heading font-semibold text-maroon-dark mb-2">
                        Events you'll attend
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {wedding.events.map((ev) => (
                          <button
                            type="button"
                            key={ev.name}
                            onClick={() => toggleEvent(ev.name)}
                            className={`text-sm rounded-full px-4 py-2 border transition-colors ${
                              form.events.includes(ev.name)
                                ? 'bg-maroon text-cream border-maroon'
                                : 'border-gold/30 text-maroon-dark/70'
                            }`}
                          >
                            {ev.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-heading font-semibold text-maroon-dark mb-1">
                    Message for the couple (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-lg border border-gold/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                    placeholder={`Your wishes for ${wedding.brideFirst} & ${wedding.groomFirst}...`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-maroon text-cream font-heading font-semibold py-3 hover:bg-maroon-dark transition-colors"
                >
                  Send RSVP
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section> */}

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-5">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-4xl sm:text-5xl text-maroon text-center mb-10"
        >
          {t('galleryTitle')}
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {w.gallery.map((src, i) => (
            <motion.button
              key={src}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ delay: (i % 4) * 0.08 }}
              onClick={() => setLightbox(src)}
              className="relative aspect-square overflow-hidden rounded-xl group"
            >
              <img
                src={src}
                alt="Wedding gallery"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/20 transition-colors" />
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={lightbox}
              alt="Enlarged"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
