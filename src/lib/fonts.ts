import {
  Cormorant_Garamond,
  Playfair_Display,
  DM_Sans,
  Caveat,
} from 'next/font/google'

/** Display / Hero — 900 Bold for hero title, section headers, brand moments */
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

/** Editorial — 600–700 for room names, pull quotes, feature labels */
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

/** Body / UI — 400–500 for body copy, form labels, nav, metadata */
export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

/** Accent / Quote — 600 handwritten feel for personal notes, host quotes */
export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

/** Combined className string for applying all font CSS variables */
export const fontVariables = [
  cormorant.variable,
  playfair.variable,
  dmSans.variable,
  caveat.variable,
].join(' ')
