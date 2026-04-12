---
name: 07_objeciones
description: "Maps and responds to all objections that prevent purchase in the funnel. Use to create the landing FAQ, sales arguments, objection-handling script for calls, or when the user says 'my audience doesn't buy because...', 'how do I handle the price objection', 'what to say when they say they don't have time', 'build the funnel FAQ'."
---

# Skill: Objection Map (07_objeciones)

Builds the complete arsenal to anticipate and respond to every avatar objection.

## Step 0 — Output language

Ask the user what language they want the output written in. Default: **Spanish**.

> "What language should I use for the generated content? (default: Spanish)"

Apply the chosen language to all output text for this skill.

## Step 1 — Read context

```
business_context.md
funnel_product.md
funnel_output/01_avatar.md
```

## Step 2 — Complete objection map

For each objection, generate an entry in this format:

```markdown
### Objection: "[exact first-person phrase from the avatar]"

**Type:** [Price / Time / Trust / Urgency / Capacity / Relevance]
**Truth behind the objection:** [What they're really thinking]
**Landing page response (FAQ):** [Copy ready for the FAQ section]
**Email response:** [1 paragraph for the objection email]
**1:1 sales response:** [How to respond on a call or chat]
```

### Minimum objections to cover

1. "It's too expensive / I don't have the budget right now"
2. "I don't have time for this"
3. "I already tried something similar and it didn't work"
4. "I'm not sure this works for my specific case"
5. "I need to think about it / talk it over with my partner"
6. "What if it doesn't work for me?"
7. [Avatar-specific objections from `01_avatar.md`]

## Step 3 — Save

```
funnel_output/07_objeciones.md
```
