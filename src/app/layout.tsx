import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './Providers'
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
  title: 'Joshtin.dev',
  description: "I'm Justin castro perez and this is my Web portfolio and blog",
  twitter: {
    title: 'Joshtin.dev',
    description:
      "I'm Justin castro perez and this is my Web portfolio and blog",
    creator: '@joshtindev',
    creatorId: 'joshtindev',
    site: 'joshtin.me'
  },
  facebook: {
    admins: 'joshtindev'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joshtin.me',
    title: 'Joshtin.dev',
    description:
      "I'm Justin castro perez and this is my Web portfolio and blog",
    siteName: 'Joshtin.dev',
    images: [
      {
        url: 'https://joshtin.me/mockups/joshtinc.png',
        width: 1920,
        height: 1080,
        alt: 'Joshtin.dev'
      }
    ],
    countryName: 'colombia',
    emails: 'justincastro2505@gmail.com',
    phoneNumbers: '+57 3185003169'
  },
  authors: [{ name: 'Justin Castro Perez', url: 'https://joshtin.me' }],
  creator: 'Justin Castro Perez',
  generator: 'Joshtin.dev',
  keywords: [
    'justin',
    'castro',
    'perez',
    'joshtindev',
    'joshtin.dev',
    'joshtin.me',
    'justin castro perez',
    'web',
    'developer',
    'blog',
    'joshtin portfolio',
    'joshtin dev portfolio',
    'portfolio',
    'react',
    'nextjs',
    'tailwindcss',
    'typescript'
  ],
  robots: 'index, follow'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { basics } = cvJson
  return (
    <html lang="en">
      <link rel="shortcut icon" href={basics.image} type="image/x-icon" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
