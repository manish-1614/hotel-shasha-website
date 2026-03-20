import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // Change to your repo name if deploying to GitHub Pages without a custom domain
  basePath: '/hotel-shasha-website',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  
  // Optional: Add trailingSlash for GH Pages
  trailingSlash: true,

  async headers() {
    // Note: async headers() are NOT supported in output: 'export'
    // This is just kept here for future reference or if switching back to SSR
    return []
  },
}

export default nextConfig
