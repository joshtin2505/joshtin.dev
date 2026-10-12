import { Mail, Send, MapPin } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ProfileData } from '@/lib/payload/queries'

interface DynamicContactBlockProps {
  block: {
    title?: string
    subtitle?: string
  }
  profile: ProfileData
}

export function DynamicContactBlock({ block, profile }: DynamicContactBlockProps) {
  const displayTitle = block.title || '¿Hablamos?'
  const displaySubtitle =
    block.subtitle ||
    'Estoy disponible para nuevas oportunidades laborales, consultorías y proyectos desafiantes.'

  return (
    <section id="contacto" className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="p-8 sm:p-12 rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
            <Mail className="size-4" />
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
              href={`mailto:${profile.email}`}
              className={cn(buttonVariants({ size: 'default' }), 'gap-2 font-medium')}
              aria-label={`Enviar mensaje directo a ${profile.email}`}
            >
              <Send className="size-4" />
              <span>Enviar mensaje directo</span>
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <MapPin className="size-4 text-primary" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
