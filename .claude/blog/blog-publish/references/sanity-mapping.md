# Frontmatter → Sanity field map

Source of truth for how `post.md` frontmatter becomes a Sanity `blogPost` document.

## Required fields

| Frontmatter path | Sanity field | Sanity type | Transform |
|------------------|--------------|-------------|-----------|
| `title` | `title` | string | verbatim |
| `slug` | `slug` | slug | `{_type: "slug", current: <slug>}` |
| `excerpt` | `excerpt` | text | verbatim |
| `category.slug` | `category` | reference | resolve via `*[_type=="blogCategory" && slug.current==$slug][0]._id`, then `{_type: "reference", _ref: <id>}` |
| `publishedAt` | `publishedAt` | datetime | verbatim ISO 8601 |
| `featuredImage.file` | `featuredImage.asset` | image asset ref | upload local file → `{_type: "image", asset: {_type: "reference", _ref: <assetId>}, alt: <frontmatter alt>}` |
| `featuredImage.alt` | `featuredImage.alt` | string | verbatim |

## Optional fields

| Frontmatter path | Sanity field | Transform |
|------------------|--------------|-----------|
| `author` | `author` | verbatim if present |

## Draft-only fields (ignored by blog-publish)

- `targetKeywords`
- `status`

## Body → `content` (Portable Text)

Markdown body is converted to Portable Text using Sanity MCP's markdown tools (`create_documents_from_markdown` or `patch_document_from_markdown`). Inline images need special handling:

- Markdown: `![alt text](./images/name.jpg "caption")`
- After upload, rewrite path in body to the Sanity asset reference expected by the MCP tool (exact syntax pinned in `image-upload-research.md` after Step 0 research).
- Each inline image Portable Text block must carry: `alt` (from markdown alt text), `caption` (from markdown title attribute, if present), and `hotspot: true` where the schema supports it.

## Reverse check before write

Before calling any create/patch tool, assemble the target JSON and verify every required field is filled. Abort if any field is `null` / `undefined` / empty string.
