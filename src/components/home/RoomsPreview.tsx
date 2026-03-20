'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

const rooms = [
  {
    slug: 'duplex-cottage',
    name: 'Duplex Cottage',
    tagline: 'Stargaze through the skylight',
    priceFrom: '₹4,800',
    gradient: 'from-forest-dark to-forest',
  },
  {
    slug: 'private-rooms',
    name: 'Private Rooms',
    tagline: 'Valley views & cheerful colours',
    priceFrom: '₹2,000',
    gradient: 'from-warm-wood to-amber',
  },
  {
    slug: 'dorm',
    name: 'Unisex Dorm',
    tagline: 'Attic library & mountain vibes',
    priceFrom: '₹700',
    gradient: 'from-forest to-forest-light',
  },
]

export default function RoomsPreview() {
  return (
    <section className="py-20 sm:py-28 bg-parchment">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          accent="Where You'll Stay"
          title="Our Rooms"
          subtitle="Each room at Shasha is a carefully curated space — designed to feel like home in the mountains."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room, i) => (
            <ScrollReveal key={room.slug} delay={i * 0.12}>
              <Link
                href={`/stay/${room.slug}`}
                className="group block overflow-hidden rounded-xl shadow-card hover:shadow-elevated transition-all duration-500"
              >
                {/* Image placeholder */}
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${room.gradient}`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />

                  {/* Price tag */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                    <span className="text-sm font-semibold text-forest">
                      From {room.priceFrom}
                    </span>
                    <span className="text-xs text-midnight/50 ml-1">/night</span>
                  </div>
                </div>

                {/* Card content */}
                <div className="bg-white p-5">
                  <h3 className="font-editorial text-lg font-semibold text-midnight group-hover:text-forest transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-sm text-midnight/50 mt-1">{room.tagline}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-forest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                    Explore <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
