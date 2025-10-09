import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@/styles/globals.css';
import ErrorBoundary from '@/components/ui/ErrorBoundary/ErrorBoundary';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hotel Shasha - Boutique Hotel in Jibhi, Himachal Pradesh',
  description:
    'Experience serene mountain hospitality at Hotel Shasha in Jibhi, Himachal Pradesh. Luxury accommodation with stunning Himalayan views.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary showDetails={false}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
