import { Cpu } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { SkillCategoryGroup } from '@/lib/payload/queries'

interface DynamicTechStackBlockProps {
  block?: {
    title?: string
    subtitle?: string
  }
  skillsGroups: SkillCategoryGroup[]
  title?: string
  subtitle?: string
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Frontend: 'Interfaces interactivas, accesibles y de alto rendimiento.',
  Backend: 'Servidores, APIs robustas y persistencia de datos.',
  'Cloud & DevOps': 'Despliegues continuos, infraestructura y calidad de código.',
  Herramientas: 'Control de versiones, tooling y flujos de trabajo con IA.',
}

export function DynamicTechStackBlock({ block, skillsGroups, title, subtitle }: DynamicTechStackBlockProps) {
  const displayTitle = title || block?.title || 'Stack Tecnológico'
  const displaySubtitle =
    subtitle ||
    block?.subtitle ||
    'Tecnologías y herramientas que utilizo activamente en producción para diseñar, construir y desplegar software.'

  return (
    <section id="stack" className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
        <Cpu className="size-4" />
        <span>Habilidades</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        {displayTitle}
      </h2>
      <p className="text-muted-foreground text-sm max-w-2xl mb-10 leading-relaxed font-sans">
        {displaySubtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillsGroups.map((group) => (
          <div
            key={group.category}
            className="group flex flex-col justify-between p-6 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.22)]"
          >
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                {group.category}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-sans">
                {CATEGORY_DESCRIPTIONS[group.category] || 'Tecnologías y librerías utilizadas en desarrollo.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-3 border-t border-border/60">
              {group.skills.map((skill) => (
                <Badge
                  key={skill.name}
                  variant="secondary"
                  className="text-xs font-mono py-1 px-2.5 font-normal bg-muted/60 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-[0_0_8px_-2px_rgba(16,185,129,0.2)] transition-all duration-200 cursor-default"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
