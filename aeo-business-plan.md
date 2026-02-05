# AEO Protocol - Business Plan

> **Version:** 1.0
> **Last Updated:** January 2026
> **Revenue Target:** €100k/mo by Year 2

---

## 1. Executive Summary

**What:** AEO (Answer Engine Optimization) agency + tools. We help brands get recommended by ChatGPT, Gemini, and AI search engines.

**Who:** Founder + 1 AEO Operator + AI Agents (Claude workflows)

**Why Now:** AI search is replacing traditional search. Brands that don't optimize for LLMs will become invisible. We have the methodology (The Protocol) and the automation (MCP tools) to deliver at scale.

**Revenue Trajectory:**
- Month 3: €10k/mo (2 sprints + 5 retainers)
- Month 6: €25k/mo (3 sprints + 10 retainers + marketplace)
- Month 12: €50k/mo (scale + satellite network)
- Year 2: €100k/mo (SaaS + full marketplace)

---

## 2. Services

### Pricing Model: Upfront + Retainer

We charge heavy upfront (covers audit + setup + first sprint) then lighter retainer (monitoring + links).

| Plan | Upfront | Monthly | Total Year 1 |
|------|---------|---------|--------------|
| **Foundation** | €2,500 | €750/mo | €11,500 |
| **Growth** | €5,000 | €1,500/mo | €23,000 |
| **Dominance** | €10,000 | €2,500/mo | €40,000 |

### What Each Tier Includes

| Deliverable | Foundation | Growth | Dominance |
|-------------|------------|--------|-----------|
| Full AEO Audit | Yes | Yes | Yes |
| Strategic Playbook | Yes | Yes | Yes |
| Technical Setup | Yes | Yes | Yes |
| Content Pages/mo | 4 | 8 | 15 |
| Comparison Pages | 2 | 5 | 10 |
| Backlinks/mo | 5 | 10 | 20 |
| Press Releases/mo | 1 | 2 | 4 |
| Consistency Tests | Weekly | 2x/week | Daily |
| Slack Support | Yes | Yes | Priority |
| Strategy Calls | Monthly | Bi-weekly | Weekly |

### Entry Products

| Product | Price | Purpose |
|---------|-------|---------|
| **Audit Only** | €500-2,500 | Foot in door, upsell to sprint |
| **Free AI Score** | Free | Lead magnet, collect email |

---

## 3. Products (Build Roadmap)

### Tier 1: Services (Now)
What we sell today with existing Claude + MCP tools.

| Product | Price | Effort | Recurring |
|---------|-------|--------|-----------|
| AEO Audit | €500-2,500 | 2 hrs | No |
| Full 90-Day Sprint | €5,000-15,000 | 30-50 hrs | No |
| Maintenance Retainer | €500-1,500/mo | 4-6 hrs/mo | Yes |

### Tier 2: Internal Tools (Build Soon)
Automation that makes services faster.

| Tool | What It Does | Build Time |
|------|--------------|------------|
| **Audit Dashboard** | Internal tool for faster audit delivery | 2-4 weeks |
| **Monitoring Alerts** | Weekly consistency checks, Slack alerts | 1-2 weeks |
| **Force-Fetch Bot** | Auto-refresh ChatGPT cache after updates | 1 week |
| **Truth File Generator** | Create llms.txt from site crawl | 1 week |

### Tier 3: Marketplaces (Build Later)
Where the real scale and network effects are.

| Marketplace | What It Does | Revenue Model |
|-------------|--------------|---------------|
| **Backlink Marketplace** | Connect brands with vetted link sellers | 10-20% transaction fee |
| **Listicle Placement Network** | Pay to get added to top-ranking lists | Fixed fee per placement |
| **Satellite Domain Network** | Pre-built review sites, pay for "Editor's Pick" | Monthly subscription |
| **Press Release Distribution** | One-click submit to 20+ free PR sites | Per-release fee |

### Tier 4: SaaS (Long-term)
Self-serve platform for smaller clients.

| SaaS | What It Does | Pricing |
|------|--------------|---------|
| **AEO Protocol Platform** | Full self-serve: audit, playbook, monitoring | $99-499/mo |
| **LLM Visibility Score** | Real-time tracking across ChatGPT, Gemini | $49-199/mo |
| **Content Optimizer** | Paste copy, get AEO-optimized version | $29-99/mo |

---

## 4. Team Structure

### Core Team (You + 1 + AI)

| Role | Responsibilities | Hours/Week |
|------|------------------|------------|
| **Founder** | Sales, strategy, high-value calls, QA | 25-30 |
| **AEO Operator** | Run Claude workflows, manage delivery, basic edits | 35-40 |
| **AI Agents** | Audits, reports, content drafts, monitoring | Automated |
| **Fiverr** (as needed) | Backlinks, press releases, HARO | Per project |

### AI Agent Stack

| Agent | Task | Hours Saved |
|-------|------|-------------|
| `aeo-auditor` | Full 10-run consistency audits | 3-4 hours |
| `report-generator` | Client-ready reports | 2 hours |
| `content-optimizer` | Draft content pages | 2-3 hours/page |
| `playbook-creator` | Convert audit to actions | 1-2 hours |
| `competitor-researcher` | Forum research | 2-3 hours |

### AEO Operator Role (€2,500-3,500/mo)

**Does:**
- Runs Claude commands for each client
- Reviews/edits AI outputs (15-30 min per deliverable)
- Manages Fiverr contractors
- Client communication (Slack, email)
- Basic CMS updates

**Does NOT:**
- Strategy (that's you)
- Sales calls (that's you)
- Complex content rewrites (escalate to you)

---

## 5. Client Journey

```
LEAD → Intake Form → Auto-Audit → Review Call → Proposal → Close
                         ↓
                  [Automated Report]
                         ↓
                  Human QA (15 min)
                         ↓
                  Send to Client
```

### Phase 1: Intake (5 min client time)
- Tally form collects: Brand, website, category, 5 dream queries, competitors, key claims
- Auto-creates client folder in `clients/[brand]/`
- Auto-generates truth file template

### Phase 2: Automated Audit (15 min hands-on)
- Run: `Use aeo-auditor agent to audit [brand]`
- MCP tools run 10x consistency tests
- Generates audit report draft

### Phase 3: Human QA (15-30 min)
- Review audit for accuracy
- Add strategic insights
- Finalize playbook priorities

### Phase 4: Delivery
- Client receives: Audit report + Playbook
- Optional: Proposal for implementation

### Phase 5: Implementation (90 Days)
```
DAYS 1-30:  Audit → Playbook → Technical fixes → First 50 words rewrite
DAYS 30-60: Comparison pages → Key content → Initial backlinks
DAYS 60-90: Remaining content → More backlinks → Initial monitoring
DAY 90+:    Weekly monitoring + monthly link buying (maintenance mode)
```

---

## 6. Operations

### SOPs (Standard Operating Procedures)
Located in `systems/`:

| File | Purpose |
|------|---------|
| `intake-sop.md` | Client onboarding process |
| `audit-sop.md` | Step-by-step audit process |
| `playbook-sop.md` | How to create playbooks |
| `content-sop.md` | Content creation process |
| `backlink-sop.md` | Backlink/outreach process |
| `monitoring-sop.md` | Weekly monitoring process |
| `delivery-sop.md` | How to deliver to clients |
| `intake-questions.md` | Questions for intake form |

### Templates
Located in `templates/`:

| File | Purpose |
|------|---------|
| `client-folder-structure.md` | Standard folder setup |
| `proposal-template.md` | Sales proposal |
| `audit-report-template.md` | Audit deliverable format |
| `playbook-template.md` | Playbook structure |
| `weekly-report-template.md` | Monitoring report |
| `content/homepage.md` | Homepage copy template |
| `content/comparison-page.md` | vs-[competitor] template |
| `content/service-page.md` | Service page template |
| `content/press-release-listicle.md` | PR template |

### Tracking
Located in `tracking/`:

| File | Purpose |
|------|---------|
| `client-roster.md` | All active clients |
| `backlink-tracker.md` | Link building progress |
| `content-calendar.md` | Content delivery schedule |

---

## 7. Financial Projections

### Unit Economics

| Service | Revenue | Time | Margin |
|---------|---------|------|--------|
| Audit Only | €500-2,500 | 1-2 hrs | ~80% |
| 90-Day Sprint | €5,000-15,000 | 30-50 hrs | ~60% |
| Maintenance Retainer | €500-1,500/mo | 4-6 hrs/mo | ~70% |

### Future Products

| Product | Revenue Model | Margin |
|---------|---------------|--------|
| Backlink Marketplace | 15-20% transaction fee | ~90% |
| Satellite Network | €500-2,000/brand/mo | ~85% |
| Listicle Placement | €300-2,500/placement | ~50% |
| SaaS Platform | $99-499/mo | ~90% |

### Revenue Milestones

| Milestone | Revenue | How |
|-----------|---------|-----|
| Month 3 | €10k/mo | 2 sprints + 5 retainers |
| Month 6 | €25k/mo | 3 sprints + 10 retainers + marketplace |
| Month 12 | €50k/mo | Scale + satellite network |
| Year 2 | €100k/mo | SaaS + full marketplace |

### Target Portfolio

**Month 3:**
- 2 active sprints (€5k each = €10k upfront)
- 5 retainers at €750/mo = €3,750/mo

**Month 6:**
- 3 active sprints
- 10 retainers at avg €1,000/mo = €10k/mo
- Marketplace taking first transactions

**Month 12:**
- 5 active sprints
- 20 retainers at avg €1,250/mo = €25k/mo
- Marketplace + satellites = €10k/mo

---

## 8. Build Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [x] Create master business plan
- [ ] Create systems folder with SOPs
- [ ] Create templates folder
- [ ] Create tracking folder
- [ ] Test full audit flow on 2-3 brands
- [ ] Finalize pricing and packages

### Phase 2: Automation (Month 2)
- [ ] Build monitoring script (cron + MCP)
- [ ] Polish report-generator output
- [ ] Create weekly report automation
- [ ] Hire AEO Operator
- [ ] Train operator on SOPs
- [ ] Launch first 3-5 paying clients

### Phase 3: Scale (Month 3)
- [ ] Build client-facing dashboard (simple)
- [ ] Create lead magnet: "Free AI Visibility Score"
- [ ] Launch content marketing (YouTube, LinkedIn)
- [ ] Backlink marketplace MVP (50-100 curated sellers)
- [ ] Target: 10 clients

### Phase 4: Marketplaces (Months 3-6)
- [ ] Scale backlink marketplace
- [ ] Listicle placement service
- [ ] Press release distribution network
- [ ] Target: 20 clients, €30k MRR

### Phase 5: Network Effects (Months 6-12)
- [ ] Satellite domain network (5-10 sites)
- [ ] Scale marketplace to 500+ publishers
- [ ] API integrations (Ahrefs, Bing Webmaster)
- [ ] Target: €50k MRR

### Phase 6: SaaS (Year 2)
- [ ] Self-serve audit platform
- [ ] LLM visibility tracking dashboard
- [ ] Content optimizer tool
- [ ] Target: €100k MRR

---

## 9. Competitive Positioning

### vs Generic AEO Agencies

| Factor | Generic AEO | AEO Protocol |
|--------|-------------|--------------|
| Methodology | Ad-hoc | The Protocol (documented, repeatable) |
| Testing | One-time queries | 10-run consistency tests |
| Focus | Content volume | Strategic positioning |
| Approach | Generic optimization | Brand-specific strategy |
| Pricing | Volume-based | Outcome-based |

### vs AEO Engine (Main Competitor)
- Local: $797/mo (15 articles, 3-5 backlinks)
- Growth: $1,597/mo (30 articles, 5-10 backlinks)
- Revenue: ~$50k/mo with 40 clients

**Our Differentiation:**
- **Outcome-focused** vs their volume-focused
- **Premium positioning** vs mid-market
- **Methodology-first** (The Protocol) vs generic
- **Consistency testing** (10x per query)
- **Strategic** (comparison pages, positioning)

### Why We Win
1. **Speed** - Audits in hours, not weeks
2. **Transparency** - Show exactly what LLMs say
3. **Methodology** - Documented, repeatable protocol
4. **AI-native** - Built on Claude + MCP from day one
5. **Premium focus** - Higher value clients, not volume

---

## 10. Key Success Metrics

### Service Delivery
- Audit turnaround: < 48 hours
- Content delivery: 4 pages/week minimum
- Client response time: < 4 hours (Slack)

### Client Results
- LLM mention rate improvement: 50%+ by Month 3
- Position improvement: Top 3 mentions
- Citation rate: 30%+ of responses cite client

### Business Health
- Client retention: 80%+ on retainers
- Average client value: €15k+ Year 1
- Client acquisition cost: < €500

---

## Appendix A: PressWhizz Learnings

What made them reach ~$100k/mo with ~12 people:

| Factor | What They Did | Our Application |
|--------|---------------|-----------------|
| "Missing Middle" | Gap between agencies and brokers | Gap between DIY and consultants |
| Speed | 18-hour delivery | Fast audit delivery |
| Transparency | Full Ahrefs/Moz metrics | Real-time LLM responses |
| Affiliate Program | 5% lifetime | 10-15% (higher value) |
| Inventory Scale | 37,000+ publishers | Build backlink marketplace |
| AI Automation | Replaced account managers | Claude + MCP tools |

---

## Appendix B: Origin Story

> "I was on my second BMW. Going to buy another one. Asked ChatGPT for advice. It convinced me to buy a Porsche Boxster instead. If AI can change MY buying decision, what's it doing to my clients' businesses?"

---

## Appendix C: The 90-Day Reality

Most client work happens in the first 90 days. After that, it's maintenance.

**Days 1-30:** Audit, Playbook, Technical fixes, First 50 words rewrite
**Days 30-60:** Comparison pages, Key content, Initial backlinks
**Days 60-90:** Remaining content, More backlinks, Initial monitoring
**Day 90+:** Weekly monitoring + monthly link buying

**Pricing Implication:**
- Charge heavy upfront for 90-day sprint
- Charge lighter retainer for maintenance
- OR: One-time fee, they buy links themselves
