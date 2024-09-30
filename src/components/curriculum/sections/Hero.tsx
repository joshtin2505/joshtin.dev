import cvJson from '@/mocks/cv.json'
import Section from '../Section'
import Image from 'next/image'
import './Hero.css'
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
      <div className="hero-container">
        <div className="info">
          <h1 className="text-4xl dark:text-white">{name}</h1>
          <h2>{label}</h2>
          <span>
            <GlobeIcon className="size-4" />
            {city === null && region === null
              ? 'Ubicación desconocida'
              : `${city}, ${region}`}
          </span>
          <footer className="hidden print:block ">{printInfo}</footer>
          <footer className="cv-hero-footer">
            {email && (
              <Link
                href={`mailto:${email}`}
                title={`Enviar un correo a ${name} al mail ${email}`}
                target="_blank"
                rel="noopener noreferrer"
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
                    >
                      <Icon className="size-5" />
                    </Link>
                  )
                })
              : null}
          </footer>
        </div>
        <figure>
          <Image width={1000} height={1000} src={image} alt={name} />
        </figure>
      </div>
    </Section>
  )
}

export default Hero
