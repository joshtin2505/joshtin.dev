/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
// @ts-expect-error - @next/env is provided by Next.js runtime
import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { getPayload } from 'payload'

async function runMigration() {
  if (!process.env.DATABASE_URI) {
    console.warn('⚠️  DATABASE_URI no está configurada. Operando en modo local/mock.')
    process.exit(0)
  }

  const { default: config } = await import('../payload.config')
  console.log('🔄 Conectando con Payload CMS (Neon Postgres)...')
  const payload = await getPayload({ config })

  console.log('🔍 Leyendo datos existentes de Landing...')
  let landingData: any = null
  try {
    landingData = await payload.findGlobal({
      slug: 'landing',
      depth: 1,
    })
  } catch (err) {
    console.warn('  - No se pudo leer Landing global:', err)
  }

  const existingSettings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
  }).catch(() => null)

  const dataToSet: any = {
    greeting: landingData?.greeting || 'Hola, soy',
    fullName: landingData?.fullName || 'Justin Castro Perez',
    jobTitle: landingData?.jobTitle || 'Software Developer & Frontend Engineer',
    shortBio:
      landingData?.shortBio ||
      'Especialista en desarrollo web moderno, arquitectura de interfaces accesibles y aplicaciones de alto rendimiento.',
    aboutTitle: landingData?.aboutTitle || 'Sobre Mí',
    fullBio: landingData?.fullBio || null,
    location: landingData?.location || 'Colombia',
    availability: landingData?.availability || 'open_to_work',
    email: landingData?.email || 'justin.castro.p@gmail.com',
    socialLinks: landingData?.socialLinks || [
      { network: 'github', url: 'https://github.com/joshtin2505', username: 'joshtin2505' },
      { network: 'linkedin', url: 'https://linkedin.com/in/justin-castro-perez', username: 'justin-castro-perez' },
      { network: 'twitter', url: 'https://x.com/joshtin2505', username: '@joshtin2505' },
    ],
    accentColor: existingSettings?.accentColor || '#10B981',
    motionIntensity: existingSettings?.motionIntensity || 'subtle',
  }

  if (landingData?.avatar) {
    dataToSet.avatar = typeof landingData.avatar === 'object' ? landingData.avatar.id : landingData.avatar
  }
  if (landingData?.cvFile) {
    dataToSet.cvFile = typeof landingData.cvFile === 'object' ? landingData.cvFile.id : landingData.cvFile
  }
  if (Array.isArray(landingData?.heroSkills) && landingData.heroSkills.length > 0) {
    dataToSet.heroSkills = landingData.heroSkills.map((s: any) => (typeof s === 'object' ? s.id : s))
  }
  if (Array.isArray(landingData?.metrics) && landingData.metrics.length > 0) {
    dataToSet.metrics = landingData.metrics
  }

  console.log('💾 Guardando en global SiteSettings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: dataToSet,
  })

  console.log('✅ Migración a SiteSettings completada con éxito sin pérdida de información.')
  process.exit(0)
}

runMigration().catch((e) => {
  console.error('❌ Error en la migración:', e)
  process.exit(1)
})
