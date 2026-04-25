# Sanity config & schema (project-specific)

**This is the file to edit when reusing these skills on another web app.** Everything else is generic.

## Project config

| Key | Value |
|-----|-------|
| Project ID | `eycsitos` |
| Dataset | `production` |
| Studio host | self-hosted in `studio/` workspace; local at `http://localhost:3333`; deployed URL TBD |
| Frontend URL path | `/contenido/<slug>` |

## Schema types

- `blogPost` — the blog post document
- `blogCategory` — category documents referenced by posts

## `blogPost` fields (source: `studio/schemaTypes/blogPost.ts`)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | yes | |
| `slug` | slug | yes | `options.source: 'title'` |
| `excerpt` | text (rows: 3) | yes | short preview |
| `content` | array of block + image | no | Portable Text; inline images have `alt`, `caption` |
| `featuredImage` | image (hotspot) | yes | has required `alt` subfield |
| `category` | reference → blogCategory | yes | |
| `publishedAt` | datetime | yes | |
| `author` | string | no | |

Body is Portable Text, **not markdown**. Sanity MCP tools (`create_documents_from_markdown`, `patch_document_from_markdown`) handle the markdown → Portable Text conversion.

## `blogCategory` fields (source: `studio/schemaTypes/blogCategory.ts`)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | yes | |
| `slug` | slug | yes | |
| `badgeClass` | string enum | yes | `primary` \| `secondary` \| `accent` |

## Known GROQ patterns

List categories:
```groq
*[_type=="blogCategory"]{title,"slug":slug.current,badgeClass}
```

Find post by slug:
```groq
*[_type=="blogPost" && slug.current==$slug][0]
```

Find category by slug:
```groq
*[_type=="blogCategory" && slug.current==$slug][0]
```
