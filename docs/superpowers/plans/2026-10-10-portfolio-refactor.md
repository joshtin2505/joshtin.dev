# Portfolio Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio (`joshtin.tech`) to resolve critical build failures, optimize SEO/Accessibility, remove legacy placeholders, implement the Minimal Bento Grid architecture, and establish automated CI verification.

**Architecture:** Next.js 15 App Router (Server Components by default), Tailwind CSS v4 utility classes (eliminating broken `@apply` files), semantic HTML5 with Schema.org JSON-LD, and modular component hierarchy with strict TypeScript contracts.

**Tech Stack:** Next.js 15, React 19, TypeScript 5.9, Tailwind CSS v4, Lucide Icons, Radix UI (shadcn), GitHub Actions.

**Spec:** [fase3_lluvia_de_ideas.md](file:///C:/Users/justi/.gemini/antigravity-ide/brain/60d86411-67a4-4e61-a249-23e5381ec382/fase3_lluvia_de_ideas.md)

## Global Constraints

- Domain canonical: `https://joshtin.tech`.
- No phone numbers in metadata, Schema.org, or public DOM.
- No nested interactive elements (`<button>` inside `<a>` or vice-versa).
- Exactly one `<h1>` per page.
- All icon-only links/buttons must have accessible names (`aria-label` or `sr-only`).
- Zero build errors (`pnpm build` exit code 0) and zero TypeScript errors (`tsc --noEmit`).
- No dependencies installed without explicit user approval.
- Work conducted in branch `refactor/portfolio-improvements` with atomic Conventional Commits.

## Review Focus

- Empty image strings (`img: [""]`) in project data causing `next/image` runtime crashes.
- Tailwind v4 `@apply` unknown utilities breaking CSS compilation.
- Inverted disabled logic on action buttons navigating to blank URLs.
- External links missing `rel="noreferrer noopener"`.
- Missing `metadataBase` triggering relative URL warnings in Open Graph generation.

---

### Task 1: Branch Creation & Git / Config Hygiene

**Files:**
- Create: Git branch `refactor/portfolio-improvements`
- Modify: `.gitignore`
- Modify: `package.json:46`

**Interfaces:**
- Consumes: Clean working tree
- Produces: `refactor/portfolio-improvements` branch, clean dependency tree without circular `"joshtin.dev": "file:"`

- [ ] **Step 1: Create and switch to branch `refactor/portfolio-improvements`**
```bash
git checkout -b refactor/portfolio-improvements
```

- [ ] **Step 2: Fix `.gitignore` to prevent secret leaks**
Add `.env` and `.env.*` patterns (preserving `.env.example`).
Verify with `git status`.

- [ ] **Step 3: Remove circular self-dependency in `package.json`**
Remove `"joshtin.dev": "file:"` from `dependencies`.
Verify `pnpm install --frozen-lockfile` or `pnpm install`.

- [ ] **Step 4: Commit Task 1**
```bash
git commit -m "chore: setup refactor branch and sanitize gitignore and package manifest"
```

---

### Task 2: Resolve Tailwind v4 Compilation & CSS Failures

**Files:**
- Modify: `src/components/curriculum/sections/Hero.css` (or delete and move to Tailwind JSX)
- Modify: `src/components/Home/HomeHero.css` (or delete and move to Tailwind JSX)
- Modify: `src/components/logo/Logo.css` (or delete and move to Tailwind JSX)
- Modify: `src/components/commandPalette/KeyboardManager.css`
- Modify: `src/components/commandPalette/KeyboardManager.tsx:3` (fix self-import bug)

**Interfaces:**
- Consumes: Tailwind v4 in `src/app/globals.css`
- Produces: CSS files that compile cleanly under Webpack/PostCSS without missing `@reference` errors

- [ ] **Step 1: Fix `Hero.css`, `Logo.css`, `HomeHero.css`, and `KeyboardManager.css`**
Add `@reference "../../app/globals.css";` (or equivalent relative path) to any file retaining `@apply`, or refactor classes directly into JSX utility classes.

- [ ] **Step 2: Fix self-import in `KeyboardManager.tsx`**
Change `import './KeyboardManager'` to `import './KeyboardManager.css'`.

- [ ] **Step 3: Run `pnpm build` to verify compilation error is resolved**
Run: `pnpm build`
Expected: Next.js compiles without Tailwind `@apply` errors.

- [ ] **Step 4: Commit Task 2**
```bash
git commit -m "fix(css): migrate tailwind v4 styles and resolve self-import in KeyboardManager"
```

---

### Task 3: Data Sanitation & Privacy Clean-up (`cv.json`)

**Files:**
- Modify: `src/mocks/cv.json`
- Modify: `src/cv.d.ts`

**Interfaces:**
- Consumes: User preferences from Phase 1 & 3
- Produces: Sanitized CV data with canonical URL `https://joshtin.tech`, no phone numbers, no empty image paths, fixed typos

- [ ] **Step 1: Sanitize `cv.json`**
- Set `basics.url` to `https://joshtin.tech`.
- Remove phone number from `basics.phone`.
- Fix typos: "Desarrollador de Software", "Cartagena, Colombia", "Angular", correct dates format.
- In `projects`: fix empty string in `Sistema de Gestión Académica` (`img: []`).
- Ensure Twitter username matches `@joshtin2505`.

- [ ] **Step 2: Validate TypeScript compilation**
Run: `pnpm exec tsc --noEmit`
Expected: PASS (exit code 0).

- [ ] **Step 3: Commit Task 3**
```bash
git commit -m "data: sanitize cv schema, remove phone for privacy, and fix canonical domain"
```

---

### Task 4: SEO, Sitemap, Robots & Structured Data

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/components/seo/JsonLd.tsx`

**Interfaces:**
- Consumes: Sanitized `cv.json`
- Produces: Dynamic `sitemap.xml`, `robots.txt`, Schema.org `Person` + `WebSite` JSON-LD, validated Open Graph tags

- [ ] **Step 1: Create `src/app/robots.ts`**
Generate valid `robots.txt` allowing indexing and pointing to `https://joshtin.tech/sitemap.xml`.

- [ ] **Step 2: Create `src/app/sitemap.ts`**
Generate sitemap including `/` and `/curriculum` with `lastModified`.

- [ ] **Step 3: Create `src/components/seo/JsonLd.tsx`**
Implement Schema.org `Person` and `ProfilePage` structured data script (Server Component).

- [ ] **Step 4: Update `src/app/layout.tsx`**
- Configure `metadataBase: new URL('https://joshtin.tech')`.
- Remove phone from Open Graph.
- Set html `lang="es"`.
- Mount `JsonLd` component.
- Ensure proper favicon link in `<head>`.

- [ ] **Step 5: Run `pnpm build` to verify metadata generation**
Run: `pnpm build`
Expected: PASS. `/sitemap.xml` and `/robots.txt` present in build output.

- [ ] **Step 6: Commit Task 4**
```bash
git commit -m "feat(seo): add metadataBase, robots, sitemap, and Schema.org JSON-LD"
```

---

### Task 5: Accessibility & Navigation Refactoring

**Files:**
- Modify: `src/components/nav/NavBar.tsx`
- Modify: `src/components/footer/Footer.tsx`
- Modify: `src/components/logo/Logo.tsx`
- Modify: `src/components/Theme/ModeToggle.tsx`

**Interfaces:**
- Consumes: WCAG 2.2 AA guidelines
- Produces: Accessible navigation without nested interactive tags, single `<h1>` enforcement, active keyboard navigation

- [ ] **Step 1: Refactor `NavBar.tsx`**
- Replace broken `/blog` link with functional section links (`#proyectos`, `#experiencia`, `/curriculum`).
- Fix mobile toggle button: add accessible `aria-label="Abrir menú"`.
- Clean up unused CSS imports.

- [ ] **Step 2: Refactor `Logo.tsx`**
- Change `<h2>` to `<span>` to prevent multiple heading tags per page.

- [ ] **Step 3: Refactor `Footer.tsx`**
- Ensure all social media icon links have `aria-label` or `sr-only` names.
- Update copyright to current year dynamically.

- [ ] **Step 4: Run `pnpm lint` and `pnpm build`**
Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 5: Commit Task 5**
```bash
git commit -m "refactor(a11y): improve heading hierarchy, accessible names, and navigation links"
```

---

### Task 6: Bento Grid Portfolio UI Overhaul

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/Home/HomeHero.tsx`
- Modify: `src/components/Home/CardProject.tsx`
- Modify: `src/components/Home/PortfolioProjects.tsx`
- Create: `src/components/Home/ExperienceSection.tsx`
- Create: `src/components/Home/TechStackSection.tsx`
- Remove: Unused `Articles.tsx` and `DevTemplates.tsx` placeholders from home view

**Interfaces:**
- Consumes: `Direction B: Minimal Bento Grid` from Phase 3 spec
- Produces: High-converting, responsive home page with Work Experience, Curated Projects, and Categorized Skills

- [ ] **Step 1: Overhaul `HomeHero.tsx`**
- Single semantic `<h1>`: "Justin Castro Perez".
- Badge: "● Disponible para nuevos proyectos / contratación" with animated pulse.
- Concise, high-impact value proposition.
- CTAs: "Contactar", "Ver CV (PDF)", GitHub & LinkedIn direct buttons.

- [ ] **Step 2: Create `ExperienceSection.tsx`**
- Timeline of verified roles: Facture (ETL, MCP, IA), Nucleux (CRM SaaS, Next.js, AWS), La Casita de Papel (Fullstack).
- Focus on business and technical impact.

- [ ] **Step 3: Refactor `CardProject.tsx` and `PortfolioProjects.tsx`**
- Eliminate nested `<a><button>`.
- Fix disabled and `cursor-not-allowed` logic.
- Highlight Urbanestia and Creator Bundle Files with Problem → Solution → Results.

- [ ] **Step 4: Create `TechStackSection.tsx`**
- Replace generic "Tools I Use" with categorized badges: Frontend, Backend & Database, Cloud & DevOps.
- No subjective percentage bars.

- [ ] **Step 5: Assemble `src/app/page.tsx`**
Compose `HomeHero`, `ExperienceSection`, `PortfolioProjects`, and `TechStackSection` inside `BasicLayout`.

- [ ] **Step 6: Run `pnpm lint`, `tsc`, and `pnpm build`**
Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: PASS with 0 errors.

- [ ] **Step 7: Commit Task 6**
```bash
git commit -m "feat(ui): implement minimal bento grid layout with experience and showcase projects"
```

---

### Task 7: CI Automation & Code Quality Tooling

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `package.json` (add format/check scripts if needed)

**Interfaces:**
- Consumes: GitHub Actions runner
- Produces: Automated pipeline validating `tsc`, `lint`, and `build` on push and PRs

- [ ] **Step 1: Create `.github/workflows/ci.yml`**
Add workflow testing Node 22, pnpm, `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build`.

- [ ] **Step 2: Commit Task 7**
```bash
git commit -m "ci: add github actions workflow for automated typecheck, lint, and build verification"
```

---

### Task 8: Final Review & Quality Gate

- [ ] **Step 1: Run comprehensive local verification suite**
Execute:
1. `pnpm exec tsc --noEmit`
2. `pnpm lint`
3. `pnpm build`

- [ ] **Step 2: Generate verification report for user approval**
Log outputs, git commit log, and diff summary.
