'use client'

import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-parchment relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="font-accent text-xl sm:text-2xl text-amber block mb-4">
            The mountains are calling
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-dark">
            Ready to Pause?
          </h2>
          <p className="mt-6 text-lg text-midnight/60 max-w-2xl mx-auto leading-relaxed">
            Whether it&apos;s a weekend escape or a week-long retreat, your story at
            Shasha begins with a single step. Let&apos;s make it happen.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" size="lg">
              Plan Your Stay
            </Button>
            <Button href="/rates" variant="outline" size="lg">
              View Rates
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
