---
name: 02_headline
description: "Generates headlines, value propositions, and hooks for the funnel based on the customer avatar and business context. Use when the user wants to write the main headline for a landing page, create message variants, define the core value proposition, or says 'help with the headline', 'what message to use', 'how do I communicate what I sell'. Requires 01_avatar to be complete."
---

# Skill: Headlines and Value Proposition (02_headline)

This skill generates the central message of the funnel — the headline and value proposition that will appear on the landing page, ads, and first email. It is the highest-impact component on conversion.

## Step 0 — Output language

Ask the user what language they want the output written in. Default: **Spanish**.

> "What language should I use for the generated content? (default: Spanish)"

Apply the chosen language to all output text for this skill.

## Step 1 — Read context

Read these files before proceeding:
```
business_context.md
funnel_product.md
funnel_output/01_avatar.md    ← critical; without this the copy will be generic
```

If `01_avatar.md` does not exist, stop and ask the user to run skill `01_avatar` first.

## Step 2 — Understand the headline frameworks

Before generating, use these models. Choose the most appropriate ones based on the product type and traffic temperature:

**Framework 1 — Result + Time + Objection eliminated**
`[Desired result] in [specific time] without [main objection]`
E.g.: "Get your first 3 clients in 30 days without spending on ads"

**Framework 2 — For whom + Specific promise**
`For [specific profile] who wants [result] without [sacrifice]`
E.g.: "For professionals with a full-time job who want extra income without quitting yet"

**Framework 3 — Question that activates pain**
`Tired of [frustrating situation]? Discover how [direct solution]`
E.g.: "Tired of creating content without seeing results? Discover the system real creators use to sell"

**Framework 4 — Transformation declaration**
`From [current state] to [desired state] in [time]`
E.g.: "From frustrated employee to digital business owner in 90 days"

**Framework 5 — The secret or the method**
`The [proper name] method that [concrete benefit] without [sacrifice]`
E.g.: "The LAUNCH method that 200+ entrepreneurs use to sell without an existing audience"

## Step 3 — Generate the output

Produce the following sections:

```markdown
# Headlines and Value Proposition

## Core value proposition (1 sentence)
The most powerful promise of the product in a single sentence.
This sentence must work standalone in an ad or Instagram bio.

## Main headlines (for landing page)
Generate 8 headline variants using different frameworks.
For each one, indicate:
- The headline
- The framework used
- Which avatar segment it works best for
- Recommended traffic temperature (cold / warm / hot)

## Subheadline (subtitle for the landing)
3 subheadline variants that complement the main headline.
The subheadline expands the promise and eliminates the most immediate objection.

## Hook for video / VSL (first 30 seconds)
2 opening variants for a sales video or acquisition reel.
Must start with pain or curiosity, never with "Hi, I'm..."

## Ad headlines (Google Ads / Meta)
5 short headlines (max. 30 characters) for Google Ads
5 long headlines (max. 90 characters) for Meta/Instagram
Must be variants of each other for A/B testing

## Team recommendation
Which headline to test first and why.
Which headline + subheadline combination has the best coherence.
```

## Step 4 — Quality criteria

Before saving, verify:

- [ ] Headlines use the exact language from the avatar (phrases from `01_avatar.md`)
- [ ] No headline promises something the product can't deliver
- [ ] At least 2 headlines address the avatar's main objection
- [ ] Google Ads headlines respect character limits
- [ ] There is real variety between the options (not the same phrase with synonyms)

## Step 5 — Save output

```
funnel_output/02_headline.md
```

Tell the user:
- The 3 headlines you consider strongest and why
- Which skill to use next: `03_landing` to build the complete page

## Usage notes

- If the user already has a headline and wants to improve it, receive it, analyze why it doesn't convert (too generic language, weak promise, doesn't speak to the avatar) and generate improved variants
- For cold traffic, pain- or curiosity-based headlines work better than direct solution headlines
- The winning headline is discovered through A/B tests — this skill generates the initial set to test
