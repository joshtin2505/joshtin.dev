import type { Block } from 'payload'
import { blockSettings } from '../fields/blockSettings'

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
      type: 'row',
      fields: [
        {
          name: 'greeting',
          type: 'text',
          localized: true,
          defaultValue: 'Hola, soy',
          admin: { width: '50%' },
        },
        {
          name: 'variant',
          type: 'select',
          enumName: 'hero_block_variant',
          label: 'Variante de Layout',
          options: [
            { label: 'Split Asimétrico (Senior Dev + 3D Avatar)', value: 'split' },
            { label: 'Centrado Editorial', value: 'centered' },
            { label: 'Terminal / Minimal Blueprint', value: 'terminal' },
          ],
          defaultValue: 'split',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'headline',
      type: 'text',
      localized: true,
      label: 'Titular de impacto (Opcional, sobreescribe nombre)',
    },
    {
      name: 'subheadline',
      type: 'textarea',
      localized: true,
      label: 'Subtítulo / Pitch descriptivo',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showAvailabilityBadge',
          type: 'checkbox',
          defaultValue: true,
          label: 'Mostrar badge de disponibilidad',
          admin: { width: '33%' },
        },
        {
          name: 'showContactCta',
          type: 'checkbox',
          defaultValue: true,
          label: 'Mostrar botón de contacto',
          admin: { width: '33%' },
        },
        {
          name: 'showCvCta',
          type: 'checkbox',
          defaultValue: true,
          label: 'Mostrar botón de CV',
          admin: { width: '34%' },
        },
      ],
    },
    blockSettings,
  ],
}
