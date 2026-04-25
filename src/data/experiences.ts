export interface Experience {
  id: string
  title: string
  tagline: string
  description: string
  icon: string
  gradient: string
  image: string
}

export const experiences: Experience[] = [
  {
    id: 'cedar-forests',
    title: 'Forest Bathing',
    tagline: 'Connect with nature',
    description: 'Shasha is nestled inside a dense cedar forest. Step outside for a quiet walk amidst ancient trees and crisp mountain air.',
    icon: 'Trees',
    gradient: 'from-forest-dark/30 to-forest/20',
    image: '/images/exterior/homestay-exterior-forest-view-desktop.webp',
  },
  {
    id: 'chai-conversations',
    title: 'Chai & Stories',
    tagline: 'The heart of Shasha',
    description: 'Our evenings revolve around the common room, sharing stories from our travels over endless cups of mountain chai.',
    icon: 'Coffee',
    gradient: 'from-amber/30 to-warm-wood/20',
    image: '/images/room/homestay-lounge-room-desktop.webp',
  },
  {
    id: 'starlit-bonfires',
    title: 'Bonfire Nights',
    tagline: 'Under the Himachali sky',
    description: 'Warm up by the fire as we talk about mountaineering legends, local folklore, and the magic of Jibhi.',
    icon: 'Flame',
    gradient: 'from-midnight/40 to-forest-dark/30',
    image: '/images/amenities/outdoor-pergola-seating-forest-desktop.webp',
  },
  {
    id: 'local-treks',
    title: 'Guided Treks',
    tagline: 'Off-beat paths',
    description: 'Let us take you to hidden waterfalls and secret meadows that only the locals know about.',
    icon: 'Mountain',
    gradient: 'from-forest/30 to-amber/10',
    image: '/images/exterior/mountain-homestay-exterior-1-desktop.webp',
  },
  {
    id: 'riverside-picnics',
    title: 'Riverside Picnics',
    tagline: 'By the cold stream',
    description: 'A short walk from Shasha leads to a perennial stream where we set up blankets, books, and fresh snacks.',
    icon: 'Waves',
    gradient: 'from-forest-light/25 to-amber/15',
    image: '/images/exterior/hillside-village-himalayan-view-desktop.webp',
  },
  {
    id: 'chef-kitchen',
    title: 'Chef\'s Kitchen',
    tagline: 'Global soul, local heart',
    description: 'Watch or join the explorer-chef brother as he prepares hand-rolled pasta or traditional Himachali siddu.',
    icon: 'Utensils',
    gradient: 'from-amber-light/30 to-amber/20',
    image: '/images/amenities/homestay-kitchen-amenities-desktop.webp',
  },
]
