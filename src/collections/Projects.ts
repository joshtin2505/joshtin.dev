import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Proyecto',
    plural: 'Proyectos',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'techStack', '_status', 'order'],
    group: 'Contenido Principal',
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/#proyectos`
      },
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título del Proyecto',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
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
      label: 'Resumen corto (Pitch)',
      required: true,
      localized: true,
      admin: {
        description: 'Descripción concisa para tarjetas y metadatos SEO',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Case Study detallado',
      localized: true,
      admin: {
        description: 'Case study detallado del proyecto con arquitectura y retos superados',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de portada',
      admin: {
        description: 'Captura o imagen de portada principal',
      },
    },
    {
      name: 'techStack',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      label: 'Stack tecnológico',
      admin: {
        description: 'Tecnologías y herramientas clave utilizadas en este proyecto',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'liveUrl',
          type: 'text',
          label: 'URL Demo en Vivo',
          admin: {
            width: '50%',
            description: 'URL de la aplicación en producción',
          },
        },
        {
          name: 'githubUrl',
          type: 'text',
          label: 'URL Repositorio GitHub',
          admin: {
            width: '50%',
            description: 'URL del repositorio de código',
          },
        },
      ],
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
      label: 'Orden de aparición',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
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
          label: 'Pie de foto / Descripción',
          localized: true,
        },
      ],
    },
  ],
}
