import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'publishedAt'],
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
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Resumen conciso para las tarjetas del blog y meta descripción SEO',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'Contenido completo del artículo con soporte RichText Lexical',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Imagen de portada del artículo',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Etiquetas / Categorías',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'Tiempo de lectura (min)',
      defaultValue: 5,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
