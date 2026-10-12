import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'proficiency', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Cloud & DevOps', value: 'cloud-devops' },
        { label: 'Herramientas', value: 'tools' },
        { label: 'Móvil', value: 'mobile' },
      ],
      defaultValue: 'frontend',
    },
    {
      name: 'iconKey',
      type: 'text',
      admin: {
        description: 'Identificador del icono (Lucide o SimpleIcon)',
      },
    },
    {
      name: 'proficiency',
      type: 'select',
      options: [
        { label: 'Core / Dominio Principal', value: 'core' },
        { label: 'Avanzado', value: 'advanced' },
        { label: 'Familiar', value: 'familiar' },
      ],
      defaultValue: 'advanced',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
