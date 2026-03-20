import type { Metadata } from 'next'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GalleryGrid from '@/components/gallery/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Explore Shasha through photographs — our rooms, cuisine, cedar forest surroundings, and the experiences that make Jibhi unforgettable.',
}

export default function GalleryPage() {
  return (
    <>
      <section className="relative py-32 sm:py-40 bg-gradient-to-br from-forest-dark via-forest to-forest-light overflow-hidden grain-overlay">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <span className="font-accent text-xl text-amber-light block mb-3">
              A Visual Story
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Gallery
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Cedar ceilings, valley light, mountain meals — glimpses of what
              awaits you at Shasha.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <GalleryGrid />
        </div>
      </section>
    </>
  )
}
