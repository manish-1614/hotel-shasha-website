'use client'

import { Home, UtensilsCrossed, BedDouble, Mountain } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const highlights = [
  {
    icon: Home,
    title: 'Skylight Cottage',
    description: 'Stargaze from your duplex with 18-ft glass windows',
  },
  {
    icon: UtensilsCrossed,
    title: 'Global Cuisine',
    description: 'From pasta to parathas — chef-crafted mountain meals',
  },
  {
    icon: BedDouble,
    title: 'Mountain Dorm',
    description: 'Attic library, indoor games, and panoramic views',
  },
  {
    icon: Mountain,
    title: 'Valley Views',
    description: 'Cedar forests, cold streams, and altitude light',
  },
]

export default function HighlightsStrip() {
  return (
    <section className="py-16 sm:py-20 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {highlights.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div className="text-center group">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-forest/5 text-forest transition-all duration-300 group-hover:bg-forest group-hover:text-white group-hover:shadow-md">
                  <item.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-editorial text-base sm:text-lg font-semibold text-midnight mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-midnight/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
