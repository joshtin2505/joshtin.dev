import Image from 'next/image'
import Link from 'next/link'
import { MailIcon, FileTextIcon } from 'lucide-react'
import { SOCIAL_ICONS } from '@/lib/SocialIcons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProfileData, LandingData } from '@/lib/payload/queries'
import { Badge } from '@/components/ui/badge'

interface DynamicHeroBlockProps {
  block?: {
    greeting?: string
    headline?: string
    subheadline?: string
    showAvailabilityBadge?: boolean
    showContactCta?: boolean
    showCvCta?: boolean
  }
  profile?: ProfileData
  landing?: LandingData
}

export function DynamicHeroBlock({ block = {}, profile, landing }: DynamicHeroBlockProps) {
  const fullName = landing?.fullName || profile?.fullName || 'Justin Castro Perez'
  const jobTitle = landing?.jobTitle || profile?.jobTitle || 'Software Developer & Frontend Engineer'
  const shortBio = landing?.shortBio || profile?.shortBio || ''
  const email = landing?.email || profile?.email || 'justin.castro.p@gmail.com'
  const socialLinks = landing?.socialLinks || profile?.socialLinks || []

  // Resolver avatarUrl considerando landing.avatarUrl, o landing.avatar / landing.cvFile como objeto de Media
  let resolvedAvatarUrl =
    landing?.avatarUrl ||
    profile?.avatarUrl ||
    'https://lh3.googleusercontent.com/a/ACg8ocJ5sbxVO7ITlL9y5XCPJtk5LgLV_pTHKLpsXqzL341QUqKKPJuwXQ=s396-c-no'
  const rawMedia = (landing as unknown as { avatar?: { filename?: string; url?: string }; cvFile?: { filename?: string; url?: string } })
  const rawAvatar = rawMedia?.avatar || rawMedia?.cvFile
  if (rawAvatar && typeof rawAvatar === 'object') {
    if (rawAvatar.filename) {
      resolvedAvatarUrl = `/media/${rawAvatar.filename}`
    } else if (rawAvatar.url) {
      resolvedAvatarUrl = rawAvatar.url
    }
  }

  const availability = landing?.availability || 'open_to_work'
  const heroSkills = landing?.heroSkills || []

  const availabilityText =
    availability === 'open_to_work'
      ? 'Disponible para entrevistas y contratación'
      : availability === 'freelance_only'
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
              {fullName}
            </h1>

            <h2 className="text-xl sm:text-2xl font-mono text-muted-foreground mt-3 font-medium">
              {jobTitle}
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed font-sans max-w-xl">
              {block?.subheadline || shortBio}
            </p>

            {heroSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-5 justify-center md:justify-start">
                {heroSkills.map((s) => (
                  <Badge
                    key={s.id}
                    variant="outline"
                    className="text-xs font-mono py-0.5 px-2.5 bg-muted/30 text-muted-foreground border-border/80"
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
                  className={cn(buttonVariants({ size: 'default' }), 'gap-2 font-medium')}
                  aria-label={`Enviar correo a ${fullName}`}
                >
                  <MailIcon className="size-4" />
                  <span>Contactar</span>
                </Link>
              )}

              {block?.showCvCta !== false && (
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
                {socialLinks.map(({ network, url }) => {
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
                src={resolvedAvatarUrl}
                alt={`Fotografía de perfil de ${fullName}`}
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
