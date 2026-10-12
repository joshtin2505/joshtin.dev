import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', '_status', 'order'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Descripción concisa para tarjetas y metadatos SEO',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Case study detallado del proyecto con arquitectura y retos superados',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacar en la página de inicio (Bento Grid)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
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
    {
      name: 'techStack',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      label: 'Stack tecnológico',
    },
    {
      name: 'liveUrl',
      type: 'text',
      admin: {
        description: 'URL de la aplicación en producción (demo en vivo)',
      },
    },
    {
      name: 'githubUrl',
      type: 'text',
      admin: {
        description: 'URL del repositorio en GitHub',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Captura o imagen de portada principal',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galería de capturas adicionales',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
