/**
 * Static analytics validation (Capa 1 de playbooks/testing-strategy-analytics.md).
 *
 * Runs against the built HTML (default: deploy/, the merged monorepo output from
 * build.mjs) and fails the build if tracking attributes are missing. This is a
 * deploy gate: a refactor that silently drops a data-event/data-location/
 * data-section — or a missing pixel on a funnel — stops the deploy.
 *
 * Dependency-free on purpose (no jsdom): regex over the generated HTML so it can
 * run anywhere without an install step.
 *
 * Usage: node scripts/validate-analytics.mjs [dir]   (dir defaults to "deploy")
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const DEPLOY_DIR = process.argv[2] || process.env.VALIDATE_DIR || 'deploy';

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

async function read(page) {
  try {
    return await readFile(join(DEPLOY_DIR, page), 'utf-8');
  } catch {
    return null;
  }
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

/**
 * Astro bundles processed <script> tags into _astro/*.js, so tracking/conversion
 * code is NOT in the page HTML. This returns the page HTML plus all JS bundles
 * scoped to the page's funnel (f/<name>) so string checks can find them.
 */
async function pageHaystack(page) {
  const html = (await read(page)) ?? '';
  const parts = page.split('/');
  const rootRel = parts[0] === 'f' && parts.length > 1 ? join('f', parts[1]) : '';
  const jsFiles = await collectByExt(join(DEPLOY_DIR, rootRel), '.js');
  const js = (await Promise.all(jsFiles.map((f) => readFile(f, 'utf-8')))).join('\n');
  return html + '\n' + js;
}

/** Every opening tag that has data-event must also have data-location. */
function findEventsMissingLocation(html) {
  const offenders = [];
  const tagRe = /<[a-zA-Z][^>]*\bdata-event\b[^>]*>/g;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    const tag = m[0];
    if (!/\bdata-location\b/.test(tag)) offenders.push(tag.slice(0, 140));
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

// ── 1. Global: no data-event without data-location (all pages) ──────────────
const allHtml = await collectHtml(DEPLOY_DIR);
if (allHtml.length === 0) {
  console.error(`❌ No HTML found in "${DEPLOY_DIR}/". Run the build first (node build.mjs).`);
  process.exit(1);
}
for (const file of allHtml) {
  const html = await readFile(file, 'utf-8');
  const offenders = findEventsMissingLocation(html);
  if (offenders.length > 0) {
    const rel = relative(DEPLOY_DIR, file).split(sep).join('/');
    errors.push(`${rel}: ${offenders.length} element(s) with data-event but missing data-location`);
    offenders.slice(0, 3).forEach((t) => errors.push(`    ↳ ${t}`));
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
    hay.includes('generate_lead') ||
    hay.includes('SubmitForm') ||
    /['"]Lead['"]/.test(hay);
  if (!fires) errors.push(`${page}: no conversion event (generate_lead / Lead / SubmitForm) on load`);
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

console.log(`✅ Analytics validation passed (${allHtml.length} page(s) checked in "${DEPLOY_DIR}/")`);
