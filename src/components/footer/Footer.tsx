import { SOCIAL_ICONS } from '@/lib/SocialIcons'
import Link from 'next/link'
import React from 'react'
import cvJson from '@/mocks/cv.json'
import { MailIcon } from 'lucide-react'

function Footer() {
  const { basics } = cvJson
  const currentYear = new Date().getFullYear()

  return (
    <footer className="print:hidden w-full border-t border-border bg-background py-8 text-muted-foreground">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">Conectar:</span>
          <ul className="flex items-center gap-2">
            {basics.profiles.map(({ network, url }) => {
              const Icon = SOCIAL_ICONS[network]
              if (!Icon) return null
              return (
                <li key={network}>
                  <Link
                    className="size-8 inline-flex items-center justify-center rounded-md border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground transition text-muted-foreground"
                    href={url}
                    rel="noreferrer noopener"
                    target="_blank"
                    aria-label={`Visitar perfil de ${network}`}
                  >
                    <Icon className="size-4" />
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                className="size-8 inline-flex items-center justify-center rounded-md border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground transition text-muted-foreground"
                href={`mailto:${basics.email}`}
                aria-label="Enviar correo electrónico"
              >
                <MailIcon className="size-4" />
              </Link>
            </li>
          </ul>
        </div>

        <nav aria-label="Enlaces del pie de página" className="flex items-center gap-4 text-sm">
          <Link href="/#experiencia" className="hover:text-foreground transition">
            Experiencia
          </Link>
          <Link href="/#proyectos" className="hover:text-foreground transition">
            Proyectos
          </Link>
          <Link href="/curriculum" className="hover:text-foreground transition">
            Curriculum
          </Link>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-6 pt-4 border-t border-border/50 text-center text-xs">
        <p>
          &copy; {currentYear} Justin Castro Perez (Joshtin.tech). Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
