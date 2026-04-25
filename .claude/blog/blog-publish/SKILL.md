---
name: blog-publish
description: Publish an approved local blog draft to Sanity as a blogPost document (image asset upload, category resolution, draft-first). Triggers on "publish blog", "push blog to sanity", "publicar articulo del blog", "publicar blog", "/blog-publish".
---

# Skill: Blog Publish (draft → Sanity)

Take an approved local draft at `content/blog/ready/<slug>/` and create a Sanity `blogPost` document. **Always leave the document as a Sanity draft** — publishing is a separate explicit step the user confirms.

## Reference files

- `references/sanity-mapping.md` — frontmatter → Sanity field map + Portable Text shape
- `references/mcp-playbook.md` — which MCP tool for which step + error modes
- `references/image-upload-research.md` — verified asset upload path (filled on first run)
- `references/portability.md` — swap list for reuse on other sites
- `../blog-draft/references/sanity-schema.md` — project config (projectId, dataset, schema types)

## Workflow

### Step 0 — Preflight (first-run only)

If `references/image-upload-research.md` still contains a `TBD` marker, research the canonical Sanity asset upload path BEFORE attempting any uploads:

1. `mcp__Sanity__list_sanity_rules`
2. `mcp__Sanity__get_sanity_rules` for relevant rules (e.g. `nextjs`, `astro`, any asset-related rule)
3. `mcp__Sanity__search_docs` with queries: `"upload image asset"`, `"image asset from local file"`, `"create_documents_from_markdown images"`
4. `mcp__Sanity__read_docs` on top matches.

Update `references/image-upload-research.md` with the verified answer. Cache it — do not re-research on every run.

### Step 1 — Locate draft

- If `<slug>` arg provided → `content/blog/ready/<slug>/`.
- Otherwise list subfolders of `content/blog/ready/`, ask user to pick.
- Abort cleanly if none exist.

### Step 2 — Load + validate

- Parse `post.md` frontmatter.
- Read `.blog-meta.json`.
- Abort if `status != "ready"`.
- Verify required frontmatter fields (see `references/sanity-mapping.md`).
- Verify `publishedAt` is valid ISO 8601.
- Verify every referenced image file exists on disk (featured + every inline `![...](./images/...)`).
- Slug uniqueness — query Sanity:
  ```
  *[_type=="blogPost" && slug.current==$slug][0]
  ```
  On collision, offer:
  - (a) bump slug suffix (`-2`, `-3`, …)
  - (b) overwrite via patch (use `patch_document_from_markdown`)
  - (c) abort

### Step 3 — Resolve category

Query by slug:
```
*[_type=="blogCategory" && slug.current==$slug][0]
```

- Found → capture `_id`.
- Not found → confirm with user, then `mcp__Sanity__create_documents_from_json`:
  ```json
  {
    "_type": "blogCategory",
    "title": "...",
    "slug": {"_type": "slug", "current": "..."},
    "badgeClass": "primary"
  }
  ```
  Capture returned `_id`. Publish the category immediately via `publish_documents` (categories have no reason to stay as drafts).

### Step 4 — Upload image assets

Follow the path pinned in `references/image-upload-research.md`. Build a map `{localPath → sanityAssetId}` to dedupe repeated references.

- Featured image: `featuredImage.file` (+ `alt`).
- Every inline image referenced in body: `./images/<name>.<ext>` (+ `alt`, optional `caption` from markdown title attribute).

On any upload failure: abort. Do NOT create the blogPost with a partial image set. Local folder stays untouched so user can retry.

### Step 5 — Create blogPost

Preferred one-shot (verify support in `mcp-playbook.md`):

```
mcp__Sanity__create_documents_from_markdown
  markdown: <body with inline image paths rewritten to Sanity image asset references>
  fields: {
    title, slug: {_type:"slug", current:<slug>}, excerpt,
    featuredImage: { _type:"image", asset:{_type:"reference", _ref:<assetId>}, alt:<alt> },
    category: { _type:"reference", _ref:<categoryId> },
    publishedAt, author
  }
```

Fallback two-step if the tool does not accept structured fields alongside markdown:

1. `create_documents_from_json` with all scalar fields + `content: []`
2. `patch_document_from_markdown` to fill `content` from the body markdown

Capture returned document ID (`drafts.<id>` shape expected).

Record `sanityDocumentId` in `.blog-meta.json`.

### Step 6 — Confirm

Emit:

```
Sanity draft created.
Document ID: <id>
Studio URL: https://<studio-host>/structure/blogPost;<id>
```

Ask the user: `Publish now? (no / yes)`. Default = no.

### Step 7 — Publish (optional)

If user confirms:
- `mcp__Sanity__publish_documents` with `[<documentId>]`.
- Record `publishedAt` (actual publish timestamp) in `.blog-meta.json`.

### Step 8 — Archive local folder

Regardless of whether user published or left as draft:
- Move `content/blog/ready/<slug>/` → `content/blog/published/<slug>/`.
- Write `content/blog/published/<slug>/published.json`:
  ```json
  {
    "documentId": "<id>",
    "publishedAt": "<ISO or null if left as draft>",
    "studioUrl": "https://<studio-host>/structure/blogPost;<id>",
    "sanityPublished": true | false
  }
  ```
- Flip frontmatter `status: published` (the local archive marker — "handed off to Sanity", regardless of live state).

## Error handling

| Symptom | Detection | Response | Recovery |
|---------|-----------|----------|----------|
| `status != ready` | Step 2 | Abort, print `Run /blog-draft to finish draft first.` | None needed; local folder untouched. |
| Missing required frontmatter field | Step 2 | Abort with field name. | User fixes `post.md`, retries. |
| Image file missing | Step 2 | Abort, list missing paths. | User adds file, retries. |
| Slug collision | Step 2 | Offer bump / overwrite / abort. | User choice. |
| Category creation denied by user | Step 3 | Abort. | User edits frontmatter to existing category. |
| Image upload failure | Step 4 | Abort, show which file failed. | User retries; uploaded asset map is NOT persisted, full re-upload on retry (idempotent: Sanity dedupes by sha1). |
| `create_documents_from_markdown` error | Step 5 | Fall back to two-step; if that also fails, abort. | User retries after reviewing MCP logs. |
| Write token missing / 401 | Any write | Abort with `Sanity write token not configured in MCP server — check .mcp.json`. | User configures token. |

**Rule: never delete or partially modify the local folder on failure.** Every error path leaves `content/blog/ready/<slug>/` intact and resumable.

## Non-goals

- Drafting content. (That's `blog-draft`.)
- Editing Sanity documents outside the current slug.
- Deleting existing Sanity blog posts.

## Portability

See `references/portability.md`.
