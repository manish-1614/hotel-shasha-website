import Link from 'next/link'
import { Instagram, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/stay', label: 'Accommodations' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/cuisine', label: 'Cuisine' },
  { href: '/rates', label: 'Rates' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-midnight text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Shasha
            </h3>
            <p className="font-accent text-lg text-amber mb-4">
              Paused Perfect
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              A boutique homestay in Jibhi, Himachal Pradesh — where time slows
              down, stories are shared over chai, and every guest becomes family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-editorial text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-forest-light transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-editorial text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-forest-light" />
                <span>Shasha, Jibhi, Banjar, Kullu, Himachal Pradesh 175123</span>
              </li>
              <li>
                <a
                  href="https://wa.me/918899543976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-forest-light transition-colors"
                >
                  <MessageCircle size={16} className="shrink-0" />
                  +91 8899543976
                </a>
              </li>
              <li>
                <a
                  href="tel:+919534139998"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-forest-light transition-colors"
                >
                  <Phone size={16} className="shrink-0" />
                  +91 9534139998
                </a>
              </li>
              <li>
                <a
                  href="mailto:stay@shashajibhi.com"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-forest-light transition-colors"
                >
                  <Mail size={16} className="shrink-0" />
                  stay@shashajibhi.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-editorial text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <a
              href="https://instagram.com/shasha_jibhi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-amber transition-colors"
            >
              <Instagram size={20} />
              @shasha_jibhi
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Shasha Jibhi. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
