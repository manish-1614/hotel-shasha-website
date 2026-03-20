'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused])

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section className="py-20 sm:py-28 bg-forest-dark relative overflow-hidden grain-overlay">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <SectionHeading
          accent="Guest Stories"
          title="What They Say"
          subtitle="Words from travellers who paused here"
          light
        />

        <div
          className="relative min-h-[280px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-amber text-amber"
                    />
                  ),
                )}
              </div>

              <blockquote className="text-lg sm:text-xl text-white/90 leading-relaxed font-light italic max-w-3xl mx-auto">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>

              <div className="mt-8">
                <p className="font-editorial text-base font-semibold text-white">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-white/50 mt-1">
                  {testimonials[current].location} · Stayed in{' '}
                  {testimonials[current].stayType}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-amber' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
