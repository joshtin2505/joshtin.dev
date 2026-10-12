import type { Block } from 'payload'

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
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Stack Tecnológico',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
  ],
}
