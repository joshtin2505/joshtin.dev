import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Bloque Hero',
    plural: 'Bloques Hero',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar sección Hero',
    },
    {
      name: 'greeting',
      type: 'text',
      localized: true,
      defaultValue: 'Hola, soy',
    },
    {
      name: 'headline',
      type: 'text',
      localized: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'showAvailabilityBadge',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar badge de disponibilidad laboral',
    },
    {
      name: 'showContactCta',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar botón de contacto rápido',
    },
    {
      name: 'showCvCta',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar botón de ver CV',
    },
  ],
}
