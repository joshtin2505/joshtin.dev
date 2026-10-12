import BasicLayout from '@/components/layouts/BasicLayout'
import { BlockRenderer } from '@/components/Home/blocks/BlockRenderer'
import {
  getHomePageLayout,
  getProfileData,
  getProjectsData,
  getExperiencesData,
  getSkillsData,
  getLatestPosts,
} from '@/lib/payload/queries'

export default async function Home() {
  const [layout, profile, projects, experiences, skillsGroups, posts] =
    await Promise.all([
      getHomePageLayout('es'),
      getProfileData('es'),
      getProjectsData('es', 6, true),
      getExperiencesData('es', 5),
      getSkillsData(),
      getLatestPosts('es', 3),
    ])

  return (
    <BasicLayout>
      <BlockRenderer
        layout={layout}
        profile={profile}
        projects={projects}
        experiences={experiences}
        skillsGroups={skillsGroups}
        posts={posts}
      />
    </BasicLayout>
  )
}
