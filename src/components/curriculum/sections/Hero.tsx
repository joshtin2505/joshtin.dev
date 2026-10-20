import cvJson from '@/mocks/cv.json'
import Section from '../Section'
import Image from 'next/image'
import { GlobeIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { SOCIAL_ICONS } from '@/lib/SocialIcons'
import Link from 'next/link'

function Hero({}) {
  const { basics } = cvJson
  const { name, label, email, image, location, phone, profiles } = basics

  const linkedinUrl = profiles.find(
    ({ network }) => network === 'LinkedIn'
  )?.url

  const { city, region } = location

  const printInfo = [email, phone, linkedinUrl].filter(Boolean).join(' • ')
  return (
    <Section id={'hero'}>
      <div className="flex flex-col-reverse max-[450px]:items-center max-[450px]:text-center min-[451px]:flex-row w-full justify-between items-center gap-4 min-[451px]:gap-1">
        <div className="flex flex-col gap-2 min-[451px]:pr-8 max-[450px]:items-center max-[450px]:text-center">
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white">{name}</h1>
          <h2 className="text-xl font-medium text-neutral-700 text-balance dark:text-neutral-300">
            {label}
          </h2>
          <span className="text-sm text-neutral-600 dark:text-neutral-400 inline-flex items-center gap-1 tracking-tight">
            <GlobeIcon className="size-4" />
            {city === null && region === null
              ? 'Ubicación desconocida'
              : `${city}, ${region}`}
          </span>
          <footer className="hidden print:block text-sm text-neutral-600 dark:text-neutral-400">{printInfo}</footer>
          <footer className="flex gap-1 text-xs text-neutral-500 dark:text-neutral-400 mt-2 print:hidden">
            {email && (
              <Link
                href={`mailto:${email}`}
                title={`Enviar un correo a ${name} al mail ${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 dark:hover:bg-neutral-800 dark:hover:border-neutral-600 inline-flex items-center justify-center border rounded-md p-1 h-8 w-8 transition-all duration-300"
              >
                <MailIcon className="size-5" />
              </Link>
            )}
            {phone && (
              <Link
                href={`tel:${phone}`}
                title={`llamar por telefono a ${name} al telefono ${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 dark:hover:bg-neutral-800 dark:hover:border-neutral-600 inline-flex items-center justify-center border rounded-md p-1 h-8 w-8 transition-all duration-300"
              >
                <PhoneIcon className="size-5" />
              </Link>
            )}
            {profiles && profiles.length > 0
              ? profiles.map(({ network, url }) => {
                  const Icon = SOCIAL_ICONS[network]
                  return (
                    <Link
                      key={network}
                      href={url}
                      title={`Visitar el perfil de ${name} en ${network}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 dark:hover:bg-neutral-800 dark:hover:border-neutral-600 inline-flex items-center justify-center border rounded-md p-1 h-8 w-8 transition-all duration-300"
                    >
                      <Icon className="size-5" />
                    </Link>
                  )
                })
              : null}
          </footer>
        </div>
        <figure className="shrink-0">
          <Image
            width={144}
            height={144}
            src={image}
            alt={name}
            priority
            className="size-36 rounded-md object-cover aspect-square"
          />
        </figure>
      </div>
    </Section>
  )
}

export default Hero
