import type { Block } from 'payload'
import { blockSettings } from '../fields/blockSettings'

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
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Prefijo técnico',
          defaultValue: '05 // CONTACTO & LEADS',
          localized: true,
          admin: { width: '40%' },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: '¿Tienes un proyecto en mente?',
          admin: { width: '60%' },
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      defaultValue: 'Estoy disponible para nuevas oportunidades laborales, consultorías de ingeniería frontend y side projects de impacto.',
    },
    {
      name: 'showDirectEmail',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar botón de copiado rápido de correo con toast',
    },
    blockSettings,
  ],
}
