import HeroSection from '@/components/home/HeroSection'
import HighlightsStrip from '@/components/home/HighlightsStrip'
import RoomsPreview from '@/components/home/RoomsPreview'
import HostStoryTeaser from '@/components/home/HostStoryTeaser'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import FinalCTA from '@/components/home/FinalCTA'
import JsonLd from '@/components/seo/JsonLd'

const lodgingBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Shasha Jibhi',
  description:
    'A boutique homestay in Jibhi, Himachal Pradesh — where time slows down. Skylight duplex cottage, global cuisine, mountain dorm, and valley-view private rooms nestled in cedar forests.',
  url: 'https://www.shashajibhi.in',
  telephone: ['+918899543976', '+919534139998'],
  email: 'stay@shashajibhi.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shasha, Jibhi, Banjar',
    addressLocality: 'Kullu',
    addressRegion: 'Himachal Pradesh',
    postalCode: '175123',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.5368,
    longitude: 77.3455,
  },
  priceRange: '₹700 - ₹6,000',
  starRating: { '@type': 'Rating', ratingValue: '5' },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi' },
    { '@type': 'LocationFeatureSpecification', name: 'Mountain Views' },
    { '@type': 'LocationFeatureSpecification', name: 'Bonfire Area' },
    { '@type': 'LocationFeatureSpecification', name: 'Home-Cooked Meals' },
  ],
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={lodgingBusinessSchema} />
      <HeroSection />
      <HighlightsStrip />
      <RoomsPreview />
      <HostStoryTeaser />
      <TestimonialsSection />
      <FinalCTA />
    </>
  )
}
