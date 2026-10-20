'use client'

import React from 'react'
import { User, Award, CheckCircle } from 'lucide-react'
import { RichText } from '@/components/blog/RichText'
import type { SiteSettingsData } from '@/lib/payload/queries'
import { SpotlightCard, CountUp, Reveal } from '@/components/ui/motion'

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

function parseMetric(valueStr: string) {
  const match = valueStr.match(/^([^\d]*)(\d+)(.*)$/)
  if (match) {
    return {
      prefix: match[1] || '',
      to: parseInt(match[2], 10),
      suffix: match[3] || '',
    }
  }
  return null
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
      <Reveal direction="up">
        <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
          <User className="size-4 text-emerald-500" />
          <span>{displayEyebrow}</span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
          {displayTitle}
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contenido RichText de la Biografía con espaciado editorial */}
        <Reveal direction="up" delay={0.1} className="lg:col-span-7">
          <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed font-sans text-base">
            {displayBio ? (
              <RichText content={displayBio} className="space-y-4" />
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                Desarrollador de software enfocado en crear soluciones escalables, accesibles y con una experiencia de usuario de primer nivel, fusionando rigor de ingeniería con atención al detalle visual.
              </p>
            )}
          </div>
        </Reveal>

        {/* Métricas y Cifras Clave con SpotlightCard y CountUp */}
        {displayMetrics && displayMetrics.length > 0 && (
          <Reveal direction="up" delay={0.2} className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
              <Award className="size-4 text-emerald-500" />
              <span>Cifras destacadas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {displayMetrics.map((m, idx) => {
                const parsed = parseMetric(m.value)

                return (
                  <SpotlightCard
                    key={`metric-${idx}`}
                    spotlightColor="rgba(16, 185, 129, 0.16)"
                    className="p-4 border border-border/80 bg-card/60 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-emerald-500/40"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center size-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono text-xl font-bold shrink-0 shadow-[0_0_12px_-3px_rgba(16,185,129,0.2)]">
                        {parsed ? (
                          <CountUp
                            to={parsed.to}
                            prefix={parsed.prefix}
                            suffix={parsed.suffix}
                            duration={1.6}
                          />
                        ) : (
                          m.value
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                          {m.label}
                        </p>
                      </div>
                      <CheckCircle className="size-4 text-emerald-500 shrink-0 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                    </div>
                  </SpotlightCard>
                )
              })}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
