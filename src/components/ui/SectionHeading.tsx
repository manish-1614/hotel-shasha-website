'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  accent?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeading({
  title,
  subtitle,
  accent,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {accent && (
        <span className={`font-accent text-xl ${light ? 'text-amber-light' : 'text-amber'} mb-2 block`}>
          {accent}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold ${
          light ? 'text-white' : 'text-forest-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base sm:text-lg leading-relaxed ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-white/70' : 'text-midnight/60'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
