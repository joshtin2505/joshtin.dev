# Payload CMS 3 + Neon DB + i18n + Page Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Payload CMS 3 with Neon Serverless Postgres and Neon S3-compatible Blob Storage into the Next.js 15 App Router portfolio, providing full bilingual i18n, a drag-and-drop Page Builder for the homepage, a technical blog, and an automated data migration seed from `cv.json`.

**Architecture:** App Router directory split into `src/app/(frontend)` for the public site and `src/app/(payload)` for the admin panel and API. Payload configured in `payload.config.ts` using `@payloadcms/db-postgres`, `@payloadcms/storage-s3`, and `@payloadcms/richtext-lexical`. Next.js Server Components query Payload Local API with a resilient fallback to `cv.json` during local setup.

**Tech Stack:** Next.js 15.5.x, React 19, TypeScript, Tailwind CSS v4, Payload CMS 3.x (`payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/storage-s3`, `@payloadcms/richtext-lexical`, `@payloadcms/ui`), Neon Postgres.

**Spec:** `docs/superpowers/specs/2026-10-12-payload-cms-neon-architecture-design.md`

## Global Constraints

- Next.js 15.5.27 and React 19 compatibility.
- Strict TypeScript (`strict: true`) with zero `any` evasions on content models.
- No secrets in git: `DATABASE_URI`, `PAYLOAD_SECRET`, and `S3_*` reside exclusively in `.env.local`.
- Zero broken routes during transition: Existing URLs (`/`, `/curriculum`, `/robots.txt`, `/sitemap.xml`) must continue working.
- WCAG 2.2 AA compliance: unique `<h1>`, keyboard navigation, accessible forms and buttons.
- Rule 7 compliance: Request user approval before running `pnpm add` for dependencies.

## Review Focus

1. **Unconfigured Database Environment**: When `DATABASE_URI` is missing or invalid in local dev, the frontend must not crash at build time — it must cleanly fall back to `src/mocks/cv.json`.
2. **Empty Blog / Draft State**: When visiting `/blog` or a draft URL without published posts, the UI must render an empty state gracefully and return 404 for unpublished drafts to unauthenticated visitors.
3. **Missing Image Fallback**: Projects or Posts without uploaded media must display an elegant fallback badge/gradient rather than throwing `next/image` errors.
4. **Locale Switching Edge Cases**: Toggling between `es` and `en` when a specific field lacks an English translation must fall back cleanly to Spanish content without throwing null pointer exceptions.
5. **Next.js 15 App Router Segments Isolation**: Route group isolation between `(frontend)` and `(payload)` must not duplicate global HTML/body tags or collide on root styling.

---

### Task 1: Scaffolding App Router Route Groups & Package Setup

**Files:**
- Create: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- Create: `src/app/(payload)/api/[...slug]/route.ts`
- Create: `src/app/(payload)/layout.tsx`
- Move/Restructure: `src/app/page.tsx` -> `src/app/(frontend)/page.tsx`
- Move/Restructure: `src/app/layout.tsx` -> `src/app/(frontend)/layout.tsx`
- Move/Restructure: `src/app/curriculum/` -> `src/app/(frontend)/curriculum/`
- Modify: `package.json`

**Interfaces:**
- Consumes: Existing Next.js 15 App Router structure.
- Produces: Isolated route groups `(frontend)` and `(payload)`.

- [x] **Step 1: Request dependency installation approval from user**
Packages needed: `payload@^3.x`, `@payloadcms/next@^3.x`, `@payloadcms/db-postgres@^3.x`, `@payloadcms/storage-s3@^3.x`, `@payloadcms/richtext-lexical@^3.x`, `@payloadcms/ui@^3.x`, `graphql@^16.x`.

- [x] **Step 2: Reorganize App Router files into `src/app/(frontend)/` and `src/app/(payload)/`**
Ensure `src/app/(frontend)/layout.tsx` owns the public HTML/body structure and `src/app/(payload)/layout.tsx` configures Payload admin styles.

- [x] **Step 3: Verify TypeScript and compilation**
Run: `pnpm exec tsc --noEmit`
Expected: PASS with 0 errors.

- [x] **Step 4: Commit**
```bash
git add src/app/ package.json
git commit -m "refactor(app): isolate App Router route groups for frontend and payload"
```

---

### Task 2: Payload Configuration, Database Adapter & Base Collections

**Files:**
- Create: `src/payload.config.ts`
- Create: `src/collections/Users.ts`
- Create: `src/collections/Media.ts`
- Create: `.env.example`

**Interfaces:**
- Consumes: `DATABASE_URI`, `PAYLOAD_SECRET`, `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`.
- Produces: Exported Payload configuration object `buildConfig({ ... })`.

- [x] **Step 1: Implement `Users` collection**
Define authentication collection with admin access rules.

- [x] **Step 2: Implement `Media` collection with S3 storage adapter configuration**
Configure upload collection with responsive sizing, alt text field (localized), and `@payloadcms/storage-s3` integration.

- [x] **Step 3: Implement `payload.config.ts` with Neon Postgres adapter and localization**
Configure `@payloadcms/db-postgres` with SSL pooler connection, `localization: { locales: ['es', 'en'], defaultLocale: 'es', fallback: true }`, and Lexical editor.

- [x] **Step 4: Document required environment variables in `.env.example`**
Include `DATABASE_URI`, `PAYLOAD_SECRET`, and S3 parameters with explanatory comments.

- [x] **Step 5: Verify configuration types**
Run: `pnpm exec tsc --noEmit`
Expected: PASS with 0 errors.

- [x] **Step 6: Commit**
```bash
git add src/payload.config.ts src/collections/Users.ts src/collections/Media.ts .env.example
git commit -m "feat(payload): setup base configuration with postgres and media storage"
```

---

### Task 3: Content Modeling — Core Portfolio Collections (`Skills`, `Experiences`, `Projects`)

**Files:**
- Create: `src/collections/Skills.ts`
- Create: `src/collections/Experiences.ts`
- Create: `src/collections/Projects.ts`
- Modify: `src/payload.config.ts`

**Interfaces:**
- Consumes: `Media` collection, `localization`.
- Produces: `Skills`, `Experiences`, and `Projects` collection configs added to `payload.config.ts`.

- [x] **Step 1: Implement `src/collections/Skills.ts`**
Fields: `name` (unique, required), `category` (`frontend`, `backend`, `cloud-devops`, `tools`, `mobile`), `iconKey`, `proficiency`.

- [x] **Step 2: Implement `src/collections/Experiences.ts`**
Fields: `company`, `role` (localized), `startDate`, `endDate`, `isCurrent`, `summary` (localized), `achievements` (array of localized items), `techStack` (relationship to Skills), `companyUrl`.

- [x] **Step 3: Implement `src/collections/Projects.ts`**
Fields: `title` (localized), `slug` (native slug field), `summary` (localized), `description` (richText Lexical, localized), `featured`, `order`, `techStack` (relationship to Skills), `links` (liveUrl, githubUrl), `coverImage` (upload relation to Media), `gallery`, `versions: { drafts: true }`.

- [x] **Step 4: Register collections in `payload.config.ts`**
Add `Skills`, `Experiences`, and `Projects` to `collections` array.

- [x] **Step 5: Verify types**
Run: `pnpm exec tsc --noEmit`
Expected: PASS with 0 errors.

- [x] **Step 6: Commit**
```bash
git add src/collections/Skills.ts src/collections/Experiences.ts src/collections/Projects.ts src/payload.config.ts
git commit -m "feat(payload): add Skills, Experiences, and Projects collections with i18n"
```

---

### Task 4: Content Modeling — Blog Collection (`Posts`), Globals (`Profile`), and Page Builder Blocks

**Files:**
- Create: `src/collections/Posts.ts`
- Create: `src/globals/Profile.ts`
- Create: `src/globals/HomePage.ts`
- Create: `src/blocks/HeroBlock.ts`
- Create: `src/blocks/ProjectsBlock.ts`
- Create: `src/blocks/ExperienceBlock.ts`
- Create: `src/blocks/TechStackBlock.ts`
- Create: `src/blocks/BlogFeedBlock.ts`
- Create: `src/blocks/ContactBlock.ts`
- Modify: `src/payload.config.ts`

**Interfaces:**
- Consumes: Core collections and Lexical editor.
- Produces: `Posts` collection, `Profile` global, and `HomePage` Page Builder with blocks.

- [x] **Step 1: Implement `src/collections/Posts.ts`**
Fields: `title` (localized), `slug` (native slug), `publishedAt`, `excerpt` (localized), `content` (richText Lexical, localized), `coverImage` (upload to Media), `tags`, `readTime`, `versions: { drafts: true }`.

- [x] **Step 2: Implement `src/globals/Profile.ts`**
Fields: `fullName`, `jobTitle` (localized), `shortBio` (localized), `fullBio` (richText, localized), `availability`, `email`, `socialLinks`, `avatar` (upload to Media).

- [x] **Step 3: Implement Page Builder blocks in `src/blocks/`**
Define schemas for `HeroBlock`, `ProjectsBlock`, `ExperienceBlock`, `TechStackBlock`, `BlogFeedBlock`, and `ContactBlock` with individual toggles (`enabled`) and localized titles/subtitles.

- [x] **Step 4: Implement `src/globals/HomePage.ts`**
Field: `layout` (type: `blocks`, containing the 6 defined blocks).

- [x] **Step 5: Register Posts, Profile, and HomePage in `payload.config.ts`**

- [x] **Step 6: Verify types**
Run: `pnpm exec tsc --noEmit`
Expected: PASS with 0 errors.

- [x] **Step 7: Commit**
```bash
git add src/collections/Posts.ts src/globals/ src/blocks/ src/payload.config.ts
git commit -m "feat(payload): add Posts blog collection, Profile global, and HomePage blocks"
```

---

### Task 5: Automated Seed Migration Script (`cv.json` -> Neon Database)

**Files:**
- Create: `src/scripts/seed.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `src/mocks/cv.json`, Payload Local API.
- Produces: Populated database records in Neon for `Profile`, `Skills`, `Experiences`, `Projects`, and `HomePage`.

- [x] **Step 1: Implement `src/scripts/seed.ts`**
Map `cv.json` fields into Payload documents:
- Insert/match Skills.
- Insert Experiences with skill relations.
- Insert Projects with skill relations.
- Update `Profile` global.
- Create default `HomePage` block ordering matching current portfolio layout.
Ensure execution is idempotent (skip duplicates if records already exist).

- [x] **Step 2: Add `"seed"` command in `package.json`**
Command: `"seed": "tsx src/scripts/seed.ts"`

- [x] **Step 3: Verify TypeScript compilation**
Run: `pnpm exec tsc --noEmit`
Expected: PASS with 0 errors.

- [x] **Step 4: Commit**
```bash
git add src/scripts/seed.ts package.json
git commit -m "feat(seed): add automated migration script from cv.json to database"
```

---

### Task 6: Resilient Data Fetching & Dynamic Page Builder on Homepage

**Files:**
- Create: `src/lib/payload/queries.ts`
- Create: `src/components/Home/blocks/BlockRenderer.tsx`
- Create: `src/components/Home/blocks/DynamicHeroBlock.tsx`
- Create: `src/components/Home/blocks/DynamicProjectsBlock.tsx`
- Create: `src/components/Home/blocks/DynamicExperienceBlock.tsx`
- Create: `src/components/Home/blocks/DynamicTechStackBlock.tsx`
- Create: `src/components/Home/blocks/DynamicBlogFeedBlock.tsx`
- Modify: `src/app/(frontend)/page.tsx`

**Interfaces:**
- Consumes: Payload Local API queries with fallback to `cv.json` if database is unconfigured.
- Produces: Dynamically rendered homepage based on the blocks ordered in Payload.

- [x] **Step 1: Implement `src/lib/payload/queries.ts` with graceful fallback**
Functions: `getProfileData(locale)`, `getHomePageLayout(locale)`, `getProjectsData(locale)`, `getExperiencesData(locale)`, `getSkillsData()`, `getLatestPosts(locale)`.
If `process.env.DATABASE_URI` is unset, return parsed data from `cv.json`.

- [x] **Step 2: Implement block components and `BlockRenderer.tsx`**
Map block types (`hero`, `projects`, `experience`, `techStack`, `blogFeed`, `contact`) to modern UI components respecting the Bento Grid design.

- [x] **Step 3: Update `src/app/(frontend)/page.tsx` to render dynamic blocks**
Async Server Component reading locale and rendering `<BlockRenderer layout={layout} />`.

- [x] **Step 4: Run build check to verify fallback and rendering**
Run: `pnpm build`
Expected: PASS with exit code 0.

- [x] **Step 5: Commit**
```bash
git add src/lib/payload/ src/components/Home/blocks/ src/app/\(frontend\)/page.tsx
git commit -m "feat(ui): implement dynamic Page Builder block renderer with resilient fallback"
```

---

### Task 7: Technical Blog Pages (`/blog` and `/blog/[slug]`) & Lexical RichText Renderer

**Files:**
- Create: `src/components/blog/RichText.tsx`
- Create: `src/app/(frontend)/blog/page.tsx`
- Create: `src/app/(frontend)/blog/[slug]/page.tsx`
- Modify: `src/app/(frontend)/sitemap.ts`

**Interfaces:**
- Consumes: `getLatestPosts`, `getPostBySlug` from `queries.ts`.
- Produces: Public `/blog` index and `/blog/[slug]` article pages with metadata and structured data.

- [x] **Step 1: Implement `RichText.tsx` serializer**
Render Lexical nodes into accessible semantic HTML styled with Tailwind Typography (`prose prose-invert`).

- [x] **Step 2: Implement `src/app/(frontend)/blog/page.tsx`**
List published articles with cover image, tags, read time, excerpt, and publication date. Include empty state when no posts exist.

- [x] **Step 3: Implement `src/app/(frontend)/blog/[slug]/page.tsx`**
Dynamic article page with `generateMetadata`, JSON-LD `BlogPosting` structured data, back navigation, and RichText content.

- [x] **Step 4: Update `sitemap.ts` to include dynamic blog post URLs**

- [x] **Step 5: Run typecheck and build**
Run: `pnpm exec tsc --noEmit && pnpm build`
Expected: PASS with 0 errors.

- [x] **Step 6: Commit**
```bash
git add src/components/blog/ src/app/\(frontend\)/blog/ src/app/\(frontend\)/sitemap.ts
git commit -m "feat(blog): implement blog list, article detail pages, and rich-text serializer"
```

---

### Task 8: Language Switcher UI, Curriculum Sizing & Quality Verification

**Files:**
- Create: `src/components/nav/LanguageSwitcher.tsx`
- Modify: `src/components/nav/NavBar.tsx`
- Modify: `src/app/(frontend)/curriculum/page.tsx`

**Interfaces:**
- Consumes: Locale state/cookie.
- Produces: Interactive language switcher (`ES` / `EN`) in navigation and synced `/curriculum` page.

- [x] **Step 1: Implement accessible `LanguageSwitcher.tsx`**
Accessible pill/toggle with `aria-label` and active indicator.

- [x] **Step 2: Integrate `LanguageSwitcher` into `NavBar.tsx`**

- [x] **Step 3: Update `/curriculum/page.tsx` to read from Payload queries**
Feed the CV sections from the centralized database instead of importing `cv.json` directly.

- [x] **Step 4: Run full Definition of Done verification**
Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: All commands exit cleanly with code 0.

- [x] **Step 5: Commit**
```bash
git add src/components/nav/ src/app/\(frontend\)/curriculum/
git commit -m "feat(i18n): add language switcher in navigation and sync curriculum data"
```
