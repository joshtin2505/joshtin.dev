import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import BasicLayout from '@/components/layouts/BasicLayout'
import { RenderBlocks } from '@/components/Home/blocks/RenderBlocks'
import { RefreshRouteOnSave } from '@/components/payload/RefreshRouteOnSave'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  getSiteSettings,
  getPageBySlug,
  getProjectsData,
  getSkillsData,
  getExperiencesData,
  getPostsData,
  type LandingData,
} from '@/lib/payload/queries'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings('es')
  const title = `${settings?.fullName || 'Justin Castro Perez'} | ${settings?.jobTitle || 'Software Developer & Frontend Engineer'}`
  const description =
    settings?.shortBio ||
    'Portafolio profesional de Justin Castro Perez (Joshtin). Desarrollador de software enfocado en crear soluciones web escalables con Next.js, TypeScript y Tailwind CSS.'
  const ogImage = settings?.avatarUrl || '/mockups/joshtinc.png'

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
  const { isEnabled: isDraft } = await draftMode()

  const [siteSettings, page, projects, skillsGroups, experiences, posts] = await Promise.all([
    getSiteSettings('es'),
    getPageBySlug('home', 'es', isDraft),
    getProjectsData('es', 12, true),
    getSkillsData(),
    getExperiencesData('es', 5),
    getPostsData('es', 3),
  ])

  return (
    <BasicLayout>
      <JsonLd landing={siteSettings as unknown as LandingData} />
      <RefreshRouteOnSave />
      {page && (
        <RenderBlocks
          layout={page.layout}
          siteSettings={siteSettings}
          projects={projects}
          experiences={experiences}
          skillsGroups={skillsGroups}
          posts={posts}
        />
      )}
    </BasicLayout>
  )
}
