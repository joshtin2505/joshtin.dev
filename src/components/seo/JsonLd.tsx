import type { LandingData } from '@/lib/payload/queries'
import cvJson from '@/mocks/cv.json'

interface JsonLdProps {
  landing?: LandingData
}

export function JsonLd({ landing }: JsonLdProps = {}) {
  const { basics, skills } = cvJson

  const name = landing?.fullName || basics.name
  const jobTitle = landing?.jobTitle || basics.label
  const image = landing?.avatarUrl || basics.image
  const description = landing?.shortBio || basics.summary
  const profiles = landing?.socialLinks?.map((p) => p.url) || basics.profiles.map((p) => p.url)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://joshtin.tech/#person',
        name,
        jobTitle,
        url: 'https://joshtin.tech',
        image,
        sameAs: profiles,
        description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: basics.location.city,
          addressCountry: basics.location.region,
        },
        knowsAbout: skills.map((s) => s.name),
      },
      {
        '@type': 'WebSite',
        '@id': 'https://joshtin.tech/#website',
        url: 'https://joshtin.tech',
        name: 'Joshtin.tech',
        description: 'Portafolio profesional de Justin Castro Perez (Joshtin)',
        publisher: {
          '@id': 'https://joshtin.tech/#person',
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://joshtin.tech/#webpage',
        url: 'https://joshtin.tech',
        name: `${name} | ${jobTitle}`,
        about: {
          '@id': 'https://joshtin.tech/#person',
        },
        isPartOf: {
          '@id': 'https://joshtin.tech/#website',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
