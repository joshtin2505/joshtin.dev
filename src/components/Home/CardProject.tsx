'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, CheckCircle2 } from 'lucide-react'
import { Github } from '../icon'
import Image from 'next/image'
import type { Projects } from '@/cv.d'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export default function CardProject({ project }: { project: Projects }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative">
        <Image
          height={225}
          width={384}
          src={project.img[0]}
          alt={project.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-background/0 p-4">
          <h2 className="text-lg font-semibold text-foreground">
            {project.name}
            <strong
              className={
                'ml-1 ' +
                (project.isActive === true
                  ? 'text-green-500'
                  : project.isActive === false
                  ? 'text-red-500'
                  : 'text-amber-500')
              }
            >
              &bull;
            </strong>
          </h2>
        </div>
      </div>
      <CardContent className="space-y-2 pt-2">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.tecnolgies.map((tech, index) => (
            <Badge variant="outline" key={index} className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1 text-sm">
          {project.highlights.map((highlight, index) => (
            <div className="flex items-center" key={index}>
              <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
              {highlight}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={project.repoUrl ?? ''}
              className={cn(!!project.repoUrl ? 'cursor-not-allowed' : '')}
              target="_blank"
            >
              <Button size="sm" variant="outline" disabled={!project.repoUrl}>
                <Github className="w-4 h-4 mr-2" />
                Source Code
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            {!!project.repoUrl ? 'Go To Repository' : 'This project is private'}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={project.url ?? ''}
              className={cn(!!project.url ? 'cursor-not-allowed' : '')}
              target="_blank"
            >
              <Button size="sm" variant="default" disabled={!project.repoUrl}>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Project
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            {!!project.url ? 'Go To Demo' : 'This project not is in production'}
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}
