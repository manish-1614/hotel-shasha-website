export interface RoomVariant {
  label: string
  occupancy: string
  priceRoomOnly: number
  priceCpPerPerson: number
}

export interface Room {
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string[]
  capacity: number
  features: string[]
  variants: RoomVariant[]
  gradient: string
  image: string
  gallery: string[]
}

export const rooms: Room[] = [
  {
    slug: 'duplex-cottage',
    name: 'Duplex Cottage',
    tagline: 'Stargaze through the skylight',
    description:
      'Skylight stargazing, infinite glass windows, cedar interiors — the crown jewel of Shasha.',
    longDescription: [
      "The Duplex Cottage is Shasha's signature experience — a two-level cedar retreat where the upper floor opens to the sky through a dramatic skylight. Fall asleep counting stars, wake up to golden Himalayan light.",
      'An 18-foot glass window frames the valley like a living painting. The low-sitting sun area invites you to curl up with a book and a cup of chai while pine-scented breezes drift through.',
      'Every detail is intentional: hand-finished cedar walls, locally crafted furniture, and the quiet luxury of space and silence.',
    ],
    capacity: 4,
    features: [
      'Skylight stargazing roof',
      '18-ft floor-to-ceiling glass window',
      'Cedar wood interiors',
      'Low-sitting sun area',
      'Private balcony',
      'Valley & mountain views',
    ],
    variants: [
      {
        label: 'Triple Sharing',
        occupancy: '3 guests',
        priceRoomOnly: 4800,
        priceCpPerPerson: 1800,
      },
      {
        label: 'Quad Sharing',
        occupancy: '4 guests',
        priceRoomOnly: 6000,
        priceCpPerPerson: 1750,
      },
    ],
    gradient: 'from-forest-dark to-forest',
    image: '/hotel-shasha-website/images/room/rustic-wooden-bedroom-homestay-desktop.webp',
    gallery: [
      '/hotel-shasha-website/images/room/rustic-wooden-bedroom-homestay-desktop.webp',
      '/hotel-shasha-website/images/room/cozy-wooden-room-forest-view-desktop.webp',
      '/hotel-shasha-website/images/room/cozy-homestay-window-view-desktop.webp',
      '/hotel-shasha-website/images/bathroom/homestay-bathroom-interior-desktop.webp',
      '/hotel-shasha-website/images/bathroom/homestay-rustic-wash-area-desktop.webp',
      '/hotel-shasha-website/images/exterior/hillside-village-himalayan-view-desktop.webp',
    ],
  },
  {
    slug: 'private-rooms',
    name: 'Private Rooms',
    tagline: 'Valley views & cheerful colours',
    description:
      'Cozy double-sharing rooms with valley views, sofa-cum-bed, and cheerful mountain décor.',
    longDescription: [
      'Our Private Rooms are designed for couples and solo travellers who want their own space without sacrificing the warmth of a homestay experience.',
      'Each room features a comfortable sofa-cum-bed, valley-facing windows that flood the space with natural light, and cheerful décor that captures the spirit of the mountains.',
      'Step out to the shared balcony, breathe in the crisp mountain air, and let the sounds of the forest become your soundtrack.',
    ],
    capacity: 2,
    features: [
      'Valley views',
      'Sofa-cum-bed',
      'Cheerful mountain décor',
      'Natural light',
      'Snug blankets & pillows',
      'Shared balcony access',
    ],
    variants: [
      {
        label: 'Double Sharing',
        occupancy: '2 guests',
        priceRoomOnly: 2000,
        priceCpPerPerson: 1300,
      },
    ],
    gradient: 'from-warm-wood to-amber',
    image: '/hotel-shasha-website/images/room/cozy-wooden-homestay-room-desktop.webp',
    gallery: [
      '/hotel-shasha-website/images/room/cozy-wooden-homestay-room-desktop.webp',
      '/hotel-shasha-website/images/room/homestay-bedroom-forest-view-desktop.webp',
      '/hotel-shasha-website/images/room/rustic-room-interior-desktop.webp',
      '/hotel-shasha-website/images/bathroom/bathroom-western-toilet-shower-desktop.webp',
      '/hotel-shasha-website/images/room/cozy-window-seat-room-desktop.webp',
      '/hotel-shasha-website/images/room/homestay-wooden-staircase-interior-desktop.webp',
    ],
  },
  {
    slug: 'dorm',
    name: 'Unisex Dormitory',
    tagline: 'Attic library & mountain vibes',
    description:
      '6-bed luxury wooden bunk dorm with an attic library, indoor games, and panoramic mountain views.',
    longDescription: [
      'The Shasha Dorm redefines what budget travel can feel like. Premium wooden bunk beds, each with its own reading light and charging point, sit beneath an attic ceiling that houses a curated mountain library.',
      'This is where backpacker stories are born — board games on rainy afternoons, late-night conversations about trails and travels, and the kind of friendships that only mountain hostels create.',
      'Step outside for panoramic Himalayan views that would cost ten times more anywhere else.',
    ],
    capacity: 6,
    features: [
      'Premium wooden bunk beds',
      'Attic library',
      'Indoor games & board games',
      'Himalayan panoramic view',
      'Personal reading lights',
      'Charging points per bed',
    ],
    variants: [
      {
        label: 'Per Bed',
        occupancy: '1 guest',
        priceRoomOnly: 700,
        priceCpPerPerson: 0,
      },
    ],
    gradient: 'from-forest to-forest-light',
    image: '/hotel-shasha-website/images/room/wooden-bunk-beds-room-desktop.webp',
    gallery: [
      '/hotel-shasha-website/images/room/wooden-bunk-beds-room-desktop.webp',
      '/hotel-shasha-website/images/room/homestay-dorm-bunk-beds-room-desktop.webp',
      '/hotel-shasha-website/images/room/homestay-lounge-room-desktop.webp',
      '/hotel-shasha-website/images/room/traditional-homestay-lounge-room-desktop.webp',
      '/hotel-shasha-website/images/room/cozy-wooden-loft-room-desktop.webp',
      '/hotel-shasha-website/images/amenities/homestay-equipped-kitchen-desktop.webp',
    ],
  },
]

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug)
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
