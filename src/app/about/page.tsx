import type { Metadata } from 'next'
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
      <AboutHero />
      <OurPhilosophy />
      <BonfireEthos />
    </>
  )
}
