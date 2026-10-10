import { Cpu } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const TECH_CATEGORIES = [
  {
    title: 'Frontend & UI',
    description: 'Interfaces interactivas, accesibles y de alto rendimiento.',
    skills: ['React', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Astro', 'HTML5', 'CSS3', 'JavaScript']
  },
  {
    title: 'Backend & Bases de Datos',
    description: 'Servidores, APIs robustas y persistencia de datos.',
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'MongoDB', 'GraphQL', 'REST APIs', 'SQL']
  },
  {
    title: 'Cloud, DevOps & Herramientas',
    description: 'Despliegues continuos, infraestructura y calidad de código.',
    skills: ['AWS (EC2, Lambda, S3)', 'Vercel', 'Git', 'GitHub', 'Cloudflare', 'MCP (Model Context Protocol)', 'Cursor / IA Tooling']
  }
]

export default function TechStackSection() {
  return (
    <section id="stack" className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
        <Cpu className="size-4" />
        <span>Habilidades</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        Stack Tecnológico
      </h2>
      <p className="text-muted-foreground text-sm max-w-2xl mb-10 leading-relaxed font-sans">
        Tecnologías y herramientas que utilizo activamente en producción para diseñar, construir y desplegar software.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TECH_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="flex flex-col justify-between p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-md"
          >
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1.5">
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-sans">
                {category.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
              {category.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-xs font-mono py-1 px-2.5 font-normal"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
