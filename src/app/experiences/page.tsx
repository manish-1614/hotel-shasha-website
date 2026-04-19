import Image from 'next/image'
import type { Metadata } from 'next'
import { Trees, Coffee, Flame, Mountain, Waves, Utensils } from 'lucide-react'
import { experiences } from '@/data/experiences'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Experiences',
  description:
    'Beyond just a stay — experience mountain life with guided treks, riverside picnics, bonfire conversations, and global-local fusion cuisine at Shasha Jibhi.',
}

const iconMap: Record<string, any> = {
  Trees,
  Coffee,
  Flame,
  Mountain,
  Waves,
  Utensils,
}

export default function ExperiencesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 sm:py-40 bg-forest-dark overflow-hidden">
        <Image
          src="/hotel-shasha-website/images/exterior/mountain-homestay-exterior-desktop.webp"
          alt="Shasha Experiences"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/45 to-black/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <span className="font-accent text-xl text-amber-light block mb-3">
              Beyond the Bed
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-shadow-hero">
              Crafted Himalayan
              <span className="block text-amber-light">Experiences</span>
            </h1>
            <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              At Shasha, we don&apos;t just offer rooms; we share our home and our way of life. From secret trails to wood-fired stories, every day here is a chapter in your mountain story.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid of Experiences */}
      <section className="py-20 sm:py-28 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            accent="The Shasha Way"
            title="Moments That Matter"
            subtitle="Slow down and immerse yourself in the rhythm of the valley"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, i) => {
              const Icon = iconMap[exp.icon] || Mountain
              return (
                <ScrollReveal key={exp.id} delay={i * 0.1}>
                  <div className="group h-full bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 border border-parchment-dark flex flex-col">
                    <div className="aspect-[16/10] relative flex items-center justify-center overflow-hidden">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <Icon size={48} strokeWidth={1} className="relative z-10 text-white opacity-80 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="font-accent text-sm text-white/90 uppercase tracking-widest">
                          {exp.tagline}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display text-2xl font-bold text-forest-dark mb-3">
                        {exp.title}
                      </h3>
                      <p className="text-midnight/60 leading-relaxed text-sm flex-1">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="py-20 bg-ivory border-y border-parchment-dark">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-editorial text-3xl sm:text-4xl italic text-forest-dark mb-8">
              &quot;We don&apos;t want you to just visit Jibhi. We want you to feel it — the cold water, the quiet forest, and the warmth of a shared meal.&quot;
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-amber" />
              <span className="font-accent text-lg text-amber">The Shasha Brothers</span>
              <div className="h-px w-12 bg-amber" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-forest-dark grain-overlay">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Ready to Explore?
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Plan your stay and let us help you experience the best of Jibhi.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Book Your Adventure
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
