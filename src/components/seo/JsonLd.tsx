import cvJson from '@/mocks/cv.json'

export function JsonLd() {
  const { basics, skills } = cvJson

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: basics.name,
    jobTitle: basics.label,
    url: 'https://joshtin.tech',
    image: basics.image,
    sameAs: basics.profiles.map((p) => p.url),
    description: basics.summary,
    address: {
      '@type': 'PostalAddress',
      addressLocality: basics.location.city,
      addressCountry: basics.location.region,
    },
    knowsAbout: skills.map((s) => s.name),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
