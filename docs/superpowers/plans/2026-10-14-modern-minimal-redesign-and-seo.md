# Plan de Implementación: Rediseño Minimalista Moderno, Efectos Glow/Neón y SEO

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernizar la landing page con micro-animaciones, sutiles efectos glow y neón con máxima sobriedad y elegancia, unificar el branding del logo y conectar metadatos dinámicos SEO con Next.js App Router y Schema.org.

**Architecture:** Componentes modulares con utilidades Tailwind CSS v4, animaciones fluidas con aceleración por hardware (`transform`, `opacity`, `filter`), gradientes radiales difuminados y generación dinámica de metadatos SSR/SSG en `page.tsx`.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, Lucide Icons, Payload CMS 3.

**Spec:** [docs/superpowers/specs/2026-10-14-modern-minimal-redesign-and-seo-design.md](file:///c:/Users/justi/Documents/dev/joshtin.dev/docs/superpowers/specs/2026-10-14-modern-minimal-redesign-and-seo-design.md)

## Global Constraints
- WCAG 2.2 AA: contraste de texto mínimo 4.5:1, etiquetas `aria-label` en enlaces interactivos, sin elementos interactivos anidados.
- Respetar `prefers-reduced-motion` para usuarios con accesibilidad motriz activada.
- Mantener tipado estricto (`tsc --noEmit`), linter (`pnpm lint`) y compilación limpia (`pnpm build`).
- Commits atómicos bajo Conventional Commits.

---

### Task 1: Unificación de Branding y Micro-interacciones en Header/Logo
**Files:**
- Modify: `src/components/logo/Logo.tsx`
- Modify: `src/components/logo/Logo.css`
- Modify: `src/components/nav/NavBar.tsx`

**Steps:**
- [ ] Cambiar el color del icono en `Logo.tsx` de rojo (`text-red-500`) a verde esmeralda con resplandor neón (`text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]`).
- [ ] Actualizar la línea animada en `Logo.css` para usar el acento esmeralda en lugar de rojo.
- [ ] Añadir hover sutil con micro-borde brillante al botón de búsqueda (Ctrl+K) en `NavBar.tsx`.
- [ ] Verificar `pnpm exec tsc --noEmit`.
- [ ] Commit: `feat(branding): align logo and navbar styling with emerald neon theme`.

---

### Task 2: Rediseño del Hero con Efecto Glow en Avatar y Fondo Ambiental
**Files:**
- Modify: `src/components/Home/blocks/DynamicHeroBlock.tsx`

**Steps:**
- [ ] Incorporar un gradiente radial ambiental difuminado en el fondo del Hero (`bg-emerald-500/10 blur-[100px] pointer-events-none`).
- [ ] Añadir marco con aura glow neón alrededor del contenedor del avatar (`p-1 bg-gradient-to-tr from-emerald-500/30 via-emerald-400/10 to-teal-500/30 ring-1 ring-emerald-500/30 shadow-[0_0_35px_-5px_rgba(16,185,129,0.25)] hover:shadow-[0_0_45px_-5px_rgba(16,185,129,0.4)]`).
- [ ] Estilizar los badges de heroSkills con micro-bordes hover reactivos (`hover:border-emerald-500/40 hover:text-emerald-500 transition-colors`).
- [ ] Añadir micro-transición suave en los botones principales de contacto y CV.
- [ ] Verificar `pnpm exec tsc --noEmit`.
- [ ] Commit: `feat(hero): add ambient radial glow, neon avatar aura and interactive badges`.

---

### Task 3: Tarjetas de Proyectos con Elevación, Halo Glow y Zoom Controlado
**Files:**
- Modify: `src/components/Home/blocks/DynamicProjectsBlock.tsx`

**Steps:**
- [ ] Añadir micro-interacción de elevación suave a cada tarjeta (`hover:-translate-y-1.5 transition-all duration-300 ease-out`).
- [ ] Aplicar borde reactivo con efecto spotlight glow al hover (`hover:border-emerald-500/40 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.25)]`).
- [ ] Agregar zoom controlado en la imagen de portada (`group-hover:scale-105 transition-transform duration-500`).
- [ ] Estilizar los botones de "Demo" y "Código" con micro-hover verde esmeralda.
- [ ] Verificar `pnpm exec tsc --noEmit`.
- [ ] Commit: `feat(projects): add interactive glow border, lift motion and image zoom to project cards`.

---

### Task 4: Dinamismo en Secciones "Sobre Mí", "Stack" y "Contacto"
**Files:**
- Modify: `src/components/Home/blocks/DynamicAboutBlock.tsx`
- Modify: `src/components/Home/blocks/DynamicTechStackBlock.tsx`
- Modify: `src/components/Home/blocks/DynamicContactBlock.tsx`

**Steps:**
- [ ] En `DynamicAboutBlock.tsx`: Añadir borde glow suave en hover a las tarjetas de métricas numéricas.
- [ ] En `DynamicTechStackBlock.tsx`: Incorporar hover reactivo en las cajas de categorías de skills y badges con micro-escala.
- [ ] En `DynamicContactBlock.tsx`: Añadir gradiente sutil con brillo perimetral y destello ambiental al panel de contacto.
- [ ] Verificar `pnpm exec tsc --noEmit`.
- [ ] Commit: `feat(ui): add subtle glow and micro-interactions across about, stack and contact sections`.

---

### Task 5: Optimización SEO Dinámica y Metadatos en App Router
**Files:**
- Modify: `src/app/(frontend)/page.tsx`
- Modify: `src/components/seo/JsonLd.tsx`

**Steps:**
- [ ] Implementar `generateMetadata()` en `src/app/(frontend)/page.tsx` extrayendo `metaTitle`, `metaDescription` y `ogImage` desde `getLandingData()`.
- [ ] Actualizar `JsonLd.tsx` para aceptar datos dinámicos opcionales de la Landing y generar JSON-LD para `Person` y `ProfilePage`.
- [ ] Verificar que robots y sitemap mantengan coherencia técnica.
- [ ] Ejecutar `pnpm exec tsc --noEmit`.
- [ ] Commit: `feat(seo): implement dynamic metadata generation from CMS and enriched JSON-LD`.

---

### Task 6: Verificación Integral de Calidad y Experiencia en Navegador
**Files:**
- Verificación en `http://localhost:3000`

**Steps:**
- [ ] Ejecutar `pnpm exec tsc --noEmit` (0 errores).
- [ ] Ejecutar `pnpm lint` (0 errores).
- [ ] Ejecutar `pnpm build` (código de salida 0).
- [ ] Auditar visualmente en desktop y mobile con el subagente de navegador y capturar capturas de pantalla para verificación visual.
- [ ] Confirmar cumplimiento del Definition of Done.
