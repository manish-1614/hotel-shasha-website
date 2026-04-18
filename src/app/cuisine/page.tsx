import Image from 'next/image'
import type { Metadata } from 'next'
import { UtensilsCrossed, Flame, Leaf, Coffee } from 'lucide-react'
import { cuisinePhilosophy, dishes, mealPlans } from '@/data/cuisine'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Cuisine',
  description:
    'From hand-rolled pasta to Himachali siddu — experience global flavours crafted with mountain soul at Shasha Jibhi.',
}

const philosophyIcons = [
  { icon: Flame, label: 'Wood-fired cooking' },
  { icon: Leaf, label: 'Locally sourced produce' },
  { icon: UtensilsCrossed, label: 'Global & local fusion' },
  { icon: Coffee, label: 'Mountain chai tradition' },
]

export default function CuisinePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 sm:py-40 bg-warm-wood overflow-hidden">
        <Image
          src="/hotel-shasha-website/images/food/indian-homestay-food-platter-desktop.webp"
          alt="Shasha Cuisine"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <span className="font-accent text-xl text-white block mb-3">
              {cuisinePhilosophy.subtitle}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider">
              {cuisinePhilosophy.title}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 sm:py-28 bg-parchment">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-5 text-midnight/70 leading-relaxed text-lg italic font-editorial">
              {cuisinePhilosophy.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {philosophyIcons.map((item) => (
                <div key={item.label} className="text-center group">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-amber/10 text-amber transition-all duration-300 group-hover:bg-amber group-hover:text-white group-hover:shadow-md">
                    <item.icon size={26} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-midnight/60">{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Dish Grid */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            accent="From Our Kitchen"
            title="The Menu Highlights"
            subtitle="A taste of what the explorer-chef brother has in store"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishes.map((dish, i) => (
              <ScrollReveal key={dish.name} delay={i * 0.06}>
                <div className="group rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 bg-white">
                  <div
                    className="aspect-square relative flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-editorial text-base font-semibold text-midnight">
                        {dish.name}
                      </h3>
                    </div>
                    <p className="text-sm text-midnight/50">
                      {dish.description}
                    </p>
                    <span className="mt-2 inline-block text-xs font-medium text-amber bg-amber/10 px-2 py-0.5 rounded-full">
                      {dish.category}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Plans */}
      <section className="py-20 sm:py-28 bg-parchment">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading
            accent="Dining Options"
            title="Meal Plans"
            subtitle="Choose the plan that suits your stay"
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

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-forest-dark grain-overlay">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <span className="font-accent text-xl text-amber-light block mb-3">
              Hungry yet?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Come Taste the Mountains
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Every meal at Shasha is made from scratch with love. Plan your stay
              and let us feed your soul.
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
