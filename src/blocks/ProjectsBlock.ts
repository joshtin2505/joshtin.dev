import type { Block } from 'payload'
import { blockSettings } from '../fields/blockSettings'

export const ProjectsBlock: Block = {
  slug: 'projects',
  labels: {
    singular: 'Bloque Proyectos',
    plural: 'Bloques Proyectos',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar sección de Proyectos',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Prefijo técnico',
          defaultValue: '02 // PROYECTOS SELECCIONADOS',
          localized: true,
          admin: { width: '40%' },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Proyectos Destacados',
          admin: { width: '60%' },
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      defaultValue: 'Selección de aplicaciones web, herramientas y productos desarrollados con foco en rendimiento, escalabilidad y experiencia de usuario.',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'limit',
          type: 'number',
          label: 'Cantidad máxima de proyectos a mostrar',
          defaultValue: 6,
          admin: { width: '50%' },
        },
        {
          name: 'onlyFeatured',
          type: 'checkbox',
          defaultValue: true,
          label: 'Mostrar solo proyectos destacados',
          admin: { width: '50%' },
        },
      ],
    },
    blockSettings,
  ],
}
