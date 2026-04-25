'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

export default function HostStoryTeaser() {
  return (
    <section className="py-20 sm:py-28 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card group">
              <Image
                src="/images/brothers-1.webp"
                alt="The Brothers — Manish and his brother"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-forest-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal direction="right" className="lg:col-span-3">
            <span className="font-accent text-xl text-amber block mb-2">
              Two Brothers, One Home
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-dark leading-tight">
              Every Guest Becomes Family
            </h2>
            <div className="mt-6 space-y-4 text-midnight/70 leading-relaxed">
              <p>
                Shasha was born from a simple belief: travel is best when it
                feels like coming home. Run by two brothers — one an
                explorer-chef with a flair for global flavours, the other a
                mountain guide who knows every trail and hidden waterfall in the
                valley — Shasha is their invitation to experience Jibhi as they
                do.
              </p>
              <p>
                Here, stories flow over chai by the bonfire, laughter fills the
                air like mountain mist, and strangers leave as friends. The
                cedar-walled rooms, the home-cooked meals, the starlit skylight
                — they&apos;re not amenities. They&apos;re how we say welcome.
              </p>
            </div>
            <p className="font-accent text-2xl text-amber mt-6">
              &ldquo;We don&apos;t run a hotel — we share our home.&rdquo;
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outline" size="lg">
                Our Story
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
