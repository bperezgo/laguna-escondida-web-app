# Portability — reusing these skills on another site

The `blog-draft` + `blog-publish` skills are designed to move between web apps with **minimal edits to SKILL.md files**. All project-specific values live in reference files.

## Files to edit when reusing

1. `../blog-draft/references/sanity-schema.md` — the only file with project-specific values by default:
   - Sanity project ID
   - Dataset name
   - Studio host / URL
   - Frontend URL path (e.g. `/contenido/<slug>` → `/blog/<slug>`)
   - Schema type names (if the new site uses `post` instead of `blogPost`, etc.)
   - `badgeClass` enum values (if categories work differently)

2. `sanity-mapping.md` in this directory — only if field names differ from `blogPost` schema (e.g. `body` vs `content`, `coverImage` vs `featuredImage`).

## Files that should NOT need edits

- `blog-draft/SKILL.md` — generic workflow
- `blog-publish/SKILL.md` — generic workflow
- `blog-draft/references/frontmatter-spec.md` — the frontmatter contract is intentionally consistent across sites
- `mcp-playbook.md` — tool-to-step map is MCP-server-wide, not project-specific
- `image-upload-research.md` — answer depends on the MCP server, not the project

## Convention: one `.claude/blog/` per web app

Copy the whole `.claude/blog/` directory into the new web app's repo. Each web app keeps its own pinned `sanity-schema.md`. Do not share a global `.claude/blog/` across projects — the schema drift is real.

## MCP server config (outside the skill)

Each web app needs the Sanity MCP server configured in `.mcp.json` or global settings with:
- Project ID pointing at the target Sanity project
- A write token with permission to create documents and upload assets

This lives outside the skill and is the user's responsibility.
