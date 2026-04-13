/**
 * Monorepo build script for Cloudflare Pages.
 *
 * 1. Builds the main site  → site/dist/
 * 2. Builds each funnel    → funnels/<name>/dist/
 * 3. Merges everything into deploy/  (site at root, funnels under /f/<name>/)
 *
 * Cloudflare Pages "Build output directory" → deploy
 */

import { execSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname;
const DEPLOY = join(ROOT, 'deploy');

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

// ── Clean previous deploy ──────────────────────────────────────
rmSync(DEPLOY, { recursive: true, force: true });
mkdirSync(DEPLOY, { recursive: true });

// ── Build main site ────────────────────────────────────────────
run('npm run build --workspace=site');
cpSync(join(ROOT, 'site', 'dist'), DEPLOY, { recursive: true });

// ── Build each funnel ──────────────────────────────────────────
const funnelsDir = join(ROOT, 'funnels');
const funnels = readdirSync(funnelsDir).filter((name) => {
  const full = join(funnelsDir, name);
  return statSync(full).isDirectory() && name !== 'node_modules';
});

for (const funnel of funnels) {
  run(`npm run build --workspace=funnels/${funnel}`);

  const funnelDist = join(funnelsDir, funnel, 'dist');
  const target = join(DEPLOY, 'f', funnel);
  mkdirSync(target, { recursive: true });
  cpSync(funnelDist, target, { recursive: true });
}

console.log('\n✅ Build complete → deploy/');
console.log('   Site:    /');
for (const funnel of funnels) {
  console.log(`   Funnel:  /f/${funnel}/`);
}
