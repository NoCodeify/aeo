# Thumbnail Asset Catalog

Base directories (all inside the project):
- **Good edits**: `youtube/system/thumbnail-good-edits/`
- **Reference thumbnails**: `youtube/system/thumbnail-references/` (drop inspiration thumbnails here)

> **ALWAYS start from Good Edits or external references.** Raw photos lack the contrast, saturation, sharpening, and color grading needed. Gemini cannot grade photos to thumbnail quality. Original ideas from scratch also underperform - closely modeling an existing Good Edit produces far better results.

---

## Good Edits (Source Images)

These are professionally graded thumbnails. Use as reference images for `edit_image` - keep the person and grading, change the elements around them.

| File | Short ID | Expression | Face Position | Best For |
|------|----------|-----------|---------------|----------|
| `growth-chart-100k-600k.jpg` | `growth_chart` | skeptical/concerned | Center | Doubt, questioning, "really?" topics |
| `tier-list-halal-money.jpg` | `tier_list` | shocked, mouth wide open | Right side | Big reveals, surprising numbers, "holy shit" moments |
| `survival-guide-paypal.jpg` | `survival_guide` | smiling, holding book | Center | Positive, approachable, guides, tutorials |
| `automation-guide-pabbly.jpg` | `automation_guide` | excited yelling | Right side | Hype, energy, big announcements |
| `lazy-money-iphone-paypal.jpg` | `lazy_money` | shocked, mouth wide open | Right side | Surprising results, unexpected outcomes |
| `salary-before-after-split.jpg` | `salary_before_after` | skeptical frown | Center | Before/after, transformations, comparisons |

### Expression-to-Emotion Quick Pick

| Video Emotion | Best Good Edit | Why |
|--------------|---------------|-----|
| **Shock / "holy shit"** | `tier_list` or `lazy_money` | Mouth wide open, eyes popping |
| **Excitement / hype** | `automation_guide` | Yelling energy, right-side composition |
| **Skepticism / doubt** | `growth_chart` or `salary_before_after` | Furrowed brow, concerned look |
| **Friendly / positive** | `survival_guide` | Genuine smile, approachable |
| **Before/After** | `salary_before_after` | Already has split layout DNA |

---

## Thumbnail Generation Workflow

### The Golden Rule: MODEL, Don't Invent

Original thumbnail ideas from scratch produce worse results than closely adapting a Good Edit. Gemini excels at swapping elements in an existing composition but struggles to build good compositions from nothing.

**Always follow this flow:**
1. Pick the Good Edit with the right expression + layout for the video
2. Describe EXACTLY what elements to swap (text, icons, background, props)
3. Be hyper-specific about replacements - vague prompts let old content leak through

### Mode 1: Adapt a Good Edit (DEFAULT - use this)

Pass a Good Edit to `edit_image`. Keep the person and overall visual quality. Swap the elements to fit the new video.

**Prompting rules:**
- NEVER change the background aesthetic. If the reference is bright/warm, don't ask for dark/black. Explicitly anchor the color grading.
- Anchor EVERYTHING before changing anything. List every element to keep (person, pose, expression, background, plants, cash, lighting, grading, composition) BEFORE listing changes. More anchors = less drift.
- Use surgical numbered swaps, not vague REMOVE/ADD blocks. Number each change. One element per number. 2-3 swaps is ideal, 5+ causes drift.
- Spell out ALL text and code content exactly. Don't say "some code" - write every line, specify colors per line. Vague = gibberish.
- No obscure logos/icons. If viewers can't recognize it instantly (Anthropic "A", niche brand marks), use universally understood visuals instead (terminal windows, dollar signs, well-known tool logos).
- Keep elements the reference already has if they fit the concept. Cash stacks, background elements, etc. Don't strip away things that already tell the right story.
- When iterating, use the BEST output as the new reference for the next round. Don't keep re-prompting from the original Good Edit.

**Example prompt structure (CORRECT - use this):**
```
Keep everything exactly the same - same person, same pose, same facial expression,
same position on the right side, same warm bright color grading, same tropical plant
leaves on the left edge, same blurred city/building background, same cash stacks at
the bottom, same overall composition and lighting.

Make these changes:
1. Top text: replace the yellow "Halal Money Tier List" text with large bold white
   "SOLO" text in the same position, same scale relative to the frame
2. Tier list area: replace the entire S/B/F tier list grid with [exact description
   of replacement, including specific text content, colors, and style]
3. Keep the cash stacks at the bottom exactly as they are
```

**BAD prompt structure (NEVER use - causes drift):**
```
Keep this exact person unchanged.

REMOVE: [vague list]
ADD: [vague list]

Keep the same overall composition.
```

### Mode 2: Model from External Reference

User drops a thumbnail they liked into `thumbnail-references/`. Pass it to `edit_image` with targeted swaps.

**Prompting rules:**
- Say exactly what to keep (layout, style, composition, color palette) and what to change
- Explicitly name every text/number replacement
- If the reference has a different person, describe what the person should look like based on the Good Edits

### Mode 3: Fully Original (AVOID)

Only as absolute last resort when no Good Edit or reference is remotely close. Results will be significantly worse than Mode 1 or 2.
