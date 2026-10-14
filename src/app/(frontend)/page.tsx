import BasicLayout from '@/components/layouts/BasicLayout'
import { LandingClient } from './LandingClient'
import {
  getLandingData,
  getProjectsData,
  getSkillsData,
  getExperiencesData,
} from '@/lib/payload/queries'

export default async function Home() {
  const [landing, projects, skillsGroups, experiences] = await Promise.all([
    getLandingData('es'),
    getProjectsData('es', 12, true),
    getSkillsData(),
    getExperiencesData('es', 5),
  ])

  return (
    <BasicLayout>
      <LandingClient
        initialLanding={landing}
        initialProjects={projects}
        initialSkills={skillsGroups}
        initialExperiences={experiences}
      />
    </BasicLayout>
  )
}

