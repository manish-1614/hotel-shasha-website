import type { Metadata } from 'next'
import LandingClient from './LandingClient'

export const metadata: Metadata = {
  title: 'Project Started | Hotel Shasha Jibhi',
  description: 'The journey of crafting Shasha — a boutique homestay in Jibhi, Himachal Pradesh — has officially begun.',
}

export default function LandingPage() {
  return <LandingClient />
}
