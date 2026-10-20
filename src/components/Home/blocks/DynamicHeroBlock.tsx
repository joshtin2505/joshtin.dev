'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MailIcon, FileTextIcon } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { SOCIAL_ICONS } from '@/lib/SocialIcons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProfileData, LandingData, SiteSettingsData } from '@/lib/payload/queries'
import { Badge } from '@/components/ui/badge'
import { TextScramble, Magnetic } from '@/components/ui/motion'

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
  const shouldReduceMotion = useReducedMotion()
  const settings = siteSettings || (landing as unknown as SiteSettingsData)
  const fullName = settings?.fullName || profile?.fullName || 'Justin Castro Perez'
  const jobTitle = settings?.jobTitle || profile?.jobTitle || 'Software Developer & Frontend Engineer'
  const shortBio = settings?.shortBio || profile?.shortBio || ''
  const email = settings?.email || profile?.email || 'justin.castro.p@gmail.com'
  const socialLinks = settings?.socialLinks || profile?.socialLinks || []

  // Resolver avatarUrl de forma segura (sin asignar archivos pdf)
  let resolvedAvatarUrl =
    settings?.avatarUrl ||
    profile?.avatarUrl ||
    'https://lh3.googleusercontent.com/a/ACg8ocJ5sbxVO7ITlL9y5XCPJtk5LgLV_pTHKLpsXqzL341QUqKKPJuwXQ=s396-c-no'
  const rawMedia = settings as unknown as { avatar?: { filename?: string; url?: string } }
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

  // Tilt interactivo 3D del avatar
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 })
  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16 // -8deg a +8deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16 // -8deg a +8deg
    setTilt({ x: y, y: x })
  }
  const handleAvatarMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const anchorId = block.blockSettings?.anchorId || 'inicio'

  return (
    <section id={anchorId} className="w-full relative overflow-hidden border-b border-border/60 py-16 md:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[350px] h-[220px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
            {/* Prefijo técnico y disponibilidad */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">&gt;</span>
                <span>{block.greeting || '00 // INGENIERO DE SOFTWARE'}</span>
              </span>

              {block.showAvailabilityBadge !== false && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] transition-all duration-300 hover:shadow-[0_0_20px_-2px_rgba(16,185,129,0.35)] cursor-default">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
                  <span>{availabilityText}</span>
                </div>
              )}
            </div>

            {/* Nombre principal con efecto de terminal scramble */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-sans">
              <span className="sr-only">{fullName}</span>
              <span aria-hidden="true">
                <TextScramble text={fullName} triggerOnHover />
              </span>
            </h1>

            {/* Rol profesional estilizado con Geist Mono */}
            <p className="text-lg sm:text-xl font-mono text-emerald-600 dark:text-emerald-400 mt-3 font-medium tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span className="opacity-70">{'//'}</span>
              <span>{jobTitle}</span>
            </p>

            {/* Descripción breve */}
            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed font-sans max-w-xl">
              {block?.subheadline || shortBio}
            </p>

            {/* Badges de tecnologías principales con atracción magnética suave */}
            {heroSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
                {heroSkills.map((s) => (
                  <Magnetic key={s.id} strength={0.15}>
                    <Badge
                      variant="outline"
                      className="text-xs font-mono py-1 px-3 bg-muted/40 text-muted-foreground border-border/80 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/5 hover:shadow-[0_0_12px_-2px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-default"
                    >
                      {s.name}
                    </Badge>
                  </Magnetic>
                ))}
              </div>
            )}

            {/* Llamados a la acción con Magnetic */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-8">
              {block?.showContactCta !== false && (
                <Magnetic strength={0.25}>
                  <Link
                    href={`mailto:${email}`}
                    className={cn(
                      buttonVariants({ size: 'default' }),
                      'gap-2 font-medium shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_-3px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
                    )}
                    aria-label={`Enviar correo electrónico a ${fullName}`}
                  >
                    <MailIcon className="size-4" />
                    <span>Contactar</span>
                  </Link>
                </Magnetic>
              )}

              {block?.showCvCta !== false && (
                <Magnetic strength={0.25}>
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
                </Magnetic>
              )}

              <div className="flex items-center gap-2 ml-1">
                {socialLinks.map(({ network, url }) => {
                  const Icon = SOCIAL_ICONS[network]
                  if (!Icon) return null
                  return (
                    <Magnetic key={network} strength={0.3}>
                      <Link
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-2 rounded-md text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Visitar perfil de ${network} de ${fullName}`}
                      >
                        <Icon className="size-5" />
                      </Link>
                    </Magnetic>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Avatar con Tilt 3D sutil */}
          <div
            className="relative shrink-0 group perspective"
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
            style={{
              transform: shouldReduceMotion
                ? undefined
                : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Halo decorativo ambiental */}
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
