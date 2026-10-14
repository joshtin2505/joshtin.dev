import BasicLayout from '@/components/layouts/BasicLayout'
import { LandingClient } from './LandingClient'
import {
  getLandingData,
  getProjectsData,
  getSkillsData,
} from '@/lib/payload/queries'

export default async function Home() {
  const [landing, projects, skillsGroups] = await Promise.all([
    getLandingData('es'),
    getProjectsData('es', 12, true),
    getSkillsData(),
  ])

  return (
    <BasicLayout>
      <LandingClient
        initialLanding={landing}
        initialProjects={projects}
        initialSkills={skillsGroups}
      />
    </BasicLayout>
  )
}

