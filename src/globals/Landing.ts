import type { GlobalConfig } from 'payload'

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: 'Landing Page & Portafolio',
  admin: {
    group: 'Contenido Principal',
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/`
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
      type: 'tabs',
      tabs: [
        // ------------------ TAB 1: HERO ------------------
        {
          label: 'Hero',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'greeting',
                  type: 'text',
                  label: 'Saludo inicial',
                  defaultValue: 'Hola, soy',
                  localized: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'fullName',
                  type: 'text',
                  label: 'Nombre Completo',
                  defaultValue: 'Justin Castro Perez',
                  required: true,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'jobTitle',
              type: 'text',
              label: 'Título profesional / Rol',
              defaultValue: 'Software Developer & Frontend Engineer',
              required: true,
              localized: true,
            },
            {
              name: 'shortBio',
              type: 'textarea',
              label: 'Bio corta / Pitch principal',
              required: true,
              localized: true,
              defaultValue: 'Especialista en desarrollo web moderno, arquitectura de interfaces accesibles y aplicaciones de alto rendimiento.',
              admin: {
                description: 'Texto de impacto que acompaña al titular en el Hero.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'availability',
                  type: 'select',
                  label: 'Disponibilidad laboral',
                  options: [
                    { label: 'Disponible para entrevistas y contratación', value: 'open_to_work' },
                    { label: 'Disponible para proyectos freelance', value: 'freelance_only' },
                    { label: 'No disponible actualmente', value: 'not_looking' },
                  ],
                  defaultValue: 'open_to_work',
                  admin: { width: '50%' },
                },
                {
                  name: 'location',
                  type: 'text',
                  label: 'Ubicación',
                  defaultValue: 'Colombia',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              label: 'Foto de perfil / Avatar',
            },
            {
              name: 'heroSkills',
              type: 'relationship',
              relationTo: 'skills',
              hasMany: true,
              label: 'Skills destacadas en Hero (Badge pill/Marquee)',
              admin: {
                description: 'Selecciona las 4-6 tecnologías insignia para mostrar inmediatamente en el Hero.',
              },
            },
          ],
        },

        // ------------------ TAB 2: SOBRE MÍ ------------------
        {
          label: 'Sobre Mí',
          fields: [
            {
              name: 'aboutTitle',
              type: 'text',
              label: 'Título de la sección',
              defaultValue: 'Sobre Mí',
              localized: true,
            },
            {
              name: 'fullBio',
              type: 'richText',
              label: 'Biografía extendida / Historia profesional',
              localized: true,
            },
            {
              name: 'metrics',
              type: 'array',
              label: 'Métricas / Logros destacados',
              admin: {
                description: 'Estadísticas clave (ej: "+3 Años de experiencia", "15+ Proyectos completados").',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      label: 'Cifra / Valor',
                      required: true,
                      admin: { width: '30%' },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Descripción',
                      required: true,
                      localized: true,
                      admin: { width: '70%' },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ------------------ TAB 3: CONTROL DE SECCIONES ------------------
        {
          label: 'Secciones & Layout',
          fields: [
            {
              name: 'sectionsConfig',
              type: 'group',
              label: 'Visibilidad y Ajustes de Secciones',
              fields: [
                // Proyectos
                {
                  name: 'projectsSection',
                  type: 'group',
                  label: 'Sección de Proyectos',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      label: 'Mostrar sección de Proyectos',
                      defaultValue: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Título de la sección',
                      defaultValue: 'Proyectos Destacados',
                      localized: true,
                    },
                    {
                      name: 'subtitle',
                      type: 'textarea',
                      label: 'Subtítulo descriptivo',
                      defaultValue: 'Selección de aplicaciones web, herramientas y productos desarrollados con foco en rendimiento, escalabilidad y experiencia de usuario.',
                      localized: true,
                    },
                    {
                      name: 'selectionMode',
                      type: 'select',
                      label: 'Modo de selección',
                      options: [
                        { label: 'Automático (Proyectos marcados como Destacados)', value: 'featured' },
                        { label: 'Manual (Elegir y ordenar proyectos específicos)', value: 'manual' },
                      ],
                      defaultValue: 'featured',
                    },
                    {
                      name: 'manualProjects',
                      type: 'relationship',
                      relationTo: 'projects',
                      hasMany: true,
                      label: 'Proyectos seleccionados a mano',
                      admin: {
                        condition: (data, siblingData) => siblingData?.selectionMode === 'manual',
                      },
                    },
                    {
                      name: 'limit',
                      type: 'number',
                      label: 'Límite máximo de proyectos a mostrar',
                      defaultValue: 6,
                    },
                  ],
                },
                // Stack Tecnológico
                {
                  name: 'skillsSection',
                  type: 'group',
                  label: 'Sección de Habilidades / Stack',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      label: 'Mostrar sección de Stack Tecnológico',
                      defaultValue: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Título de la sección',
                      defaultValue: 'Stack Tecnológico & Herramientas',
                      localized: true,
                    },
                    {
                      name: 'subtitle',
                      type: 'textarea',
                      label: 'Subtítulo descriptivo',
                      defaultValue: 'Tecnologías y herramientas que utilizo activamente en producción para diseñar, construir y desplegar software.',
                      localized: true,
                    },
                    {
                      name: 'displayMode',
                      type: 'select',
                      label: 'Formato visual',
                      options: [
                        { label: 'Agrupado por categorías (Frontend, Backend, etc.)', value: 'categories' },
                        { label: 'Nube interactiva / Tags destacados', value: 'cloud' },
                      ],
                      defaultValue: 'categories',
                    },
                  ],
                },
                // Contacto
                {
                  name: 'contactSection',
                  type: 'group',
                  label: 'Sección de Contacto',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      label: 'Mostrar sección de Contacto',
                      defaultValue: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Título',
                      defaultValue: '¿Tienes un proyecto en mente?',
                      localized: true,
                    },
                    {
                      name: 'callToAction',
                      type: 'textarea',
                      label: 'Mensaje de cierre',
                      defaultValue: 'Estoy disponible para nuevas oportunidades laborales, consultorías y proyectos desafiantes.',
                      localized: true,
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ------------------ TAB 4: REDES & CONTACTO ------------------
        {
          label: 'Redes & Enlaces',
          fields: [
            {
              name: 'email',
              type: 'email',
              label: 'Correo de contacto público',
              defaultValue: 'justin.castro.p@gmail.com',
              required: true,
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Enlaces Sociales y Profesionales',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'network',
                      type: 'select',
                      label: 'Plataforma',
                      options: [
                        { label: 'GitHub', value: 'github' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'X (Twitter)', value: 'twitter' },
                        { label: 'Discord', value: 'discord' },
                        { label: 'Sitio Web / Blog', value: 'website' },
                      ],
                      required: true,
                      admin: { width: '30%' },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: 'URL del perfil',
                      required: true,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'username',
                      type: 'text',
                      label: 'Handle / Usuario (@)',
                      admin: { width: '20%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'cvFile',
              type: 'upload',
              relationTo: 'media',
              label: 'Archivo PDF del CV (Opcional para descarga)',
            },
          ],
        },

        // ------------------ TAB 5: SEO & METADATOS ------------------
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              defaultValue: 'Justin Castro Perez | Software Developer & Frontend Engineer',
              localized: true,
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              defaultValue: 'Portafolio profesional de Justin Castro Perez. Desarrollo aplicaciones web de alto rendimiento con Next.js, TypeScript y Tailwind CSS.',
              localized: true,
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen Open Graph (Share Preview)',
            },
          ],
        },
      ],
    },
  ],
}
