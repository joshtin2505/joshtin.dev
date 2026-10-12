import type { Block } from 'payload'

export const BlogFeedBlock: Block = {
  slug: 'blogFeed',
  labels: {
    singular: 'Bloque Blog / Artículos',
    plural: 'Bloques Blog / Artículos',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar sección de Artículos Recientes',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Artículos y Experiencias',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Cantidad de artículos a mostrar',
      defaultValue: 3,
    },
  ],
}
