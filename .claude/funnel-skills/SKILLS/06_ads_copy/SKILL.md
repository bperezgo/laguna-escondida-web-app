---
name: 06_ads_copy
description: "Generates complete ad copy for Google Ads and Meta Ads (Facebook/Instagram) based on the avatar and funnel value proposition. Use when the user wants to create ads, write paid media copy, generate A/B testing variants, or says 'write my ads', 'I need Google Ads copy', 'help me with Meta ads', 'how do I advertise this on social media'. Requires 01_avatar and 02_headline complete."
---

# Skill: Ad Copy (06_ads_copy)

Generates complete ad sets for Google Ads (search) and Meta Ads (feed, stories, reels) ready to upload to the platforms.

## Step 0 — Output language

Ask the user what language they want the output written in. Default: **Spanish**.

> "What language should I use for the generated content? (default: Spanish)"

Apply the chosen language to all output text for this skill.

## Step 1 — Read context

```
business_context.md
funnel_product.md
funnel_output/01_avatar.md
funnel_output/02_headline.md
```

## Step 2 — Google Ads (search)

### Responsive Search Ads (RSA)

Generate for each ad group:

**Headlines (15 variants — max. 30 characters each):**
- 5 based on the avatar's problem/pain
- 5 based on the benefit/result
- 3 based on the differentiating proposition
- 2 with a call to action

**Descriptions (4 variants — max. 90 characters each):**
- 2 focused on benefit + CTA
- 2 focused on objection + solution

**Suggested keywords:**
- 10 high-intent keywords (buyer keywords)
- 10 informational keywords (for lead capture)
- 5 brand/competitor keywords (if applicable)
- Recommended negative keywords list

### Ad extensions
- 5 sitelinks with text + description
- 4 callouts (short credibility phrases)
- 2 structured snippets

## Step 3 — Meta Ads

### Image/carousel ad (feed)

For each variant generate:
- **Primary text:** 125 characters (short version) + long version (up to 500)
- **Ad headline:** max. 27 characters
- **Link description:** max. 30 characters
- **CTA button:** [Learn More / Sign Up / Shop Now / etc.]
- **Visual concept:** description of what image/graphic accompanies it

### Video ad (reel / story)

For each variant generate:
- **Hook for the first 3 seconds** (on-screen text or spoken phrase)
- **Full video script** (15–30 seconds)
- **Post caption** (text below the video)
- **Production directions** (what to show on screen at each moment)

### A/B test variant sets

Generate 3 distinct campaign angles:
- **Angle 1 — Pain:** Opens with the avatar's most painful problem
- **Angle 2 — Aspiration:** Opens with the desired result/life
- **Angle 3 — Credibility/Proof:** Opens with a data point or client result

## Step 4 — Quality criteria

- [ ] Google Ads headlines have real variety (not the same message paraphrased)
- [ ] No ad violates Meta policies (no unsupported medical, financial, or other claims)
- [ ] Video hooks start with pain, curiosity, or data — never with "Hi, I'm..."
- [ ] Meta text has short paragraphs (max. 2 lines) with frequent line breaks
- [ ] Keywords have a mix of suggested match types (exact, phrase, broad match modifier)

## Step 5 — Save

```
funnel_output/06_ads_copy.md
```
