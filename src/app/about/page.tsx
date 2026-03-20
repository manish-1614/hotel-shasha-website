import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AboutHero from '@/components/about/AboutHero'
import OurPhilosophy from '@/components/about/OurPhilosophy'
import BonfireEthos from '@/components/about/BonfireEthos'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet the two brothers behind Shasha — an explorer-chef and a mountain guide who turned their home in Jibhi into a haven for travellers.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <OurPhilosophy />
        <BonfireEthos />
      </main>
      <Footer />
    </>
  )
}
