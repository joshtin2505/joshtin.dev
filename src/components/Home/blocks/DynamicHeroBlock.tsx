import Image from 'next/image'
import Link from 'next/link'
import { MailIcon, FileTextIcon } from 'lucide-react'
import { SOCIAL_ICONS } from '@/lib/SocialIcons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProfileData, LandingData, SiteSettingsData } from '@/lib/payload/queries'
import { Badge } from '@/components/ui/badge'

interface DynamicHeroBlockProps {
  block?: {
    greeting?: string
    headline?: string
    subheadline?: string
    variant?: string
    showAvailabilityBadge?: boolean
    showContactCta?: boolean
    showCvCta?: boolean
    blockSettings?: {
      spacing?: string
      backgroundVariant?: string
      anchorId?: string
    }
  }
  profile?: ProfileData
  landing?: LandingData
  siteSettings?: SiteSettingsData
}

export function DynamicHeroBlock({ block = {}, profile, landing, siteSettings }: DynamicHeroBlockProps) {
  const settings = siteSettings || (landing as unknown as SiteSettingsData)
  const fullName = settings?.fullName || profile?.fullName || 'Justin Castro Perez'
  const jobTitle = settings?.jobTitle || profile?.jobTitle || 'Software Developer & Frontend Engineer'
  const shortBio = settings?.shortBio || profile?.shortBio || ''
  const email = settings?.email || profile?.email || 'justin.castro.p@gmail.com'
  const socialLinks = settings?.socialLinks || profile?.socialLinks || []

  // Resolver avatarUrl de forma segura (sin asignar cvFile como imagen)
  let resolvedAvatarUrl =
    settings?.avatarUrl ||
    profile?.avatarUrl ||
    'https://lh3.googleusercontent.com/a/ACg8ocJ5sbxVO7ITlL9y5XCPJtk5LgLV_pTHKLpsXqzL341QUqKKPJuwXQ=s396-c-no'
  const rawMedia = (settings as unknown as { avatar?: { filename?: string; url?: string } })
  const rawAvatar = rawMedia?.avatar
  if (rawAvatar && typeof rawAvatar === 'object') {
    if (rawAvatar.url) {
      resolvedAvatarUrl = rawAvatar.url
    } else if (rawAvatar.filename) {
      resolvedAvatarUrl = `/media/${rawAvatar.filename}`
    }
  }

  const availability = settings?.availability || 'open_to_work'
  const heroSkills = settings?.heroSkills || []

  const availabilityText =
    availability === 'open_to_work'
      ? 'Disponible para entrevistas y contratación'
      : availability === 'freelance_only'
        ? 'Disponible para proyectos freelance'
        : 'Actualmente empleado'

  return (
    <section className="w-full relative overflow-hidden border-b border-border/60 py-16 md:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[350px] h-[220px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
            {block.showAvailabilityBadge !== false && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] mb-6 transition-all duration-300 hover:shadow-[0_0_20px_-2px_rgba(16,185,129,0.35)] cursor-default">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
                <span>{availabilityText}</span>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-sans">
              {fullName}
            </h1>

            <h2 className="text-xl sm:text-2xl font-mono text-muted-foreground mt-3 font-medium">
              {jobTitle}
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed font-sans max-w-xl">
              {block?.subheadline || shortBio}
            </p>

            {heroSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
                {heroSkills.map((s) => (
                  <Badge
                    key={s.id}
                    variant="outline"
                    className="text-xs font-mono py-1 px-3 bg-muted/40 text-muted-foreground border-border/80 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/5 hover:shadow-[0_0_12px_-2px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-default"
                  >
                    {s.name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-8">
              {block?.showContactCta !== false && (
                <Link
                  href={`mailto:${email}`}
                  className={cn(
                    buttonVariants({ size: 'default' }),
                    'gap-2 font-medium shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_-3px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
                  )}
                  aria-label={`Enviar correo a ${fullName}`}
                >
                  <MailIcon className="size-4" />
                  <span>Contactar</span>
                </Link>
              )}

              {block?.showCvCta !== false && (
                <Link
                  href="/curriculum"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'default' }),
                    'gap-2 font-medium hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
                  )}
                  aria-label="Ver Curriculum Vitae completo"
                >
                  <FileTextIcon className="size-4" />
                  <span>Ver Curriculum</span>
                </Link>
              )}

              <div className="flex items-center gap-2 ml-1">
                {socialLinks.map(({ network, url }) => {
                  const Icon = SOCIAL_ICONS[network]
                  if (!Icon) return null
                  return (
                    <Link
                      key={network}
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="p-2 rounded-md text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Visitar perfil de ${network}`}
                    >
                      <Icon className="size-5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="relative shrink-0 group">
            {/* Ambient decorative halo behind avatar */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-emerald-400/10 to-cyan-500/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative size-36 sm:size-44 md:size-52 rounded-2xl p-1 bg-gradient-to-tr from-emerald-500/30 via-border/70 to-cyan-500/20 ring-1 ring-emerald-500/30 shadow-[0_0_35px_-5px_rgba(16,185,129,0.25)] group-hover:shadow-[0_0_50px_-3px_rgba(16,185,129,0.42)] transition-all duration-500">
              <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-muted/40">
                <Image
                  src={resolvedAvatarUrl}
                  alt={`Fotografía de perfil de ${fullName}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
