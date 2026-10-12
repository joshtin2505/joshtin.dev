import type { Block } from 'payload'

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
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Proyectos Destacados',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Cantidad máxima de proyectos a mostrar',
      defaultValue: 6,
    },
    {
      name: 'onlyFeatured',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar solo proyectos marcados como destacados',
    },
  ],
}
