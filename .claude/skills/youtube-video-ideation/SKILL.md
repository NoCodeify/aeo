---
name: youtube-video-ideation
description: Generate search-optimized YouTube video concepts (titles, thumbnails, angles) using keyword data. Use when user says "video idea", "video title", "thumbnail concept", "next video", "content calendar", or "what video should I make". Do NOT use for script writing (use youtube-script-writer) or editing guidance (use youtube-video-editor).
allowed-tools: Read, Glob, Grep, WebSearch, mcp__seo-agent__google_trends_explore, mcp__seo-agent__keyword_overview
---

# YouTube Video Ideation (Search-First + Ed Lawrence Method)

Generate video concepts that rank for real search terms AND perform well algorithmically.

## Core Philosophy: Search + Browse

**Every video needs BOTH:**
1. **Search ranking** - Title matches keywords people actually search
2. **Browse performance** - Thumbnail/hook stops scrolling

**Reference file:** `youtube/system/aeo-keyword-data.md` (source of truth for all keyword decisions)

---

## Step 1: Keyword Selection (FIRST)

**Before generating ANY ideas, select the target keyword.**

### Keyword Tiers (from aeo-keyword-data.md)

| Tier | Volume | Growth | Examples |
|------|--------|--------|----------|
| **1: Core AEO** | 1K-10K | +900% | answer engine optimization, ai search optimization |
| **2: High Volume** | 10K-100K | +900% | ai seo, google ai overviews |
| **3: Emerging** | 10-1K | +∞ | rank in chatgpt, optimize for chatgpt |
| **4: Comparison** | 1K-10K | +900% | seo vs geo |

### Selection Criteria

**For flagship content:** Tier 1 keywords (own the category)
**For quick wins:** Tier 3 keywords (first-mover, low competition)
**For volume:** Tier 2 keywords (broader audience)
**For conversions:** Tier 4 keywords (comparison = buyer intent)

Document the target keyword before proceeding.

---

## Step 2: Title Formula (Search-Optimized)

### The Formula
```
[Target Keyword]: [Specific Promise/Outcome]
```

### Examples by Keyword

| Target Keyword | Search-Optimized Title |
|----------------|----------------------|
| answer engine optimization | "Answer Engine Optimization: Complete Guide 2026" |
| rank in chatgpt | "How to Rank in ChatGPT (Step-by-Step)" |
| ai search optimization | "AI Search Optimization: Get Found by ChatGPT & Gemini" |
| seo vs geo | "SEO vs GEO: What Actually Matters in 2026" |
| google ai overviews | "Google AI Overviews: How to Get Featured" |

### Title Requirements

1. **Target keyword appears in first 5 words** (SEO)
2. **Specific outcome or promise** (click-worthy)
3. **No clickbait** (delivers on promise)
4. **Under 60 characters** (doesn't truncate)

---

## Step 3: The 1+1=3 Rule (Thumbnail)

**Title and thumbnail must COMPLEMENT, not repeat.**

| Title Does | Thumbnail Does |
|------------|----------------|
| Contains the keyword | Creates emotional reaction |
| Explains WHAT | Shows WHY it matters |
| Targets search | Stops scrolling |

### Thumbnail Type Selection (CRITICAL)

**Every thumbnail must combine 2-3 types.** Pick from:

| Type | What It Does |
|------|-------------|
| **Big Numbers** | Dollar amounts, percentages that shock |
| **Shock/Curiosity** | Something unexpected |
| **Simple/Minimal** | Just one object, nothing else |
| **Social Hacking** | Recognizable face/brand |
| **Creator + Bigger** | You next to something impressive |
| **Header Text** | Bold context the title doesn't give |
| **Comparison** | Before/after, vs., side by side |
| **Blur/Mystery** | Key element blurred |
| **Weird Object** | Something that doesn't belong |
| **Branded** | Consistent channel identity |

**Always specify the 2-3 types in your concept.** Single-type thumbnails don't stand out.

### Thumbnail Text Rules

- **ALL CAPS ALWAYS**
- **3-5 words maximum**
- **Does NOT repeat title words**
- **Emotional/stakes-based**
- **Readable at 160x90px (mobile)**
- **Porsche font, smooth white-to-silver gradient**

### Examples

| Title | Thumbnail Text (BAD) | Thumbnail Text (GOOD) | Types Used |
|-------|---------------------|----------------------|------------|
| "Answer Engine Optimization Guide" | "AEO GUIDE" | "NEW SEO" | Header + Shock |
| "How to Rank in ChatGPT" | "RANK IN CHATGPT" | "GET FOUND" | Header + Simple |
| "Claude Code Use Cases: 5 Things" | "I BUILT THESE" | "$100K" | Big Numbers + Shock |

---

## Step 4: Concept Generation (5 Variations)

Generate 5 title/thumbnail combinations for the target keyword.

### Variation Types

**Variation 1: Direct How-To**
- Title: "[Keyword]: [Step-by-Step/Complete Guide/How-To]"
- Thumbnail: Action-oriented text

**Variation 2: Transformation**
- Title: "[Keyword] Took This Business From X to Y"
- Thumbnail: Before/after implication

**Variation 3: Data/Research**
- Title: "I Studied [X] for [Keyword] - Here's What Works"
- Thumbnail: Surprising stat or finding

**Variation 4: Problem-Aware**
- Title: "Why [Keyword] Isn't Working (And How to Fix It)"
- Thumbnail: Problem acknowledgment

**Variation 5: Comparison/Contrarian**
- Title: "[Keyword] vs [Alternative]: [Verdict]"
- Thumbnail: Choice/tension

---

## Step 5: Selection (5 → 3 → 1)

### Round 1: Kill List Filter (5 → 3)

**Reject any title that:**
- [ ] Doesn't include keyword in first 5 words
- [ ] Over 60 characters
- [ ] Thumbnail repeats title words
- [ ] No specific promise/outcome
- [ ] Sounds like clickbait

Advance 3 titles.

### Round 2: Read Aloud Test (3 → 1)

Read each title aloud. Ask:
1. Would I click this?
2. Does it sound natural?
3. Does the thumbnail add information?

Select winner.

---

## Step 6: Thumbnail Specification (Minimal Apple Aesthetic)

### Required Elements

| Element | Specification |
|---------|---------------|
| **Thumbnail types** | 2-3 types combined (from Step 3 table) |
| **Background** | Pure black (#000000) |
| **Icons** | Glossy 3D iOS-style app icons, each with own color glow |
| **Text** | ALL CAPS, 3-5 words, Porsche font |
| **Text gradient** | Smooth white-to-silver (gradual, not abrupt) |
| **No faces** | Revisit at 2-5K subs |

### Icon Color Palette

| Project | Color | Symbol |
|---------|-------|--------|
| AI Chat | Teal | Chat bubble |
| Code/CI-CD | Purple | Terminal cursor |
| Email | Blue | Envelope |
| NFC/Access | Gold | NFC waves |
| Search/AEO | Orange | Magnifying glass |
| Claude/AI | Coral-orange | Stylized "A" |

### Layouts

- **Icon Row:** 5 icons in a line, text above (for lists)
- **Hub + Satellites:** Center icon large, smaller icons orbiting (for "built with X")
- **Two Icons + Plus:** Icon + Icon with "+" between (for combinations)

### Full specs: `youtube/templates/thumbnail-style-guide.md`

---

## Step 7: Final Validation

### Search Check
- [ ] Target keyword in title (first 5 words)
- [ ] Matches real search intent
- [ ] Would rank for this term

### Browse Check
- [ ] Thumbnail doesn't repeat title
- [ ] Readable at mobile size
- [ ] Face + emotion + text + metaphor

### Positioning Check
- [ ] Fits AEO channel positioning
- [ ] Leverages credibility/proof
- [ ] Clear CTA to next video possible

---

## Output Format

```markdown
## VIDEO CONCEPT

**Target Keyword:** [from keyword data]
**Search Volume:** [X/month]
**YoY Growth:** [X%]

---

### TITLE
[The exact title - under 60 chars]

### THUMBNAIL
- **Text:** [3-5 words]
- **Hero Color:** [Color + hex]
- **Expression:** [What to find in freeze frame]
- **Visual Metaphor:** [ONE element]

### ANGLE
[What makes this video different/unique]

### SEARCH INTENT
[What is the searcher trying to learn/do?]

### VIDEO-TO-VIDEO CTA
[What video does this lead to next?]

---

### REJECTED VARIATIONS
1. [Title 1] - Rejected because: [reason]
2. [Title 2] - Rejected because: [reason]
3. [Title 3] - Rejected because: [reason]
```

---

## AEO Content Calendar (Reference)

### Flagship Content (Search-Optimized)

| # | Target Keyword | Title | Volume |
|---|----------------|-------|--------|
| 1 | answer engine optimization | "Answer Engine Optimization: Complete Guide 2026" | 1K-10K |
| 2 | rank in chatgpt | "How to Rank in ChatGPT (Step-by-Step)" | 10-100 +∞ |
| 3 | ai search optimization | "AI Search Optimization: Get Found by ChatGPT & Gemini" | 1K-10K |
| 4 | seo vs geo | "SEO vs GEO: What Actually Matters in 2026" | 1K-10K |
| 5 | google ai overviews | "Google AI Overviews: How to Get Featured" | 10K-100K |

### Story/Case Study Content (Retention-Focused)

| # | Title | Hook Type | Thumbnail |
|---|-------|-----------|-----------|
| 6 | "ChatGPT Convinced Me to Buy a Porsche" | Origin story | "$50K DECISION" |
| 7 | "This Clinic Was Invisible to AI. 30 Days Later, #1." | Transformation | "NOW #1" |
| 8 | "I Audited 100 Businesses. Half Are Losing Customers." | Data reveal | "HALF LOSING" |
| 9 | "Why ChatGPT Doesn't Mention Your Business" | Problem aware | "INVISIBLE?" |
| 10 | "The First 50 Words Rule" | Tactical insight | "50 WORDS" |

---

## Quick Reference: Keyword → Title

| Keyword | Title Template |
|---------|---------------|
| answer engine optimization | "Answer Engine Optimization: [Promise]" |
| ai search optimization | "AI Search Optimization: [Outcome]" |
| rank in chatgpt | "How to Rank in ChatGPT [Method]" |
| optimize for chatgpt | "Optimize for ChatGPT: [Guide Type]" |
| seo vs geo | "SEO vs GEO: [Verdict/Question]" |
| google ai overviews | "Google AI Overviews: [How-to]" |
| is seo dead | "Is SEO Dead? [Answer/Test]" |
| ai seo | "AI SEO: [What You Need to Know]" |

---

## Remember

1. **Keyword first** - Select from aeo-keyword-data.md before ideating
2. **Title = search** - Must contain keyword in first 5 words
3. **Thumbnail = browse** - Must NOT repeat title, must stop scrolling
4. **1+1=3 rule** - Title and thumbnail complement each other
5. **5 → 3 → 1** - Generate variations, filter, select winner
6. **Mobile test** - Thumbnail readable at 160x90px

**The goal:** Rank for the search term AND get clicked in browse.
