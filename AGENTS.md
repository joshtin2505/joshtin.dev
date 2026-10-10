# AGENTS.md — joshtin.tech

Guía de contexto y reglas operativas para agentes de IA (Claude, Codex, Gemini, Antigravity).

---

## 1. Visión y Objetivos del Proyecto

- **Qué es**: Portafolio personal y sitio profesional de **Justin Castro Perez** (Joshtin).
- **Dominio canónico**: `https://joshtin.tech`.
- **Objetivo principal**:
  1. **Conseguir entrevistas de trabajo** (empleo / contratación como Web Developer / Software Engineer).
  2. **Captar clientes y leads** para proyectos freelance y side projects.
- **Idioma**: Español actualmente. Próximamente se incorporará internacionalización dinámica (i18n: ES / EN) administrada con Payload CMS.

---

## 2. Stack Tecnológico y Arquitectura

- **Framework**: Next.js (App Router, Server Components por defecto).
- **Estilos**: Tailwind CSS v4 + `tw-animate-css`.
- **Componentes**: shadcn/ui (Radix Primitives) + Lucide Icons.
- **Tipado**: TypeScript en modo estricto (`strict: true`).
- **Gestor de paquetes**: `pnpm` (lockfile versionado en `pnpm-lock.yaml`).
- **Hosting**: Vercel.
- **Próxima integración**: Payload CMS 3 + Neon Database (Serverless Postgres).

### Estructura del Proyecto
```
src/
├─ app/                  # Rutas App Router (layout, page, curriculum)
│  └─ (futuro)           # Se reorganizará en (frontend) y (payload)
├─ components/
│  ├─ Home/              # Secciones de la página de inicio
│  ├─ curriculum/        # Secciones del CV / hoja de vida
│  ├─ nav/ footer/ logo/ # Componentes globales de navegación
│  ├─ commandPalette/    # Paleta de comandos (cmdk)
│  └─ ui/                # Primitivas shadcn/ui
├─ hooks/                # Custom React hooks
├─ lib/                  # Utilidades y configuración compartida
└─ mocks/cv.json         # Fuente de datos actual del perfil y proyectos
```

---

## 3. Comandos de Desarrollo y Calidad

Ejecutar siempre con `pnpm`:

```bash
pnpm dev              # Servidor local de desarrollo
pnpm build            # Compilación de producción (Next.js)
pnpm lint             # Análisis estático de ESLint
pnpm exec tsc --noEmit # Verificación estricta de tipos TypeScript
```

---

## 4. Reglas de Código y Convenciones

### Nombres y Estilo
- **Componentes React**: PascalCase en archivos y nombres (`CardProject.tsx`, `NavBar.tsx`).
- **Hooks**: camelCase con prefijo `use` (`useTheme.ts`, `useMobile.ts`).
- **Utilidades**: camelCase o kebab-case (`utils.ts`, `social-icons.ts`).
- **CSS en Tailwind v4**:
  - Evitar `@apply` en archivos `.css` separados sin `@reference`.
  - Preferir clases utilitarias de Tailwind directamente en el JSX o definir utilidades en `src/app/globals.css`.

### Git: Commits y Ramas
- **Ramas de trabajo**: `feat/...`, `fix/...`, `refactor/...`.
- **Mensajes de commit**: Formato Conventional Commits claro y conciso:
  - `feat: add dynamic project card with live status`
  - `fix: resolve nested interactive tags in CardProject`
  - `refactor: migrate separate css styles to tailwind utility classes`
- Hacer commits pequeños, atómicos y descriptivos. Nunca hacer commits masivos "catch-all".

### Accesibilidad (WCAG 2.2 AA)
- Jerarquía estricta de encabezados: exactamente un único `<h1>` por página; nunca saltar niveles (`h1` → `h2` → `h3`).
- **Sin elementos interactivos anidados**: NUNCA colocar un `<button>` dentro de un `<a>` ni viceversa.
- Nombres accesibles obligatorios: todo botón o enlace con icono debe incluir `aria-label` o texto con clase `sr-only`.
- Enlaces externos: incluir indicador accesible y `rel="noreferrer noopener"`.

### Rendimiento y Buenas Prácticas
- Usar siempre `next/image` con dimensiones explícitas (`width`, `height`) o `fill`.
- Imagen LCP con atributo `priority`.
- Mantener componentes como **Server Components** por defecto; usar `'use client'` únicamente cuando se requiera estado, hooks del navegador o eventos (`onClick`, `onChange`).
- No importar bundles pesados completos si se pueden modularizar.

### Privacidad y Datos Sensibles
- **Teléfono**: NO publicar números de teléfono en metadatos Open Graph, Schema.org ni en la vista pública del portafolio.
- **Secretos**: Todo secreto (`DATABASE_URI`, `PAYLOAD_SECRET`) va exclusivamente en `.env.local` y debe estar en `.gitignore`.

---

## 5. Cuándo y Qué Skills Usar

Las skills residen en `.agents/skills/`:

| Tarea | Skill a invocar |
|---|---|
| Nueva idea, feature o cambio de diseño | `brainstorming` → `writing-plans` |
| Ejecución planificada paso a paso | `executing-plans` o `subagent-driven-development` |
| Redacción de textos, hero y proyectos | `copywriting` (evitar clichés y texto artificial) |
| Dirección estética y diseño visual | `frontend-design` / `ui-ux-pro-max` / `web-design-guidelines` |
| Componentes y formularios shadcn | `shadcn-ui` |
| Auditoría de contraste y teclado | `accessibility` |
| Metadatos, sitemap, Open Graph, SEO | `seo-audit` |
| Buenas prácticas y rendimiento Next/React | `nextjs-app-router-patterns` / `vercel-react-best-practices` |
| Integración y colecciones del CMS | `payload` |
| Verificación final antes de cerrar tarea | `verification-before-completion` |
| Diagnóstico de errores imprevistos | `systematic-debugging` |


### 5.1 Subagentes Especializados del Proyecto

Los subagentes residen documentados en `.agents/subagents/`:
- **`accessibility-reviewer`**: Auditor de estándares WCAG 2.2 AA (foco, etiquetas accesibles, sin interactividad anidada).
- **`seo-technical-auditor`**: Auditor de SEO técnico, canonicals, sitemap, robots y datos estructurados Schema.org.
- **`tech-copywriter`**: Redactor de contenido técnico (Hero, biografía y proyectos orientados a impacto sin clichés de IA).
- **`architect-code-reviewer`**: Gatekeeper de calidad que verifica el Definition of Done antes de integrar a `main`.

---

## 6. Definición de "Terminado" (Definition of Done)

Ninguna tarea se considera completa sin cumplir los siguientes criterios:

1. [ ] `pnpm exec tsc --noEmit` pasa sin errores de tipado.
2. [ ] `pnpm lint` pasa sin errores ni nuevos warnings.
3. [ ] `pnpm build` compila limpiamente (código de salida 0).
4. [ ] Accesibilidad comprobada: sin botones dentro de links, atributos accesibles presentes.
5. [ ] Verificación de experiencia en desktop y mobile.
6. [ ] Commits atómicos y claros bajo Conventional Commits.

---

## 7. Lo que los Agentes NO Deben Hacer

- ❌ **NO instalar ni desinstalar dependencias** sin aprobación previa del usuario.
- ❌ **NO modificar configuración de hosting o despliegue** (DNS, Vercel dashboards/projects) sin pedir permiso.
- ❌ **NO inventar, alterar ni borrar experiencia laboral**, datos de proyectos o certificaciones reales de Justin.
- ❌ **NO hacer cambios destructivos masivos** en una sola pasada; avanzar por fases incrementales.
- ❌ **NO incluir números de teléfono ni datos privados** en metadatos o páginas públicas.
- ❌ **NO omitir el paso de compilación/verificación** (`tsc` y `build`) antes de dar por terminado un trabajo.
