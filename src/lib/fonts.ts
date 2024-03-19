import { Inter } from 'next/font/google';
import { Bruno_Ace_SC } from 'next/font/google';

export const brunoAceSc = Bruno_Ace_SC({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  adjustFontFallback: false,
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});
