import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'role', 'startDate', 'isCurrent', 'order'],
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'startDate',
      type: 'text',
      required: true,
      admin: {
        description: 'Fecha o periodo de inicio (ej. 2023-01 o Enero 2023)',
      },
    },
    {
      name: 'endDate',
      type: 'text',
      admin: {
        description: 'Fecha o periodo de finalización',
        condition: (data) => !data?.isCurrent,
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      label: 'Actualmente trabajando aquí',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Descripción concisa de tu rol y responsabilidades',
      },
    },
    {
      name: 'achievements',
      type: 'array',
      label: 'Logros y resultados clave',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'techStack',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      label: 'Tecnologías utilizadas',
    },
    {
      name: 'companyUrl',
      type: 'text',
      admin: {
        description: 'Enlace al sitio web de la empresa',
      },
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
