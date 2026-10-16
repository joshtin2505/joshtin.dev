# Plan de Implementación: Portafolio Híbrido Senior + Animaciones (Motion & GSAP) + Payload CMS

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar el portafolio en una experiencia híbrida de alto nivel (diseñador senior + frontend dev + ingeniero de software) con animaciones fluidas (Motion + GSAP ScrollTrigger) y un CMS desacoplado y modular mediante Payload CMS 3 en Next.js 15.

**Architecture:** Se desacopla la home monolítica de cliente (`LandingClient`) hacia una arquitectura Server-First orientada a bloques dinámicos (`pages` collection + `RenderBlocks`), con un global `SiteSettings` unificado, vista previa de borradores mediante `draftMode()` y plugins oficiales de Payload (SEO, Form Builder, Redirects). Las animaciones se encapsulan en micro-componentes de cliente optimizados que respetan `prefers-reduced-motion` y utilizan GSAP ScrollTrigger para narrativas de scroll (timeline y proyectos) y Motion para gestos y transiciones de estado.

**Tech Stack:** Next.js 15 (App Router, Server Components), Payload CMS 3, Neon Database (Postgres), Motion for React (`motion`), GSAP + ScrollTrigger, Tailwind CSS v4, Lucide Icons, shadcn/ui (Radix Primitives), Sonner.

**Spec:** [`docs/superpowers/specs/2026-10-15-portfolio-hybrid-minimal-modern-spec.md`](file:///c:/Users/justi/Documents/dev/joshtin.dev/docs/superpowers/specs/2026-10-15-portfolio-hybrid-minimal-modern-spec.md)

## Global Constraints

- Tipado estricto en TypeScript (`strict: true`), sin `any` injustificados ni casts `as unknown as` innecesarios.
- Jerarquía de encabezados WCAG 2.2 AA estricta: exactamente un único `<h1>` por página (en el Hero); secciones con `<h2>`; nunca anidar interactividad (`<button>` dentro de `<a>` o viceversa).
- Toda animación debe apagarse o reducirse a opacidad directa cuando `prefers-reduced-motion: reduce` esté activo.
- Respeto a la privacidad: NUNCA publicar números de teléfono ni claves privadas en el frontend ni en metadatos.
- Cada cambio en la base de datos de Neon debe ser seguro y preservar la información existente de Justin mediante scripts de migración.
- El Definition of Done (DoD) requiere que cada tarea pase `pnpm exec tsc --noEmit` y `pnpm lint`.

## Review Focus

1. **Hidratación en Server Components**: Las utilidades de GSAP o Motion no deben ejecutarse en el servidor; deben estar protegidas con comprobaciones `typeof window !== 'undefined'` o dentro de `useEffect` / hooks de cliente.
2. **Avatar fallback seguro**: La resolución de la URL del avatar en el Hero jamás debe seleccionar un archivo PDF (`cvFile`) si falta la foto; debe usar un avatar por defecto o la imagen subida en `avatar`.
3. **Semántica del cargo y enlaces accesibles**: El título profesional (`jobTitle`) debe renderizarse como párrafo estilizado con fuente monospace (`<p className="font-mono...">`), no como `<h2>`, preservando la jerarquía para las secciones.
4. **Respeto a `prefers-reduced-motion`**: Si un usuario tiene activada la reducción de movimiento en su sistema operativo, los ScrollTriggers de GSAP y los efectos magnéticos de Motion no deben realizar traslaciones físicas bruscas.
5. **Revalidación y consistencia de datos**: Al publicar un cambio en Payload, los datos del frontend deben actualizarse mediante `revalidatePath` sin necesidad de reiniciar el servidor Next.js.

---

### Task 1: Instalación de Dependencias y Configuración de Tipografía y Motion Provider

**Files:**
- Modify: `package.json`
- Create: `src/components/providers/MotionProvider.tsx`
- Create: `src/lib/gsap.ts`
- Modify: `src/app/(frontend)/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `MotionProvider` context wrapper y `gsap` configurado con `ScrollTrigger` registrado en cliente.

- [ ] **Step 1: Instalar dependencias aprobadas de animación y Payload plugins**

Ejecutar:
```bash
pnpm add motion gsap @payloadcms/plugin-seo @payloadcms/plugin-form-builder @payloadcms/plugin-redirects
pnpm add -D @types/gsap
```

- [ ] **Step 2: Crear el inicializador cliente de GSAP con ScrollTrigger**

Crear `src/lib/gsap.ts` que registre `ScrollTrigger` solo en entorno de navegador:
```typescript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
```

- [ ] **Step 3: Crear el `MotionProvider` con detección de accesibilidad**

Crear `src/components/providers/MotionProvider.tsx` usando `LazyMotion` y `domAnimation` de `motion/react`, exponiendo el contexto y control de `reducedMotion`.

- [ ] **Step 4: Integrar fuentes Geist y MotionProvider en `src/app/(frontend)/layout.tsx`**

Asegurar la inyección de `GeistVF.woff` y `GeistMonoVF.woff` mediante `next/font/local` asignando las variables CSS `--font-geist-sans` y `--font-geist-mono`. Envolver a los hijos con `<MotionProvider>`.

- [ ] **Step 5: Verificar compilación y tipos**

Run: `pnpm exec tsc --noEmit && pnpm lint`  
Expected: PASS (código de salida 0).

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml src/lib/gsap.ts src/components/providers/MotionProvider.tsx src/app/(frontend)/layout.tsx src/app/globals.css
git commit -m "feat(motion): add motion and gsap dependencies and configure MotionProvider with Geist fonts"
```

---

### Task 2: Primitivas de Micro-interacción y Animación

**Files:**
- Create: `src/components/ui/motion/Reveal.tsx`
- Create: `src/components/ui/motion/Magnetic.tsx`
- Create: `src/components/ui/motion/SpotlightCard.tsx`
- Create: `src/components/ui/motion/CountUp.tsx`
- Create: `src/components/ui/motion/TextScramble.tsx`

**Interfaces:**
- Produces: Componentes reutilizables de UI animados: `<Reveal>`, `<Magnetic>`, `<SpotlightCard>`, `<CountUp>`, `<TextScramble>`.

- [ ] **Step 1: Implementar `<Reveal>`**
Componente que envuelve contenido para animar opacidad y leve traslación vertical al entrar al viewport (`whileInView`), respetando `reducedMotion`.

- [ ] **Step 2: Implementar `<Magnetic>`**
Componente para botones y badges que reacciona con ligera atracción magnética al cursor mediante resortes suaves de Motion.

- [ ] **Step 3: Implementar `<SpotlightCard>`**
Tarjeta contenedora que dibuja un halo perimetral dinámico guiado por las coordenadas del ratón (`onMouseMove`), con estilo dark glassmorphic.

- [ ] **Step 4: Implementar `<CountUp>`**
Contador numérico dinámico con `useInView` y `animate()` de Motion para resaltar métricas y años de experiencia.

- [ ] **Step 5: Implementar `<TextScramble>`**
Efecto tipográfico estilo terminal de ingeniería que decodifica caracteres aleatorios hasta revelar la palabra final en titulares clave.

- [ ] **Step 6: Verificar compilación**

Run: `pnpm exec tsc --noEmit && pnpm lint`  
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/motion/
git commit -m "feat(ui): implement reusable motion primitives (Reveal, Magnetic, SpotlightCard, CountUp, TextScramble)"
```

---

### Task 3: Unificación de Identidad en Payload: Global `SiteSettings`

**Files:**
- Create: `src/globals/SiteSettings.ts`
- Modify: `src/payload.config.ts`
- Create: `src/scripts/migrate-to-site-settings.ts`
- Modify: `src/lib/payload/queries.ts`

**Interfaces:**
- Consumes: Configuración previa en `Landing` y `Profile`.
- Produces: Global `site-settings` accesible vía `getSiteSettings()` con tipos unificados y soporte de revalidación.

- [ ] **Step 1: Definir `SiteSettings.ts`**
Estructurar campos agrupados en pestañas:
1. *Identidad*: `fullName`, `jobTitle`, `shortBio`, `aboutTitle`, `fullBio`, `location`, `avatar` (upload Media), `availability`.
2. *Métricas*: Array de métricas (`value`, `label`, `description`).
3. *Enlaces y Redes*: `email`, `socialLinks`, `cvFile` (upload Media verificado como documento).
4. *Apariencia y Motion*: `accentColor`, `motionIntensity` (`subtle` | `expressive` | `reduced`).

- [ ] **Step 2: Registrar `SiteSettings` en `src/payload.config.ts`**
Añadir `SiteSettings` a los globals de Payload.

- [ ] **Step 3: Crear script de migración segura `migrate-to-site-settings.ts`**
Script en `tsx` que lee los datos actuales del global `landing` (y `profile` si existe) y los guarda en `site-settings` para asegurar que ningún texto de Justin se pierda.

- [ ] **Step 4: Ejecutar script de migración y validar datos**

Run: `pnpm exec tsx src/scripts/migrate-to-site-settings.ts`  
Expected: Migración exitosa confirmada en consola.

- [ ] **Step 5: Crear función de consulta `getSiteSettings()` en `queries.ts`**
Función con fallback seguro a `mocks/cv.json` en caso de fallo de conexión a Neon.

- [ ] **Step 6: Verificar compilación y tipos**

Run: `pnpm exec tsc --noEmit`  
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/globals/SiteSettings.ts src/payload.config.ts src/scripts/migrate-to-site-settings.ts src/lib/payload/queries.ts
git commit -m "feat(payload): unify profile and landing identity into SiteSettings global with safe migration"
```

---

### Task 4: Arquitectura Modular de Payload: Colección `pages` y `blockSettings`

**Files:**
- Create: `src/fields/blockSettings.ts`
- Modify: `src/blocks/HeroBlock.ts`
- Modify: `src/blocks/ProjectsBlock.ts`
- Modify: `src/blocks/ExperienceBlock.ts`
- Modify: `src/blocks/TechStackBlock.ts`
- Create: `src/blocks/AboutBlock.ts`
- Modify: `src/blocks/ContactBlock.ts`
- Create: `src/collections/Pages.ts`
- Modify: `src/payload.config.ts`

**Interfaces:**
- Produces: Colección `pages` en Payload con bloques reordenables y configurables (`blockSettings`).

- [ ] **Step 1: Crear `src/fields/blockSettings.ts`**
Definir campos estándar reutilizables: `spacing` (`compact` | `normal` | `spacious`), `backgroundVariant` (`default` | `grid` | `dots` | `glow`), `animationPreset` (`fade` | `stagger` | `timeline`), `anchorId` (string para enlaces de ancla).

- [ ] **Step 2: Actualizar definiciones de bloques en `src/blocks/`**
Añadir `blockSettings` a cada bloque (`HeroBlock`, `ProjectsBlock`, `ExperienceBlock`, `TechStackBlock`, `AboutBlock`, `ContactBlock`).

- [ ] **Step 3: Crear la colección `Pages.ts`**
Campos: `title`, `slug` (indexado, único, `required`), `layout` (array de bloques modulares). Configurar `livePreview` con URL `/` para la home y `/{slug}` para páginas adicionales.

- [ ] **Step 4: Registrar `Pages` en `payload.config.ts` y regenerar tipos**

Run: `pnpm exec tsc --noEmit`  
Expected: PASS.

- [ ] **Step 5: Seed/Inicializar la página `home` en `pages`**
Script o función en `seed.ts` que crea la página principal con los bloques en orden: Hero → About → Projects → Experience → TechStack → Contact.

- [ ] **Step 6: Commit**

```bash
git add src/fields/blockSettings.ts src/blocks/ src/collections/Pages.ts src/payload.config.ts
git commit -m "feat(payload): implement Pages collection with layout builder and shared blockSettings"
```

---

### Task 5: Arquitectura Next.js Server-Side: `RenderBlocks` y Eliminación de `LandingClient`

**Files:**
- Create: `src/components/Home/blocks/RenderBlocks.tsx`
- Create: `src/components/payload/RefreshRouteOnSave.tsx`
- Create: `src/app/api/draft/route.ts`
- Create: `src/app/api/disable-draft/route.ts`
- Modify: `src/app/(frontend)/page.tsx`
- Delete: `src/app/(frontend)/LandingClient.tsx`

**Interfaces:**
- Consumes: Datos de `getPageBySlug('home')` y `getSiteSettings()`.
- Produces: Renderizado 100% Server Component con preview de borradores sin sobrecarga en cliente.

- [ ] **Step 1: Implementar `src/components/Home/blocks/RenderBlocks.tsx`**
Componente Server Component que mapea cada bloque de la página llamando a su componente dinámico correspondiente (`DynamicHeroBlock`, `DynamicProjectsBlock`, etc.), pasando las configuraciones de `blockSettings`.

- [ ] **Step 2: Crear `src/components/payload/RefreshRouteOnSave.tsx`**
Componente de cliente liviano que escucha eventos de Live Preview de Payload (`postMessage` / `payload-live-preview`) y ejecuta `router.refresh()` sin convertir toda la página en cliente.

- [ ] **Step 3: Implementar rutas de Draft Mode en `/api/draft` y `/api/disable-draft`**
Habilita `draftMode().enable()` validando el secreto de Payload para previsualizar contenido no publicado.

- [ ] **Step 4: Refactorizar `src/app/(frontend)/page.tsx`**
Consumir la página `home` desde Payload (o fallback a `cv.json`), renderizar `<RenderBlocks />` y añadir `<RefreshRouteOnSave />` condicional. Eliminar `LandingClient.tsx`.

- [ ] **Step 5: Verificar compilación y renderizado**

Run: `pnpm exec tsc --noEmit && pnpm lint`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Home/blocks/RenderBlocks.tsx src/components/payload/RefreshRouteOnSave.tsx src/app/api/draft/ src/app/(frontend)/page.tsx
git rm src/app/(frontend)/LandingClient.tsx
git commit -m "refactor(frontend): migrate to server-first RenderBlocks with RefreshRouteOnSave and draft mode"
```

---

### Task 6: Rediseño Visual Híbrido: Hero y About con Micro-interacciones

**Files:**
- Modify: `src/components/Home/blocks/DynamicHeroBlock.tsx`
- Modify: `src/components/Home/blocks/DynamicAboutBlock.tsx`

**Interfaces:**
- Consumes: Bloques de Hero y About con datos de `SiteSettings`.
- Produces: Interfaz híbrida con estilo ingeniería + diseño senior: split layout, tipografía Geist, avatar 3D tilt, tags magnéticos y contador numérico en métricas.

- [ ] **Step 1: Rediseñar `DynamicHeroBlock.tsx`**
  - Corregir el bug de fallback del avatar: usar exclusivamente `avatar.url` o fallback de imagen web segura, jamás `cvFile`.
  - Convertir el tag de `jobTitle` en párrafo con tipografía mono estilizada (`<p className="font-mono text-lg text-emerald-500 font-medium">`).
  - Añadir `<TextScramble>` en el saludo o nombre para el efecto técnico.
  - Envolver botones y badges de tecnologías en `<Magnetic>`.
  - Añadir tilt 3D sutil en el avatar al interactuar con el cursor.
  - Asegurar un único `<h1>` con nombre completo.

- [ ] **Step 2: Rediseñar `DynamicAboutBlock.tsx`**
  - Añadir prefijo de índice técnico (`01 // PERFIL`).
  - Implementar `<CountUp>` en cada métrica numérica (`años de experiencia`, `proyectos completados`).
  - Tarjetas de métricas envueltas en `<SpotlightCard>`.
  - Texto de biografía extendida renderizado con tipografía limpia y espaciado editorial.

- [ ] **Step 3: Verificar compilación y accesibilidad**

Run: `pnpm exec tsc --noEmit && pnpm lint`  
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/Home/blocks/DynamicHeroBlock.tsx src/components/Home/blocks/DynamicAboutBlock.tsx
git commit -m "feat(hero-about): redesign hero and about blocks with engineering aesthetic and motion primitives"
```

---

### Task 7: Rediseño Visual Híbrido: Projects y Experience Timeline con GSAP

**Files:**
- Modify: `src/components/Home/blocks/DynamicProjectsBlock.tsx`
- Modify: `src/components/Home/CardProject.tsx`
- Modify: `src/components/Home/blocks/DynamicExperienceBlock.tsx`

**Interfaces:**
- Consumes: Colecciones `projects` y `experiences`.
- Produces: Sección de proyectos con tarjetas spotlight interactivas y timeline vertical sincronizado con scroll mediante GSAP.

- [ ] **Step 1: Rediseñar `CardProject.tsx` y `DynamicProjectsBlock.tsx`**
  - Añadir prefijo técnico de sección (`02 // PROYECTOS SELECCIONADOS`).
  - Tarjetas envueltas en `<SpotlightCard>` con vista previa de imagen zoom en hover.
  - Badges de stack tecnológico con hover distintivo.
  - Botones "Demo en vivo" y "Código" con nombres accesibles (`aria-label`) y sin botones dentro de enlaces.
  - Filtro interactivo de tecnologías con animación fluida `layoutId`.

- [ ] **Step 2: Rediseñar `DynamicExperienceBlock.tsx` con GSAP ScrollTrigger**
  - Añadir prefijo técnico (`03 // TRAYECTORIA PROFESIONAL`).
  - Hacer dinámicos el título y subtítulo desde el bloque de Payload (eliminando textos hardcodeados).
  - Trazado de línea SVG vertical que progresa conforme el usuario navega por la sección usando GSAP `ScrollTrigger`.
  - Resaltado de nodos de empresas e hitos con fechas en Geist Mono.
  - Desactivar ScrollTrigger automáticamente si `reducedMotion` está activo.

- [ ] **Step 3: Verificar compilación y tipos**

Run: `pnpm exec tsc --noEmit && pnpm lint`  
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/Home/blocks/DynamicProjectsBlock.tsx src/components/Home/CardProject.tsx src/components/Home/blocks/DynamicExperienceBlock.tsx
git commit -m "feat(projects-experience): implement spotlight project cards and GSAP scroll-triggered experience timeline"
```

---

### Task 8: Rediseño Visual Híbrido: Tech Stack y Formulario de Contacto

**Files:**
- Modify: `src/components/Home/blocks/DynamicTechStackBlock.tsx`
- Modify: `src/components/Home/blocks/DynamicContactBlock.tsx`

**Interfaces:**
- Consumes: Colección `skills` y configuración de contacto.
- Produces: Stack tecnológico categorizado con tooltips técnicos y bloque de contacto dinámico con opción de formulario de leads.

- [ ] **Step 1: Rediseñar `DynamicTechStackBlock.tsx`**
  - Prefijo técnico (`04 // STACK TECNOLÓGICO`).
  - Tabs animados para alternar entre categorías (Frontend, Backend, DevOps, Testing & Herramientas) con indicador deslizante `layoutId`.
  - Cada tecnología con micro-hover lift, icono nítido y tooltip accesible.

- [ ] **Step 2: Rediseñar `DynamicContactBlock.tsx`**
  - Prefijo técnico (`05 // CONTACTO & OPORTUNIDADES`).
  - Botón de "Copiar Correo" con micro-interacción de éxito y notificación toast vía `sonner`.
  - Enlace directo a `mailto:` con botón magnético.
  - Indicador de disponibilidad en tiempo real con punto pulsante esmeralda.
  - Formulario de contacto opcional habilitado si el plugin de forms está activo.

- [ ] **Step 3: Verificar compilación y accesibilidad**

Run: `pnpm exec tsc --noEmit && pnpm lint`  
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/Home/blocks/DynamicTechStackBlock.tsx src/components/Home/blocks/DynamicContactBlock.tsx
git commit -m "feat(stack-contact): add interactive category tabs to tech stack and interactive feedback to contact block"
```

---

### Task 9: Integración de Plugins Payload: SEO, Redirects y Form Builder

**Files:**
- Modify: `src/payload.config.ts`
- Modify: `src/app/(frontend)/page.tsx`
- Modify: `src/components/seo/JsonLd.tsx`

**Interfaces:**
- Produces: Configuración de plugins de Payload activada y metadatos dinámicos generados con Open Graph y JSON-LD.

- [ ] **Step 1: Configurar `@payloadcms/plugin-seo` en `payload.config.ts`**
Añadir a las colecciones `pages`, `posts` y `projects` con función `generateTitle` y `generateDescription`.

- [ ] **Step 2: Configurar `@payloadcms/plugin-redirects` y `@payloadcms/plugin-form-builder`**
Configurar redirecciones y formulario de contacto en el panel de administración de Payload.

- [ ] **Step 3: Actualizar `generateMetadata` en `src/app/(frontend)/page.tsx`**
Leer metadatos del plugin SEO de Payload con fallback a `SiteSettings`.

- [ ] **Step 4: Enriquecer `src/components/seo/JsonLd.tsx`**
Asegurar Schema.org con tipos `Person` y `ProfilePage`, sin incluir números de teléfono privados.

- [ ] **Step 5: Verificar compilación y tipos**

Run: `pnpm exec tsc --noEmit && pnpm lint`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/payload.config.ts src/app/(frontend)/page.tsx src/components/seo/JsonLd.tsx
git commit -m "feat(seo-plugins): integrate Payload SEO, Redirects and Form Builder plugins with Next.js metadata"
```

---

### Task 10: Auditoría Final, Accesibilidad WCAG 2.2 AA y Limpieza

**Files:**
- Modify/Clean: Archivos obsoletos si aplica (`HomePage.ts`, `Profile.ts` tras migración confirmada).
- Verify: Todas las rutas en desktop y mobile.

**Interfaces:**
- Produces: Build de producción limpio con código de salida 0 y cumplimiento del Definition of Done.

- [ ] **Step 1: Ejecutar verificación estricta de tipos**

Run: `pnpm exec tsc --noEmit`  
Expected: 0 errores de tipado.

- [ ] **Step 2: Ejecutar análisis de linter**

Run: `pnpm lint`  
Expected: 0 errores y sin nuevos warnings.

- [ ] **Step 3: Compilar bundle de producción**

Run: `pnpm build`  
Expected: Build exitoso con código de salida 0.

- [ ] **Step 4: Auditoría de accesibilidad y reduced-motion**
Comprobar con el navegador que no existen enlaces anidados, que el contraste de texto sobre fondo slate supera 4.5:1, y que con `prefers-reduced-motion` no hay saltos bruscos.

- [ ] **Step 5: Commit final de la fase**

```bash
git commit --allow-empty -m "chore: complete quality audit, WCAG 2.2 verification and production build"
```
