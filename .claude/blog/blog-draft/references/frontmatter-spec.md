# `post.md` frontmatter spec

Every draft `post.md` must start with a YAML frontmatter block matching this shape. Fields marked **required** MUST be present before Step 7 (mark ready).

```yaml
---
title: "..."                           # required, string, quoted
slug: "..."                            # required, kebab-case, == folder name
excerpt: "..."                         # required, ≤ 300 chars, 2–3 sentences, plain text
category:                              # required
  title: "..."                         # human-readable, used to find/create blogCategory
  slug: "..."                          # kebab-case
  badgeClass: "primary"                # primary | secondary | accent (only used if creating)
author: "..."                          # optional
publishedAt: "2026-04-20T10:00:00-03:00"  # required, ISO 8601 with TZ offset
featuredImage:
  file: "./images/featured.jpg"        # required, relative to post.md
  alt: "..."                           # required (Sanity schema requires it)
targetKeywords: ["...", "..."]         # optional, draft-only, ignored by blog-publish
status: "draft"                        # required, one of: draft | ready | published
---
```

## Body conventions

- Heading 1 is omitted from body — `title` field renders it. Start body with H2 or paragraph.
- Q&A H2s: `## ¿Qué es ...?`, `## ¿Cómo ...?` etc.
- Inline images: `![alt text](./images/name.jpg "optional caption")` — caption in quotes becomes Sanity image `caption` field.
- Image paths are always relative (`./images/...`), never absolute.
- No HTML in body — Portable Text conversion handles only markdown constructs.

## `.blog-meta.json` companion

```json
{
  "slug": "...",
  "status": "draft | ready | published",
  "createdAt": "...",
  "lastUpdated": "...",
  "approvedAt": "...",
  "publishedAt": "...",
  "sanityDocumentId": "...",
  "iterations": 0
}
```

Maintained by `blog-draft` and `blog-publish`. Keeps the folder resumable if either skill is interrupted.
