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
  block?: {
    title?: string
    subtitle?: string
    limit?: number
    onlyFeatured?: boolean
  }
  projects: ProjectItem[]
  title?: string
  subtitle?: string
}

export function DynamicProjectsBlock({ block, projects, title, subtitle }: DynamicProjectsBlockProps) {
  const displayTitle = title || block?.title || 'Proyectos Destacados'
  const displaySubtitle =
    subtitle ||
    block?.subtitle ||
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
              className="group flex flex-col w-full max-w-sm overflow-hidden rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-emerald-500/40 hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.25)]"
            >
              <div className="relative w-full h-48 bg-muted overflow-hidden flex items-center justify-center">
                {project.imageUrl ? (
                  <Image
                    height={225}
                    width={384}
                    src={project.imageUrl}
                    alt={`Captura del proyecto ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 p-4 text-center">
                    <Code2 className="size-10 stroke-1 opacity-70 group-hover:text-emerald-500 transition-colors duration-300" />
                    <span className="text-xs font-mono">Proyecto FullStack</span>
                  </div>
                )}
                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {project.featured && (
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs gap-1.5 shadow-[0_0_12px_-2px_rgba(16,185,129,0.3)] backdrop-blur-md"
                    >
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10B981]" />
                      Destacado
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="space-y-3 p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-muted/70 text-muted-foreground border border-border/60 group-hover:border-emerald-500/20 transition-colors duration-200"
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
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'sm' }),
                      'flex-1 text-xs gap-1.5 hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/5 hover:shadow-[0_0_12px_-3px_rgba(16,185,129,0.2)] transition-all duration-200'
                    )}
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
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'sm' }),
                      'flex-1 text-xs gap-1.5 hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/5 hover:shadow-[0_0_12px_-3px_rgba(16,185,129,0.2)] transition-all duration-200'
                    )}
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
