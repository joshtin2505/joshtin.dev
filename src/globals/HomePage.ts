import type { GlobalConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { ProjectsBlock } from '../blocks/ProjectsBlock'
import { ExperienceBlock } from '../blocks/ExperienceBlock'
import { TechStackBlock } from '../blocks/TechStackBlock'
import { BlogFeedBlock } from '../blocks/BlogFeedBlock'
import { ContactBlock } from '../blocks/ContactBlock'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Página de Inicio (Page Builder)',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Bloques y Orden de la Página de Inicio',
      blocks: [
        HeroBlock,
        ProjectsBlock,
        ExperienceBlock,
        TechStackBlock,
        BlogFeedBlock,
        ContactBlock,
      ],
      admin: {
        description: 'Arrastra y reordena los bloques visuales para personalizar el portafolio',
      },
    },
  ],
}
