'use client'

import { Heart, Utensils, Compass, Users } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

const values = [
  {
    icon: Heart,
    title: 'Warmth Over Luxury',
    description:
      'We believe the best hospitality comes from the heart, not from a checklist. Every interaction — from your first enquiry to your goodbye chai — is personal.',
  },
  {
    icon: Utensils,
    title: 'Food as Love Language',
    description:
      'From Italian pasta to Himachali siddu, from Thai curries to Rajasthani dal bati — our kitchen is where the world meets the mountains. Every meal is made with love.',
  },
  {
    icon: Compass,
    title: 'Adventure Awaits',
    description:
      'Whether it is a sunrise trek to Serolsar Lake, a drive through the Great Himalayan National Park, or simply reading a book by the stream — Jibhi has a pace for everyone.',
  },
  {
    icon: Users,
    title: 'Strangers to Family',
    description:
      'The bonfire at Shasha is where inhibitions melt. Travellers from different walks of life share stories, music, and perspectives. Many arrive alone and leave with lifelong friends.',
  },
]

export default function OurPhilosophy() {
  return (
    <section className="py-20 sm:py-28 bg-parchment">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          accent="What We Believe"
          title="Our Philosophy"
          subtitle="Shasha is built on four pillars — each one a promise to every guest who walks through our door."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} delay={i * 0.1}>
              <div className="flex gap-5 p-6 rounded-xl bg-white shadow-soft hover:shadow-card transition-shadow duration-300">
                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-forest/5 text-forest">
                  <value.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-semibold text-midnight mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-midnight/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
