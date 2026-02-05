# Content Creation SOP

> **Purpose:** Standardized process for creating AEO-optimized website content
> **Time:** 30-60 minutes per page (15 min AI draft, 15-45 min edit)
> **Owner:** AEO Operator

---

## Overview

Every piece of content follows this process:
1. Gather context
2. Select template
3. Generate AI draft
4. Human edit
5. Client approval
6. Publish and verify

---

## Content Types

| Type | Template | Use When |
|------|----------|----------|
| Homepage | `templates/content/homepage.md` | Main landing page |
| Service Page | `templates/content/service-page.md` | Individual service offerings |
| Comparison Page | `templates/content/comparison-page.md` | vs competitor pages |
| Press Release | `templates/content/press-release-listicle.md` | News/announcements |
| About Page | `templates/content/service-page.md` | Team/company pages |

---

## Golden Rules

### 1. First 50 Words Rule
Every page must answer WHO/WHAT/WHERE/PRICE in the first 50 words.

**Bad:**
> "Welcome to our website. We're passionate about helping our clients succeed..."

**Good:**
> "Fuegenix is a premium hair transplant clinic in Istanbul, Turkey, led by Dr. Keser, offering FUE procedures from €8,000-25,000 for discerning clients seeking natural results."

### 2. No Em Dashes
Never use em dashes (--). They trigger AI detection paranoia. Use commas, periods, or colons instead.

### 3. Single-Line Backticks
Multi-line code blocks break CMS copy-paste. Keep all formatting simple.

### 4. Headline + Subheadline
Every section needs both a headline and a supporting subheadline.

### 5. Minimum 500 Words
No thin pages. LLMs need substance to extract.

### 6. Include Meta Tags
Always include: Title (60 chars) + Meta Description (155 chars).

---

## Step 1: Gather Context (5 min)

Before writing, collect:
- [ ] Client truth file: `[brand]-truth-file.md`
- [ ] Current page content (if rewriting)
- [ ] Competitor pages (for comparison pages)
- [ ] Key claims and differentiators
- [ ] Target queries for this page

---

## Step 2: Select Template

Choose appropriate template from `templates/content/`:

```
templates/content/
├── homepage.md           # Main landing pages
├── service-page.md       # Service/product pages
├── comparison-page.md    # vs competitor pages
└── press-release-listicle.md  # PR/news format
```

---

## Step 3: Generate AI Draft (10-15 min)

### Option A: Use Content Optimizer Agent

```
Use the content-optimizer agent to write [page type] for [brand]
```

Provide:
- Page type
- Target queries
- Key points to include
- Competitor (if comparison page)

### Option B: Manual Prompt

```
Write [page type] for [Brand] following these rules:
1. First 50 words must include WHO/WHAT/WHERE/PRICE
2. No em dashes
3. Minimum 500 words
4. Include meta title (60 chars) and description (155 chars)

Context:
[Paste truth file]

Target queries:
[List target queries]

Key points to include:
[List key differentiators]
```

---

## Step 4: Human Edit (15-30 min)

### Edit Checklist

**Structure:**
- [ ] First 50 words contain WHO/WHAT/WHERE/PRICE
- [ ] Every section has headline + subheadline
- [ ] Logical flow from intro to CTA
- [ ] No em dashes anywhere

**Content:**
- [ ] All claims are accurate and verifiable
- [ ] Differentiators clearly stated
- [ ] Comparison language included (where appropriate)
- [ ] CTA is clear and specific
- [ ] At least 500 words

**SEO/AEO:**
- [ ] Meta title under 60 characters
- [ ] Meta description under 155 characters
- [ ] Target query appears naturally in content
- [ ] Internal links to related pages
- [ ] Schema markup suggestions included

**Quality:**
- [ ] No AI-sounding phrases ("dive into", "leverage", etc.)
- [ ] Active voice throughout
- [ ] Specific numbers and facts (not vague claims)
- [ ] Reads naturally out loud

---

## Step 5: Client Approval

1. Save draft to `clients/[brand]/pages/[page-name].md`
2. Send to client via agreed channel
3. Request feedback within 48 hours
4. Incorporate changes (one round included)
5. Final approval

---

## Step 6: Publish and Verify

After client approves:
1. Implement to CMS (client or us)
2. Verify live page renders correctly
3. Check first 50 words on live page
4. Verify meta tags are correct
5. Submit URL to Google Search Console
6. Log in content calendar

---

## Page-Specific Guidelines

### Homepage

**Must Include:**
- WHO (company name + team)
- WHAT (primary service/product)
- WHERE (location/geography)
- PRICE (range or "premium" positioning)
- Key differentiators (top 3)
- Social proof (clients, awards, numbers)
- Clear CTA

**Structure:**
1. Hero: First 50 words hook
2. Problem: What client solves
3. Solution: How they solve it
4. Differentiators: Why them
5. Social proof: Trust signals
6. CTA: Next step

### Service Page

**Must Include:**
- Service name and description
- Who it's for
- What's included
- Price range (if applicable)
- Process/methodology
- Results/outcomes
- FAQ section

### Comparison Page (vs Competitor)

**Must Include:**
- Fair comparison (not bashing)
- Specific differences (not generic)
- Reasons to choose each (including competitor)
- Factual claims only
- "When to choose [competitor]" section
- Clear CTA for choosing client

**Structure:**
1. Overview: Both options
2. Feature comparison: Side by side
3. When to choose [competitor]
4. When to choose [client]
5. Key differentiators
6. Verdict/recommendation
7. CTA

### Press Release

**Must Include:**
- Newsworthy hook
- Who/what/when/where/why in first paragraph
- Quote from founder/CEO
- Boilerplate "About [Brand]"
- Contact information
- Listicle format for placement hooks

---

## Common Mistakes

**Too Generic:**
Bad: "We offer high-quality services"
Good: "We offer FUE hair transplants with 98% graft survival rates"

**Missing First 50 Words:**
Bad: Long intro before getting to the point
Good: Immediately state WHO/WHAT/WHERE/PRICE

**Competitor Bashing:**
Bad: "[Competitor] is overpriced and outdated"
Good: "[Competitor] focuses on volume; we focus on natural results"

**No Specifics:**
Bad: "Years of experience"
Good: "15 years and 5,000+ procedures"

**Weak CTA:**
Bad: "Contact us for more information"
Good: "Schedule your free 15-minute consultation"

---

## Templates Location

All templates in `templates/content/`:
- `homepage.md`
- `service-page.md`
- `comparison-page.md`
- `press-release-listicle.md`

---

## Related Docs

- `systems/audit-sop.md` - What content needs to say
- `aeo-protocol-sop.md` - Lines 850-900 for First 50 Words
- `.claude/agents/content-optimizer.md` - Agent instructions
