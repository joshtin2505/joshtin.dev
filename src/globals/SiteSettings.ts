import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  dbName: 'site_settings',
  label: 'Configuración General (Site Settings)',
  admin: {
    group: 'Configuración',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ------------------ TAB 1: IDENTIDAD ------------------
        {
          label: 'Identidad & Hero',
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
              defaultValue:
                'Especialista en desarrollo web moderno, arquitectura de interfaces accesibles y aplicaciones de alto rendimiento.',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'availability',
                  type: 'select',
                  enumName: 'site_availability_status',
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
              label: 'Skills destacadas en Hero',
            },
            {
              name: 'aboutTitle',
              type: 'text',
              label: 'Título de sección Sobre Mí',
              defaultValue: 'Sobre Mí',
              localized: true,
            },
            {
              name: 'fullBio',
              type: 'richText',
              label: 'Biografía extendida / Historia profesional',
              localized: true,
            },
          ],
        },

        // ------------------ TAB 2: MÉTRICAS ------------------
        {
          label: 'Métricas & Logros',
          fields: [
            {
              name: 'metrics',
              type: 'array',
              label: 'Métricas / Logros destacados',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      label: 'Cifra / Valor (ej: +3, 15+)',
                      required: true,
                      admin: { width: '30%' },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Descripción de la métrica',
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

        // ------------------ TAB 3: REDES & CONTACTO ------------------
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
                      enumName: 'site_social_network',
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
              label: 'Archivo PDF del CV (Documento para descarga)',
            },
          ],
        },

        // ------------------ TAB 4: APARIENCIA & MOTION ------------------
        {
          label: 'Apariencia & Motion',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'accentColor',
                  type: 'text',
                  label: 'Color de acento primario (Hex)',
                  defaultValue: '#10B981',
                  admin: { width: '50%' },
                },
                {
                  name: 'motionIntensity',
                  type: 'select',
                  enumName: 'site_motion_intensity',
                  label: 'Intensidad de Animaciones',
                  options: [
                    { label: 'Sutil (Predeterminado para ingeniería)', value: 'subtle' },
                    { label: 'Expresiva (Más dinámica y reactiva)', value: 'expressive' },
                    { label: 'Reducida (Mínimo movimiento)', value: 'reduced' },
                  ],
                  defaultValue: 'subtle',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
