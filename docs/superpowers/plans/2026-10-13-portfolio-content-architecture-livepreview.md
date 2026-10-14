# Plan de Implementación: Arquitectura de Contenido Centralizada y Live Preview en Payload CMS 3

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactorizar la arquitectura de contenido de Payload CMS 3 centralizando la configuración de la Landing Page en un único Global estructurado por pestañas (`Landing.ts`), conectando una colección canónica de `Skills` con `Projects` mediante relaciones `hasMany`, y habilitando Live Preview en tiempo real con `@payloadcms/live-preview-react` en Next.js App Router.

**Architecture:** 
1. Unificar los antiguos globals fragmentados (`Profile` y `HomePage`) en un único Global reactivo `Landing.ts` con pestañas (`Hero`, `Sobre Mí`, `Secciones & Layout`, `Redes & Enlaces`, `SEO`) y borradores con `autosave`.
2. Modelar la colección `Skills.ts` como catálogo maestro de tecnologías (categorías, icono, nivel, badge destacado) y relacionarla con `Projects.ts` (`techStack`, `hasMany`) y con `Landing.ts` (`heroSkills`).
3. Instalar `@payloadcms/live-preview-react` y crear el componente cliente `LandingClient.tsx` que consume el hook `useLivePreview` para actualizar instantáneamente el DOM en el iframe de administración sin recargar la página.
4. Mantener resiliencia total en `src/lib/payload/queries.ts` con fallback automático a `cv.json` cuando la base de datos esté vacía o en proceso de seeding.

**Tech Stack:** Next.js 15 App Router, Payload CMS 3.90+, `@payloadcms/live-preview-react`, TypeScript (strict), Tailwind CSS v4, Lucide Icons.

**Spec:** Requerimiento del usuario para simplificar el panel de administración, eliminar dispersión de bloques estáticos, estructurar relaciones de skills/proyectos y habilitar Live Preview en tiempo real.

## Global Constraints

- Gestor de paquetes: `pnpm` exclusivamente.
- No alterar ni borrar experiencia laboral, datos ni certificaciones reales de Justin.
- Respetar WCAG 2.2 AA: sin elementos interactivos anidados (`<button>` dentro de `<a>` o viceversa), con nombres accesibles (`aria-label`).
- Mantener compatibilidad con Server Components de Next.js (`'use client'` solo en el wrapper de Live Preview).
- Toda consulta con relaciones debe especificar `depth: 2` para poblar objetos de `skills` e imágenes de `media`.
- Cada tarea debe verificar tipos con `pnpm exec tsc --noEmit` y lint con `pnpm lint`.

## Review Focus

1. **Campos vacíos o incompletos en Payload:** Si el usuario crea un borrador nuevo con campos opcionales sin llenar, el frontend no debe crashear; usar encadenamiento opcional defensivo (`landing?.sectionsConfig?.projectsSection?.enabled`).
2. **Profundidad de relación (`depth: 2`):** Si `techStack` se resuelve solo como IDs de strings en lugar de objetos `{ name, category }`, los badges de skills deben manejar ambos casos sin romperse.
3. **Múltiples idiomas (i18n):** Payload tiene configurado `locales: ['es', 'en']`; los campos con `localized: true` deben resolverse con el fallback configurado en `payload.config.ts`.
4. **URL de Live Preview en entornos locales y producción:** La función `url` debe usar `process.env.NEXT_PUBLIC_SERVER_URL` con fallback a `http://localhost:3000`.
5. **No romper la compilación durante la migración:** Actualizar las consultas y tipos de forma coordinada para que `pnpm build` mantenga código de salida 0.

---

### Task 1: Instalar dependencia oficial `@payloadcms/live-preview-react`

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `@payloadcms/live-preview-react` en `dependencies`

- [ ] **Step 1: Instalar el paquete con pnpm**
```bash
pnpm add @payloadcms/live-preview-react@^3.90.2
```

- [ ] **Step 2: Verificar la instalación en package.json y compilar tipos**
```bash
pnpm exec tsc --noEmit
```

- [ ] **Step 3: Commit**
```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add @payloadcms/live-preview-react dependency"
```

---

### Task 2: Refactorizar colecciones `Skills.ts` y `Projects.ts` con relaciones y campos nativos

**Files:**
- Modify: `src/collections/Skills.ts`
- Modify: `src/collections/Projects.ts`

**Interfaces:**
- `Skills`: Colección slug `'skills'`, `useAsTitle: 'name'`, campos: `name`, `category`, `iconKey`, `proficiency`, `featured`, `order`.
- `Projects`: Colección slug `'projects'`, campo `slug` de tipo nativo `slug` con `useAsSlug: 'title'`, relación `techStack` (`hasMany: true`, `relationTo: 'skills'`), `versions: { drafts: { autosave: true } }`, `livePreview`.

- [ ] **Step 1: Actualizar `src/collections/Skills.ts` con grupos de administración y metadatos**
Asegurar que `Skills` tenga `group: 'Taxonomía'`, `useAsTitle: 'name'`, y campos ordenables.

- [ ] **Step 2: Actualizar `src/collections/Projects.ts` con slug nativo, drafts con autosave y relación hasMany a skills**
Configurar `useAsSlug: 'title'`, `techStack` con `relationTo: 'skills'`, y `admin.livePreview`.

- [ ] **Step 3: Verificar tipos**
```bash
pnpm exec tsc --noEmit
```

- [ ] **Step 4: Commit**
```bash
git add src/collections/Skills.ts src/collections/Projects.ts
git commit -m "feat(payload): update Skills and Projects collections with relationships and drafts"
```

---

### Task 3: Crear el Global centralizado `Landing.ts` y registrarlo en `payload.config.ts`

**Files:**
- Create: `src/globals/Landing.ts`
- Modify: `src/payload.config.ts`

**Interfaces:**
- Produces: Global `'landing'` con tabs (`Hero`, `Sobre Mí`, `Secciones & Layout`, `Redes & Enlaces`, `SEO`), `versions: { drafts: { autosave: true } }`, `admin.livePreview.url`.
- Configures: `admin.livePreview.breakpoints` en `src/payload.config.ts`.

- [ ] **Step 1: Crear `src/globals/Landing.ts` con estructura completa de pestañas**
Implementar pestañas: Hero (greeting, fullName, jobTitle, shortBio, availability, location, avatar, heroSkills), Sobre Mí (fullBio, metrics), Secciones & Layout (toggles de proyectos, skills, contacto), Redes & Contacto (email, socialLinks, cvFile), SEO (metaTitle, metaDescription, ogImage).

- [ ] **Step 2: Registrar `Landing` y breakpoints en `src/payload.config.ts`**
Importar `Landing`, agregarlo al array `globals` (reemplazando o conviviendo con Profile/HomePage para transición segura) y configurar `admin.livePreview.breakpoints`.

- [ ] **Step 3: Verificar tipos y validación de configuración de Payload**
```bash
pnpm exec tsc --noEmit
```

- [ ] **Step 4: Commit**
```bash
git add src/globals/Landing.ts src/payload.config.ts
git commit -m "feat(payload): create unified Landing global with tabs and live preview breakpoints"
```

---

### Task 4: Actualizar capa de datos y fallback en `src/lib/payload/queries.ts`

**Files:**
- Modify: `src/lib/payload/queries.ts`

**Interfaces:**
- Produces: `getLandingData(locale: Locale = 'es'): Promise<LandingData>`
- Produces: `getProjectsData(locale: Locale = 'es', limit?: number, onlyFeatured?: boolean): Promise<ProjectItem[]>` (con soporte de skills pobladas)
- Produces: `getSkillsData(): Promise<SkillCategoryGroup[]>`
- Mantiene compatibilidad con `cv.json` como fallback ante ausencia de base de datos.

- [ ] **Step 1: Agregar tipo `LandingData` y función `getLandingData` con fallback resiliente**
Definir interfaz TypeScript para `LandingData` basada en el esquema del Global `Landing`. Implementar `getLandingData` que consulta `findGlobal({ slug: 'landing', depth: 2 })` y, si no hay datos o falla la conexión, retorna el contenido fallback desde `cv.json`.

- [ ] **Step 2: Adaptar `getProjectsData` para mapear relaciones de `techStack` como objetos o strings**
Extraer correctamente el nombre e icono de cada skill poblada (`s.name`).

- [ ] **Step 3: Verificar tipos y lint**
```bash
pnpm exec tsc --noEmit
pnpm lint
```

- [ ] **Step 4: Commit**
```bash
git add src/lib/payload/queries.ts
git commit -m "feat(data): add getLandingData query with resilient fallback and populated skills"
```

---

### Task 5: Implementar `LandingClient.tsx` con `useLivePreview` y actualizar `page.tsx`

**Files:**
- Create: `src/app/(frontend)/LandingClient.tsx`
- Modify: `src/app/(frontend)/page.tsx`
- Modify: `src/components/Home/blocks/DynamicHeroBlock.tsx` (para aceptar datos del nuevo Global)

**Interfaces:**
- `LandingClient`: Componente cliente que recibe `initialLanding`, `initialProjects`, `initialSkills` y los suscribe a `useLivePreview`.
- `page.tsx`: Server Component que ejecuta las consultas con `depth: 2` y renderiza `LandingClient`.

- [ ] **Step 1: Crear `src/app/(frontend)/LandingClient.tsx`**
Implementar el hook `useLivePreview` de `@payloadcms/live-preview-react` escuchando el Global `landing`. Renderizar de forma condicional y reactiva las secciones: Hero, Proyectos, Tech Stack y Contacto.

- [ ] **Step 2: Actualizar `src/components/Home/blocks/DynamicHeroBlock.tsx`**
Permitir que el bloque reciba las propiedades directas del Global `Landing` (incluyendo `heroSkills` y botones de acción) sin perder accesibilidad ni estilos.

- [ ] **Step 3: Actualizar `src/app/(frontend)/page.tsx`**
Reemplazar la llamada fragmentada por `getLandingData`, `getProjectsData` y `getSkillsData`, pasando los datos iniciales a `<LandingClient />`.

- [ ] **Step 4: Verificar tipos y compilación**
```bash
pnpm exec tsc --noEmit
pnpm lint
```

- [ ] **Step 5: Commit**
```bash
git add src/app/\(frontend\)/LandingClient.tsx src/app/\(frontend\)/page.tsx src/components/Home/blocks/DynamicHeroBlock.tsx
git commit -m "feat(frontend): integrate live preview reactive LandingClient in Next.js"
```

---

### Task 6: Verificación completa de calidad (Definition of Done)

**Files:**
- No file changes, solo ejecución de pruebas y verificación de estándares.

- [ ] **Step 1: Ejecutar verificación estricta de tipos**
```bash
pnpm exec tsc --noEmit
```
Resultado esperado: 0 errores.

- [ ] **Step 2: Ejecutar ESLint**
```bash
pnpm lint
```
Resultado esperado: 0 errores, 0 nuevos warnings.

- [ ] **Step 3: Compilar bundle de producción de Next.js**
```bash
pnpm build
```
Resultado esperado: Salida 0 limpia, páginas estáticas y dinámicas generadas correctamente.

- [ ] **Step 4: Verificación en navegador del Live Preview y la Landing**
Validar que en `http://localhost:3000` la landing renderice correctamente y que en `/admin` el Global `Landing` muestre el botón y panel de Live Preview funcional.
