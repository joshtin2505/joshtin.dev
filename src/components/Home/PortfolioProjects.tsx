import cvJson from '@/mocks/cv.json'
import CardProject from './CardProject'
import { RocketIcon } from 'lucide-react'

function ProjectsPortfolio() {
  const { projects } = cvJson
  return (
    <section id="proyectos" className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
        <RocketIcon className="size-4" />
        <span>Portafolio</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        Proyectos Destacados
      </h2>
      <p className="text-muted-foreground text-sm max-w-2xl mb-8 leading-relaxed font-sans">
        Selección de aplicaciones web, herramientas y productos desarrollados con foco en rendimiento, escalabilidad y experiencia de usuario.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {projects.length !== 0 ? (
          projects.map((project) => (
            <CardProject key={project.name} project={project} />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No hay proyectos disponibles.</p>
        )}
      </div>
    </section>
  )
}

export default ProjectsPortfolio
