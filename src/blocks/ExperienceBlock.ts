import type { Block } from 'payload'
import { blockSettings } from '../fields/blockSettings'

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
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Prefijo técnico',
          defaultValue: '03 // TRAYECTORIA PROFESIONAL',
          localized: true,
          admin: { width: '40%' },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Experiencia Laboral',
          admin: { width: '60%' },
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      defaultValue: 'Impacto en desarrollo de software, arquitectura de interfaces escalables y consultoría tecnológica.',
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Cantidad máxima de experiencias a mostrar',
      defaultValue: 5,
    },
    blockSettings,
  ],
}
