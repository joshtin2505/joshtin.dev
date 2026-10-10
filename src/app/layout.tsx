import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './Providers'
import { JsonLd } from '@/components/seo/JsonLd'
import cvJson from '@/mocks/cv.json'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://joshtin.tech'),
  title: {
    default: 'Justin Castro Perez | Software Developer & Frontend Engineer',
    template: '%s | Justin Castro Perez'
  },
  description:
    'Portafolio profesional de Justin Castro Perez (Joshtin). Desarrollador de software enfocado en crear soluciones web escalables con Next.js, TypeScript y Tailwind CSS.',
  alternates: {
    canonical: '/'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin Castro Perez | Software Developer',
    description:
      'Portafolio profesional de Justin Castro Perez (Joshtin). Desarrollo de soluciones web con Next.js, TypeScript y Tailwind CSS.',
    creator: '@joshtin2505',
    site: '@joshtin2505',
    images: ['/mockups/joshtinc.png']
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://joshtin.tech',
    title: 'Justin Castro Perez | Software Developer & Frontend Engineer',
    description:
      'Portafolio profesional de Justin Castro Perez (Joshtin). Desarrollo de soluciones web con Next.js, TypeScript y Tailwind CSS.',
    siteName: 'Joshtin.tech',
    images: [
      {
        url: '/mockups/joshtinc.png',
        width: 1920,
        height: 1080,
        alt: 'Joshtin.tech - Portafolio Profesional'
      }
    ],
    countryName: 'Colombia',
    emails: 'justincastro2505@gmail.com'
  },
  authors: [{ name: 'Justin Castro Perez', url: 'https://joshtin.tech' }],
  creator: 'Justin Castro Perez',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { basics } = cvJson
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href={basics.image} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
