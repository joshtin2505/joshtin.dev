import type { Block } from 'payload'
import { blockSettings } from '../fields/blockSettings'

export const AboutBlock: Block = {
  slug: 'about',
  labels: {
    singular: 'Bloque Sobre Mí',
    plural: 'Bloques Sobre Mí',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar sección Sobre Mí',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Prefijo / Eyebrow técnico',
          defaultValue: '01 // PERFIL',
          localized: true,
          admin: { width: '40%' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título de la sección',
          defaultValue: 'Sobre Mí & Trayectoria',
          localized: true,
          admin: { width: '60%' },
        },
      ],
    },
    {
      name: 'showMetrics',
      type: 'checkbox',
      defaultValue: true,
      label: 'Mostrar métricas numéricas con animación CountUp',
    },
    blockSettings,
  ],
}
