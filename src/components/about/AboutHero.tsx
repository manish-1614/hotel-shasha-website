'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-forest overflow-hidden">
      <Image
        src="/hotel-shasha-website/images/exterior/homestay-exterior-forest-view-desktop.webp"
        alt="Shasha Around Nature"
        fill
        className="object-cover opacity-50"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/35 to-black/75" />
      <div className="grain-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-accent text-xl text-amber-light block mb-4"
        >
          Our Story
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-shadow-hero"
        >
          Two Brothers, One Home,
          <span className="block text-amber-light">Endless Stories</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Deep in the cedar forests of Jibhi, Himachal Pradesh, two brothers
          transformed their family home into a place where travellers from
          around the world find warmth, laughter, and belonging.
        </motion.p>
      </div>
    </section>
  )
}
