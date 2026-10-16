/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
// @ts-expect-error - @next/env is provided by Next.js runtime
import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { getPayload } from 'payload'

async function runSeedHome() {
  if (!process.env.DATABASE_URI) {
    console.warn('⚠️  DATABASE_URI no configurada.')
    process.exit(0)
  }

  const { default: config } = await import('../payload.config')
  console.log('🔄 Conectando con Payload CMS (Neon Postgres)...')
  const payload = await getPayload({ config })

  console.log('🔍 Verificando página "home" en colección Pages...')
  const existing = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
    limit: 1,
  })

  const defaultLayout: any[] = [
    {
      blockType: 'hero',
      enabled: true,
      greeting: 'Hola, soy',
      variant: 'split',
      showAvailabilityBadge: true,
      showContactCta: true,
      showCvCta: true,
      blockSettings: {
        spacing: 'normal',
        backgroundVariant: 'default',
        anchorId: 'hero',
      },
    },
    {
      blockType: 'about',
      enabled: true,
      eyebrow: '01 // PERFIL',
      title: 'Sobre Mí & Trayectoria',
      showMetrics: true,
      blockSettings: {
        spacing: 'normal',
        backgroundVariant: 'default',
        anchorId: 'sobre-mi',
      },
    },
    {
      blockType: 'projects',
      enabled: true,
      eyebrow: '02 // PROYECTOS SELECCIONADOS',
      title: 'Proyectos Destacados',
      limit: 6,
      onlyFeatured: true,
      blockSettings: {
        spacing: 'normal',
        backgroundVariant: 'grid',
        anchorId: 'proyectos',
      },
    },
    {
      blockType: 'experience',
      enabled: true,
      eyebrow: '03 // TRAYECTORIA PROFESIONAL',
      title: 'Experiencia Laboral',
      limit: 5,
      blockSettings: {
        spacing: 'normal',
        backgroundVariant: 'default',
        anchorId: 'experiencia',
      },
    },
    {
      blockType: 'techStack',
      enabled: true,
      eyebrow: '04 // ARSENAL TECNOLÓGICO',
      title: 'Stack & Herramientas',
      blockSettings: {
        spacing: 'normal',
        backgroundVariant: 'dots',
        anchorId: 'stack',
      },
    },
    {
      blockType: 'contact',
      enabled: true,
      eyebrow: '05 // CONTACTO & LEADS',
      title: '¿Tienes un proyecto en mente?',
      showDirectEmail: true,
      blockSettings: {
        spacing: 'spacious',
        backgroundVariant: 'glow',
        anchorId: 'contacto',
      },
    },
  ]

  if (!existing.docs || existing.docs.length === 0) {
    console.log('🌱 Creando página "home" en colección Pages...')
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Inicio',
        slug: 'home',
        layout: defaultLayout,
        _status: 'published',
      },
    })
    console.log('✅ Página "home" creada con éxito.')
  } else {
    console.log('ℹ️  Página "home" ya existe. Actualizando layout modular con blockSettings...')
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: {
        layout: defaultLayout,
      },
    })
    console.log('✅ Página "home" actualizada correctamente.')
  }

  process.exit(0)
}

runSeedHome().catch((err) => {
  console.error('❌ Error al inicializar página home:', err)
  process.exit(1)
})
