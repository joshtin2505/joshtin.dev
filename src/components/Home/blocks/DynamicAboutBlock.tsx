import React from 'react'
import { User, Award, CheckCircle } from 'lucide-react'
import { RichText } from '@/components/blog/RichText'
import { Card, CardContent } from '@/components/ui/card'

interface DynamicAboutBlockProps {
  title?: string
  fullBio?: unknown
  metrics?: Array<{ value: string; label: string }>
}

export function DynamicAboutBlock({
  title = 'Sobre Mí',
  fullBio,
  metrics = [],
}: DynamicAboutBlockProps) {
  // Solo renderizar si hay contenido de biografía o métricas
  if (!fullBio && (!metrics || metrics.length === 0)) {
    return null
  }

  return (
    <section id="sobre-mi" className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20 border-t border-border/40">
      <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
        <User className="size-4" />
        <span>Biografía & Trayectoria</span>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contenido RichText de la Biografía */}
        <div className="lg:col-span-7 prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed font-sans text-base">
          {fullBio ? (
            <RichText content={fullBio} className="space-y-4" />
          ) : (
            <p className="text-muted-foreground">
              Desarrollador de software enfocado en crear soluciones escalables, accesibles y con una experiencia de usuario de primer nivel.
            </p>
          )}
        </div>

        {/* Métricas y Cifras Clave */}
        {metrics && metrics.length > 0 && (
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
              <Award className="size-4 text-primary" />
              <span>Cifras destacadas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {metrics.map((m, idx) => (
                <Card
                  key={`metric-${idx}`}
                  className="border border-border/80 bg-card/60 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary font-mono text-xl font-bold shrink-0">
                      {m.value}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        {m.label}
                      </p>
                    </div>
                    <CheckCircle className="size-4 text-emerald-500/70 shrink-0" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
