import type { Metadata } from 'next'
import BasicLayout from '@/components/layouts/BasicLayout'
import { LandingClient } from './LandingClient'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  getLandingData,
  getProjectsData,
  getSkillsData,
  getExperiencesData,
} from '@/lib/payload/queries'

export async function generateMetadata(): Promise<Metadata> {
  const landing = await getLandingData('es')
  const title =
    landing?.seo?.metaTitle ||
    `${landing?.fullName || 'Justin Castro Perez'} | ${landing?.jobTitle || 'Software Developer & Frontend Engineer'}`
  const description =
    landing?.seo?.metaDescription ||
    landing?.shortBio ||
    'Portafolio profesional de Justin Castro Perez (Joshtin). Desarrollador de software enfocado en crear soluciones web escalables con Next.js, TypeScript y Tailwind CSS.'
  const ogImage = landing?.seo?.ogImageUrl || landing?.avatarUrl || '/mockups/joshtinc.png'

  return {
    title,
    description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: 'https://joshtin.tech',
      siteName: 'Joshtin.tech',
      locale: 'es_CO',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@joshtin2505',
      images: [ogImage],
    },
  }
}

export default async function Home() {
  const [landing, projects, skillsGroups, experiences] = await Promise.all([
    getLandingData('es'),
    getProjectsData('es', 12, true),
    getSkillsData(),
    getExperiencesData('es', 5),
  ])

  return (
    <BasicLayout>
      <JsonLd landing={landing} />
      <LandingClient
        initialLanding={landing}
        initialProjects={projects}
        initialSkills={skillsGroups}
        initialExperiences={experiences}
      />
    </BasicLayout>
  )
}

