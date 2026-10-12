import Image from 'next/image'
import Link from 'next/link'
import { MailIcon, FileTextIcon } from 'lucide-react'
import { SOCIAL_ICONS } from '@/lib/SocialIcons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProfileData } from '@/lib/payload/queries'

interface DynamicHeroBlockProps {
  block: {
    greeting?: string
    headline?: string
    subheadline?: string
    showAvailabilityBadge?: boolean
    showContactCta?: boolean
    showCvCta?: boolean
  }
  profile: ProfileData
}

export function DynamicHeroBlock({ block, profile }: DynamicHeroBlockProps) {
  const availabilityText =
    profile.availability === 'open_to_work'
      ? 'Disponible para entrevistas y contratación'
      : profile.availability === 'freelance_only'
      ? 'Disponible para proyectos freelance'
      : 'Actualmente empleado'

  return (
    <section className="w-full relative overflow-hidden border-b border-border/60 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
            {block.showAvailabilityBadge !== false && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{availabilityText}</span>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-sans">
              {profile.fullName}
            </h1>

            <h2 className="text-xl sm:text-2xl font-mono text-muted-foreground mt-3 font-medium">
              {profile.jobTitle}
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed font-sans max-w-xl">
              {block.subheadline || profile.shortBio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-8">
              {block.showContactCta !== false && (
                <Link
                  href={`mailto:${profile.email}`}
                  className={cn(buttonVariants({ size: 'default' }), 'gap-2 font-medium')}
                  aria-label={`Enviar correo a ${profile.fullName}`}
                >
                  <MailIcon className="size-4" />
                  <span>Contactar</span>
                </Link>
              )}

              {block.showCvCta !== false && (
                <Link
                  href="/curriculum"
                  className={cn(buttonVariants({ variant: 'outline', size: 'default' }), 'gap-2 font-medium')}
                  aria-label="Ver Curriculum Vitae completo"
                >
                  <FileTextIcon className="size-4" />
                  <span>Ver Curriculum</span>
                </Link>
              )}

              <div className="flex items-center gap-2 ml-1">
                {profile.socialLinks.map(({ network, url }) => {
                  const Icon = SOCIAL_ICONS[network]
                  if (!Icon) return null
                  return (
                    <Link
                      key={network}
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Visitar perfil de ${network}`}
                    >
                      <Icon className="size-5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="relative shrink-0">
            <div className="relative size-36 sm:size-44 md:size-52 rounded-2xl overflow-hidden ring-2 ring-border/80 shadow-xl bg-muted/40">
              <Image
                src={profile.avatarUrl || '/img/avatar.webp'}
                alt={`Fotografía de perfil de ${profile.fullName}`}
                fill
                priority
                sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
