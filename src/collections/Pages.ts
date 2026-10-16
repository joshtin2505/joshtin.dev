import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { AboutBlock } from '../blocks/AboutBlock'
import { ProjectsBlock } from '../blocks/ProjectsBlock'
import { ExperienceBlock } from '../blocks/ExperienceBlock'
import { TechStackBlock } from '../blocks/TechStackBlock'
import { ContactBlock } from '../blocks/ContactBlock'
import { BlogFeedBlock } from '../blocks/BlogFeedBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Página',
    plural: 'Páginas (Page Builder)',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Contenido',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        if (data.slug === 'home' || data.slug === 'inicio') {
          return `${baseUrl}/`
        }
        return `${baseUrl}/${data.slug}`
      },
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título de la Página',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug / Ruta URL (ej: home, sobre-mi, uses)',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Usa "home" para la página de inicio principal.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Bloques y Maquetación Visual',
      blocks: [
        HeroBlock,
        AboutBlock,
        ProjectsBlock,
        ExperienceBlock,
        TechStackBlock,
        ContactBlock,
        BlogFeedBlock,
      ],
      admin: {
        description: 'Arrastra y reordena los bloques para componer la página libremente.',
      },
    },
  ],
}
