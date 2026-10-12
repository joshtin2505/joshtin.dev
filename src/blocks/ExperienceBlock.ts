import type { Block } from 'payload'

export const ExperienceBlock: Block = {
  slug: 'experience',
  labels: {
    singular: 'Bloque Experiencia',
    plural: 'Bloques Experiencia',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar sección de Experiencia',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Experiencia Laboral',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Cantidad máxima de experiencias a mostrar',
      defaultValue: 5,
    },
  ],
}
