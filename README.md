# NHB website

React and Express website implementing the Oct 12 website brief and Oct 27, 2026 meeting requirements. The public site keeps the light glass style, text-only NHB name and editorial typography requested in this session.

## Run locally

Requires Node 22.9 or newer. Dependencies are already installed in this workspace.

```sh
npm run dev
```

The frontend normally runs at http://localhost:3000 and proxies requests to the API on port 3001. Vite selects another frontend port if 3000 is occupied. Optional configuration is documented in `.env.example`; copy it to `.env` and set the values for your environment. If the API port is occupied, change `PORT` and `API_PROXY_TARGET` together.

## Manage content

Open `/admin` using the footer Admin link. Local development on loopback works without a key if `ADMIN_TOKEN` is unset. In production, set `NODE_ENV=production` and a long random `ADMIN_TOKEN`; enter that key in the admin sign-in form. Never expose it as a VITE variable. The key is held in browser session storage and cleared on sign-out.

- **Site content:** homepage heading, company introductions, numbers, career benefits, certification links, approved contact details, location query, company photos and corporate video. Upload official certification logos and certificate PDFs. Record final EVP, vacancy-list, company-fact and contact approvals in Content review; the admin overview shows the remaining asset checklist.
- **Gallery:** add, edit, remove, draft and publish photos or YouTube/Vimeo videos. Set the date, caption, category and featured flag. Optional before/after photos and story fields appear in the lightbox.
- **Bulk uploads:** up to 20 images at a time. The browser resizes images to a maximum 1920 px dimension and encodes WebP at 82% quality before upload. The server checks image signatures. Uploads start as drafts, ready for captions and approval.
- **Jobs:** add, edit, remove or unpublish openings. Active openings appear on Careers; each has an email application link with its title in the subject. Empty listings show a clear message and talent-pool link.
- **Pages:** create and publish simple text pages with search descriptions and an optional HTTPS reference link. Published pages appear in the footer and sitemap.
- **Inquiries:** review saved contact messages, quote requests and online applications. Download attachments through authenticated API requests. Submissions are saved on the server; automatic email delivery and Naukri integration are not configured.
- **Action tracker:** edit owners, due dates and status for Sales, Lean and HR content collection. The Oct 27 meeting summary and detailed notes disagree on Sales/Lean ownership; confirm internally. Its upcoming Monday is November 2, 2026.

## Implemented public experience

Eight navigation items cover Home, About, Products, Quality, Lean & Learning, Gallery, Careers and Contact. The homepage includes the lean identity, company numbers, a corporate-film section immediately below them, Why NHB and product/career calls to action. The corporate player loads only after a click, with no automatic playback.

Gallery has media/category filters, captioned lightboxes, dates, keyboard navigation and responsive video embeds. Featured published items appear on Lean & Learning; published items preview on Careers. Careers includes the six EVP benefits, regional lifestyle information, openings, email applications and optional online applications.

About, Products and Quality use concise text. Certification badges support approved document links. Contacts and the plant map read from editable site content. The contact form reports success only after the server saves the inquiry, and displays failures so visitors can retry.

Clean URLs and direct page reloads work in Vite and the production Express server. Production responses include page-specific titles, descriptions, canonical links, robots directives, `/robots.txt` and `/sitemap.xml`. Existing `/#careers`-style links remain supported. Page text renders through React; the site does not promise search-engine ranking or AI recommendations.

## Content and configuration still required

- Corporate-video publishing configuration, and reviewed event dates, captions and improvement stories for CMS gallery records.
- Confirmed vacancies and final EVP wording.
- Approved company facts, product details, certification documents, phone number, email contacts and precise plant location. Missing phone and sales/general email fields are left blank rather than invented.
- GA4 property measurement ID and production hosting/domain configuration.

Legacy demo jobs/media remain in the existing database as unpublished records labelled in the admin. Existing example reviews and inquiries are not shown as genuine submissions. The first startup with the new server backs up the original database to `server/data/db.pre-brief.json` before migrating it. The public photo collection now uses the supplied NHB presentation photography; legacy demo records remain unpublished.

## Analytics

Set `VITE_GA_MEASUREMENT_ID=G-...` and rebuild. The app then loads Google's tag and sends manual page views, career-page views, successful quote/contact leads, job applications and career-email clicks. It sends no form-field personal data as event parameters. Automatic page-view sending is disabled in the tag config. Also disable **Page changes based on browser history events** under the GA4 web stream's Enhanced Measurement settings to avoid duplicate SPA views.

Use GA4 Realtime/DebugView to verify actual delivery once an ID is configured. Engagement and time-on-site reporting are provided by GA4, not simulated locally. The admin's local page-view and browser-session counts are labelled separately and start at zero. Browser sessions are not a verified count of unique people.

References: [GA4 page views](https://developers.google.com/analytics/devguides/collection/ga4/views), [GA4 events](https://developers.google.com/analytics/devguides/collection/ga4/events).

## Checks

```sh
npm run build
npm test
```

The integration tests start an isolated temporary server/database and exercise publication, editing/removal, image upload validation, contact/quote/application persistence, protected attachment downloads, metadata, sitemap and restart persistence. They do not modify the working database. Browser-based visual and interaction verification must be completed separately; browser automation was unavailable during implementation.

## Production

```sh
npm run build
NODE_ENV=production npm start
```

Express serves `dist` and the API from the same origin. Set `ADMIN_TOKEN`, `SITE_URL`, a durable `DATA_DIR` and `HOST` as required by the hosting provider. The JSON store is designed for a single server process; use a shared database before running multiple application instances. Back up the data directory and keep private attachments outside public static hosting. The old `server/uploads` directory is not served by the new server.

Provision HTTPS through the production host or reverse proxy and renew the certificate there. Recreating the website does not itself repair a domain certificate. No deployment, DNS change, publication campaign, account connection or external message was performed.

## Liquid navbar and component structure

The header integrates the supplied Nimbus LiquidNavbar with NHB routes and lucide icons. Desktop has the animated water indicator; smaller screens retain the text mobile menu. Sound is off. The component pauses drawing off-screen or in a hidden tab, respects reduced-motion preferences, and falls back to a CSS indicator when WebGL is unavailable. Its original author credit is retained in the component and demo.

- Component: `src/components/ui/liquid-glass-navbar.tsx`
- Supplied demo: `src/components/ui/liquid-glass-navbar-demo.tsx` (a reusable source example, not a public route)
- Site integration: `src/components/Header.jsx`
- Shared styles/tokens: `src/index.css`; website theme: `src/glass-theme.css`
- Component-specific styles are included by the supplied navbar itself.

This project already used Tailwind v4. TypeScript support is now configured alongside the existing JavaScript files; use `npm run typecheck` for the `.ts`/`.tsx` components. Existing JSX pages need no migration.

`@/components/ui` resolves to `src/components/ui`. This is the project's equivalent of `/components/ui`: keeping reusable UI here makes imports predictable and lets shadcn's CLI place future components consistently. `components.json`, the Vite/TypeScript `@` aliases, shared theme tokens and `src/lib/utils.ts` configure the shadcn-compatible structure. TypeScript, clsx and tailwind-merge are installed. The liquid component itself only needs React and browser APIs; it needs no photos, image service, extra context provider or audio files.

To add another shadcn component later:

```sh
npx shadcn@latest add button
```

For a fresh project without this setup, follow the [official shadcn Vite guide](https://ui.shadcn.com/docs/installation/vite); this existing project is already configured, so initialization is unnecessary.

## NHB photography and motion

The public site uses 20 NHB photographs extracted from the supplied `KBM1.pptx`, `Process Flow.pptx` and `Dasehra presentation.pptx` decks. All 16 photo collection entries and the standalone images on Home, About, Careers and Lean & Learning now use these photographs. The hero rotates through the campus, lapping area, inspection equipment and practical workshop activity. CMS-supplied plant and people photos retain precedence over the bundled defaults.

Assets live in `public/images/nhb/` as WebP files, resized without upscaling to a maximum 1600 px edge. `docs/nhb-photo-assets.json` records the exact presentation, media part, slide and source hash for each asset. The Kaizen group photo is isolated from a composite slide graphic; decorative graphics, screenshots with application chrome and duplicate images were excluded. The original decks remain unchanged. Previous AI-generated and stock image files, including generated raster icons, have been removed from the project. `docs/image-assets.json` points to the active photography manifest. `/image-credits.html` describes the current photography sources.

The gallery supports category filters, progressive loading and enlarged views. Captions and alternative text describe the supplied NHB photographs. These bundled photos remain separate from CMS-managed event records; no event dates or improvement results were invented. Decorative motion respects reduced-motion preferences.

Phone layouts are consolidated in `src/mobile.css`, imported after the site theme. Breakpoints at 1050, 760, 480 and 380 px cover navigation collapse, stacked content, image grids and narrow phones. Mobile inputs use 16 px text, primary controls have 44 px targets, dialogs use dynamic viewport limits, and the hero distinguishes horizontal image swipes from vertical scrolling. Mobile menu Escape/resize behavior is handled in `Header.jsx`. Build/type checks pass; actual browser viewport and device testing remains pending because the browser host is unavailable.

The second phone-layout pass stacks the hero through 900 px, bounds its slideshow height, uses horizontally scrollable category controls, shows swipeable highlight cards and single-column photo walls on narrow phones, and improves narrow-screen form spacing. The WebGL desktop navigation is not mounted below 1051 px, reducing unnecessary phone graphics work. Mobile menus close on outside taps, Escape, route changes and resizing to desktop. Visual device testing is still pending because the browser host remains unavailable.

The supplied NHB corporate films are served from `public/videos/` as web-ready H.264/AAC MP4 files with fast start. Both the short and full versions are linked from Home and Gallery. File provenance and checksums are recorded in `docs/nhb-video-assets.json`. The CMS also accepts HTTPS MP4 URLs and YouTube/Vimeo links.
