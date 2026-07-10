# Admin Dashboard (CMS) Plan

Add a secure `/admin` area powered by Lovable Cloud. Public pages keep their current design; content that used to be hardcoded is loaded from the database. Sign-in required; only users with an `admin` role can access the dashboard.

## Scope of managed content

1. **Job vacancies** — replaces hardcoded list on `/careers`
2. **News / Blog posts** — new `/news` list + `/news/$slug` detail
3. **Events** — new `/events` list with date/location
4. **Gallery images** — new `/gallery` grid
5. **Team members** — new `/team` grid (also usable on About)

Site settings (email/phone/hero copy) stay in `src/lib/site-data.ts` this round to avoid touching the existing design. Can be moved into DB later.

## Auth & access control

- Enable Lovable Cloud (Supabase under the hood).
- Email/password sign-in at `/admin/login`. First-run setup: whoever signs up first is auto-granted `admin` role via a one-time trigger; subsequent users get no role by default.
- Roles stored in a separate `user_roles` table with `app_role` enum (`admin`, `editor`). `has_role()` security-definer function used in all RLS policies (never query the same table inside its own policy).
- Route protection: `/admin/*` lives under a `_authenticated` layout with a role check that redirects non-admins.

## Database schema (migration)

```text
enum app_role: 'admin' | 'editor'
user_roles(id, user_id → auth.users, role, unique(user_id, role))
vacancies(id, title, location, type, description, is_published, sort_order, created_at, updated_at)
news_posts(id, slug unique, title, excerpt, body_md, cover_url, is_published, published_at, created_at, updated_at)
events(id, title, slug unique, starts_at, ends_at, location, description, cover_url, is_published, created_at, updated_at)
gallery_images(id, image_url, caption, sort_order, is_published, created_at)
team_members(id, name, role, bio, photo_url, sort_order, is_published, created_at)
```

Each table:
- RLS enabled
- Public `SELECT` policy `TO anon, authenticated` where `is_published = true`
- Admin `ALL` policy via `has_role(auth.uid(),'admin')`
- Grants: `SELECT` to `anon` + `authenticated`, full to `service_role`, and INSERT/UPDATE/DELETE to `authenticated` (RLS restricts to admins)

Storage bucket `cms-media` (public read) for image uploads from the admin.

## Public site wiring

Load data via `createServerFn` using the server publishable client (RLS as anon), called from route loaders:

- `/careers` — reads `vacancies` where published (existing UI reused).
- `/news`, `/news/$slug` — new routes with SEO head from row data.
- `/events` — new route.
- `/gallery`, `/team` — new routes.
- Small "Latest news" strip on `/` (optional, minimal design impact).

Realtime: use Supabase realtime subscription on the browser client for the affected pages so admin edits appear without a refresh (falls back to normal loader on first paint).

## Admin dashboard UI

Routes under `src/routes/_authenticated/admin/`:

- `admin/index` — overview (counts per collection, quick links)
- `admin/vacancies` — list + create/edit dialog
- `admin/news` — list + editor (title, slug auto, excerpt, markdown body, cover image upload, publish toggle)
- `admin/events` — list + form
- `admin/gallery` — grid with drag-drop upload + reorder
- `admin/team` — list + form with photo upload

Reuses existing shadcn components (Button, Input, Textarea, Dialog, Table, Switch, etc). Sidebar layout distinct from public site but using the same design tokens.

Authenticated server functions (`.middleware([requireSupabaseAuth])`) handle mutations after verifying `has_role(userId,'admin')`.

## Files to add/change (high level)

- New migration: schema + RLS + grants + role auto-grant trigger + storage bucket policy
- `src/routes/_authenticated/route.tsx` (integration-managed gate) — existing pattern
- `src/routes/_authenticated/admin.*.tsx` — dashboard routes
- `src/routes/auth.tsx` — sign-in / sign-up (admin only)
- `src/lib/cms/*.functions.ts` — read (public) + write (admin) server fns
- `src/lib/cms/queries.ts` — shared query options
- New public routes: `news`, `news.$slug`, `events`, `gallery`, `team`
- `src/routes/careers.tsx` — swap hardcoded array for loader data (UI unchanged)
- Header nav gains News/Events/Gallery links (kept minimal so design isn't disrupted; can be limited to footer if you prefer)

## What stays the same

- Every existing page's layout, colours, typography, hero copy, videos, and animations
- Contact form's current mail flow
- `site-data.ts` values

## Not included in this pass

- Editing global site settings from admin (add later if desired)
- Multi-language content
- Draft previews / scheduled publishing (only a publish toggle)
- Google/social sign-in for admin (email/password only)

Approve to proceed and I'll enable Cloud, run the migration, and build it out.
