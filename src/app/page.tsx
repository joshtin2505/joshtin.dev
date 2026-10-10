import HomeHero from '@/components/Home/HomeHero'
import ExperienceSection from '@/components/Home/ExperienceSection'
import ProjectsPortfolio from '@/components/Home/PortfolioProjects'
import TechStackSection from '@/components/Home/TechStackSection'
import BasicLayout from '@/components/layouts/BasicLayout'

export default function Home() {
  return (
    <BasicLayout>
      <HomeHero />
      <ExperienceSection />
      <ProjectsPortfolio />
      <TechStackSection />
    </BasicLayout>
  )
}
