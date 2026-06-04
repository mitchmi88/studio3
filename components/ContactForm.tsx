'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsapUtils'
import { CrossHair, ThinCircle } from './ui/Decorations'

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]       = useState<Record<string, string>>({})

  function validate(data: FormData) {
    const e: Record<string, string> = {}
    if (!data.get('name')) e.name = 'Bitte gib deinen Namen an.'
    const email = data.get('email') as string
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = 'Bitte gib eine gültige E-Mail-Adresse an.'
    if (!data.get('message')) e.message = 'Bitte schreib uns eine Nachricht.'
    return e
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const errs = validate(data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitted(true)
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-heading-wrap', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-heading-wrap', start: 'top 82%' },
      })
      gsap.from('.contact-form-wrap', {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 80%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const inputClass =
    'w-full bg-surface border border-border text-text font-body text-sm md:text-sm px-4 py-3 placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300 text-[16px] md:text-[14px]'

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      className="section-pad bg-bg relative overflow-hidden"
    >
      <ThinCircle size={350} className="shape-slow absolute -left-32 bottom-0 pointer-events-none opacity-20" />
      <CrossHair className="shape-fast absolute right-16 top-16 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <div className="contact-heading-wrap">
            <p className="label-track mb-5">— 05 Kontakt</p>
            <h2
              className="font-display font-light text-text mb-10"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
            >
              Bereit für dein nächstes Tattoo?
            </h2>
            <div className="gold-line mb-10" />
            <address className="not-italic font-body text-muted leading-relaxed flex flex-col gap-1.5 text-sm">
              <strong className="text-text font-normal tracking-wide text-base">Studio III</strong>
              <span>Musterstraße 12</span>
              <span>45657 Recklinghausen</span>
              <a href="mailto:info@studio-iii.de" className="mt-2 text-accent hover:text-accent-hover transition-colors duration-300">
                info@studio-iii.de
              </a>
            </address>
            <p className="mt-8 font-body text-muted/50 text-xs">* Formular ist aktuell nicht aktiv verknüpft.</p>
          </div>

          {/* Right: form / success */}
          <div className="contact-form-wrap">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start justify-center h-full gap-5 py-12"
                >
                  <div className="w-12 h-px bg-accent" />
                  <h3 className="font-display font-light text-text text-3xl">Danke für deine Nachricht.</h3>
                  <p className="font-body text-muted text-sm leading-relaxed">Wir melden uns so schnell wie möglich bei dir. Bis bald!</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                  aria-label="Kontaktformular"
                >
                  <div>
                    <label htmlFor="name" className="label-track block mb-2">Name *</label>
                    <input id="name" name="name" type="text" required placeholder="Dein Name" className={inputClass} aria-describedby={errors.name ? 'name-error' : undefined} />
                    {errors.name && <p id="name-error" role="alert" className="mt-1.5 text-red-400 text-xs font-body">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="label-track block mb-2">E-Mail *</label>
                    <input id="email" name="email" type="email" required placeholder="deine@email.de" className={inputClass} aria-describedby={errors.email ? 'email-error' : undefined} />
                    {errors.email && <p id="email-error" role="alert" className="mt-1.5 text-red-400 text-xs font-body">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="label-track block mb-2">Telefon (optional)</label>
                    <input id="phone" name="phone" type="tel" placeholder="+49 ..." className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="message" className="label-track block mb-2">Nachricht *</label>
                    <textarea id="message" name="message" required rows={5} placeholder="Erzähl uns von deiner Idee …" className={`${inputClass} resize-none`} aria-describedby={errors.message ? 'message-error' : undefined} />
                    {errors.message && <p id="message-error" role="alert" className="mt-1.5 text-red-400 text-xs font-body">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="mt-2 border border-accent text-accent hover:bg-accent hover:text-bg font-body text-sm tracking-widest uppercase px-8 py-3 transition-all duration-300 self-start sm:self-start w-full sm:w-auto active:scale-[0.97]"
                  >
                    Termin anfragen
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
