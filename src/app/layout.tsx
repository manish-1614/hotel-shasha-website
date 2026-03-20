import type { Metadata } from 'next'
import { fontVariables } from '@/lib/fonts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Shasha Jibhi — Paused Perfect',
    template: '%s | Shasha Jibhi',
  },
  description:
    'A boutique homestay in Jibhi, Himachal Pradesh — where time slows down. Skylight duplex cottage, global cuisine, mountain dorm, and valley-view private rooms nestled in cedar forests.',
  keywords: [
    'Jibhi homestay',
    'Himachal Pradesh',
    'boutique stay',
    'Shasha',
    'mountain retreat',
    'duplex cottage',
    'Tirthan Valley',
  ],
  authors: [{ name: 'Shasha Jibhi' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Shasha Jibhi',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
