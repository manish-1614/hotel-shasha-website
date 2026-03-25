import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Users, Check } from 'lucide-react'
import { rooms, getRoomBySlug, formatPrice } from '@/data/rooms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const room = getRoomBySlug(slug)
  if (!room) return {}
  return {
    title: room.name,
    description: room.description,
  }
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params
  const room = getRoomBySlug(slug)
  if (!room) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative py-32 sm:py-44 bg-forest-dark overflow-hidden font-display">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/30" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <span className="font-accent text-xl text-amber-light block mb-3">
              {room.tagline}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white uppercase tracking-wider">
              {room.name}
            </h1>
            <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              {room.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 sm:py-28 bg-parchment">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-5 text-midnight/70 leading-relaxed text-lg font-editorial italic underline-offset-4 decoration-amber/30 decoration-1">
              {room.longDescription.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features + Pricing side by side */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Features */}
            <ScrollReveal>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest-dark mb-8">
                What&apos;s Included
              </h2>
              <ul className="space-y-4">
                {room.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-midnight/70"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                      <Check size={14} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Pricing */}
            <ScrollReveal delay={0.15}>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest-dark mb-8">
                Rates
              </h2>
              <div className="space-y-4">
                {room.variants.map((v) => (
                  <div
                    key={v.label}
                    className="bg-white rounded-xl p-6 shadow-soft border border-parchment-dark"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-editorial text-lg font-semibold text-midnight">
                          {v.label}
                        </h3>
                        <p className="text-sm text-midnight/50 flex items-center gap-1 mt-1">
                          <Users size={14} /> {v.occupancy}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-editorial text-2xl font-bold text-forest">
                          {formatPrice(v.priceRoomOnly)}
                        </div>
                        <div className="text-xs text-midnight/50">
                          per night · room only
                        </div>
                      </div>
                    </div>
                    {v.priceCpPerPerson > 0 && (
                      <div className="mt-3 pt-3 border-t border-parchment-dark text-sm text-midnight/50">
                        CP Plan (breakfast):{' '}
                        <span className="font-semibold text-midnight/70">
                          +{formatPrice(v.priceCpPerPerson)}
                        </span>{' '}
                        per person/night
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 sm:py-28 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest-dark text-center mb-12 uppercase tracking-widest">
              Gallery
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {room.gallery.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  className="aspect-4/3 rounded-xl relative overflow-hidden shadow-soft group"
                >
                  <Image
                    src={img}
                    alt={`${room.name} — Photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-forest-dark grain-overlay">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Ready to Book the {room.name}?
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Send us an enquiry and we&apos;ll get back to you within a few hours
              with availability and a personalised quote.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" size="lg">
                Enquire Now
              </Button>
              <Button
                href="/rates"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50"
              >
                View All Rates
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
