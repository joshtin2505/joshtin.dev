import Image from 'next/image'
import cvJson from '@/mocks/cv.json'
import Link from 'next/link'
import { MailIcon, FileTextIcon, ArrowDownRight } from 'lucide-react'
import { SOCIAL_ICONS } from '@/lib/SocialIcons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function HomeHero() {
  const { basics } = cvJson

  return (
    <section className="w-full relative overflow-hidden border-b border-border/60 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Disponible para nuevos proyectos y contratación</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-sans">
              Justin Castro Perez
            </h1>

            <h2 className="text-xl sm:text-2xl font-mono text-muted-foreground mt-3 font-medium">
              {basics.label}
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed font-sans max-w-xl">
              Desarrollador de software enfocado en crear productos web escalables con <strong className="text-foreground font-semibold">Next.js</strong>, <strong className="text-foreground font-semibold">TypeScript</strong> y arquitecturas fullstack modernas. Apasionado por el rendimiento, la accesibilidad y soluciones con impacto real.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-8">
              <Link
                href={`mailto:${basics.email}`}
                className={cn(buttonVariants({ size: 'default' }), 'gap-2 font-medium')}
                aria-label="Enviar correo a Justin Castro Perez"
              >
                <MailIcon className="size-4" />
                <span>Contactar</span>
              </Link>

              <Link
                href="/curriculum"
                className={cn(buttonVariants({ variant: 'outline', size: 'default' }), 'gap-2 font-medium')}
                aria-label="Ver Curriculum Vitae completo"
              >
                <FileTextIcon className="size-4" />
                <span>Ver Curriculum</span>
              </Link>

              <div className="flex items-center gap-2 ml-1">
                {basics.profiles.map(({ network, url }) => {
                  const Icon = SOCIAL_ICONS[network]
                  if (!Icon) return null
                  return (
                    <Link
                      key={network}
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="size-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-muted-foreground hover:text-foreground"
                      aria-label={`Ver perfil de ${network}`}
                    >
                      <Icon className="size-4" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <figure className="relative shrink-0">
            <div className="relative size-40 sm:size-48 md:size-52 rounded-2xl overflow-hidden border-2 border-border shadow-xl">
              <Image
                src={basics.image}
                alt="Fotografía de perfil de Justin Castro Perez"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 208px"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-card border border-border rounded-lg p-2 shadow-sm text-xs font-mono flex items-center gap-1 text-muted-foreground">
              <ArrowDownRight className="size-3.5 text-primary" />
              <span>Cartagena, CO</span>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
