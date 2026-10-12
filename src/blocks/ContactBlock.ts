import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Bloque Contacto',
    plural: 'Bloques Contacto',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar sección de Contacto',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: '¿Hablamos?',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      defaultValue: 'Estoy disponible para nuevas oportunidades y proyectos desafiantes.',
    },
  ],
}
