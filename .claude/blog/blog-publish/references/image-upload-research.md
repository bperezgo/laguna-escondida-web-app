# Image asset upload — canonical path

**STATUS: TBD — research on first run, then pin below.**

## Why this file exists

The Sanity MCP tool list does not include an explicit `upload_asset` tool. On the first run of `blog-publish`, execute Step 0 preflight, find the canonical path, and **replace this file's content** with the verified answer.

## Research checklist (run once)

- [ ] `mcp__Sanity__list_sanity_rules` — list all rules
- [ ] `mcp__Sanity__get_sanity_rules` for rules named around `groq`, `astro`, `nextjs`, and anything mentioning assets
- [ ] `mcp__Sanity__search_docs` with: `"upload image asset"`, `"image asset from local file"`, `"create_documents_from_markdown images"`
- [ ] `mcp__Sanity__read_docs` on top 2–3 matches

## Candidate paths (to verify, not yet confirmed)

1. `create_documents_from_markdown` inlines local image paths referenced in the body and uploads them automatically during document creation.
2. `create_documents_from_json` accepts an image asset with a local file path and uploads on write.
3. Neither MCP path supports local-file upload → must use raw HTTP:
   - `POST https://<projectId>.api.sanity.io/v<apiVersion>/assets/images/<dataset>`
   - Auth: `Authorization: Bearer <SANITY_WRITE_TOKEN>`
   - Body: binary image
   - Returns: `{document: {_id: "image-...", ...}}` — use `_id` as the asset reference.

## Pinned answer (fill after research)

```
Featured image upload:
  tool: <TBD>
  syntax: <TBD>

Inline (body) image upload:
  tool: <TBD>
  syntax: <TBD>

Asset reference shape in final document:
  { _type: "image", asset: { _type: "reference", _ref: "image-<sha1>-<dims>-<format>" }, alt: "...", caption: "..." }

Idempotency:
  Sanity dedupes uploaded images by sha1 — re-uploading the same file returns the same asset ID. Safe to retry.
```

## Notes

- Keep this file source-controlled. Once pinned, it becomes part of the skill's documentation and does not need re-research unless the Sanity MCP server changes its toolset.
- If the answer differs between projects (unlikely, since it's determined by the MCP server, not the project), flag in `portability.md`.
