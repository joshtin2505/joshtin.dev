import cvJson from '@/mocks/cv.json'
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ExperienceSection() {
  const { work } = cvJson

  return (
    <section id="experiencia" className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
        <Briefcase className="size-4" />
        <span>Trayectoria</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        Experiencia Laboral
      </h2>
      <p className="text-muted-foreground text-sm max-w-2xl mb-10 leading-relaxed font-sans">
        Impacto en desarrollo de software, arquitectura de aplicaciones web y consultoría tecnológica para empresas y clientes.
      </p>

      <div className="relative border-l border-border/80 pl-6 ml-3 space-y-10">
        {work.map((item, index) => {
          const isCurrent = !item.endDate
          const startYear = item.startDate ? item.startDate.split('-')[0] : ''
          const endYear = isCurrent ? 'Presente' : item.endDate?.split('-')[0]

          return (
            <article key={index} className="relative group">
              <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-border border-2 border-background group-hover:bg-primary transition-colors" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-lg font-semibold text-foreground tracking-tight">
                  {item.position}{' '}
                  <span className="text-muted-foreground font-normal">
                    · {item.name}
                  </span>
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Calendar className="size-3.5" />
                  <span>
                    {startYear} — {endYear}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-3 font-sans">
                {item.summary}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.highlights.map((highlight, hIndex) => (
                    <Badge
                      key={hIndex}
                      variant="outline"
                      className="text-xs bg-muted/40 font-normal py-0.5 gap-1"
                    >
                      <CheckCircle2 className="size-3 text-primary shrink-0" />
                      <span>{highlight}</span>
                    </Badge>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
