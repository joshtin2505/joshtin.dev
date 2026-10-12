# Especificación de Diseño: Integración de Payload CMS 3 + Neon Postgres + i18n + Page Builder

- **Fecha**: 2026-10-12
- **Autor / Rol**: Arquitecto de Software & Tech Lead
- **Proyecto**: `joshtin.tech` (Portafolio personal de Justin Castro Perez)
- **Estado**: Propuesta de Diseño Técnico (Brainstorming validado)

---

## 1. Intención y Propósito ("The Why")

Transformar el portafolio actual de un sitio con contenido estático en formato JSON local (`src/mocks/cv.json`) a una plataforma web dinámica, autogestionable y modular de nivel empresarial impulsada por **Payload CMS 3** y **Neon Database (Serverless Postgres)**.

### Objetivos Clave
1. **Experiencia No-Code / Low-Code**: Permitir a Justin crear, editar, reordenar y publicar secciones completas de la página de inicio (Home Page Builder con Bloques) sin tocar el código fuente.
2. **Internacionalización Dinámica (i18n)**: Soporte bilingüe completo (`es` por defecto, `en` alternativo) administrado campo por campo desde el panel administrativo de Payload.
3. **Blog Técnico de Experiencias y Proyectos**: Nueva sección dedicada en `/blog` y `/blog/[slug]` para publicar artículos técnicos, case studies y lecciones aprendidas con editor RichText Lexical y gestión de borradores (`drafts`).
4. **Sincronización Total Home y CV**: Tanto la página principal como `/curriculum` consumirán la misma fuente de verdad en base de datos.
5. **Cero Pérdida de Datos**: Migración transparente del contenido actual de `src/mocks/cv.json` mediante un script de *Seed* automatizado.

---

## 2. Metas, No-Metas y Anti-Metas

### Metas (Goals)
- [x] Integrar Payload CMS 3 de forma nativa en Next.js 15 App Router utilizando la arquitectura recomendada de grupos de rutas: `src/app/(frontend)` para la web pública y `src/app/(payload)` para el panel de control `/admin` y endpoints de API.
- [x] Conectar la base de datos Serverless Postgres en Neon mediante `@payloadcms/db-postgres` con soporte de connection pooling y SSL.
- [x] Implementar un Page Builder en la Home utilizando el campo `blocks` de Payload, permitiendo drag-and-drop para reordenar bloques (`HeroBlock`, `ExperienceBlock`, `ProjectsBlock`, `TechStackBlock`, `BlogBlock`, `ContactBlock`).
- [x] Crear una colección de `Posts` (Blog) con autogeneración de slugs, estados de publicación (`draft` / `published`), tags y tiempo estimado de lectura.
- [x] Diseñar un selector de idioma (ES / EN) en el Navbar del frontend y adaptar las consultas para respetar el idioma activo.
- [x] Mantener compatibilidad con WCAG 2.2 AA y rendimiento óptimo en Vercel con Server Components.

### No-Metas (Non-Goals)
- No se implementará pasarela de pagos ni e-commerce.
- No se expondrá el panel de control a usuarios externos (acceso exclusivo para Justin con autenticación segura en la colección `Users`).
- No se reescribirá la estética visual ya aprobada (Bento Grid minimalista); los bloques del CMS alimentarán los componentes de diseño existentes.

### Anti-Metas (Anti-Goals)
- **Cero contenido en español quemado en código duro**: Ningún texto público de la biografía o proyectos quedará fijado en TSX; todo debe ser editable y traducible en el CMS.
- **Cero secretos en el repositorio**: `DATABASE_URI` y `PAYLOAD_SECRET` residirán únicamente en `.env.local` y variables de entorno de Vercel.
- **Cero caídas en desarrollo local**: Si la base de datos no está configurada temporalmente, el frontend debe soportar un modo fallback elegante hacia los mocks para no bloquear el desarrollo.

---

## 3. Restricciones Técnicas

1. **Stack**: Next.js 15.5.x (App Router), React 19, TypeScript estricto, Tailwind CSS v4.
2. **CMS**: Payload CMS 3.x (`payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `@payloadcms/ui`).
3. **Base de Datos**: Neon Database (PostgreSQL serverless con connection pooler `?sslmode=require`).
4. **Hosting**: Vercel (despliegue serverless, Next.js Server Components, Server Actions).
5. **Privacidad**: Prohibido incluir números de teléfono en metadatos, Schema.org o esquemas públicos del CMS.

---

## 4. Arquitectura de Rutas y Estructura de Directorios

Se reorganizará `src/app/` en dos grupos de rutas independientes para garantizar aislamiento total entre el panel de administración y la experiencia pública del usuario:

```
src/
├── app/
│   ├── (frontend)/                      # Rutas públicas del portafolio
│   │   ├── [locale]/                    # Soporte opcional de prefijo i18n (/es, /en) o raíz con cookie/header
│   │   │   ├── page.tsx                 # Home dinámica renderizada vía Page Builder (Blocks)
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx             # Listado de artículos técnicos
│   │   │   │   └── [slug]/page.tsx      # Detalle de artículo en RichText Lexical
│   │   │   └── curriculum/page.tsx      # CV generado desde las mismas colecciones
│   │   ├── layout.tsx                   # Layout global frontend (Navbar, Footer, Providers)
│   │   ├── robots.ts                    # SEO Robots
│   │   └── sitemap.ts                   # Sitemap dinámico alimentado por proyectos y blog
│   │
│   ├── (payload)/                       # Rutas administrativas y API del CMS
│   │   ├── admin/[[...segments]]/page.tsx # Panel de control de Payload
│   │   ├── api/[...slug]/route.ts       # REST & GraphQL endpoints nativos de Payload
│   │   ├── layout.tsx                   # Layout de Payload con estilos admin
│   │   └── custom.scss                  # Personalización de marca del admin
│   │
├── collections/                         # Esquemas de colecciones de Payload
│   ├── Users.ts                         # Administrador
│   ├── Media.ts                         # Imágenes, capturas de proyectos, avatares
│   ├── Projects.ts                      # Proyectos destacados y catálogo general
│   ├── Experiences.ts                   # Trayectoria laboral y logros
│   ├── Skills.ts                        # Tecnologías y categorías
│   └── Posts.ts                         # Artículos del blog
│
├── globals/                             # Datos globales del sitio
│   ├── Profile.ts                       # Bio, título, disponibilidad laboral, redes
│   └── HomePage.ts                      # Page Builder: Bloques reordenables de la Home
│
├── blocks/                              # Definición de bloques para el Page Builder
│   ├── HeroBlock.ts
│   ├── ProjectsBlock.ts
│   ├── ExperienceBlock.ts
│   ├── TechStackBlock.ts
│   ├── BlogFeedBlock.ts
│   └── ContactBlock.ts
│
├── payload.config.ts                    # Configuración central de Payload
└── scripts/
    └── seed.ts                          # Script de migración inicial desde cv.json
```

---

## 5. Modelado de Datos y Colecciones

### 5.1 Internacionalización (`localization`)
Configuración en `payload.config.ts`:
```ts
localization: {
  locales: [
    { label: 'Español', code: 'es' },
    { label: 'English', code: 'en' },
  ],
  defaultLocale: 'es',
  fallback: true,
}
```

### 5.2 Colección `Projects` (`slug: 'projects'`)
- `title` (text, required, `localized: true`)
- `slug` (slug nativo de Payload, `useAsSlug: 'title'`)
- `summary` (textarea, required, `localized: true`) — Descripción concisa para las tarjetas
- `description` (richText Lexical, `localized: true`) — Case study detallado
- `featured` (checkbox, default: false, admin.position: 'sidebar') — Para destacar en el Bento Grid
- `order` (number, admin.position: 'sidebar') — Orden prioritario manual
- `techStack` (relationship to `Skills`, hasMany: true)
- `links` (group):
  - `liveUrl` (text)
  - `githubUrl` (text)
  - `docsUrl` (text)
- `coverImage` (upload relation to `Media`, required: true)
- `gallery` (array de uploads a `Media`)
- `versions: { drafts: true }` — Flujo de publicación borrador/publicado.

### 5.3 Colección `Experiences` (`slug: 'experiences'`)
- `company` (text, required)
- `role` (text, required, `localized: true`)
- `startDate` (date, required)
- `endDate` (date)
- `isCurrent` (checkbox, default: false)
- `summary` (textarea, `localized: true`)
- `achievements` (array con campo text `item`, `localized: true`) — Viñetas de impacto cuantificable
- `techStack` (relationship to `Skills`, hasMany: true)
- `companyUrl` (text)
- `order` (number, default: 0)

### 5.4 Colección `Skills` (`slug: 'skills'`)
- `name` (text, required, unique: true)
- `category` (select: `frontend`, `backend`, `cloud-devops`, `tools`, `mobile`)
- `iconKey` (text) — Identificador de Lucide Icon o SimpleIcon
- `proficiency` (select: `core`, `advanced`, `familiar`)

### 5.5 Colección `Posts` (`slug: 'posts'`)
- `title` (text, required, `localized: true`)
- `slug` (slug nativo de Payload, `useAsSlug: 'title'`)
- `publishedAt` (date, admin.position: 'sidebar')
- `excerpt` (textarea, required, `localized: true`) — Resumen para tarjetas y meta description
- `content` (richText Lexical, required, `localized: true`)
- `coverImage` (upload relation to `Media`)
- `tags` (array de texts)
- `readTime` (number, virtual/calculado o manual en minutos)
- `versions: { drafts: true }`

### 5.6 Global `Profile` (`slug: 'profile'`)
- `fullName` (text, required)
- `jobTitle` (text, required, `localized: true`)
- `shortBio` (textarea, required, `localized: true`)
- `fullBio` (richText Lexical, `localized: true`)
- `availability` (select: `open_to_work`, `freelance_only`, `employed_not_looking`)
- `location` (text)
- `email` (text, required)
- `socialLinks` (array: `network`, `url`)
- `avatar` (upload relation to `Media`)

### 5.7 Global `HomePage` (`slug: 'home-page'`)
- `layout` (blocks: `HeroBlock`, `ExperienceBlock`, `ProjectsBlock`, `TechStackBlock`, `BlogFeedBlock`, `ContactBlock`).
  - Cada bloque contiene propiedades de configuración:
    - `enabled` (boolean)
    - `customTitle` (text, `localized: true`)
    - `customSubtitle` (text, `localized: true`)
    - `itemLimit` (number, ej. mostrar 4 o 6 proyectos)

---

## 6. Estrategia de Migración y Seed

1. **Extracción**: Creación del script `src/scripts/seed.ts` utilizando la API local de Payload (`payload.create`).
2. **Mapeo**:
   - `cv.json -> basics` mapea a `Profile` global.
   - `cv.json -> projects` mapea a `Projects` con relaciones a `Skills`.
   - `cv.json -> experience` mapea a `Experiences`.
   - `cv.json -> skills` mapea a `Skills`.
3. **Ejecución idempotente**: El script comprueba si ya existen registros antes de insertar para no duplicar datos si se corre múltiples veces.

---

## 7. Almacenamiento de Archivos Multimedia (Media Storage)

Dado que la aplicación se desplegará en **Vercel** (arquitectura serverless con disco efímero de solo lectura en producción):
- **Entorno Local**: Almacenamiento en disco local (`public/media`) para desarrollo ágil y testing sin conexión.
- **Producción (Vercel)**: Adaptador `@payloadcms/storage-vercel-blob` para guardar y servir imágenes, capturas y avatares con CDN global de Vercel de alta velocidad.

---

## 8. Decisiones del Desarrollador (Builder Calls)

1. **Rutas i18n y SEO**: Las rutas canónicas soportarán estructura limpia con `/es` y `/en` (con `/` redirigiendo transparentemente a `/es`), asegurando etiquetas `hreflang` y metadatos OpenGraph independientes para máxima visibilidad en motores de búsqueda.
2. **Resiliencia Local**: Si la variable `DATABASE_URI` aún no está presente en `.env.local`, el frontend activará un modo fallback leyendo `src/mocks/cv.json` para que el desarrollador pueda seguir trabajando en la UI sin bloqueos.
3. **Renderizado de Artículos Lexical**: Se configurará un componente conversor de Lexical a JSX enriquecido con clases utilitarias de Tailwind Typography (`prose prose-invert max-w-none`) para una lectura tipográfica premium.

