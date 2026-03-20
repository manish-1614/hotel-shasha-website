import type { Metadata } from 'next'
import { Users, Info } from 'lucide-react'
import { rooms, formatPrice } from '@/data/rooms'
import { mealPlans } from '@/data/cuisine'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Rates',
  description:
    'Transparent pricing for all room types at Shasha Jibhi — Duplex Cottage, Private Rooms, and Unisex Dorm with meal plan options.',
}

export default function RatesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 sm:py-40 bg-gradient-to-br from-forest-dark via-forest to-forest-light overflow-hidden grain-overlay">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <span className="font-accent text-xl text-amber-light block mb-3">
              Transparent Pricing
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Our Rates
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Simple, honest pricing — no hidden fees, no surprises. Just great
              value for an extraordinary stay.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Rate Table */}
      <section className="py-20 sm:py-28 bg-parchment">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading
            accent="2026 Season"
            title="Room Rates"
            subtitle="All prices in Indian Rupees (₹) per night"
          />

          {/* Desktop Table */}
          <ScrollReveal>
            <div className="hidden md:block overflow-hidden rounded-xl border border-parchment-dark shadow-soft">
              <table className="w-full">
                <thead>
                  <tr className="bg-forest-dark text-white">
                    <th className="text-left px-6 py-4 font-editorial text-sm font-semibold">
                      Room Type
                    </th>
                    <th className="text-center px-6 py-4 font-editorial text-sm font-semibold">
                      Occupancy
                    </th>
                    <th className="text-right px-6 py-4 font-editorial text-sm font-semibold">
                      Room Only
                    </th>
                    <th className="text-right px-6 py-4 font-editorial text-sm font-semibold">
                      CP Plan / person
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.flatMap((room) =>
                    room.variants.map((variant, vi) => (
                      <tr
                        key={`${room.slug}-${vi}`}
                        className="border-t border-parchment-dark bg-white hover:bg-ivory transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-editorial font-semibold text-midnight">
                            {room.name}
                          </div>
                          {room.variants.length > 1 && (
                            <div className="text-xs text-midnight/50 mt-0.5">
                              {variant.label}
                            </div>
                          )}
                        </td>
                        <td className="text-center px-6 py-4">
                          <span className="inline-flex items-center gap-1 text-sm text-midnight/60">
                            <Users size={14} /> {variant.occupancy}
                          </span>
                        </td>
                        <td className="text-right px-6 py-4">
                          <span className="font-editorial text-lg font-semibold text-forest">
                            {formatPrice(variant.priceRoomOnly)}
                          </span>
                          <span className="text-xs text-midnight/40 ml-1">
                            /night
                          </span>
                        </td>
                        <td className="text-right px-6 py-4">
                          {variant.priceCpPerPerson > 0 ? (
                            <>
                              <span className="font-editorial text-lg font-semibold text-amber">
                                +{formatPrice(variant.priceCpPerPerson)}
                              </span>
                              <span className="text-xs text-midnight/40 ml-1">
                                /person
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-midnight/40">
                              On request
                            </span>
                          )}
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {rooms.map((room, ri) =>
              room.variants.map((variant, vi) => (
                <ScrollReveal key={`${room.slug}-${vi}`} delay={ri * 0.1}>
                  <div className="bg-white rounded-xl p-5 shadow-soft border border-parchment-dark">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-editorial text-base font-semibold text-midnight">
                          {room.name}
                        </h3>
                        {room.variants.length > 1 && (
                          <span className="text-xs text-midnight/50">
                            {variant.label}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-midnight/50 flex items-center gap-1">
                        <Users size={12} /> {variant.occupancy}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-parchment-dark">
                      <div>
                        <div className="text-xs text-midnight/40 uppercase tracking-wide">
                          Room Only
                        </div>
                        <div className="font-editorial text-xl font-semibold text-forest">
                          {formatPrice(variant.priceRoomOnly)}
                          <span className="text-xs font-normal text-midnight/40">
                            /night
                          </span>
                        </div>
                      </div>
                      {variant.priceCpPerPerson > 0 && (
                        <div className="text-right">
                          <div className="text-xs text-midnight/40 uppercase tracking-wide">
                            CP Plan
                          </div>
                          <div className="font-editorial text-xl font-semibold text-amber">
                            +{formatPrice(variant.priceCpPerPerson)}
                            <span className="text-xs font-normal text-midnight/40">
                              /person
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )),
            )}
          </div>
        </div>
      </section>

      {/* Meal Plans */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading
            accent="Dining Add-ons"
            title="Meal Plans"
            subtitle="Enhance your stay with our chef-crafted meal options"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mealPlans.map((plan, i) => (
              <ScrollReveal key={plan.code} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-parchment-dark h-full flex flex-col">
                  <h3 className="font-editorial text-lg font-semibold text-midnight">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-sm text-midnight/60 leading-relaxed flex-1">
                    {plan.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-parchment-dark">
                    <span className="text-sm font-medium text-forest">
                      {plan.priceNote}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="py-12 bg-parchment">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-amber/5 border border-amber/20 rounded-xl p-6">
              <div className="flex gap-3">
                <Info
                  size={20}
                  className="text-amber shrink-0 mt-0.5"
                />
                <div className="text-sm text-midnight/60 space-y-2">
                  <p>
                    <strong className="text-midnight/80">Check-in:</strong>{' '}
                    12:00 PM &nbsp;|&nbsp;{' '}
                    <strong className="text-midnight/80">Check-out:</strong>{' '}
                    11:00 AM
                  </p>
                  <p>
                    Peak season rates (Dec–Jan, May–Jun) may vary. Contact us
                    for the latest pricing during festive periods.
                  </p>
                  <p>
                    Children under 5 stay free. Extra mattress available at
                    ₹500/night.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-forest-dark grain-overlay">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Ready to Book?
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Send us your dates and preferences — we&apos;ll respond with
              availability and a personalised quote within hours.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Plan Your Stay
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
