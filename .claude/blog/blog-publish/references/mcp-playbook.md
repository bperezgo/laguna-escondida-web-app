# Sanity MCP tool playbook

Which tool for which step. **Read `image-upload-research.md` first on each run** — it may change the image steps.

## Inventory (verified available)

| Tool | Purpose in this skill |
|------|----------------------|
| `mcp__Sanity__list_sanity_rules` | Preflight — discover available rules |
| `mcp__Sanity__get_sanity_rules` | Preflight — read relevant rule (e.g. `groq`) |
| `mcp__Sanity__search_docs` | Preflight — find upload-asset documentation |
| `mcp__Sanity__read_docs` | Preflight — read specific doc pages |
| `mcp__Sanity__get_schema` | Sanity-check our assumed schema is still current |
| `mcp__Sanity__query_documents` | Step 2 slug-uniqueness; Step 3 category resolution |
| `mcp__Sanity__create_documents_from_json` | Step 3 category creation; Step 5 fallback scalar create |
| `mcp__Sanity__create_documents_from_markdown` | Step 5 preferred one-shot create |
| `mcp__Sanity__patch_document_from_json` | Step 2 overwrite path; Step 5 fallback to add missing fields |
| `mcp__Sanity__patch_document_from_markdown` | Step 5 fallback `content` fill |
| `mcp__Sanity__publish_documents` | Step 3 publish category; Step 7 publish post |
| `mcp__Sanity__get_document` | Post-create verification |

## Step-to-tool map

| Step | Tool(s) |
|------|---------|
| 0 | `list_sanity_rules`, `get_sanity_rules`, `search_docs`, `read_docs` |
| 1 | filesystem only |
| 2 | `query_documents` |
| 3 | `query_documents`, `create_documents_from_json`, `publish_documents` |
| 4 | per `image-upload-research.md` |
| 5 | `create_documents_from_markdown` (preferred) OR `create_documents_from_json` + `patch_document_from_markdown` (fallback) |
| 6 | none |
| 7 | `publish_documents` |
| 8 | filesystem only |

## Common error modes

- **401 / missing token**: Sanity write token not in MCP server env. Surface clearly, abort.
- **Slug collision in Sanity**: `query_documents` returns a doc — follow Step 2 collision UX.
- **Reference to missing category**: only happens if Step 3 was skipped. Re-run Step 3.
- **Markdown tool rejects structured fields**: fall back to two-step create in Step 5.

## Verification rule

After every write, run `get_document` with the returned ID and log the key fields. If a required field came back empty, that's a bug to fix before archiving in Step 8.
