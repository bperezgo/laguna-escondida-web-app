---
name: 01_avatar
description: "Builds a deep, actionable ideal customer profile (ICP / buyer persona). Use when the user wants to define who they sell to, understand their audience, or says 'who is my ideal client', 'describe my buyer persona', 'help me understand my audience'. This skill is the foundation of the entire funnel — always run first."
---

# Skill: Ideal Customer Avatar (01_avatar)

This skill builds the psychological and situational profile of the ideal customer. Its output directly feeds into `02_headline`, `03_landing`, `04_emails`, and all other skills in the system.

## Step 0 — Output language

Ask the user what language they want the output written in. Default: **Spanish**.

> "What language should I use for the generated content? (default: Spanish)"

Apply the chosen language to all output text for this skill.

## Step 1 — Read context

Read these files before proceeding:
```
business_context.md
funnel_product.md
```

If either is missing or empty, stop and ask the user to complete it. Do not proceed with invented information.

If `funnel_output/01_avatar.md` exists, read it too — it may contain a previous version to improve upon.

## Step 2 — Build the avatar

Generate the complete profile with the sections below. Use specific, concrete language — avoid generalities like "people who want to improve". Every section should read as if describing a real person.

### Output structure

```markdown
# Ideal Customer Avatar

## Name and demographic profile
Give them a representative fictional name. Age, occupation, city, family situation.
Write it as a narrative paragraph, not a list.

## A day in their life (before knowing you)
Describe their routine, frustrations, and micro-moments of pain.
What they think when they wake up, what worries them at work, how they feel at the end of the day.
2–3 narrative paragraphs. This is the most important part of the avatar.

## The core problem
What exact problem do they have. Distinguish between:
- Surface problem (what they say they have)
- Real problem (the root cause)
- Emotional problem (how it makes them feel)

## What they've already tried
What solutions they looked for before. Why they didn't work or why they gave up.
This is critical for copy — the customer knows other solutions exist.

## Their objections to buying
List the 5 most likely objections in exact first-person phrasing.
E.g.: "I don't have time right now to get into something new"
E.g.: "I've bought courses before and never finish them"

## Their desires and aspirations
What they really want (beyond the product). Distinguish between:
- Functional desire: what they want to achieve
- Emotional desire: how they want to feel
- Social desire: how they want to be seen by others

## Phrases they use
10–15 word-for-word phrases this person would say about their problem or situation.
In first person, in their natural language register. These phrases are gold for copywriting.
E.g.: "I feel like I work a lot but never make progress"
E.g.: "My friends are already doing well and I'm still in the same place"

## Their moment of highest receptivity
When they're most willing to seek a solution. What event or situation pushes them to act.
This defines when and where ads should appear.

## How they evaluate if a solution is for them
What signals they look for when deciding to trust. What builds credibility vs. distrust.
```

## Step 3 — Quality review

Before saving, verify:

- [ ] Has a name and is treated as a real person, not an abstract segment
- [ ] "Phrases they use" sound like real language, not marketing copy
- [ ] Objections are in first person and specific
- [ ] "Day in their life" has concrete, emotional details
- [ ] No generalities like "people looking to improve their life"

## Step 4 — Save output

Save the result to:
```
funnel_output/01_avatar.md
```

Then tell the user:
- What avatar was generated (2–3 line summary)
- The most important or surprising finding
- That the next step is to run `02_headline` to generate value propositions based on this avatar

## Usage notes

- If the user wants to refine the avatar, they can give additional instructions like: "make it more focused on entrepreneur moms" or "go deeper on price objections"
- You can generate 2 avatars if the business clearly has distinct segments, but warn that the funnel will be more effective if one primary avatar is chosen
- "Phrases they use" is the most valuable input for the copywriter — make sure they are real and specific
