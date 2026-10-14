'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import type { LandingData, ProjectItem, SkillCategoryGroup } from '@/lib/payload/queries'
import { DynamicHeroBlock } from '@/components/Home/blocks/DynamicHeroBlock'
import { DynamicProjectsBlock } from '@/components/Home/blocks/DynamicProjectsBlock'
import { DynamicTechStackBlock } from '@/components/Home/blocks/DynamicTechStackBlock'
import { DynamicContactBlock } from '@/components/Home/blocks/DynamicContactBlock'

interface LandingClientProps {
  initialLanding: LandingData
  initialProjects: ProjectItem[]
  initialSkills: SkillCategoryGroup[]
}

export function LandingClient({
  initialLanding,
  initialProjects,
  initialSkills,
}: LandingClientProps) {
  const { data: landing } = useLivePreview<LandingData>({
    initialData: initialLanding,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  const sections = landing?.sectionsConfig

  // Determinar qué proyectos mostrar según el modo seleccionado en Payload (manual vs automático)
  const projectsToDisplay = React.useMemo(() => {
    const projConfig = sections?.projectsSection
    if (
      projConfig?.selectionMode === 'manual' &&
      Array.isArray(projConfig.manualProjects) &&
      projConfig.manualProjects.length > 0
    ) {
      return projConfig.manualProjects
    }
    const limit = projConfig?.limit || 6
    return initialProjects.slice(0, limit)
  }, [sections, initialProjects])

  return (
    <div className="flex flex-col gap-12 md:gap-20">
      {/* 1. HERO */}
      <DynamicHeroBlock landing={landing} />

      {/* 2. PROYECTOS (Visibilidad y textos controlados desde el CMS) */}
      {sections?.projectsSection?.enabled !== false && (
        <DynamicProjectsBlock
          title={sections?.projectsSection?.title}
          subtitle={sections?.projectsSection?.subtitle}
          projects={projectsToDisplay}
        />
      )}

      {/* 3. TECH STACK (Visibilidad y textos controlados desde el CMS) */}
      {sections?.skillsSection?.enabled !== false && (
        <DynamicTechStackBlock
          title={sections?.skillsSection?.title}
          subtitle={sections?.skillsSection?.subtitle}
          skillsGroups={initialSkills}
        />
      )}

      {/* 4. CONTACTO (Visibilidad y textos controlados desde el CMS) */}
      {sections?.contactSection?.enabled !== false && (
        <DynamicContactBlock
          title={sections?.contactSection?.title}
          callToAction={sections?.contactSection?.callToAction}
          email={landing?.email}
          location={landing?.location}
        />
      )}
    </div>
  )
}
