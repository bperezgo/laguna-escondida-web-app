---
name: blog-draft
description: Author and iterate a blog post draft (markdown + co-located images) for the Laguna Escondida site before publishing to Sanity. Triggers on "write blog", "new blog post", "draft blog article", "nuevo articulo del blog", "escribir blog", "/blog-draft".
---

# Skill: Blog Draft (markdown + iterate)

Produce an approved local draft at `content/blog/ready/<slug>/` that the `blog-publish` skill can consume deterministically. **Do not touch Sanity write APIs from this skill** — only `query_documents` to discover existing categories is allowed.

Default language: **Spanish** (site audience = Contenido, `/contenido/` path).

## Reference files (read when applying the skill)

- `references/frontmatter-spec.md` — exact `post.md` frontmatter contract
- `references/sanity-schema.md` — project-specific config: Sanity project ID, dataset, schema field names, category badge enum
- `../../web-content/SKILL.md` — voice + ski-ramp + Q&A rules. **Reuse, do not duplicate.**

## Workflow

### Step 1 — Gather inputs

Ask the user (single message, numbered list):

1. Topic / angle (required).
2. Target audience (required — default "huéspedes y potenciales huéspedes de Laguna Escondida").
3. Target keywords / queries the article should answer (optional, 3–5).
4. Category preference (optional — skill will list existing categories in Step 3).
5. Author name (optional).
6. Desired `publishedAt` (optional — default: now in `America/Santiago`, ISO 8601 with offset).
7. Word count (optional — default 1200–1800).
8. Language (optional — default Spanish).
9. Featured image plan — user will drop a real photo into `images/featured.<ext>` (expected path shown in Step 5).

### Step 2 — Derive slug and create folder

- Slug = kebab-case of title, ASCII-folded (strip accents: `cómo` → `como`).
- Target folder: `content/blog/drafts/<slug>/`.
- If folder exists, ask before overwriting.
- Create `content/blog/drafts/<slug>/images/` too.
- Write initial `.blog-meta.json` with `{slug, status: "draft", createdAt: <ISO>, iterations: 0}`.

### Step 3 — Discover category

Call:

```
mcp__Sanity__query_documents
  query: *[_type=="blogCategory"]{title,"slug":slug.current,badgeClass}
```

Show the user the list. Three paths:

- User picks an existing category → store `{title, slug, badgeClass}` in frontmatter.
- User proposes a new one → ask for `title` + `badgeClass` (primary|secondary|accent). Store in frontmatter. **Do not create the category now** — `blog-publish` creates it after approval.
- No categories exist yet → prompt for a first category the same way.

### Step 4 — Write the draft

Apply every principle from `.claude/web-content/SKILL.md` (ski-ramp, Q&A H2s, definitive language, entity density ≥20% in opening, analyst voice ~0.47, grade ~16 readability). Do not restate those rules — reference them.

Produce `content/blog/drafts/<slug>/post.md` with:

- Full YAML frontmatter per `references/frontmatter-spec.md`.
- Body markdown with Q&A H2s, entity-rich opening paragraph.
- Inline images referenced as `![alt text](./images/<name>.ext "optional caption")`.

Draft **first-pass excerpt** (≤ 300 chars, 2–3 sentences) and **first-pass alt text** for every image; user edits during iteration.

### Step 5 — Images

- Tell the user: "Drop the featured photo at `content/blog/drafts/<slug>/images/featured.<ext>` and any inline images referenced in the body at `content/blog/drafts/<slug>/images/<name>.<ext>`."
- For every `![...](./images/<name>.<ext>)` in the body, verify the file exists. Missing files → list them, do not mark ready.
- Verify featured file exists and `featuredImage.alt` is filled.

### Step 6 — Iterate

One iteration loop per user feedback round:

1. Show: file path, current frontmatter block, first ~500 chars of body.
2. Collect feedback.
3. Apply changes to `post.md` via Edit (not Write — preserve unchanged sections).
4. Increment `iterations` in `.blog-meta.json`; update `lastUpdated`.
5. Repeat until user says "aprobado" / "listo" / "approved" / "publish-ready".

### Step 7 — Mark ready

On approval:

- Flip frontmatter `status: ready`.
- Write `approvedAt: <ISO>` into `.blog-meta.json`.
- Move folder: `content/blog/drafts/<slug>/` → `content/blog/ready/<slug>/` (use `git mv` if tracked, otherwise `mv`).
- Emit: `Ready. Publish with: /blog-publish <slug>`.

## Quality checklist (run before Step 7)

- [ ] Ski ramp: first 30% has primary definition + key entities.
- [ ] ≥ 60% of H2s phrased as questions.
- [ ] Entity echo: first sentence after each H2 repeats header terms.
- [ ] Definitive language in opening; no hedge words.
- [ ] Excerpt ≤ 300 chars, declarative.
- [ ] Every image has non-empty `alt`.
- [ ] `publishedAt` is valid ISO 8601 with timezone offset.
- [ ] Slug matches folder name.
- [ ] All referenced image files exist on disk.

## Non-goals

- Creating or modifying Sanity documents. (That's `blog-publish`.)
- Creating `blogCategory` documents.
- Uploading image assets.

## Portability (what is project-specific)

See `references/sanity-schema.md`. To reuse on another site, swap values in that file — do not edit this `SKILL.md`.
