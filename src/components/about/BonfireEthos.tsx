'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

export default function BonfireEthos() {
  return (
    <section className="py-20 sm:py-28 bg-midnight relative overflow-hidden grain-overlay">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <ScrollReveal>
            <span className="font-accent text-xl text-amber block mb-2">
              The Bonfire Tradition
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Where Stories Come Alive
            </h2>
            <div className="mt-6 space-y-4 text-white/60 leading-relaxed">
              <p>
                Every evening at Shasha, as the sun dips behind the cedar ridgeline,
                we light the bonfire. It is not a programmed activity — it is a
                ritual. The crackling wood, the ember glow, the crisp mountain
                air — they conspire to make even the quietest traveller share
                their story.
              </p>
              <p>
                Some nights there is music — a guitar passed around, old Hindi
                songs hummed badly but joyfully. Some nights there is silence — the
                kind that only a starlit Himalayan sky can command. And always,
                there is chai.
              </p>
            </div>
            <p className="font-accent text-2xl text-amber mt-6">
              &ldquo;The fire does not judge. It just listens.&rdquo;
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Join the Fire
              </Button>
            </div>
          </ScrollReveal>

          {/* Image placeholder */}
          <ScrollReveal delay={0.2}>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber/30 to-forest/20 overflow-hidden shadow-elevated">
              <div className="h-full w-full flex items-center justify-center">
                <span className="font-accent text-4xl text-amber/40">
                  Bonfire Nights
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
