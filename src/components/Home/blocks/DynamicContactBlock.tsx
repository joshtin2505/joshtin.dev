import { Mail, Send, MapPin } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ProfileData, SiteSettingsData } from '@/lib/payload/queries'

interface DynamicContactBlockProps {
  block?: {
    title?: string
    subtitle?: string
    eyebrow?: string
    showDirectEmail?: boolean
    blockSettings?: {
      spacing?: string
      backgroundVariant?: string
      anchorId?: string
    }
  }
  profile?: ProfileData
  siteSettings?: SiteSettingsData
  title?: string
  callToAction?: string
  email?: string
  location?: string
}

export function DynamicContactBlock({
  block,
  profile,
  siteSettings,
  title,
  callToAction,
  email,
  location,
}: DynamicContactBlockProps) {
  const displayTitle = title || block?.title || '¿Tienes un proyecto en mente?'
  const displaySubtitle =
    callToAction ||
    block?.subtitle ||
    'Estoy disponible para nuevas oportunidades laborales, consultorías de ingeniería frontend y side projects de impacto.'
  const displayEmail = email || siteSettings?.email || profile?.email || 'justin.castro.p@gmail.com'
  const displayLocation = location || siteSettings?.location || profile?.location || 'Colombia'

  return (
    <section id="contacto" className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="p-8 sm:p-12 rounded-2xl border border-border/80 bg-gradient-to-br from-card/90 via-card/60 to-card/40 backdrop-blur-md relative overflow-hidden shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)] hover:border-emerald-500/40 hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.25)] transition-all duration-500">
        {/* Ambient background glows */}
        <div className="absolute -top-24 -right-24 size-80 rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />

        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
            <Mail className="size-4 text-emerald-500" />
            <span>Contacto</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            {displayTitle}
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed font-sans">
            {displaySubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`mailto:${displayEmail}`}
              className={cn(
                buttonVariants({ size: 'default' }),
                'gap-2 font-medium shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_-3px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
              )}
              aria-label={`Enviar mensaje directo a ${displayEmail}`}
            >
              <Send className="size-4" />
              <span>Enviar mensaje directo</span>
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <MapPin className="size-4 text-emerald-500" />
              <span>{displayLocation}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
