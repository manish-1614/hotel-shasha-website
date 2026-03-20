import type { Metadata } from 'next'
import ScrollReveal from '@/components/ui/ScrollReveal'
import MultiStepForm from '@/components/contact/MultiStepForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Plan your stay at Shasha Jibhi — tell us your dates, preferences, and we\'ll craft a personalised mountain escape for you.',
}

export default function ContactPage() {
  return (
    <>
      <section className="relative py-32 sm:py-40 bg-gradient-to-br from-forest-dark via-forest to-forest-light overflow-hidden grain-overlay">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <span className="font-accent text-xl text-amber-light block mb-3">
              Let&apos;s Start Planning
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Plan Your Stay
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Tell us about your dream mountain getaway — we&apos;ll get back with
              availability and a personalised quote.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-parchment">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <MultiStepForm />
        </div>
      </section>
    </>
  )
}
