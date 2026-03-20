'use client'

import { motion } from 'framer-motion'

export default function LandingClient() {
  return (
    <main className="min-h-screen bg-parchment flex items-center justify-center p-6 overflow-hidden relative grain-overlay">
      {/* Subtle Background Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-forest/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Progress Bar (at the top) */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-forest to-amber origin-left"
      />
      
      <div className="max-w-3xl w-full text-center space-y-16 relative z-10">
        <div className="space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-accent text-forest text-2xl md:text-4xl"
          >
            Something beautiful is taking root...
          </motion.h2>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-display text-forest-dark tracking-tight leading-none mb-4">
              Hotel Shasha
            </h1>
            <p className="font-editorial italic text-xl md:text-2xl text-midnight/60">
              Jibhi &bull; Himachal Pradesh
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-px w-24 bg-forest/20 mx-auto" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="space-y-8"
        >
          <p className="text-xl md:text-2xl font-body text-midnight/80 max-w-2xl mx-auto leading-relaxed">
            The project has started to build now. We&apos;re currently in the grinding and planning phase to bring you Shasha &mdash; a boutique homestay nestled in silence.
          </p>

          <div className="inline-flex flex-col items-center space-y-6">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-forest/5 rounded-full border border-forest/10 text-forest font-medium text-sm tracking-wide uppercase">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-forest"></span>
              </span>
              <span>Development Phase 1: Planning & Architecture</span>
            </div>
            
            <a 
              href="https://github.com/manish-1614/hotel-shasha-website" 
              className="text-midnight/40 hover:text-forest transition-colors font-body text-sm border-b border-transparent hover:border-forest/30 pb-1"
            >
              Follow the repository for updates
            </a>
          </div>
        </motion.div>
      </div>

      {/* Signature Ornament */}
      <motion.div 
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 0.1, rotate: 0 }}
        transition={{ delay: 1.2, duration: 2 }}
        className="absolute bottom-12 right-12 w-32 h-32 text-forest-dark opacity-10"
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
      </motion.div>
    </main>
  )
}
