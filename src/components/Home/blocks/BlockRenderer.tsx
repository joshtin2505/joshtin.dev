import type {
  HomePageBlock,
  ProfileData,
  ProjectItem,
  ExperienceItem,
  SkillCategoryGroup,
  BlogPostItem,
} from '@/lib/payload/queries'
import { DynamicHeroBlock } from './DynamicHeroBlock'
import { DynamicProjectsBlock } from './DynamicProjectsBlock'
import { DynamicExperienceBlock } from './DynamicExperienceBlock'
import { DynamicTechStackBlock } from './DynamicTechStackBlock'
import { DynamicBlogFeedBlock } from './DynamicBlogFeedBlock'
import { DynamicContactBlock } from './DynamicContactBlock'

export interface HeroBlockData {
  blockType: 'hero'
  enabled?: boolean
  greeting?: string
  headline?: string
  subheadline?: string
  showAvailabilityBadge?: boolean
  showContactCta?: boolean
  showCvCta?: boolean
}

export interface ProjectsBlockData {
  blockType: 'projects'
  enabled?: boolean
  title?: string
  subtitle?: string
  limit?: number
  onlyFeatured?: boolean
}

export interface ExperienceBlockData {
  blockType: 'experience'
  enabled?: boolean
  title?: string
  subtitle?: string
  limit?: number
}

export interface TechStackBlockData {
  blockType: 'techStack'
  enabled?: boolean
  title?: string
  subtitle?: string
}

export interface BlogFeedBlockData {
  blockType: 'blogFeed'
  enabled?: boolean
  title?: string
  subtitle?: string
  limit?: number
}

export interface ContactBlockData {
  blockType: 'contact'
  enabled?: boolean
  title?: string
  subtitle?: string
}

interface BlockRendererProps {
  layout: HomePageBlock[]
  profile: ProfileData
  projects: ProjectItem[]
  experiences: ExperienceItem[]
  skillsGroups: SkillCategoryGroup[]
  posts: BlogPostItem[]
}

export function BlockRenderer({
  layout,
  profile,
  projects,
  experiences,
  skillsGroups,
  posts,
}: BlockRendererProps) {
  return (
    <>
      {layout.map((block, idx) => {
        if (block.enabled === false) return null

        switch (block.blockType) {
          case 'hero':
            return <DynamicHeroBlock key={`hero-${idx}`} block={block as HeroBlockData} profile={profile} />
          case 'projects':
            return <DynamicProjectsBlock key={`projects-${idx}`} block={block as ProjectsBlockData} projects={projects} />
          case 'experience':
            return <DynamicExperienceBlock key={`experience-${idx}`} block={block as ExperienceBlockData} experiences={experiences} />
          case 'techStack':
            return <DynamicTechStackBlock key={`techStack-${idx}`} block={block as TechStackBlockData} skillsGroups={skillsGroups} />
          case 'blogFeed':
            return <DynamicBlogFeedBlock key={`blogFeed-${idx}`} block={block as BlogFeedBlockData} posts={posts} />
          case 'contact':
            return <DynamicContactBlock key={`contact-${idx}`} block={block as ContactBlockData} profile={profile} />
          default:
            return null
        }
      })}
    </>
  )
}
