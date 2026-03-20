import type { Metadata } from 'next'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Shasha Jibhi — how we handle your data.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="relative py-32 sm:py-36 bg-gradient-to-br from-forest-dark to-forest overflow-hidden grain-overlay">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Privacy Policy
            </h1>
            <p className="mt-4 text-white/60 text-sm">
              Last updated: March 2026
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-parchment">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="prose-shasha">
              <h2>1. Information We Collect</h2>
              <p>
                When you use our contact form or booking system, we collect the
                information you provide, including your name, email address,
                phone number, city, stay preferences, and any special requests.
              </p>
              <p>
                We also automatically collect basic technical information such as
                your browser type and IP address (stored as a one-way hash for
                abuse prevention only).
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Respond to your stay enquiries and provide personalised quotes</li>
                <li>Process and confirm bookings</li>
                <li>Send booking confirmation and pre-arrival information</li>
                <li>Improve our website and services</li>
              </ul>
              <p>
                We do not sell, rent, or share your personal information with
                third parties for marketing purposes.
              </p>

              <h2>3. Data Storage & Security</h2>
              <p>
                Your data is stored securely using industry-standard encryption.
                Form submissions are transmitted over HTTPS. We use Vercel for
                hosting and will use NeonDB (PostgreSQL) for data storage, both
                of which maintain SOC 2 compliance.
              </p>

              <h2>4. Cookies & Analytics</h2>
              <p>
                We use essential cookies to ensure the website functions
                properly. We may use privacy-friendly analytics (PostHog) to
                understand how visitors use our website. Analytics data is
                anonymised and does not contain personally identifiable
                information.
              </p>
              <p>
                Form input fields are masked in any session recordings to
                protect your privacy.
              </p>

              <h2>5. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul>
                <li>
                  <strong>Cloudflare Turnstile</strong> — Bot protection on our
                  contact form (non-intrusive, no tracking cookies)
                </li>
                <li>
                  <strong>Resend</strong> — Transactional email delivery for
                  enquiry confirmations
                </li>
                <li>
                  <strong>Razorpay</strong> — Payment processing (when booking
                  is available). Razorpay handles payment data under their own
                  privacy policy.
                </li>
              </ul>

              <h2>6. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal
                data at any time. To make a request, email us at{' '}
                <a href="mailto:stay@shashajibhi.com">stay@shashajibhi.com</a>{' '}
                or call{' '}
                <a href="tel:+918210134128">+91 8210134128</a>.
              </p>

              <h2>7. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. Changes
                will be posted on this page with an updated &quot;last updated&quot; date.
              </p>

              <h2>8. Contact</h2>
              <p>
                If you have questions about this privacy policy, please contact
                us:
              </p>
              <ul>
                <li>
                  Email:{' '}
                  <a href="mailto:stay@shashajibhi.com">stay@shashajibhi.com</a>
                </li>
                <li>
                  Phone: <a href="tel:+918210134128">+91 8210134128</a>
                </li>
                <li>
                  Address: Shasha, Jibhi, Banjar, Kullu, Himachal Pradesh 175123
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
