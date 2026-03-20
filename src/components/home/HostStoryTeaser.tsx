'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

export default function HostStoryTeaser() {
  return (
    <section className="py-20 sm:py-28 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-forest/20 to-amber/20 overflow-hidden shadow-card">
              <div className="h-full w-full flex items-center justify-center">
                <span className="font-accent text-4xl text-forest/30">
                  The Brothers
                </span>
              </div>
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
