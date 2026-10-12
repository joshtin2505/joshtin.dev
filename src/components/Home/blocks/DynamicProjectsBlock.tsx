import { RocketIcon, Code2, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Github } from '@/components/icon'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ProjectItem } from '@/lib/payload/queries'

interface DynamicProjectsBlockProps {
  block: {
    title?: string
    subtitle?: string
    limit?: number
    onlyFeatured?: boolean
  }
  projects: ProjectItem[]
}

export function DynamicProjectsBlock({ block, projects }: DynamicProjectsBlockProps) {
  const displayTitle = block.title || 'Proyectos Destacados'
  const displaySubtitle =
    block.subtitle ||
    'Selección de aplicaciones web, herramientas y productos desarrollados con foco en rendimiento, escalabilidad y experiencia de usuario.'

  return (
    <section id="proyectos" className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
        <RocketIcon className="size-4" />
        <span>Portafolio</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        {displayTitle}
      </h2>
      <p className="text-muted-foreground text-sm max-w-2xl mb-8 leading-relaxed font-sans">
        {displaySubtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col w-full max-w-sm overflow-hidden border border-border bg-card/60 backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:border-primary/20"
            >
              <div className="relative w-full h-48 bg-muted overflow-hidden flex items-center justify-center">
                {project.imageUrl ? (
                  <Image
                    height={225}
                    width={384}
                    src={project.imageUrl}
                    alt={`Captura del proyecto ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 p-4 text-center">
                    <Code2 className="size-10 stroke-1 opacity-70" />
                    <span className="text-xs font-mono">Proyecto FullStack</span>
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Destacado
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="space-y-3 p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-muted/80 text-muted-foreground border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex gap-2">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'flex-1 text-xs gap-1.5')}
                    aria-label={`Ver demo en vivo de ${project.title}`}
                  >
                    <ExternalLink className="size-3.5" />
                    <span>Demo</span>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'flex-1 text-xs gap-1.5')}
                    aria-label={`Ver código fuente de ${project.title}`}
                  >
                    <Github className="size-3.5" />
                    <span>Código</span>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-sm col-span-full">No hay proyectos disponibles en este momento.</p>
        )}
      </div>
    </section>
  )
}
