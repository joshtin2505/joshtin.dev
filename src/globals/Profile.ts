import type { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      defaultValue: 'Justin Castro Perez',
    },
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Software Developer & Frontend Engineer',
    },
    {
      name: 'shortBio',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'fullBio',
      type: 'richText',
      localized: true,
    },
    {
      name: 'availability',
      type: 'select',
      options: [
        { label: 'Disponible para oportunidades laborales / empleo', value: 'open_to_work' },
        { label: 'Disponible para proyectos freelance', value: 'freelance_only' },
        { label: 'No disponible actualmente', value: 'not_looking' },
      ],
      defaultValue: 'open_to_work',
      admin: {
        description: 'Estado del badge público en el Hero',
      },
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Colombia',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      defaultValue: 'justin.castro.p@gmail.com',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes sociales y enlaces profesionales',
      fields: [
        {
          name: 'network',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'username',
          type: 'text',
        },
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
