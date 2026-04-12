#!/bin/bash
# scripts/scaffold.sh
#
# Creates the base Astro project directory structure.
# Run from the client project root after generating all config files.
#
# Usage: bash SKILLS/11_astro_builder/scripts/scaffold.sh <client-slug>
#
# Example: bash SKILLS/11_astro_builder/scripts/scaffold.sh acme-coaching

set -e

SLUG=${1:?"Usage: scaffold.sh <client-slug>"}
DIR="funnel-${SLUG}"

echo "→ Scaffolding Astro project: ${DIR}"

mkdir -p "${DIR}/src/styles"
mkdir -p "${DIR}/src/types"
mkdir -p "${DIR}/src/data"
mkdir -p "${DIR}/src/layouts"
mkdir -p "${DIR}/src/components/ui"
mkdir -p "${DIR}/src/pages"
mkdir -p "${DIR}/public"

echo "→ Directory tree created"
echo ""
echo "Files to generate next:"
echo "  ${DIR}/package.json"
echo "  ${DIR}/astro.config.mjs"
echo "  ${DIR}/tailwind.config.mjs"
echo "  ${DIR}/tsconfig.json"
echo "  ${DIR}/.env.example"
echo "  ${DIR}/vercel.json"
echo "  ${DIR}/netlify.toml"
echo "  ${DIR}/src/styles/tokens.css"
echo "  ${DIR}/src/styles/global.css"
echo "  ${DIR}/src/types/funnel.ts"
echo "  ${DIR}/src/data/funnel.ts"
echo "  ${DIR}/src/layouts/FunnelLayout.astro"
echo "  ${DIR}/src/components/ui/Button.astro"
echo "  ${DIR}/src/components/ui/SectionWrapper.astro"
echo "  ${DIR}/src/components/ui/Badge.astro"
echo "  ${DIR}/src/components/Hero.astro"
echo "  ${DIR}/src/components/Problem.astro"
echo "  ${DIR}/src/components/Solution.astro"
echo "  ${DIR}/src/components/HowItWorks.astro"
echo "  ${DIR}/src/components/Offer.astro"
echo "  ${DIR}/src/components/ForWho.astro"
echo "  ${DIR}/src/components/SocialProof.astro"
echo "  ${DIR}/src/components/About.astro"
echo "  ${DIR}/src/components/FAQ.astro"
echo "  ${DIR}/src/components/Guarantee.astro"
echo "  ${DIR}/src/components/FinalCTA.astro"
echo "  ${DIR}/src/components/LeadForm.astro"
echo "  ${DIR}/src/pages/index.astro"
echo "  ${DIR}/src/pages/thank-you.astro"
echo "  ${DIR}/src/pages/privacy.astro"
echo "  ${DIR}/public/favicon.svg"
echo "  ${DIR}/README.md"
echo ""
echo "After generating all files, run:"
echo "  cd ${DIR} && npm install && npm run dev"
