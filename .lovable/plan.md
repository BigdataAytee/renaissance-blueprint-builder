## What you'll see

A new section on every Business Sector detail page — placed between Services and Industries — titled "Products & Solutions in Motion". It shows a set of cinematic looping video cards, alternating layout (media left / text right, then reversed), with dark overlays, rounded corners, soft shadows, and a subtle Ken Burns zoom. Each card is captioned with the specific products, materials, or services it depicts (e.g. "Cocoa & rubber plantations", "Pipelines & storage tanks", "Welding & steel fabrication").

## Scope options — please pick one

The visual/layout work is quick. The heavy cost is sourcing sector-specific stock footage: search Mixkit/Pexels/Coverr, download, transcode each clip to WebM + MP4, and upload to the Lovable CDN.

**Option A — Full coverage (recommended, larger effort)**
- 3 new videos per sector × 8 sectors = **24 new clips**
- Each sector gets 3 alternating media cards covering its top product/service themes
- Highest fidelity to your brief; longest to execute

**Option B — Balanced (medium effort)**
- 2 new videos per sector × 8 sectors = **16 new clips**
- Each sector gets 2 alternating cards, plus the existing sector hero video reused as a third card with a different caption
- Good visual variety, roughly half the sourcing work

**Option C — Lean (fastest)**
- 1 new video per sector × 8 sectors = **8 new clips**
- One new alternating media card per sector, plus the existing hero video reused with a different framing/caption
- Ships today; visuals are less varied

## Technical approach (all options)

1. Add a `mediaShowcase: { videoWebm; videoMp4; poster?; title; caption; products: string[] }[]` field to each sector in `src/lib/sector-content.ts`.
2. Source clips from Mixkit/Pexels (royalty-free), transcode with `ffmpeg` to VP9 WebM (~1–2 MB) + H.264 MP4 fallback, upload via `lovable-assets`.
3. New `SectorMediaShowcase` component in `src/routes/business-sectors.$slug.tsx`:
   - Alternating two-column rows (`lg:grid-cols-2`), reversed via `lg:[&:nth-child(even)]:[direction:rtl]` or explicit ordering.
   - Video: `autoPlay muted loop playsInline preload="metadata"`, lazy-loaded via `IntersectionObserver`, paused when off-screen (same pattern as existing sector cards).
   - Rounded corners (`rounded-2xl`), shadow (`shadow-2xl`), gradient overlay for readability, `motion-safe` Ken Burns keyframe (already defined in `styles.css`).
4. Text side: card title, 1-line description, and a small chip list of the specific products/materials it visualises — pulled from the content you added earlier.

## What I need from you

Reply with **A**, **B**, or **C** and I'll execute in the next turn. If you want a different split (e.g. "3 for Agriculture and Oil & Gas, 2 for the rest"), just say so.
