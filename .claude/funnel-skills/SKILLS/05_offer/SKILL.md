---
name: 05_offer
description: "Builds the structure and copy for the final offer/sales page (BOFU). Use to create the checkout page, sales script, offer with price, bonuses and guarantee. Triggers when the user wants to close sales, build an irresistible offer, define price and bonuses, or says 'build the final sales page', 'how do I present the price', 'what bonuses should I add', 'help me with the close'."
---

# Skill: Offer and Close (05_offer)

Builds the complete offer: price, bonuses, guarantee, urgency, and closing copy.

## Step 0 — Output language

Ask the user what language they want the output written in. Default: **Spanish**.

> "What language should I use for the generated content? (default: Spanish)"

Apply the chosen language to all output text for this skill.

## Step 1 — Read context

```
business_context.md
funnel_product.md
funnel_output/01_avatar.md
funnel_output/03_landing.md  (if it exists)
```

## Step 2 — Anatomy of an irresistible offer

An offer is not the product. It is the product + bonuses + guarantee + price + access conditions + urgency. The same product with a better offer can convert 3–5× more.

### Output components

**1. The value stack (what the customer receives)**

List each component with:
- Component name
- Description in 1 sentence (in benefit language)
- Perceived dollar value (what it would cost if sold separately)

Format:
```
✓ [Name] — [Benefit in 1 sentence] ................. Value: $XXX
✓ [Bonus 1] — [Benefit] ............................ Value: $XXX
✓ [Bonus 2] — [Benefit] ............................ Value: $XXX
─────────────────────────────────────────────────────────────
Total value: $X,XXX
Your investment today: $XXX
```

**2. Price presentation**

Generate 3 distinct ways to present the same price:
- Value anchoring (regular price → launch price)
- Daily framing ("less than $X per day")
- Cost of inaction comparison ("how much does staying stuck cost you each month?")

**3. The guarantee**

Write the guarantee paragraph that eliminates the fear of risk.
It's not just saying "30-day refund" — it's making the customer feel they can't lose.

**4. Urgency / scarcity copy**

Only if applicable and REAL. Options:
- Time urgency: price increases on date X
- Limited spots: limited availability
- Bonus deadline: bonus disappears on date X

Generate the copy for the timer or urgency notice.

**5. Final CTA**

3 variants of the final button/CTA with first-person text.
E.g.: "Yes, I want to start today" / "I want immediate access" / "I'm joining now"

## Step 3 — Quality criteria

- [ ] Urgency/scarcity is real — not invented
- [ ] Price is justified by the value stack
- [ ] The guarantee eliminates the avatar's real risk (not just the risk of losing money)
- [ ] Bonuses are complementary to the main product, not filler

## Step 4 — Save

```
funnel_output/05_offer.md
```
