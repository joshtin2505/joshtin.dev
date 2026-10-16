import type { Field } from 'payload'

export const blockSettings: Field = {
  name: 'blockSettings',
  type: 'group',
  label: 'Ajustes de Diseño del Bloque',
  admin: {
    description: 'Personaliza el espaciado, fondo y estilo de presentación para este bloque.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'spacing',
          type: 'select',
          enumName: 'block_spacing_size',
          label: 'Espaciado Vertical',
          options: [
            { label: 'Compacto (py-10)', value: 'compact' },
            { label: 'Normal (py-16)', value: 'normal' },
            { label: 'Espacioso (py-24)', value: 'spacious' },
          ],
          defaultValue: 'normal',
          admin: { width: '33%' },
        },
        {
          name: 'backgroundVariant',
          type: 'select',
          enumName: 'block_bg_variant',
          label: 'Fondo Visual',
          options: [
            { label: 'Por Defecto (Limpio)', value: 'default' },
            { label: 'Retícula Tech (Grid)', value: 'grid' },
            { label: 'Puntos Sutiles (Dots)', value: 'dots' },
            { label: 'Glow Neón Ambiental', value: 'glow' },
          ],
          defaultValue: 'default',
          admin: { width: '33%' },
        },
        {
          name: 'anchorId',
          type: 'text',
          label: 'ID de Ancla (ej: proyectos, contacto)',
          admin: { width: '34%' },
        },
      ],
    },
  ],
}
