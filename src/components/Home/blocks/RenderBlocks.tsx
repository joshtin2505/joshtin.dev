import React from 'react'
import type {
  PageBlock,
  SiteSettingsData,
  ProjectItem,
  ExperienceItem,
  SkillCategoryGroup,
  BlogPostItem,
} from '@/lib/payload/queries'
import { DynamicHeroBlock } from './DynamicHeroBlock'
import { DynamicAboutBlock } from './DynamicAboutBlock'
import { DynamicProjectsBlock } from './DynamicProjectsBlock'
import { DynamicExperienceBlock } from './DynamicExperienceBlock'
import { DynamicTechStackBlock } from './DynamicTechStackBlock'
import { DynamicBlogFeedBlock } from './DynamicBlogFeedBlock'
import { DynamicContactBlock } from './DynamicContactBlock'

interface RenderBlocksProps {
  layout: PageBlock[]
  siteSettings: SiteSettingsData
  projects: ProjectItem[]
  experiences: ExperienceItem[]
  skillsGroups: SkillCategoryGroup[]
  posts?: BlogPostItem[]
}

export function RenderBlocks({
  layout,
  siteSettings,
  projects,
  experiences,
  skillsGroups,
  posts = [],
}: RenderBlocksProps) {
  if (!layout || layout.length === 0) return null

  return (
    <div className="flex flex-col">
      {layout.map((block, idx) => {
        if (block.enabled === false) return null

        switch (block.blockType) {
          case 'hero':
            return (
              <DynamicHeroBlock
                key={`block-${idx}-${block.blockType}`}
                block={block as Record<string, unknown>}
                siteSettings={siteSettings}
              />
            )

          case 'about':
            return (
              <DynamicAboutBlock
                key={`block-${idx}-${block.blockType}`}
                block={block as Record<string, unknown>}
                siteSettings={siteSettings}
              />
            )

          case 'projects':
            return (
              <DynamicProjectsBlock
                key={`block-${idx}-${block.blockType}`}
                block={block as Record<string, unknown>}
                projects={projects}
              />
            )

          case 'experience':
            return (
              <DynamicExperienceBlock
                key={`block-${idx}-${block.blockType}`}
                block={block as Record<string, unknown>}
                experiences={experiences}
              />
            )

          case 'techStack':
            return (
              <DynamicTechStackBlock
                key={`block-${idx}-${block.blockType}`}
                block={block as Record<string, unknown>}
                skillsGroups={skillsGroups}
              />
            )

          case 'contact':
            return (
              <DynamicContactBlock
                key={`block-${idx}-${block.blockType}`}
                block={block as Record<string, unknown>}
                siteSettings={siteSettings}
              />
            )

          case 'blogFeed':
            return (
              <DynamicBlogFeedBlock
                key={`block-${idx}-${block.blockType}`}
                block={block as Record<string, unknown>}
                posts={posts}
              />
            )

          default:
            return null
        }
      })}
    </div>
  )
}
