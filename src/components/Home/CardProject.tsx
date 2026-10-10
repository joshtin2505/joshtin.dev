'use client'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, CheckCircle2, Lock, Code2 } from 'lucide-react'
import { Github } from '../icon'
import Image from 'next/image'
import type { Projects } from '@/cv.d'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export default function CardProject({ project }: { project: Projects }) {
  const hasImage = project.img && project.img.length > 0 && project.img[0] !== ''
  const hasRepo = Boolean(project.repoUrl)
  const hasDemo = Boolean(project.url)

  return (
    <Card className="flex flex-col w-full max-w-sm overflow-hidden border border-border bg-card/60 backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:border-primary/20">
      <div className="relative w-full h-48 bg-muted overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <Image
            height={225}
            width={384}
            src={project.img[0]!}
            alt={`Captura del proyecto ${project.name}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 p-4 text-center">
            <Code2 className="size-10 stroke-1 opacity-70" />
            <span className="text-xs font-mono">Proyecto FullStack</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          {project.isActive ? (
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Activo
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-xs">
              Concluido
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="space-y-3 p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tecnolgies.map((tech, index) => (
              <Badge variant="secondary" key={index} className="text-xs font-mono">
                {tech}
              </Badge>
            ))}
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground pt-1">
              {project.highlights.map((highlight, index) => (
                <div className="flex items-center gap-1.5" key={index}>
                  <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                  <span className="truncate">{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2 p-5 pt-0 border-t border-border/50">
        {hasRepo ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={project.repoUrl!}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'flex-1 gap-1.5')}
                aria-label={`Ver código fuente de ${project.name} en GitHub`}
              >
                <Github className="size-3.5" />
                <span>Código</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Ver repositorio en GitHub</TooltipContent>
          </Tooltip>
        ) : (
          <span
            className={cn(
              buttonVariants({ size: 'sm', variant: 'ghost' }),
              'flex-1 gap-1.5 text-muted-foreground opacity-60 cursor-not-allowed border border-dashed border-border'
            )}
            aria-disabled="true"
          >
            <Lock className="size-3.5" />
            <span>Privado</span>
          </span>
        )}

        {hasDemo ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={project.url!}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(buttonVariants({ size: 'sm', variant: 'default' }), 'flex-1 gap-1.5')}
                aria-label={`Ver demo en vivo de ${project.name}`}
              >
                <ExternalLink className="size-3.5" />
                <span>Demo</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Abrir proyecto desplegado</TooltipContent>
          </Tooltip>
        ) : (
          <span
            className={cn(
              buttonVariants({ size: 'sm', variant: 'ghost' }),
              'flex-1 gap-1.5 text-muted-foreground opacity-60 cursor-not-allowed border border-dashed border-border'
            )}
            aria-disabled="true"
          >
            <span>En desarrollo</span>
          </span>
        )}
      </CardFooter>
    </Card>
  )
}
