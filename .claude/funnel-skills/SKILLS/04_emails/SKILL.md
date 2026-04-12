---
name: 04_emails
description: "Generates the complete nurturing email sequence for the funnel — from the welcome email to the sales close email. Use when the user wants to write follow-up emails, create an automated sequence, nurture leads, or says 'write the funnel emails', 'what emails should I send', 'help with the email marketing sequence', 'how to nurture my leads'. Requires 01_avatar complete and preferably 02_headline."
---

# Skill: Nurturing Email Sequence (04_emails)

Generates an email sequence ready to load into ActiveCampaign, Mailchimp, Klaviyo, or any email marketing tool. Each email includes subject line, preview text, full body copy, and timing notes.

## Step 0 — Output language

Ask the user what language they want the output written in. Default: **Spanish**.

> "What language should I use for the generated content? (default: Spanish)"

Apply the chosen language to all output text for this skill.

## Step 1 — Read context

```
business_context.md
funnel_product.md
funnel_output/01_avatar.md
funnel_output/02_headline.md   (if it exists)
funnel_output/03_landing.md    (if it exists)
```

Determine the sequence type based on `funnel_product.md`:
- **Welcome + direct sale sequence:** For low-ticket products (<$200), 5–7 emails
- **Long nurturing sequence:** For mid-to-high ticket products (>$200), 8–12 emails
- **Webinar/event sequence:** For event registrants, 4–6 pre-event + 3 post-event

## Step 2 — Standard sequence structure

### Base sequence (8 emails — adapt by type)

**Email 1 — Welcome + lead magnet delivery**
Timing: Immediately after sign-up
Goal: Create a positive first impression, deliver what was promised, introduce briefly
Tone: Warm, personal, no selling yet
Elements: Resource delivery + promise of what's coming + engagement question

**Email 2 — The origin story**
Timing: Day 1 (24 hours later)
Goal: Build emotional connection and credibility
Tone: Vulnerable, narrative, authentic
Structure: I was where you are → I tried X and it failed → I discovered Y → everything changed
No sales CTA — reading only

**Email 3 — The avatar's biggest mistake**
Timing: Day 2
Goal: Educate and position the product as the solution to a common error
Tone: Educational, empathetic, not condescending
Structure: "The #1 mistake most [type of person] make..." → explanation → how to avoid it

**Email 4 — Pure value content**
Timing: Day 3
Goal: Demonstrate expertise, generate reciprocity
Tone: Practical, generous, direct
Structure: One actionable tip, technique, or insight they can use today. No explicit selling.

**Email 5 — Social proof + case study**
Timing: Day 5
Goal: Build trust through others' results
Tone: Narrative, specific, concrete
Structure: Story of a real client (with name and measurable result) → lesson → transition to product

**Email 6 — Product introduction (soft)**
Timing: Day 6
Goal: Introduce the product naturally, non-invasively
Tone: Conversational, like a recommendation from a friend
Structure: Context → "That's why I created [product name]" → main benefit → link to landing

**Email 7 — Objection handling**
Timing: Day 8
Goal: Destroy the most common objections before making the hard offer
Tone: Direct, honest, not defensive
Structure: "I know what you're thinking..." → objection 1 → response → objection 2 → response → CTA

**Email 8 — Offer + urgency**
Timing: Day 10
Goal: Generate the purchase
Tone: Direct, enthusiastic, clear
Structure: Reminder of the problem → solution → full offer summary → clear CTA → guarantee → real urgency

## Step 3 — Format of each email in the output

For each email generate:

```markdown
---
## Email [N] — [Email name]

**Subject:** [Main subject line]
**Alternative subject (A/B):** [Second option for testing]
**Preview text:** [Preview text — 85-100 characters]
**Timing:** [When it's sent]
**Goal:** [One line]

**BODY:**

[Complete email copy]

---
**Notes:**
- Tone: [description]
- CTA: [link/button text]
- Estimated length: [short 150-250 / medium 300-500 / long 500-800 words]
```

## Step 4 — Email copywriting rules

Apply these rules to every email:

- **Subject line:** Max 50 characters. Generates curiosity or touches a pain point. Never spoil the content.
- **First line:** This is the real hook. If it doesn't hook in 2 lines, the email won't be read.
- **Short paragraphs:** Max 3 lines per paragraph. Emails are read on mobile.
- **One CTA per email only:** Don't give multiple options.
- **Basic personalization:** Use `{first_name}` where it feels natural.
- **No corporate jargon:** Nothing like "dear customer" or "we are pleased to inform you".
- **Strategic PS:** The PS is the second most-read element — use it to reinforce the CTA or add urgency.

## Step 5 — Quality criteria

- [ ] Email 1 delivers exactly what was promised (not something different)
- [ ] Subject lines have no spam words (free, URGENT, !!!, 100% guaranteed)
- [ ] Each email has a single goal and a single CTA
- [ ] Email 2's story uses details from the avatar in `01_avatar.md`
- [ ] Email 7's objections come from the objections listed in `01_avatar.md`
- [ ] Tone is consistent with the one defined in `business_context.md`

## Step 6 — Save

```
funnel_output/04_emails.md
```

Recommended next step: `05_offer` to build the closing page, or `06_ads_copy` for the ads that drive traffic to the funnel.
