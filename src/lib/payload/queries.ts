import { getPayload, type Where } from 'payload'
import config from '@/payload.config'
import cvJson from '@/mocks/cv.json'

export type Locale = 'es' | 'en'

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
      depth: 1,
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
