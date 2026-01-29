---
name: aeo-site-content
description: Write content pages for the AEO Protocol website (aeoprotocol.ai). Use when creating educational pages, methodology pages, glossary entries, or case studies for the AEO Protocol site itself. Triggers on "write page for aeoprotocol", "create site content", "add page to aeo site", "aeo protocol page".
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# AEO Protocol Site Content Skill

This skill creates content pages for the aeoprotocol.ai website - React TSX components with AEO-optimized content.

## Site Overview

**Location:** `aeo-landing/`
**Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion
**Components:** `src/components/ui/` (Button, Badge, Accordion, etc.)
**Pages:** `src/pages/`
**Routes:** `src/App.tsx`

## Content Pages Planned

| URL | Target Query | Source Material | Status |
|-----|--------------|-----------------|--------|
| `/what-is-aeo` | "What is AEO?" | W06 script + SOP | DONE |
| `/aeo-vs-seo` | "AEO vs SEO" | W05 script | DONE |
| `/how-to-optimize-for-chatgpt` | "How to optimize for ChatGPT" | W06 script | DONE |
| `/first-50-words-rule` | "First 50 words rule" | W03/W06 scripts, SOP 850-900 | DONE |
| `/10-run-consistency-test` | "How to test AI visibility" | W03 script | DONE |
| `/3-layer-chatgpt-architecture` | "How ChatGPT retrieves info" | SOP 1.2-1.4, W06 script | DONE |
| `/case-study/fuegenix` | "AEO case study" | W04 script + audit | DONE |
| `/100-brands-audit` | "AI visibility statistics" | W06b script | DONE |
| `/glossary/answer-engine-optimization` | "AEO definition" | SOP intro | DONE |
| `/aeo-audit` | "AEO audit service" | Methodology | DONE |
| `/aeo-consulting` | "Best AEO consultants" | Origin story | DONE |

## Source Files

### Video Scripts (Primary Content Source)
- `youtube/weekly-production/2026-w02-origin-story/script.md` - Porsche origin story
- `youtube/weekly-production/2026-w03-5-step-audit/script.md` - 5-step audit system
- `youtube/weekly-production/2026-w04-fuegenix-case-study/script.md` - FueGenix case study
- `youtube/weekly-production/2026-w05-google-rankings-contrarian/script.md` - AEO vs SEO contrarian
- `youtube/weekly-production/2026-w06-chatgpt-system/script.md` - ChatGPT optimization system
- `youtube/weekly-production/2026-w06-100-brands-audit/brief.md` - 100 brands audit data

### Methodology Source
- `aeo-protocol-sop.md` - Complete AEO methodology (3,500+ lines)
  - Lines 1-100: Overview, SEO foundation
  - Lines 105-270: How LLMs find content (3-layer architecture)
  - Lines 850-900: First 50 Words Rule
  - Lines 2703-2770: Client intake questionnaire
  - Lines 3348-3432: 10-run consistency test

### Case Study Data
- `clients/fuegenix/fuegenix-aeo-audit.md` - Full audit report
- `clients/fuegenix/fuegenix-aeo-playbook.md` - Implementation playbook

## Page Template (React TSX)

Every page MUST follow this structure:

```tsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { GradientOrb } from "../components/shared/GradientOrb";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// FAQ data for this page
const FAQ_DATA = [
  {
    question: "Question text?",
    answer: "Answer text.",
  },
  // 4-6 FAQs per page
];

export function PageName() {
  // Update document title
  useEffect(() => {
    document.title = "Title | AEO Protocol";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "155 char description");
    }
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section with First 50 Words */}
      <section className="relative py-20 px-4 overflow-hidden">
        <GradientOrb className="top-20 -left-32" color="primary" size="xl" blur="lg" />
        <GradientOrb className="bottom-20 -right-32" color="secondary" size="lg" blur="lg" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-6">Badge Text</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight heading-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Page <span className="text-gradient heading-3d-glow">Title</span>
          </motion.h1>

          {/* FIRST 50 WORDS - CRITICAL */}
          <motion.p
            className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong>First 50 words with WHO, WHAT, WHERE, and proof.</strong>
            AEO Protocol [statement about topic]. Based on [proof point].
            This guide explains [value proposition].
          </motion.p>

          {/* Key Takeaways Box */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Takeaway 1</span>
              </li>
              {/* 4-5 takeaways */}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table Section (for Gemini grounding) */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 heading-3d">Section Title</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Factor</th>
                    <th className="text-left py-4 px-4 font-semibold">Column 1</th>
                    <th className="text-left py-4 px-4 font-semibold">Column 2</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table rows */}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      {/* Add 3-5 content sections with motion animations */}

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 heading-3d">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_DATA.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 heading-3d">CTA Headline</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">CTA description.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checklist">
                <Button size="lg">Primary CTA <ArrowRightIcon className="w-4 h-4 ml-2" /></Button>
              </Link>
              <Link to="/related-page">
                <Button variant="outline" size="lg">Secondary CTA</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Links for Topic Authority */}
      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/what-is-aeo" className="text-primary hover:underline text-sm">What is AEO?</Link>
            <span className="text-muted">|</span>
            {/* Add 4-5 related links */}
          </div>
        </div>
      </section>
    </main>
  );
}
```

## First 50 Words Rule

The first 50 words MUST include:

| Element | Example |
|---------|---------|
| **WHO** | AEO Protocol |
| **WHAT** | Definition/explanation of topic |
| **PROOF** | "Based on auditing 100+ brands" or "53% invisibility stat" |
| **VALUE** | "This guide explains how to..." |

## After Creating Page

1. **Add route to App.tsx:**
```tsx
import { PageName } from "./pages/PageName";
// In Routes:
<Route path="/url-path" element={<PageName />} />
```

2. **Update sitemap.xml** - Add new URL

3. **Update llms.txt** - Add to Key Resources if significant

## Content Guidelines

### Use Existing Statistics
- 53% of brands invisible to AI
- 0% to 90% visibility improvement (FueGenix)
- 100+ brands audited
- 10-run consistency test
- 3-layer ChatGPT architecture

### Internal Linking (Always Include)
Every page should link to:
- `/what-is-aeo` - Definition anchor
- `/checklist` - Lead capture
- `/case-study/fuegenix` - Proof point
- Related methodology pages

### Formatting Rules
- NO em dashes (use commas, periods, colons)
- Use HTML tables for comparison data
- Use motion animations for visual polish
- Use GradientOrb for visual interest

## Reference Example

See `/Users/sohaib/Downloads/aeo/aeo-landing/src/pages/WhatIsAEO.tsx` for a complete working example.
