import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-playfair',
  weight: ['400', '600', '700', '800']
});
const sourceSerif = Source_Serif_4({ 
  subsets: ["latin"], 
  variable: '--font-source-serif',
  weight: ['400', '600']
});

export const metadata: Metadata = {
  title: 'InFocusIT - Cybersecurity Intelligence',
  description: 'Premium cybersecurity blog featuring in-depth analysis of zero-day exploits, ransomware trends, and emerging threats.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${sourceSerif.variable} bg-white`}>
      <body className="font-source-serif antialiased bg-white text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
