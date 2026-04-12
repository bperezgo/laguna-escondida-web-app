---
name: 03_landing
description: "Generates the complete structure and copy for a high-conversion landing page based on the avatar, headline, and business context. Use when the user wants to build a sales page, squeeze page, lead capture page, or says 'build the landing page', 'write the sales page', 'what sections should my page have', 'help with landing copy'. Requires 01_avatar and 02_headline complete."
---

# Skill: Complete Landing Page (03_landing)

Generates section-by-section structure and complete copy for a landing page. The output is a ready brief to hand off to a designer or to build directly in Webflow, Elementor, or any page builder.

## Step 0 — Output language

Ask the user what language they want the output written in. Default: **Spanish**.

> "What language should I use for the generated content? (default: Spanish)"

Apply the chosen language to all output text for this skill.

## Step 1 — Read context

Read these files before proceeding:
```
business_context.md
funnel_product.md
funnel_output/01_avatar.md
funnel_output/02_headline.md
```

Determine the landing type based on `funnel_product.md`:
- **Squeeze page** (email capture with lead magnet only) → short structure, 4–5 sections
- **Sales page** (direct product sale) → complete structure, 10–12 sections
- **Registration page** (webinar, event, call) → medium structure, 6–8 sections

## Step 2 — Anatomy of a high-conversion landing page

Use this structure as the base. Adapt the order based on page type and traffic temperature (cold traffic needs more trust-building before the CTA).

### Full structure (sales page)

**SECTION 1 — Hero (above the fold)**
The first thing the user sees. Must communicate the value proposition in under 5 seconds.
- Main headline (use the best from `02_headline.md`)
- Subheadline that expands the promise
- Primary CTA (button with specific text — never "Submit" or "Click here")
- Quick credibility element (e.g.: "Over 1,200 students" or media logos)

**SECTION 2 — The problem (agitation)**
Connect with the pain before presenting the solution.
- Description of the customer's current state (use the avatar's "day in their life")
- List of problem symptoms (3–5 points)
- Emotional validation: "If this sounds familiar, it's not your fault..."

**SECTION 3 — The solution (product presentation)**
Present the product as the natural answer to the problem.
- Product name and description in benefit language
- The core transformation: from [state A] to [state B]
- Why this product is different from what they've already tried

**SECTION 4 — How it works**
Reduce uncertainty by explaining the process in simple steps.
- 3–5 concrete steps (with names or numbers)
- Each step has a mini-benefit associated

**SECTION 5 — What's included (the offer)**
Present each component of the offer with its perceived value.
- List of modules, sessions, bonuses, materials
- For each: name + what problem it solves + perceived dollar value

**SECTION 6 — Who it's for (and who it's NOT for)**
Qualify the lead and increase desire in those who are the avatar.
- "This program is for you if..." (3–5 points describing the avatar)
- "Not for you if..." (2–3 honest points — this builds trust)

**SECTION 7 — Results and social proof**
Testimonials, case studies, and results data.
- 3–5 testimonials in story format (before / after / specific result)
- Quantitative data if it exists ("87% of students achieved X in Y weeks")

**SECTION 8 — About the creator / company**
Build authority without sounding arrogant.
- Story relevant to the avatar's problem (not a generic CV)
- Why you are positioned to help
- Specific and related achievements

**SECTION 9 — FAQ (objections disguised as questions)**
Use the avatar's objections to build the questions.
- 5–8 frequently asked questions that are really objections
- Direct answers, without being defensive

**SECTION 10 — The guarantee**
Eliminate the perceived risk of the purchase.
- Type of guarantee, duration, conditions
- Copy that makes the guarantee credible (not just "30-day refund")

**SECTION 11 — Final CTA with urgency / scarcity**
The last push to action.
- Summary of the complete offer
- Urgency or scarcity element if real (never invent it)
- Final CTA with benefit on the button
- Reminder of the guarantee

**SECTION 12 — Minimal footer**
- Privacy policy, terms
- Support contact

## Step 3 — Generate the output

For each section produce:
- Section title (for the designer)
- Complete copy ready to use
- Design notes (color, size, recommended layout)
- Alternative B for A/B testing (for critical sections: hero and CTA)

## Step 4 — Quality criteria

- [ ] The CTA button says the benefit, not the action (e.g.: "I want to start today" not "Buy")
- [ ] Sections 2 and 3 flow as a narrative, not as bullet points
- [ ] Testimonials have a real name, specific result, and before/after
- [ ] FAQ uses the exact objections from the avatar in `01_avatar.md`
- [ ] No marketing jargon like "revolutionary methodology" or "radical transformation"

## Step 5 — Save

```
funnel_output/03_landing.md
```

Tell the user that the next step is `04_emails` for the nurturing sequence.
