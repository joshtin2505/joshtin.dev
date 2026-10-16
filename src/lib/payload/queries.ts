import { getPayload, type Where } from 'payload'
import config from '@/payload.config'
import cvJson from '@/mocks/cv.json'

export type Locale = 'es' | 'en'

export interface LandingData {
  greeting?: string
  fullName: string
  jobTitle: string
  shortBio: string
  availability: string
  location: string
  avatarUrl?: string
  heroSkills?: Array<{ id: string; name: string; iconKey?: string; category?: string }>
  aboutTitle?: string
  fullBio?: unknown
  metrics?: Array<{ value: string; label: string }>
  sectionsConfig?: {
    projectsSection?: {
      enabled?: boolean
      title?: string
      subtitle?: string
      selectionMode?: 'featured' | 'manual'
      manualProjects?: ProjectItem[]
      limit?: number
    }
    skillsSection?: {
      enabled?: boolean
      title?: string
      subtitle?: string
      displayMode?: 'categories' | 'cloud'
    }
    contactSection?: {
      enabled?: boolean
      title?: string
      callToAction?: string
    }
  }
  email: string
  socialLinks: Array<{ network: string; url: string; username?: string }>
  cvFileUrl?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImageUrl?: string
  }
}

export interface SiteSettingsData {
  greeting?: string
  fullName: string
  jobTitle: string
  shortBio: string
  location: string
  availability: string
  avatarUrl?: string
  heroSkills?: Array<{ id: string; name: string; iconKey?: string; category?: string }>
  aboutTitle?: string
  fullBio?: unknown
  metrics?: Array<{ value: string; label: string }>
  email: string
  socialLinks: Array<{ network: string; url: string; username?: string }>
  cvFileUrl?: string
  accentColor?: string
  motionIntensity?: 'subtle' | 'expressive' | 'reduced'
}

export interface ProfileData {
  fullName: string
  jobTitle: string
  shortBio: string
  location: string
  email: string
  availability: string
  socialLinks: Array<{ network: string; url: string; username?: string }>
  avatarUrl?: string
}

export interface ProjectItem {
  id: string
  title: string
  slug: string
  summary: string
  featured: boolean
  order: number
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  summary?: string
  achievements: string[]
  techStack: string[]
  companyUrl?: string
}

export interface SkillCategoryGroup {
  category: string
  skills: Array<{ name: string; proficiency?: string; iconKey?: string }>
}

export interface BlogPostItem {
  id: string
  title: string
  slug: string
  publishedAt?: string
  excerpt: string
  tags: string[]
  readTime: number
  coverImageUrl?: string
  content?: unknown
}

export interface HomePageBlock {
  blockType: string
  id?: string
  enabled?: boolean
  [key: string]: unknown
}

// Fallback data builders from cv.json
export function getFallbackLanding(): LandingData {
  const b = cvJson.basics
  return {
    greeting: 'Hola, soy',
    fullName: b.name,
    jobTitle: b.label,
    shortBio: b.summary,
    availability: 'open_to_work',
    location: `${b.location.city}, ${b.location.region}`,
    avatarUrl: b.image,
    heroSkills: [
      { id: 'skill-react', name: 'React', category: 'frontend' },
      { id: 'skill-nextjs', name: 'Next.js', category: 'frontend' },
      { id: 'skill-typescript', name: 'TypeScript', category: 'frontend' },
      { id: 'skill-tailwind', name: 'Tailwind CSS', category: 'frontend' },
    ],
    aboutTitle: 'Sobre Mí',
    metrics: [
      { value: '+3', label: 'Años de experiencia en desarrollo web' },
      { value: '15+', label: 'Proyectos y aplicaciones web construidas' },
      { value: '100%', label: 'Compromiso con accesibilidad y buenas prácticas' },
    ],
    sectionsConfig: {
      projectsSection: {
        enabled: true,
        title: 'Proyectos Destacados',
        subtitle: 'Selección de aplicaciones web, herramientas y productos desarrollados con foco en rendimiento, escalabilidad y experiencia de usuario.',
        selectionMode: 'featured',
        limit: 6,
      },
      skillsSection: {
        enabled: true,
        title: 'Stack Tecnológico & Herramientas',
        subtitle: 'Tecnologías y herramientas que utilizo activamente en producción para diseñar, construir y desplegar software.',
        displayMode: 'categories',
      },
      contactSection: {
        enabled: true,
        title: '¿Tienes un proyecto en mente?',
        callToAction: 'Estoy disponible para nuevas oportunidades laborales, consultorías y proyectos desafiantes.',
      },
    },
    email: b.email,
    socialLinks: (b.profiles || []).map((p) => ({
      network: p.network,
      url: p.url,
      username: p.username,
    })),
  }
}

function getFallbackProfile(): ProfileData {
  const b = cvJson.basics
  return {
    fullName: b.name,
    jobTitle: b.label,
    shortBio: b.summary,
    location: `${b.location.city}, ${b.location.region}`,
    email: b.email,
    availability: 'open_to_work',
    socialLinks: (b.profiles || []).map((p) => ({
      network: p.network,
      url: p.url,
      username: p.username,
    })),
    avatarUrl: b.image,
  }
}

function getFallbackProjects(limit?: number, onlyFeatured?: boolean): ProjectItem[] {
  let list = (cvJson.projects || []).map((p, idx: number) => ({
    id: `project-${idx}`,
    title: p.name,
    slug: (p.name || `project-${idx}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    summary: p.description,
    featured: idx < 4,
    order: idx,
    techStack: p.tecnolgies || [],
    liveUrl: p.url || undefined,
    githubUrl: p.repoUrl || undefined,
    imageUrl: p.img && p.img.length > 0 ? p.img[0] : undefined,
  }))

  if (onlyFeatured) {
    list = list.filter((p) => p.featured)
  }
  if (limit) {
    list = list.slice(0, limit)
  }
  return list
}

function getFallbackExperiences(limit?: number): ExperienceItem[] {
  let list = (cvJson.work || []).map((w, idx: number) => ({
    id: `exp-${idx}`,
    company: w.name,
    role: w.position,
    startDate: w.startDate,
    endDate: w.endDate || undefined,
    isCurrent: !w.endDate,
    summary: w.summary,
    achievements: w.highlights || [],
    techStack: [],
    companyUrl: w.url !== '/' ? w.url : undefined,
  }))

  if (limit) {
    list = list.slice(0, limit)
  }
  return list
}

function getFallbackSkills(): SkillCategoryGroup[] {
  const categories: Record<string, Array<{ name: string; proficiency?: string }>> = {
    Frontend: [],
    Backend: [],
    Herramientas: [],
  }

  for (const s of cvJson.skills || []) {
    const isFrontend = s.keywords?.some((k: string) => k.toLowerCase().includes('frontend'))
    const isBackend = s.keywords?.some((k: string) => k.toLowerCase().includes('backend') || k.toLowerCase().includes('base'))
    if (isFrontend) {
      categories.Frontend.push({ name: s.name, proficiency: s.level })
    } else if (isBackend) {
      categories.Backend.push({ name: s.name, proficiency: s.level })
    } else {
      categories.Herramientas.push({ name: s.name, proficiency: s.level })
    }
  }

  return Object.entries(categories).map(([category, skills]) => ({
    category,
    skills,
  }))
}

function getFallbackLayout(): HomePageBlock[] {
  return [
    { blockType: 'hero', enabled: true, greeting: 'Hola, soy', showAvailabilityBadge: true, showContactCta: true, showCvCta: true },
    { blockType: 'projects', enabled: true, title: 'Proyectos Destacados', limit: 6, onlyFeatured: true },
    { blockType: 'experience', enabled: true, title: 'Experiencia Laboral', limit: 5 },
    { blockType: 'techStack', enabled: true, title: 'Stack Tecnológico' },
    { blockType: 'blogFeed', enabled: true, title: 'Artículos y Experiencias', limit: 3 },
    { blockType: 'contact', enabled: true, title: '¿Hablamos?' },
  ]
}

// Resilient API queries
export async function getLandingData(locale: Locale = 'es'): Promise<LandingData> {
  if (!process.env.DATABASE_URI) return getFallbackLanding()

  try {
    const payload = await getPayload({ config })
    const landing = await payload.findGlobal({
      slug: 'landing',
      locale,
      depth: 2,
    })

    if (!landing) return getFallbackLanding()

    const d = landing as Record<string, unknown>
    const fallback = getFallbackLanding()

    let avatarUrl: string | undefined = fallback.avatarUrl
    const avatarDoc = (d.avatar || d.cvFile) as Record<string, unknown> | null
    if (avatarDoc && typeof avatarDoc === 'object') {
      const mime = String(avatarDoc.mimeType || '')
      const isImg = mime.startsWith('image/') || (!mime && avatarDoc.filename)
      if (isImg) {
        if (avatarDoc.filename) {
          avatarUrl = `/media/${avatarDoc.filename}`
        } else if (avatarDoc.url) {
          avatarUrl = String(avatarDoc.url)
        }
      }
    }

    let cvFileUrl: string | undefined
    if (d.cvFile && typeof d.cvFile === 'object' && 'url' in d.cvFile) {
      cvFileUrl = (d.cvFile as { url?: string }).url
    }

    const heroSkills: Array<{ id: string; name: string; iconKey?: string; category?: string }> = []
    if (Array.isArray(d.heroSkills)) {
      for (const s of d.heroSkills) {
        if (typeof s === 'object' && s !== null) {
          const item = s as { id?: string | number; name?: string; iconKey?: string; category?: string }
          heroSkills.push({
            id: String(item.id || ''),
            name: String(item.name || ''),
            iconKey: item.iconKey ? String(item.iconKey) : undefined,
            category: item.category ? String(item.category) : undefined,
          })
        }
      }
    }

    const metrics: Array<{ value: string; label: string }> = []
    if (Array.isArray(d.metrics)) {
      for (const m of d.metrics) {
        if (typeof m === 'object' && m !== null) {
          const item = m as { value?: string; label?: string }
          metrics.push({
            value: String(item.value || ''),
            label: String(item.label || ''),
          })
        }
      }
    }

    const socialLinks: Array<{ network: string; url: string; username?: string }> = []
    if (Array.isArray(d.socialLinks)) {
      for (const sl of d.socialLinks) {
        if (typeof sl === 'object' && sl !== null) {
          const item = sl as { network?: string; url?: string; username?: string | null }
          socialLinks.push({
            network: String(item.network || ''),
            url: String(item.url || ''),
            username: item.username ? String(item.username) : undefined,
          })
        }
      }
    }

    const rawSections = (d.sectionsConfig || {}) as Record<string, Record<string, unknown>>
    const rawProjectsSec = rawSections.projectsSection || {}
    const rawSkillsSec = rawSections.skillsSection || {}
    const rawContactSec = rawSections.contactSection || {}

    return {
      greeting: d.greeting ? String(d.greeting) : fallback.greeting,
      fullName: d.fullName ? String(d.fullName) : fallback.fullName,
      jobTitle: d.jobTitle ? String(d.jobTitle) : fallback.jobTitle,
      shortBio: d.shortBio ? String(d.shortBio) : fallback.shortBio,
      availability: d.availability ? String(d.availability) : fallback.availability,
      location: d.location ? String(d.location) : fallback.location,
      avatarUrl,
      heroSkills: heroSkills.length > 0 ? heroSkills : fallback.heroSkills,
      aboutTitle: d.aboutTitle ? String(d.aboutTitle) : fallback.aboutTitle,
      fullBio: d.fullBio,
      metrics: metrics.length > 0 ? metrics : fallback.metrics,
      sectionsConfig: {
        projectsSection: {
          enabled: rawProjectsSec.enabled !== undefined ? Boolean(rawProjectsSec.enabled) : true,
          title: rawProjectsSec.title ? String(rawProjectsSec.title) : fallback.sectionsConfig?.projectsSection?.title,
          subtitle: rawProjectsSec.subtitle ? String(rawProjectsSec.subtitle) : fallback.sectionsConfig?.projectsSection?.subtitle,
          selectionMode: (rawProjectsSec.selectionMode as 'featured' | 'manual') || 'featured',
          limit: rawProjectsSec.limit ? Number(rawProjectsSec.limit) : 6,
        },
        skillsSection: {
          enabled: rawSkillsSec.enabled !== undefined ? Boolean(rawSkillsSec.enabled) : true,
          title: rawSkillsSec.title ? String(rawSkillsSec.title) : fallback.sectionsConfig?.skillsSection?.title,
          subtitle: rawSkillsSec.subtitle ? String(rawSkillsSec.subtitle) : fallback.sectionsConfig?.skillsSection?.subtitle,
          displayMode: (rawSkillsSec.displayMode as 'categories' | 'cloud') || 'categories',
        },
        contactSection: {
          enabled: rawContactSec.enabled !== undefined ? Boolean(rawContactSec.enabled) : true,
          title: rawContactSec.title ? String(rawContactSec.title) : fallback.sectionsConfig?.contactSection?.title,
          callToAction: rawContactSec.callToAction ? String(rawContactSec.callToAction) : fallback.sectionsConfig?.contactSection?.callToAction,
        },
      },
      email: d.email ? String(d.email) : fallback.email,
      socialLinks: socialLinks.length > 0 ? socialLinks : fallback.socialLinks,
      cvFileUrl,
      seo: {
        metaTitle: d.metaTitle ? String(d.metaTitle) : undefined,
        metaDescription: d.metaDescription ? String(d.metaDescription) : undefined,
        ogImageUrl: d.ogImage && typeof d.ogImage === 'object' && 'url' in d.ogImage ? (d.ogImage as { url?: string }).url : undefined,
      },
    }
  } catch {
    return getFallbackLanding()
  }
}

function getFallbackSiteSettings(): SiteSettingsData {
  const b = cvJson.basics
  return {
    greeting: 'Hola, soy',
    fullName: b.name,
    jobTitle: b.label,
    shortBio: b.summary,
    location: `${b.location.city}, ${b.location.region}`,
    availability: 'open_to_work',
    avatarUrl: b.image,
    heroSkills: [],
    aboutTitle: 'Sobre Mí',
    fullBio: null,
    metrics: [
      { value: '+3', label: 'Años de Experiencia' },
      { value: '15+', label: 'Proyectos Desarrollados' },
      { value: '100%', label: 'Compromiso y Rendimiento' },
    ],
    email: b.email,
    socialLinks: (b.profiles || []).map((p) => ({
      network: p.network,
      url: p.url,
      username: p.username,
    })),
    cvFileUrl: undefined,
    accentColor: '#10B981',
    motionIntensity: 'subtle',
  }
}

export async function getSiteSettings(locale: Locale = 'es'): Promise<SiteSettingsData> {
  const fallback = getFallbackSiteSettings()
  if (!process.env.DATABASE_URI) return fallback

  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      locale,
      depth: 2,
    })

    if (!settings) {
      const landing = await getLandingData(locale).catch(() => null)
      if (landing) {
        return {
          ...fallback,
          greeting: landing.greeting || fallback.greeting,
          fullName: landing.fullName || fallback.fullName,
          jobTitle: landing.jobTitle || fallback.jobTitle,
          shortBio: landing.shortBio || fallback.shortBio,
          location: landing.location || fallback.location,
          availability: landing.availability || fallback.availability,
          avatarUrl: landing.avatarUrl || fallback.avatarUrl,
          heroSkills: landing.heroSkills || fallback.heroSkills,
          aboutTitle: landing.aboutTitle || fallback.aboutTitle,
          fullBio: landing.fullBio || fallback.fullBio,
          metrics: landing.metrics || fallback.metrics,
          email: landing.email || fallback.email,
          socialLinks: landing.socialLinks || fallback.socialLinks,
          cvFileUrl: landing.cvFileUrl || fallback.cvFileUrl,
        }
      }
      return fallback
    }

    const d = settings as Record<string, unknown>
    let avatarUrl: string | undefined = fallback.avatarUrl
    const avatarDoc = d.avatar as Record<string, unknown> | null
    if (avatarDoc && typeof avatarDoc === 'object') {
      if ('url' in avatarDoc && typeof avatarDoc.url === 'string') {
        avatarUrl = avatarDoc.url
      } else if ('filename' in avatarDoc && typeof avatarDoc.filename === 'string') {
        avatarUrl = `/media/${avatarDoc.filename}`
      }
    }

    let cvFileUrl: string | undefined
    const cvDoc = d.cvFile as Record<string, unknown> | null
    if (cvDoc && typeof cvDoc === 'object') {
      if ('url' in cvDoc && typeof cvDoc.url === 'string') {
        cvFileUrl = cvDoc.url
      } else if ('filename' in cvDoc && typeof cvDoc.filename === 'string') {
        cvFileUrl = `/media/${cvDoc.filename}`
      }
    }

    const heroSkills: Array<{ id: string; name: string; iconKey?: string; category?: string }> = []
    if (Array.isArray(d.heroSkills)) {
      for (const s of d.heroSkills) {
        if (typeof s === 'object' && s !== null && 'name' in s) {
          heroSkills.push({
            id: String((s as { id?: string }).id || ''),
            name: String((s as { name: string }).name),
            iconKey: (s as { iconKey?: string }).iconKey,
            category: (s as { category?: string }).category,
          })
        }
      }
    }

    const metrics: Array<{ value: string; label: string }> = []
    if (Array.isArray(d.metrics)) {
      for (const m of d.metrics) {
        if (typeof m === 'object' && m !== null && 'value' in m && 'label' in m) {
          metrics.push({
            value: String((m as { value: string }).value),
            label: String((m as { label: string }).label),
          })
        }
      }
    }

    const rawSocials = Array.isArray(d.socialLinks) ? d.socialLinks : []
    const socialLinks = rawSocials
      .filter((s): s is { network: string; url: string; username?: string } => typeof s === 'object' && s !== null && 'network' in s && 'url' in s)
      .map((s) => ({
        network: String(s.network),
        url: String(s.url),
        username: s.username ? String(s.username) : undefined,
      }))

    return {
      greeting: d.greeting ? String(d.greeting) : fallback.greeting,
      fullName: d.fullName ? String(d.fullName) : fallback.fullName,
      jobTitle: d.jobTitle ? String(d.jobTitle) : fallback.jobTitle,
      shortBio: d.shortBio ? String(d.shortBio) : fallback.shortBio,
      location: d.location ? String(d.location) : fallback.location,
      availability: d.availability ? String(d.availability) : fallback.availability,
      avatarUrl: avatarUrl || fallback.avatarUrl,
      heroSkills: heroSkills.length > 0 ? heroSkills : fallback.heroSkills,
      aboutTitle: d.aboutTitle ? String(d.aboutTitle) : fallback.aboutTitle,
      fullBio: d.fullBio || fallback.fullBio,
      metrics: metrics.length > 0 ? metrics : fallback.metrics,
      email: d.email ? String(d.email) : fallback.email,
      socialLinks: socialLinks.length > 0 ? socialLinks : fallback.socialLinks,
      cvFileUrl,
      accentColor: d.accentColor ? String(d.accentColor) : fallback.accentColor,
      motionIntensity: (d.motionIntensity as 'subtle' | 'expressive' | 'reduced') || fallback.motionIntensity,
    }
  } catch {
    return fallback
  }
}

export async function getProfileData(locale: Locale = 'es'): Promise<ProfileData> {
  if (!process.env.DATABASE_URI) return getFallbackProfile()

  try {
    const payload = await getPayload({ config })
    const profile = await payload.findGlobal({
      slug: 'profile',
      locale,
    })

    if (!profile) return getFallbackProfile()

    const avatarUrl =
      profile.avatar && typeof profile.avatar === 'object' && 'url' in profile.avatar
        ? (profile.avatar as { url?: string }).url
        : cvJson.basics.image

    return {
      fullName: profile.fullName || cvJson.basics.name,
      jobTitle: profile.jobTitle || cvJson.basics.label,
      shortBio: profile.shortBio || cvJson.basics.summary,
      location: profile.location || 'Colombia',
      email: profile.email || cvJson.basics.email,
      availability: profile.availability || 'open_to_work',
      socialLinks: (
        (profile.socialLinks || []) as Array<{
          network: string
          url: string
          username?: string | null
        }>
      ).map((s) => ({
        network: s.network,
        url: s.url,
        username: s.username || undefined,
      })),
      avatarUrl,
    }
  } catch {
    return getFallbackProfile()
  }
}

export async function getHomePageLayout(locale: Locale = 'es'): Promise<HomePageBlock[]> {
  if (!process.env.DATABASE_URI) return getFallbackLayout()

  try {
    const payload = await getPayload({ config })
    const home = await payload.findGlobal({
      slug: 'home-page',
      locale,
    })

    if (home?.layout && Array.isArray(home.layout) && home.layout.length > 0) {
      return home.layout as HomePageBlock[]
    }
    return getFallbackLayout()
  } catch {
    return getFallbackLayout()
  }
}

export async function getProjectsData(locale: Locale = 'es', limit = 6, onlyFeatured = false): Promise<ProjectItem[]> {
  if (!process.env.DATABASE_URI) return getFallbackProjects(limit, onlyFeatured)

  try {
    const payload = await getPayload({ config })
    const where: Where = {
      _status: { equals: 'published' },
    }
    if (onlyFeatured) {
      where.featured = { equals: true }
    }

    const res = await payload.find({
      collection: 'projects',
      where,
      limit,
      sort: 'order',
      locale,
      depth: 2,
    })

    if (!res.docs || res.docs.length === 0) {
      return getFallbackProjects(limit, onlyFeatured)
    }

    return res.docs.map((doc) => {
      const d = doc as Record<string, unknown>
      const techStack: string[] = []
      if (Array.isArray(d.techStack)) {
        for (const s of d.techStack) {
          if (typeof s === 'object' && s !== null && 'name' in s) {
            techStack.push(String((s as { name: string }).name))
          } else {
            techStack.push(String(s))
          }
        }
      }

      let imageUrl: string | undefined
      if (d.coverImage && typeof d.coverImage === 'object' && 'url' in d.coverImage) {
        imageUrl = (d.coverImage as { url?: string }).url
      }

      return {
        id: String(d.id),
        title: String(d.title || ''),
        slug: String(d.slug || ''),
        summary: String(d.summary || ''),
        featured: Boolean(d.featured),
        order: Number(d.order || 0),
        techStack,
        liveUrl: d.liveUrl ? String(d.liveUrl) : undefined,
        githubUrl: d.githubUrl ? String(d.githubUrl) : undefined,
        imageUrl,
      }
    })
  } catch {
    return getFallbackProjects(limit, onlyFeatured)
  }
}

export async function getExperiencesData(locale: Locale = 'es', limit = 5): Promise<ExperienceItem[]> {
  if (!process.env.DATABASE_URI) return getFallbackExperiences(limit)

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'experiences',
      limit,
      sort: 'order',
      locale,
      depth: 1,
    })

    if (!res.docs || res.docs.length === 0) {
      return getFallbackExperiences(limit)
    }

    return res.docs.map((doc) => {
      const d = doc as Record<string, unknown>
      const achievements: string[] = []
      if (Array.isArray(d.achievements)) {
        for (const a of d.achievements) {
          if (typeof a === 'object' && a !== null && 'item' in a) {
            achievements.push(String((a as { item: string }).item))
          }
        }
      }

      return {
        id: String(d.id),
        company: String(d.company || ''),
        role: String(d.role || ''),
        startDate: String(d.startDate || ''),
        endDate: d.endDate ? String(d.endDate) : undefined,
        isCurrent: Boolean(d.isCurrent),
        summary: d.summary ? String(d.summary) : undefined,
        achievements,
        techStack: [],
        companyUrl: d.companyUrl ? String(d.companyUrl) : undefined,
      }
    })
  } catch {
    return getFallbackExperiences(limit)
  }
}

export async function getSkillsData(): Promise<SkillCategoryGroup[]> {
  if (!process.env.DATABASE_URI) return getFallbackSkills()

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'skills',
      limit: 100,
      sort: 'order',
    })

    if (!res.docs || res.docs.length === 0) {
      return getFallbackSkills()
    }

    const categoryMap: Record<string, Array<{ name: string; proficiency?: string; iconKey?: string }>> = {
      Frontend: [],
      Backend: [],
      'Cloud & DevOps': [],
      Herramientas: [],
    }

    for (const s of res.docs) {
      const cat =
        s.category === 'frontend'
          ? 'Frontend'
          : s.category === 'backend'
          ? 'Backend'
          : s.category === 'cloud-devops'
          ? 'Cloud & DevOps'
          : 'Herramientas'

      if (!categoryMap[cat]) categoryMap[cat] = []
      categoryMap[cat].push({
        name: s.name,
        proficiency: s.proficiency || undefined,
        iconKey: s.iconKey || undefined,
      })
    }

    return Object.entries(categoryMap)
      .filter(([, list]) => list.length > 0)
      .map(([category, skills]) => ({ category, skills }))
  } catch {
    return getFallbackSkills()
  }
}

export async function getLatestPosts(locale: Locale = 'es', limit = 3): Promise<BlogPostItem[]> {
  if (!process.env.DATABASE_URI) return []

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
      },
      limit,
      sort: '-publishedAt',
      locale,
      depth: 1,
    })

    return (res.docs || []).map((doc) => {
      const p = doc as Record<string, unknown>
      const tags: string[] = []
      if (Array.isArray(p.tags)) {
        for (const t of p.tags) {
          if (typeof t === 'object' && t !== null && 'tag' in t) {
            tags.push(String((t as { tag: string }).tag))
          }
        }
      }

      let coverImageUrl: string | undefined
      if (p.coverImage && typeof p.coverImage === 'object' && 'url' in p.coverImage) {
        coverImageUrl = (p.coverImage as { url?: string }).url
      }

      return {
        id: String(p.id),
        title: String(p.title || ''),
        slug: String(p.slug || ''),
        publishedAt: p.publishedAt ? String(p.publishedAt) : undefined,
        excerpt: String(p.excerpt || ''),
        tags,
        readTime: Number(p.readTime || 5),
        coverImageUrl,
      }
    })
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string, locale: Locale = 'es'): Promise<BlogPostItem | null> {
  if (!process.env.DATABASE_URI) return null

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        _status: { equals: 'published' },
      },
      limit: 1,
      locale,
      depth: 1,
    })

    if (!res.docs || res.docs.length === 0) return null
    const p = res.docs[0] as Record<string, unknown>

    const tags: string[] = []
    if (Array.isArray(p.tags)) {
      for (const t of p.tags) {
        if (typeof t === 'object' && t !== null && 'tag' in t) {
          tags.push(String((t as { tag: string }).tag))
        }
      }
    }

    let coverImageUrl: string | undefined
    if (p.coverImage && typeof p.coverImage === 'object' && 'url' in p.coverImage) {
      coverImageUrl = (p.coverImage as { url?: string }).url
    }

    return {
      id: String(p.id),
      title: String(p.title || ''),
      slug: String(p.slug || ''),
      publishedAt: p.publishedAt ? String(p.publishedAt) : undefined,
      excerpt: String(p.excerpt || ''),
      tags,
      readTime: Number(p.readTime || 5),
      coverImageUrl,
      content: p.content,
    }
  } catch {
    return null
  }
}
