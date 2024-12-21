import cvJson from '@/mocks/cv.json'
import CardProject from './CardProject'
function ProjectsPortfolio() {
  const { projects } = cvJson
  return (
    <section className="flex flex-col items-center gap-2 max-w-5xl mx-auto lg:px-0 px-3 min-h-dvh">
      <h2 className="w-full text-start text-3xl sm:text-4xl mb-3 flex">
        <span className="text-red-500 text-3xl sm:text-4xl">&bull;</span>
        Projects
      </h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {projects.length !== 0 ? (
          projects.map((project) => {
            return <CardProject key={project.name} project={project} />
          })
        ) : (
          <div>
            <h1>No projects</h1>
          </div>
        )}
      </div>
    </section>
  )
}
export default ProjectsPortfolio
