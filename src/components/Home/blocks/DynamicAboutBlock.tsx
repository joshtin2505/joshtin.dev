import React from 'react'
import { User, Award, CheckCircle } from 'lucide-react'
import { RichText } from '@/components/blog/RichText'
import { Card, CardContent } from '@/components/ui/card'

import type { SiteSettingsData } from '@/lib/payload/queries'

interface DynamicAboutBlockProps {
  block?: {
    title?: string
    eyebrow?: string
    showMetrics?: boolean
    blockSettings?: {
      spacing?: string
      backgroundVariant?: string
      anchorId?: string
    }
  }
  title?: string
  fullBio?: unknown
  metrics?: Array<{ value: string; label: string }>
  siteSettings?: SiteSettingsData
}

export function DynamicAboutBlock({
  block,
  title,
  fullBio,
  metrics,
  siteSettings,
}: DynamicAboutBlockProps) {
  const displayTitle = title || block?.title || siteSettings?.aboutTitle || 'Sobre Mí'
  const displayBio = fullBio !== undefined ? fullBio : siteSettings?.fullBio
  const displayMetrics = metrics && metrics.length > 0 ? metrics : siteSettings?.metrics || []
  const displayEyebrow = block?.eyebrow || '01 // BIOGRAFÍA & TRAYECTORIA'

  // Solo renderizar si hay contenido de biografía o métricas
  if (!displayBio && (!displayMetrics || displayMetrics.length === 0)) {
    return null
  }

  const anchorId = block?.blockSettings?.anchorId || 'sobre-mi'

  return (
    <section id={anchorId} className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20 border-t border-border/40">
      <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
        <User className="size-4" />
        <span>{displayEyebrow}</span>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        {displayTitle}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contenido RichText de la Biografía */}
        <div className="lg:col-span-7 prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed font-sans text-base">
          {displayBio ? (
            <RichText content={displayBio} className="space-y-4" />
          ) : (
            <p className="text-muted-foreground">
              Desarrollador de software enfocado en crear soluciones escalables, accesibles y con una experiencia de usuario de primer nivel.
            </p>
          )}
        </div>

        {/* Métricas y Cifras Clave */}
        {displayMetrics && displayMetrics.length > 0 && (
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
              <Award className="size-4 text-primary" />
              <span>Cifras destacadas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {displayMetrics.map((m, idx) => (
                <Card
                  key={`metric-${idx}`}
                  className="group border border-border/80 bg-card/60 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_0_25px_-3px_rgba(16,185,129,0.22)]"
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono text-xl font-bold shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-[0_0_12px_-3px_rgba(16,185,129,0.2)]">
                      {m.value}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        {m.label}
                      </p>
                    </div>
                    <CheckCircle className="size-4 text-emerald-500 shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
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
