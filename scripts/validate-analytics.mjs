/**
 * Static analytics validation (Capa 1 de playbooks/testing-strategy-analytics.md).
 *
 * Runs against the built HTML (default: deploy/, the merged monorepo output from
 * build.mjs) and fails the build if tracking is wrong. Deploy gate: a refactor
 * that silently drops an event, misspells one, or forgets a data-location stops
 * the deploy.
 *
 * Checks:
 *   1.  Every [data-event] has a data-location (all pages).
 *   1b. No data-event value that isn't in the event registry (typo guard).
 *   2.  Key pages have a WhatsApp CTA.
 *   3.  Home exposes its required data-sections.
 *   4.  Funnel pages ship tracking + enough tracked sections.
 *   5.  Conversion pages fire a conversion on load.
 *   6.  Per-page "expected events" manifest — the events that MUST be present.
 *
 * Dependency-free on purpose (no jsdom): regex over the generated HTML/JS so it
 * runs anywhere without an install step.
 *
 * Usage: node scripts/validate-analytics.mjs [dir]   (dir defaults to "deploy")
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const DEPLOY_DIR = process.argv[2] || process.env.VALIDATE_DIR || 'deploy';
const REGISTRY_PATH = process.env.EVENTS_REGISTRY || 'site/src/lib/tracking/events.ts';

// Pages that MUST have at least one WhatsApp CTA with tracking.
const PAGES_WITH_WA_CTA = [
  'index.html',
  'experiencias/restaurante/index.html',
  'experiencias/pesca-deportiva/index.html',
  'experiencias/eventos/index.html',
  'menu/index.html',
  'f/celebraciones/index.html',
];

// Home page must expose these sections for scroll/section analytics.
const HOME_REQUIRED_SECTIONS = ['hero', 'experiencias', 'especies', 'galeria', 'resenas', 'ubicacion'];

// Funnel entry pages must ship tracking scripts and enough tracked sections.
const FUNNEL_PAGES = ['f/celebraciones/index.html'];

// Conversion pages must fire a conversion on load.
const CONVERSION_PAGES = ['f/celebraciones/gracias/index.html'];

// Per-page expected events (regression lock). Each listed event MUST appear in
// the page — as a data-event attribute, or (behavioral/JS) in the page haystack.
const EXPECTED_EVENTS = {
  'index.html': ['whatsapp_click', 'experience_card_click', 'maps_click', 'page_scroll_depth'],
  'menu/index.html': ['whatsapp_click', 'menu_category_view'],
  'menu/carta/index.html': ['menu_category_view'],
  'experiencias/restaurante/index.html': ['whatsapp_click'],
  'experiencias/pesca-deportiva/index.html': ['whatsapp_click'],
  'experiencias/eventos/index.html': ['whatsapp_click', 'eventos_ver_paquetes'],
  'f/celebraciones/index.html': ['funnel_whatsapp_click', 'funnel_section_view'],
};

// Applied to every blog post page (contenido/<slug>/index.html), excluding the
// list page and category pages.
const BLOG_POST_EVENTS = ['blog_back_click', 'blog_article_read'];

const errors = [];
const warnings = [];

/** Recursively collect every .html file under a directory. */
async function collectHtml(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectHtml(full)));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Collect files with a given extension under a directory. */
async function collectByExt(dir, ext) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectByExt(full, ext)));
    else if (entry.isFile() && entry.name.endsWith(ext)) out.push(full);
  }
  return out;
}

async function read(page) {
  try {
    return await readFile(join(DEPLOY_DIR, page), 'utf-8');
  } catch {
    return null;
  }
}

/**
 * Page HTML plus (for funnels only) its bundled JS. Astro moves processed
 * <script> tags into f/<name>/_astro/*.js, so funnel tracking/conversion code
 * isn't in the HTML. Site behavioral events are is:inline, so they stay in HTML.
 */
async function pageHaystack(page) {
  const html = (await read(page)) ?? '';
  const parts = page.split('/');
  if (parts[0] !== 'f' || parts.length < 2) return html;
  const jsFiles = await collectByExt(join(DEPLOY_DIR, 'f', parts[1]), '.js');
  const js = (await Promise.all(jsFiles.map((f) => readFile(f, 'utf-8')))).join('\n');
  return html + '\n' + js;
}

/** Read the event registry (events.ts) as text and extract the event names. */
async function loadRegistry() {
  try {
    const src = await readFile(REGISTRY_PATH, 'utf-8');
    const block = src.match(/ANALYTICS_EVENTS\s*=\s*\[([\s\S]*?)\]\s*as const/);
    if (!block) return null;
    return new Set([...block[1].matchAll(/['"]([a-z0-9_]+)['"]/gi)].map((m) => m[1]));
  } catch {
    return null;
  }
}

/** Every opening tag that has data-event must also have data-location. */
function findEventsMissingLocation(html) {
  const offenders = [];
  const tagRe = /<[a-zA-Z][^>]*\bdata-event\b[^>]*>/g;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    if (!/\bdata-location\b/.test(m[0])) offenders.push(m[0].slice(0, 140));
  }
  return offenders;
}

function hasWaCta(html) {
  return (
    html.includes('data-event="whatsapp_click"') ||
    html.includes('data-event="funnel_whatsapp_click"')
  );
}

function hasTrackingScript(html) {
  return (
    html.includes('gtm.js') ||
    html.includes('gtag') ||
    html.includes('fbq') ||
    html.includes('ttq')
  );
}

/** Assert each expected event is present in a page's haystack. */
async function assertExpectedEvents(page, expected) {
  const hay = await pageHaystack(page);
  if (!hay.trim()) {
    errors.push(`${page}: file not found — expected events cannot be verified`);
    return;
  }
  for (const ev of expected) {
    // Minifiers may emit any quote style (Vite 8 / Oxc prefers backticks).
    const present =
      hay.includes(`data-event="${ev}"`) || ['\'', '"', '`'].some((q) => hay.includes(q + ev + q));
    if (!present) errors.push(`${page}: expected event "${ev}" not found`);
  }
}

// ── 1. Global: data-location present + collect used events ──────────────────
const allHtml = await collectHtml(DEPLOY_DIR);
if (allHtml.length === 0) {
  console.error(`❌ No HTML found in "${DEPLOY_DIR}/". Run the build first (node build.mjs).`);
  process.exit(1);
}
const usedEvents = new Set();
for (const file of allHtml) {
  const html = await readFile(file, 'utf-8');
  const offenders = findEventsMissingLocation(html);
  if (offenders.length > 0) {
    const rel = relative(DEPLOY_DIR, file).split(sep).join('/');
    errors.push(`${rel}: ${offenders.length} element(s) with data-event but missing data-location`);
    offenders.slice(0, 3).forEach((t) => errors.push(`    ↳ ${t}`));
  }
  for (const m of html.matchAll(/data-event="([^"]+)"/g)) usedEvents.add(m[1]);
}

// ── 1b. No data-event value that isn't in the registry ──────────────────────
const registry = await loadRegistry();
if (!registry) {
  warnings.push(`Could not read event registry at "${REGISTRY_PATH}" — skipping typo guard`);
} else {
  for (const ev of usedEvents) {
    if (!registry.has(ev)) {
      errors.push(`Unknown event "${ev}" is not in the registry (${REGISTRY_PATH}). Add it or fix the typo.`);
    }
  }
}

// ── 2. WhatsApp CTA present on key pages ────────────────────────────────────
for (const page of PAGES_WITH_WA_CTA) {
  const html = await read(page);
  if (html === null) {
    errors.push(`${page}: file not found (page moved/removed, or build incomplete)`);
    continue;
  }
  if (!hasWaCta(html)) errors.push(`${page}: no WhatsApp CTA with data-event found`);
}

// ── 3. Home has required tracked sections ───────────────────────────────────
{
  const html = await read('index.html');
  if (html) {
    for (const name of HOME_REQUIRED_SECTIONS) {
      if (!html.includes(`data-section="${name}"`)) {
        errors.push(`index.html: missing data-section="${name}"`);
      }
    }
  }
}

// ── 4. Funnel pages ship tracking + enough tracked sections ─────────────────
for (const page of FUNNEL_PAGES) {
  const html = await read(page);
  if (html === null) {
    warnings.push(`${page}: not found (funnel not built?) — skipping funnel checks`);
    continue;
  }
  const hay = await pageHaystack(page);
  if (!hasTrackingScript(hay)) errors.push(`${page}: no tracking script (gtm/gtag/fbq/ttq) found`);
  const sectionCount = (html.match(/data-section=/g) || []).length;
  if (sectionCount < 5) {
    errors.push(`${page}: only ${sectionCount} tracked section(s), expected at least 5`);
  }
}

// ── 5. Conversion pages fire a conversion on load ───────────────────────────
for (const page of CONVERSION_PAGES) {
  const html = await read(page);
  if (html === null) {
    warnings.push(`${page}: not found — skipping conversion check`);
    continue;
  }
  const hay = await pageHaystack(page);
  const fires =
    hay.includes('generate_lead') || hay.includes('SubmitForm') || /['"`]Lead['"`]/.test(hay);
  if (!fires) errors.push(`${page}: no conversion event (generate_lead / Lead / SubmitForm) on load`);
}

// ── 6. Per-page expected events (regression lock) ───────────────────────────
for (const [page, expected] of Object.entries(EXPECTED_EVENTS)) {
  await assertExpectedEvents(page, expected);
}
for (const file of allHtml) {
  const rel = relative(DEPLOY_DIR, file).split(sep).join('/');
  if (/^contenido\/[^/]+\/index\.html$/.test(rel) && !rel.startsWith('contenido/categoria/')) {
    await assertExpectedEvents(rel, BLOG_POST_EVENTS);
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
if (warnings.length > 0) {
  console.warn('⚠️  Analytics validation warnings:');
  warnings.forEach((w) => console.warn(`  - ${w}`));
  console.warn('');
}

if (errors.length > 0) {
  console.error(`❌ Analytics validation failed (${errors.length} issue(s)) in "${DEPLOY_DIR}/":\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log(
  `✅ Analytics validation passed (${allHtml.length} page(s), ${usedEvents.size} distinct events, registry ${registry ? 'OK' : 'skipped'})`,
);
