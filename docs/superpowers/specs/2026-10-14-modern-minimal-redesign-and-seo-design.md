# Diseño: Rediseño Minimalista Moderno, Efectos Glow/Neón y Optimización SEO

**Fecha:** 2026-10-14  
**Proyecto:** joshtin.tech (Portafolio personal de Justin Castro Perez)  
**Autor:** Antigravity (Design & FullStack Pair)  

---

## 1. Intención y Objetivos

### El "Por qué"
El usuario busca modernizar la estética del portafolio personal, introduciendo micro-animaciones, dinamismo y sutiles efectos glow y neón sin sobrecargar la interfaz ni sacrificar el minimalismo y sobriedad profesional que requiere un portafolio de ingeniería de software. Adicionalmente, se requiere conectar los metadatos dinámicos del CMS con Next.js y enriquecer el SEO técnico (Open Graph, Twitter Cards, Schema.org).

### Metas (Goals)
1. **Estética Minimalista con Acento Neón Tech**:
   - Paleta sobria basada en Dark Mode (OLED / Slate) con acento insignia verde esmeralda y cian tecnológico (`#10B981` / `#06B6D4`).
   - Sutiles efectos de resplandor (glow) en hover y estados activos, respetando el contraste WCAG 2.2 AA (mínimo 4.5:1).
   - Unificar el branding del Logo (reemplazando el rojo desalineado por el verde esmeralda con brillo sutil).
2. **Micro-interacciones y Dinamismo**:
   - Tarjetas de proyectos con suave elevación (`-translate-y-1.5`), halo perimetral neón reactivo y zoom controlado en miniaturas.
   - Avatar con aura de gradiente respirable y borde con destello sutil.
   - Badges y métricas interactivas con destellos e indicadores vivos (pulsing dots).
   - Fondo del Hero con gradiente radial ambiental difuminado para añadir profundidad sin ruido.
3. **Optimización SEO y Metadatos Dinámicos**:
   - Generación dinámica de metadatos (`generateMetadata`) en `src/app/(frontend)/page.tsx` conectada con la pestaña SEO de Payload (`metaTitle`, `metaDescription`, `ogImage`), manteniendo fallback a `cv.json`.
   - Structured Data (Schema.org) enriquecido con tipos `Person` y `ProfilePage` / `WebSite`.
   - Verificación de jerarquía estricta de encabezados (`h1` único en Hero, `h2` en secciones) y etiquetas de accesibilidad.

### Anti-metas (Anti-goals)
- ❌ No saturar la pantalla con colores fluorescentes invasivos o animaciones descontroladas tipo "arcade".
- ❌ No degradar el rendimiento (evitar librerías 3D pesadas; usar CSS puro y utilidades optimizadas de Tailwind v4).
- ❌ No romper el soporte para usuarios con `prefers-reduced-motion`.
- ❌ No exponer información privada (teléfono, claves API).

---

## 2. Token System y Especificaciones Visuales

### Paleta de Color
- **Base Fondo Oscuro**: `hsl(222 47% 6%)` / `#090D16` (profundo, elegante, OLED-friendly).
- **Superficie de Tarjeta**: `hsl(217 33% 10% / 0.7)` con `backdrop-blur-md` y borde `hsl(215 25% 20%)`.
- **Acento Primario Neón**:
  - Emerald: `hsl(158 84% 45%)` (`#10B981`) — Estados de éxito, disponibilidad laboral, bordes activos.
  - Cyan sutil: `hsl(188 86% 53%)` (`#06B6D4`) — Gradientes y reflejos de luz.
- **Efecto Glow Signature**:
  - `box-shadow: 0 0 25px -5px rgba(16, 185, 129, 0.2)`
  - Anillo de avatar: `ring-1 ring-emerald-500/30 shadow-[0_0_35px_-5px_rgba(16,185,129,0.3)]`

### Micro-interacciones
1. **Hero**:
   - Avatar rodeado de un marco con gradiente radial y borde sutil que reacciona al hover con aumento suave del resplandor.
   - Disponibilidad laboral con punto indicador pulsante verde neón.
   - Acento luminoso radial difuminado de fondo (`pointer-events-none`).
2. **Proyectos**:
   - Efecto "spotlight" en el borde al hacer hover en la tarjeta.
   - Elevación suave en 300ms `hover:-translate-y-1.5`.
   - Botones "Demo" y "Código" con transiciones suaves y acento perimetral.
3. **Sobre Mí & Cifras**:
   - Tarjetas de métricas con números resaltados en tipografía mono y checkmarks luminosos.
4. **Logo & Navbar**:
   - Icono `Code2` con verde esmeralda y sutil `drop-shadow`.
   - Botón de paleta de comandos (Ctrl+K) con micro-borde brillante al pasar el cursor.

---

## 3. SEO y Datos Estructurados

1. **`generateMetadata()` en `src/app/(frontend)/page.tsx`**:
   - Lee `landing.metaTitle`, `landing.metaDescription` y `landing.ogImageUrl`.
   - Configura Open Graph y Twitter Cards completos.
2. **Schema.org**:
   - Inyección JSON-LD con `Person` validado con `name`, `jobTitle`, `url`, `image`, `sameAs` y `knowsAbout`.
