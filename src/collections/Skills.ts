import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  labels: {
    singular: 'Skill / Tecnología',
    plural: 'Skills',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'proficiency', 'featured', 'order'],
    group: 'Taxonomía',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre de la tecnología',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoría',
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
      label: 'Identificador de icono',
      admin: {
        description: 'Nombre del icono en Lucide (ej: "react", "code", "database") o slug de Simple Icons.',
      },
    },
    {
      name: 'proficiency',
      type: 'select',
      label: 'Nivel de dominio',
      options: [
        { label: 'Core / Dominio Principal', value: 'core' },
        { label: 'Avanzado', value: 'advanced' },
        { label: 'Familiar', value: 'familiar' },
      ],
      defaultValue: 'advanced',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacar en el stack principal del portafolio',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
