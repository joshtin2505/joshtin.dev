import type { Block } from 'payload'
import { blockSettings } from '../fields/blockSettings'

export const TechStackBlock: Block = {
  slug: 'techStack',
  labels: {
    singular: 'Bloque Stack Tecnológico',
    plural: 'Bloques Stack Tecnológico',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar sección de Stack Tecnológico',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Prefijo técnico',
          defaultValue: '04 // ARSENAL TECNOLÓGICO',
          localized: true,
          admin: { width: '40%' },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Stack & Herramientas',
          admin: { width: '60%' },
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      defaultValue: 'Tecnologías y herramientas que domino y utilizo en producción para construir software confiable y de alta velocidad.',
    },
    blockSettings,
  ],
}
