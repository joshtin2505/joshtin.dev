import HomeHero from '@/components/Home/HomeHero'
import ProjectsPortfolio from '@/components/Home/PortfolioProjects'
import ToolsIUse from '@/components/Home/ToolsIUse'
import BasicLayout from '@/components/layouts/BasicLayout'

export default function Home() {
  return (
    <>
      <BasicLayout>
        <HomeHero />
        <ToolsIUse />
        <ProjectsPortfolio />
      </BasicLayout>
    </>
  )
}
