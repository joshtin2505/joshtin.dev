# Especificación de Diseño: Portafolio Híbrido Senior (Minimalismo, Modernidad e Ingeniería) + Payload CMS

**Fecha:** 2026-10-15  
**Proyecto:** joshtin.tech — Portafolio Personal y Profesional de Justin Castro Perez  
**Autor:** Antigravity (Design & FullStack Pair)  
**Estado:** Aprobado por el usuario  

---

## 1. Visión y Objetivos

### 1.1 El "Por qué"
El usuario busca transformar su portafolio en una experiencia de calibre internacional: un punto de encuentro híbrido entre **la elegancia y composición de un diseñador de producto senior**, **la agilidad y atención al detalle de un frontend developer de élite**, y **la solidez arquitectónica de un ingeniero de software**.

El sitio debe alejarse por completo del aspecto de "plantilla genérica de componentes con resplandores verdes", adoptando micro-animaciones fluidas, narrativa mediante scroll asistido por GSAP, reactividad de interfaz con Motion, y una plataforma de gestión editorial desacoplada y robusta mediante Payload CMS 3 en App Router de Next.js 15.

### 1.2 Objetivos Principales
1. **Identidad Visual "Senior Designer + Dev + Engineer"**:
   - Composición tipográfica de alto impacto basada en **Geist Sans** (titulares y lecturas limpias) y **Geist Mono** (metadatos, etiquetas técnicas y números).
   - Canvas minimalista en gris carbón profundo (`#0A0D14` / `hsl(222 47% 6%)`), con contrastes nítidos, retícula sutil reactiva al cursor y toques esmeralda neón (`#10B981`) dosificados con sobriedad.
   - Micro-detalles de ingeniería: inspección de stack, terminal colapsable / drawer de atajos, badges con estado de despliegue en tiempo real y métricas verificables.
2. **Sistema de Animación Dinámico**:
   - **GSAP + ScrollTrigger**: Línea de tiempo de experiencia que se "traza" al hacer scroll, proyectos con fijación sutil (pinning) o tarjetas superpuestas tipo stacked decks.
   - **Motion (Motion for React)**: Reveal escalonado (stagger), botones con efecto magnético leve, contadores numéricos (count-up) para métricas y animaciones de layout morphing en tabs de tecnologías.
   - **Respeto a la Accesibilidad**: Detección obligatoria de `prefers-reduced-motion` para apagar desplazamientos y transformar animaciones en transiciones de opacidad directas.
3. **Payload CMS como Motor Modular de Maquetación**:
   - Colección **`pages`** con constructor de bloques (`Hero`, `ProjectsGrid`, `ExperienceTimeline`, `TechStack`, `AboutMetrics`, `ContactForm`, `RichContent`).
   - Cada bloque incluye configuración granular (`blockSettings`: variante de layout, fondo, espaciado, animación).
   - Global **`SiteSettings`**: Centraliza identidad, datos de contacto, redes, disponibilidad laboral, CV descargable y tokens de tema.
   - Arquitectura Next.js 15 Server-First: Descartar `LandingClient` monolithic y reemplazarlo por Server Components con `RefreshRouteOnSave` y `draftMode`.
   - Plugins oficiales de Payload integrados: `@payloadcms/plugin-seo`, `@payloadcms/plugin-form-builder`, `@payloadcms/plugin-redirects`.

### 1.3 Anti-Metas (Lo que NO haremos)
- ❌ No saturar con elementos 3D pesados ni Three.js que eleven el TBT o degraden el LCP móvil.
- ❌ No utilizar animaciones lentas o intrusivas que impidan la lectura ágil del currículum por parte de reclutadores.
- ❌ No inventar experiencia, testimonios ni proyectos falsos de Justin.
- ❌ No publicar datos sensibles como números de teléfono en metadatos ni en el front público.
- ❌ No romper el soporte de accesibilidad WCAG 2.2 AA (sin interactividad anidada, contraste mínimo 4.5:1).

---

## 2. Sistema de Diseño Visual y Tokens

### 2.1 Paleta de Color
- **Background Base**: `#0A0D14` (OLED Tech Slate)
- **Superficie de Tarjetas**: `rgba(16, 21, 30, 0.75)` con `backdrop-blur-md` y borde fino `rgba(255, 255, 255, 0.08)`.
- **Acento Primario**: `#10B981` (Emerald Tech) — Estados activos, disponibilidad y micro-resplandores focales.
- **Acento Secundario**: `#06B6D4` (Cyan Glow) — Reflejos y gradientes de luz sutiles.
- **Texto Principal**: `#F8FAFC` (Slate 50)
- **Texto Secundario / Metadatos**: `#94A3B8` (Slate 400)
- **Bordes y Retículas**: `rgba(255, 255, 255, 0.06)` a `rgba(16, 185, 129, 0.2)` en hover.

### 2.2 Tipografía
- **Titulares y Body**: Geist Sans (fuente variable cargada localmente mediante `next/font/local`).
- **Data, Código y Metadatos**: Geist Mono (fuente variable cargada localmente).
- **Escala de Jerarquía**:
  - Un único `<h1>` en la página (Hero).
  - Títulos de sección como `<h2>` con prefijo de índice tipo ingeniería (`01 // PROYECTOS`, `02 // EXPERIENCIA`).
  - Subtítulos y roles en `<p>` con `font-mono text-sm uppercase tracking-wider`.

---

## 3. Catálogo de Bloques y Micro-Interacciones

### 3.1 Hero
- Split layout asimétrico:
  - Columna izquierda: Saludo tipográfico con efecto *text scramble / reveal*, rol dinámico con cursor titilante, badge de disponibilidad laboral con pulso esmeralda, badges de tecnologías insignia y botones de acción rápida con atracción magnética suave.
  - Columna derecha: Avatar con efecto *tilt 3D* sutil basado en la posición del puntero, anillo perimetral con aura ambiental y tarjeta flotante con métrica clave o atajo de teclado (`⌘K`).

### 3.2 Proyectos (Projects Grid & Spotlight)
- Filtros por categoría/tecnología con transición fluida (`layoutId` de Motion).
- Tarjetas con efecto de borde spotlight que rastrea las coordenadas del ratón.
- Miniaturas con zoom contenido y visor de badges de repositorio / demo en vivo.
- Modo de presentación seleccionable en CMS: Grid clásico o Tarjetas fijadas con scroll (Pinning con GSAP).

### 3.3 Experiencia Laboral (Timeline)
- Línea de tiempo vertical central o lateral cuya trayectoria SVG se dibuja de forma sincronizada con el progreso de lectura (GSAP ScrollTrigger).
- Hitos de empleo con fecha en monospace, rol, empresa y bullet points de impacto orientados a resultados medibles.

### 3.4 Stack Tecnológico
- Categorías organizadas en tabs animados o cuadrícula bento.
- Tooltips enriquecidos al pasar el cursor (nivel de uso en producción, proyectos donde se utilizó).

### 3.5 Contacto & Formulario
- Formulario funcional respaldado por `@payloadcms/plugin-form-builder` para captar leads y oportunidades laborales directo en la base de datos de Neon.
- Botón de envío con micro-estados: idle → sending (spinner) → success (dibujo de check SVG con Motion).
- Acceso directo a correo con botón de "Copiar al portapapeles" y toast de confirmación instantánea (`sonner`).

---

## 4. Arquitectura de Payload CMS 3

### 4.1 Modelo de Datos Reestructurado
1. **Colección `pages`**:
   - Campos: `title`, `slug` (con index único), `hero` (variantes de hero), `layout` (bloques modulares), `meta` (integrado con `@payloadcms/plugin-seo`).
   - Habilita control total de orden y composición de páginas sin modificar código fuente.
2. **Global `SiteSettings`**:
   - Fusión de `Landing` y `Profile`.
   - Campos: `identity` (nombre, títulos, biografía), `availability` (estado laboral), `socialLinks`, `cvFile` (archivo PDF verificado), `branding` (color de acento, tema), `motion` (intensidad de animaciones: reducida / sutil / expresiva).
3. **Bloques Modulares**:
   - `HeroBlock`, `ProjectsBlock`, `ExperienceBlock`, `TechStackBlock`, `AboutBlock`, `ContactFormBlock`, `RichTextBlock`.
   - Campo compartido `blockSettings`: `spacing`, `backgroundVariant`, `animationPreset`, `anchorId`.
4. **Plugins Oficiales**:
   - `@payloadcms/plugin-seo`: generación de títulos dinámicos, previews de SERP y OpenGraph.
   - `@payloadcms/plugin-form-builder`: formularios de contacto dinámicos guardados en Neon.
   - `@payloadcms/plugin-redirects`: gestión de rutas legadas y links cortos.

### 4.2 Revalidación e Integración Next.js 15
- Implementación de `draftMode()` y ruta de preview `/api/draft`.
- Hooks `afterChange` en `pages` y `SiteSettings` que ejecutan `revalidatePath` y `revalidateTag` bajo demanda.
- Componente `RefreshRouteOnSave` para actualización instantánea en el panel de administración sin obligar a que la página pública sea un Client Component gigante.

---

## 5. Criterios de Aceptación y Calidad (DoD)
1. `pnpm exec tsc --noEmit` ejecuta sin ningún error de tipado TypeScript estricto.
2. `pnpm lint` pasa con 0 errores y sin nuevos warnings.
3. `pnpm build` compila limpiamente generando todas las rutas estáticas y dinámicas.
4. Cumplimiento WCAG 2.2 AA auditado (sin botones dentro de links, atributos aria completos, contraste validado).
5. Soporte íntegro de `prefers-reduced-motion` en todas las animaciones Motion y GSAP.
6. Ningún dato sensible (teléfono, variables de entorno) expuesto en el frontend ni en metadatos.
