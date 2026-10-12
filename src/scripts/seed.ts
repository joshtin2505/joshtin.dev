/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from '../payload.config'
import cvJson from '../mocks/cv.json'

async function runSeed() {
  if (!process.env.DATABASE_URI) {
    console.warn('⚠️  DATABASE_URI no está configurada en .env.local.')
    console.warn('👉 Para ejecutar el seed en Neon DB, configura DATABASE_URI y vuelve a ejecutar pnpm seed.')
    process.exit(0)
  }

  console.log('🌱 Conectando con Payload CMS (Neon Postgres)...')
  const payload = await getPayload({ config })

  console.log('🌱 Iniciando migración de datos desde cv.json a Payload CMS...')

  // 1. Skills
  const existingSkills = await payload.find({
    collection: 'skills',
    limit: 100,
  })
  const skillMap = new Map<string, string | number>()
  for (const s of existingSkills.docs) {
    skillMap.set(s.name.toLowerCase(), s.id)
  }

  for (const s of cvJson.skills || []) {
    if (!skillMap.has(s.name.toLowerCase())) {
      const isFrontend = s.keywords?.some((k: string) => k.toLowerCase().includes('frontend'))
      const isBackend = s.keywords?.some((k: string) => k.toLowerCase().includes('backend') || k.toLowerCase().includes('base'))
      const created = await payload.create({
        collection: 'skills',
        data: {
          name: s.name,
          category: isFrontend ? 'frontend' : isBackend ? 'backend' : 'tools',
          proficiency: s.level === 'Advanced' ? 'core' : 'advanced',
        },
      })
      skillMap.set(s.name.toLowerCase(), created.id)
      console.log(`  + Skill creada: ${s.name}`)
    }
  }

  // 2. Experiences
  const existingExp = await payload.find({
    collection: 'experiences',
    limit: 100,
  })
  const expMap = new Set(existingExp.docs.map((e) => `${e.company}-${e.role}`.toLowerCase()))

  for (const w of cvJson.work || []) {
    const key = `${w.name}-${w.position}`.toLowerCase()
    if (!expMap.has(key)) {
      await payload.create({
        collection: 'experiences',
        data: {
          company: w.name,
          role: w.position,
          startDate: w.startDate || '2023',
          endDate: w.endDate || undefined,
          isCurrent: !w.endDate,
          summary: w.summary,
          achievements: (w.highlights || []).map((h: string) => ({ item: h })),
          companyUrl: w.url !== '/' ? w.url : undefined,
        },
      })
      console.log(`  + Experiencia creada: ${w.name} (${w.position})`)
    }
  }

  // 3. Projects
  const existingProjects = await payload.find({
    collection: 'projects',
    limit: 100,
  })
  const projectMap = new Set(existingProjects.docs.map((p) => p.slug.toLowerCase()))

  for (let i = 0; i < (cvJson.projects || []).length; i++) {
    const p = cvJson.projects[i]
    const slug = (p.name || `project-${i}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    if (!projectMap.has(slug)) {
      const matchedSkillIds: (string | number)[] = []
      for (const t of (p as any).tecnolgies || []) {
        const id = skillMap.get(t.toLowerCase())
        if (id) matchedSkillIds.push(id)
      }

      await payload.create({
        collection: 'projects',
        data: {
          title: p.name,
          slug,
          summary: p.description,
          featured: i < 4,
          order: i,
          techStack: matchedSkillIds.length > 0 ? (matchedSkillIds as any) : undefined,
          liveUrl: p.url || undefined,
          githubUrl: (p as any).repoUrl || undefined,
          _status: 'published',
        },
      })
      console.log(`  + Proyecto creado: ${p.name} (slug: ${slug})`)
    }
  }

  // 4. Profile Global
  const b = cvJson.basics
  await payload.updateGlobal({
    slug: 'profile',
    data: {
      fullName: b.name,
      jobTitle: b.label,
      shortBio: b.summary,
      location: `${b.location.city}, ${b.location.region}`,
      email: b.email,
      socialLinks: (b.profiles || []).map((prof: any) => ({
        network: prof.network,
        url: prof.url,
        username: prof.username,
      })),
      availability: 'open_to_work',
    },
  })
  console.log('  + Global Profile actualizado.')

  // 5. HomePage Global (Default Blocks)
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      layout: [
        { blockType: 'hero', enabled: true, greeting: 'Hola, soy', showAvailabilityBadge: true, showContactCta: true, showCvCta: true },
        { blockType: 'projects', enabled: true, title: 'Proyectos Destacados', limit: 6, onlyFeatured: true },
        { blockType: 'experience', enabled: true, title: 'Experiencia Laboral', limit: 5 },
        { blockType: 'techStack', enabled: true, title: 'Stack Tecnológico' },
        { blockType: 'blogFeed', enabled: true, title: 'Artículos y Experiencias', limit: 3 },
        { blockType: 'contact', enabled: true, title: '¿Hablamos?' },
      ] as any,
    },
  })
  console.log('  + Global HomePage (Bloques del Page Builder) configurado.')

  console.log('🎉 Migración completada exitosamente.')
  process.exit(0)
}

runSeed().catch((err) => {
  console.error('❌ Error durante la migración:', err)
  process.exit(1)
})
