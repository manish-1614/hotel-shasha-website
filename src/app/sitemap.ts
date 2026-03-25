import type { MetadataRoute } from 'next'
import { rooms } from '@/data/rooms'

export const dynamic = 'force-static'

const baseUrl = 'https://www.shashajibhi.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/stay',
    '/gallery',
    '/experiences',
    '/cuisine',
    '/rates',
    '/contact',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/contact' ? 0.9 : 0.8,
  }))

  const roomRoutes = rooms.map((room) => ({
    url: `${baseUrl}/stay/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...roomRoutes]
}
