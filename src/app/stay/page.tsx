import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, Users, Star } from 'lucide-react'
import { rooms, formatPrice } from '@/data/rooms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Accommodations',
  description:
    'Explore our rooms at Shasha Jibhi — from the skylight duplex cottage to cozy private rooms and a backpacker-friendly mountain dorm.',
}

export default function StayPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 sm:py-40 bg-forest overflow-hidden">
        <Image
          src="/images/exterior/mountain-homestay-exterior-desktop.webp"
          alt="Shasha Accommodations"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/35 to-black/75" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <span className="font-accent text-xl text-amber-light block mb-3">
              Where You&apos;ll Stay
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-shadow-hero">
              Our Accommodations
            </h1>
            <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Three distinct ways to experience Shasha — each crafted with care,
              cedar, and a quiet sense of belonging.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Room Cards */}
      <section className="py-20 sm:py-28 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-20 lg:space-y-28">
            {rooms.map((room, i) => (
              <ScrollReveal key={room.slug} delay={0.1}>
                <div
                  id={room.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    i % 2 === 1 ? 'lg:direction-rtl' : ''
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}
                  >
                    <div
                      className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-card group"
                    >
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span className="font-accent text-lg text-amber block mb-2">
                      {room.tagline}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest-dark">
                      {room.name}
                    </h2>

                    <p className="mt-4 text-midnight/70 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-6 grid grid-cols-2 gap-3">
                      {room.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-midnight/60"
                        >
                          <Star
                            size={14}
                            className="text-amber shrink-0"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Pricing */}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      {room.variants.map((v) => (
                        <div
                          key={v.label}
                          className="bg-ivory rounded-lg px-4 py-3 border border-parchment-dark"
                        >
                          <div className="text-xs text-midnight/50 uppercase tracking-wide">
                            {v.label}
                          </div>
                          <div className="font-editorial text-xl font-semibold text-forest">
                            {formatPrice(v.priceRoomOnly)}
                            <span className="text-sm font-normal text-midnight/50">
                              /night
                            </span>
                          </div>
                          <div className="text-xs text-midnight/40 flex items-center gap-1 mt-0.5">
                            <Users size={12} /> {v.occupancy}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href={`/stay/${room.slug}`}>
                        View Details <ArrowRight size={16} />
                      </Button>
                      <Button href="/contact" variant="outline">
                        Enquire Now
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 bg-ivory">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            accent="Not sure which room?"
            title="Let Us Help You Choose"
            subtitle="Tell us about your trip and we'll recommend the perfect room for your stay."
          />
          <Button href="/contact" size="lg">
            Get in Touch
          </Button>
        </div>
      </section>
    </>
  )
}
