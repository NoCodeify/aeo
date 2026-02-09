# MentionedIn.ai — MVP Specification

> **Version:** 1.6
> **Date:** February 8, 2026
> **Product Name:** MentionedIn.ai ("Mentioned In AI" — the domain IS the tagline)
> **Status:** Spec reviewed (3 rounds), decisions locked, ready for build
> **Frontend Decision:** React/Next.js (confirmed over Flutter — see Section 8)
> **AI Model Decision:** Claude Sonnet 4.5 for all AI features (playbooks, battle cards, summaries) — see Decisions Log
> **Research:** 5 parallel agents (Feb 5) + 14 Instagram ad competitors (Feb 7) + 5 deep-review agents x3 rounds (Feb 7-8)

---

## Decisions Log (v1.6 — Feb 8, 2026)

Round 1: 5-agent deep review (spec reviewer, cross-doc auditor, competitive analyst, pricing strategist, GTM reviewer). 40 findings addressed.
Round 2: 5-agent deep review v2 (spec internal consistency, cross-doc alignment, tech architecture, pricing/unit economics, build plan/scope). 80 findings addressed.
Round 3: 5-agent deep review v3 (spec consistency, cross-doc alignment, tech architecture, build readiness/UX, competitive moat). 90+ findings addressed.
Round 4: 5-agent deep review v4 (build-readiness, security, edge cases, schema, UX flows). 163 raw findings. 4 spec-level items added (D56-D59). Remaining findings are implementation-level details resolved during build.

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | **Pricing = per-org subscription with client seat limits** (not per-client) | Spec was correct. Business strategy/research docs had conflicting "per-client" language. All docs updated. |
| D2 | **Use Claude Sonnet 4.5 for all AI features** (not Opus) | Playbook: Sonnet ~$0.045/generation vs Opus ~$0.225. Battle card: Sonnet ~$0.02 vs Opus ~$0.10. Quality difference is negligible for structured recommendations. Saves 5x on AI costs. |
| D3 | **Pull basic playbook into MVP (Phase 3)** | #1 differentiator can't ship late. Templated checklists in MVP, full AI-generated playbooks in Post-MVP Phase A. |
| D4 | **Pull weekly monitoring into MVP (Phase 3)** | Trend charts are useless without data. Weekly scheduled tests via Trigger.dev cron in MVP. |
| D5 | **Custom domains in MVP (Phase 4)** | White-label IS the product — clients seeing `mentionedin.app` breaks the promise. Cloudflare for SaaS handles domain provisioning + SSL via API. Ships in Phase 4 (weeks 8-10). |
| D6 | **Cut PDF reports from MVP** | Shareable web report links + browser print-to-PDF. Add React-PDF in Post-MVP Phase A. Saves 5-7 dev days. |
| D7 | **Simplify auth: Admin + Client Viewer only** | Skip "User" role for MVP. Add team roles in Post-MVP Phase A. Reduces auth complexity. |
| D8 | **Add competitor mention tracking to audit results** | The aha moment depends on it. Simple string matching, no extra API cost. |
| D9 | **Cap consistency tests** (not "unlimited") | Agency: 50/month. Scale: 200/month. Prevents margin-killing power users. |
| D10 | **Free audit: email BEFORE results** (not after) | Every API cost generates a lead. Prevents abuse. |
| D11 | **Add Perplexity engine to Post-MVP Phase A roadmap** | Closes gap vs Nimt.ai (4-5 engines) and Briljant (6 engines). |
| D12 | **Add embeddable audit widget to Post-MVP Phase A roadmap** | HikeSEO's best feature. Agencies embed on their site for lead gen. |
| D13 | **Skool price = $97/month** (fixed, not $49-97 range) | Revenue projections updated to match. |
| D14 | **Compare query = synchronous tRPC** (not Trigger.dev) | 5-10 second call doesn't need a job queue. Only audits + consistency tests use Trigger.dev. |
| D15 | **Snapshot granularity = weekly** (not monthly) | Monthly is too coarse for daily/weekly monitoring. |
| D16 | **Data retention: 90 days raw, then aggregate** | Raw AuditRun responses kept 90 days. Aggregated to weekly Snapshots after that. |
| D17 | **`assigned_clients` = join table** (not UUID array) | Postgres anti-pattern fixed. New `AgencyUserClient` table. |
| D18 | **Add beginner onboarding path** | Skip branding, provide demo client, link to Skool modules. |
| D19 | **Client viewer auth = client share link** (no Clerk account needed) | Agency generates a share URL with ClientViewerToken. Client clicks, sees read-only portal. No login required. NOT Clerk magic links — custom token system (D24). |
| D20 | **SaaS build starts Week 1** (not Week 5 per business strategy) | Business strategy 90-day plan updated. LinkedIn outreach uses manual audits weeks 1-8. |
| D21 | **Custom domains CONFIRMED in Phase 4** (fix contradiction) | D5 says Phase 4, but lines 903/989 wrongly said "cut/deferred." White-label IS the product. Contradiction removed. |
| D22 | **Add Pro tier at $99/mo** (8 clients, 25 tests) | Dead zone between Starter (3 clients) and Agency (15). Agency with 5 clients shouldn't pay $149. Pro fills the gap. |
| D23 | **Move free audit page from Phase 4 to Phase 2** | Business strategy needs lead gen in Weeks 1-4. Free audit page ships after audit engine works (Week 5). Lead gen 4 weeks earlier. |
| D24 | **Add ClientViewerToken table** to schema | D19 client share links need token storage. AgencyUser requires clerk_user_id which client viewers don't have. Separate token table with expiry/revocation. |
| D25 | **Add aio_mentioned field to AuditRun** | Visibility score weights Google AIO at 20%, but schema had no way to distinguish AIO vs organic. New boolean field. |
| D26 | **Add per-client usage tracking** | Pricing says "15/50/100 queries per brand" but ApiUsage had single counter. Added per-client breakdown fields. |
| D27 | **Fix pricing table features for MVP** | Agency tier showed "Full playbooks" but D3 says basic templated only at MVP. Updated to match what actually ships. |
| D28 | **Add overage pricing for consistency tests** | Hard caps frustrate power users. Soft limits with per-test overage ($2/test at Starter down to $0.50/test at Scale). |
| D29 | **Revenue projection revised to ~$238K ARR** | Old $413K assumed zero churn, $149 avg ARPU from day 1, 3x $5K B2B clients while building SaaS. Realistic: ~$238K with 5% monthly churn. |
| D30 | **Compare query = sync tRPC** (fix API section) | D14 decided this but API Architecture and Background Jobs sections still said "enqueues job." Fixed. |
| D31 | **Rename Feature Roadmap phases** | Feature Roadmap "Phase 2" collided with Build Plan "Phase 2." Renamed to "Post-MVP Phase A/B/C" to avoid confusion. |
| D32 | **Remove PDF references from MVP wireframes** | D6 cut PDF, but wireframes still showed [Export PDF] and [Download PDF]. Replaced with web report actions. |
| D33 | **Add agency_id to child tables** | RLS performance: every query on Audit, Report, Snapshot etc. required JOIN through Client to get agency_id. Denormalized for direct filtering. |
| D34 | **Fix cost model calculations** | Costs were inflated (used ChatGPT rate for all engines). Actual margins are BETTER: 96% Starter, 91% Agency at full cap. |
| D35 | **Define team seats** | Pricing showed seats (1/1/2/3/10) but only Admin+ClientViewer roles exist. Seats = admin users who can manage clients. Post-MVP Phase A adds granular roles. |
| D36 | **Define 14-day trial** | Appendix A referenced trial but it was undefined. Free audit CTA now says "Start free trial" = 14-day Agency tier trial, no credit card. |
| D37 | **Register mentionedin.app** | Subdomains use `{slug}.mentionedin.app` but domain wasn't declared as owned. Must purchase before build starts. |
| D38 | **Visibility score: fix algorithm bugs** | Undefined `runs` variable, no division-by-zero guards, confidence threshold too low. All fixed in pseudocode. |
| D39 | **Apply to Cloudflare for SaaS NOW** | Program requires approval, not self-serve. Fallback: Caddy on_demand_tls with Let's Encrypt. Apply before build starts. |
| D40 | **Supabase migration plan at 300 customers** | Supabase Pro $25/mo jumps to Team $599/mo at scale. Plan migration to self-hosted Postgres or DO Managed at 300 customers. Budget $2K. |
| D41 | **Monitoring uses 1-run pulse checks** (not full 10-run tests) | Weekly monitoring was mathematically impossible: Pro (8 clients x 4 weeks = 32 tests, cap 25). Pulse checks = 1 run per engine per query. Separate budget, doesn't consume consistency test quota. Full 10-run tests for on-demand deep analysis only. |
| D42 | **Unified auth middleware** | Two auth systems (Clerk + ClientViewerToken) need coexistence strategy. Middleware returns discriminated union: `{ type: 'clerk', agencyId, userId }` or `{ type: 'viewer', clientId, agencyId }` or `{ type: 'public' }`. Every tRPC procedure checks `ctx.auth.type`. |
| D43 | **Rename "magic link" → "client share link"** | "Magic link" implies Clerk feature. Our system is custom ClientViewerTokens (D24). Renamed everywhere to avoid developer confusion. |
| D44 | **Token auto-refresh on access** | ClientViewerTokens expire in 30 days. If client accesses within last 7 days of validity, auto-extend by 30 days. Prevents agencies from manually regenerating links. |
| D45 | **Free plan = read-only access** | After 14-day trial expires with no payment: `free` plan = read-only access to existing data. Can log in, can view data, cannot run audits/add clients. Add `trial_ends_at` to Agency schema. Daily cron checks expirations. |
| D46 | **Docker Compose defined** | Three services: `app` (Next.js), `caddy` (reverse proxy + SSL), `trigger-worker` (Trigger.dev). Supabase/Clerk/Stripe are external managed services. |
| D47 | **GitHub Actions CI/CD** | On push to `main`: build Docker image, push to GHCR, SSH deploy to VPS with `docker compose pull && docker compose up -d`. Zero-downtime via Caddy health checks. |
| D48 | **Global API rate limiter defined** | Redis semaphore via Upstash: OpenAI max 20 concurrent, Gemini max 30 concurrent, ScrapingBee max 10 concurrent. Jobs acquire slot before API call, release after. Prevents single Scale customer from exhausting quota. |
| D49 | **Playbook tRPC router added** | Was missing despite schema + UI tab existing. Routes: `generate` (from audit), `get`, `list`, `updateAction` (mark complete/skip). UI = checklist grouped by action_type. |
| D50 | **Stripe overage billing = metered items** | Client overage: modal on cap hit ("Adding 4th client costs $15/mo"), creates Stripe metered subscription item. Consistency test overage: auto-allowed, usage record sent to Stripe, charged at end of billing period. 5 webhook events defined: `subscription.created/updated/deleted`, `invoice.payment_failed`, `invoice.paid`. |
| D51 | **Caddy on_demand_tls as primary** for custom domains | Cloudflare for SaaS approval not guaranteed (D39). Build Caddy as primary path. Domain validation: CNAME must point to `custom.mentionedin.app`, domain not already claimed, block reserved domains. Re-verify CNAME weekly. Migrate to CF when approved. |
| D52 | **Email system defined** | 8 email types: audit complete, report ready, trial ending (day 12), cap warning (80%/90%), weekly monitoring summary, nurture 1/2/3 (immediate/day 2/day 5). Add `nurture_step` to Lead table. Templates built during implementation. |
| D53 | **Add agency_id to PlaybookAction + AuditQuery** | D33 gap: these tables queried directly but had no agency_id for RLS. Denormalized. |
| D54 | **Portal tRPC routes added** | Client viewer needs dedicated routes authed via ClientViewerToken: `portal/overview`, `portal/audit`, `portal/trend`, `portal/report`. Separate from Clerk-authed agency routes. |
| D55 | **Visibility score: symmetric weight redistribution** | When ANY engine has zero data (not just Google), redistribute its weight proportionally. Prevents ChatGPT outage from tanking scores. Also: add `brand_domain` param for citation checking, differentiate single-run (binary per-query) vs consistency (percentage) scoring. |
| D56 | **AuditRun field extraction algorithm defined** | `brand_mentioned`: case-insensitive substring match (same as MCP). `brand_position`: regex-based ordinal extraction from LLM response (1st paragraph mention = top, 2nd = second, 3rd = third, else not_found). `sentiment`: single Sonnet 4.5 classification call per AuditRun (~$0.003/run, bundled with position extraction). `context_snippet`: 200 chars around first brand mention. `competitor_mentioned/name/position`: check all client.competitors[] via same substring match. One Sonnet call per response extracts position + sentiment + competitor data together — NOT separate calls. |
| D57 | **Stripe product architecture defined** | 1 Product ("MentionedIn.ai") with 8 Prices (4 monthly + 4 annual). 2 metered Price items per subscription (client_overage + consistency_test_overage). Checkout: Stripe Checkout (redirect) for new subscriptions. Plan changes: `stripe.subscriptions.update()` with `proration_behavior: 'create_prorations'`. Self-serve management via Stripe Customer Portal (cancel, update payment method, view invoices). Webhook handler must call `stripe.webhooks.constructEvent()` for signature verification and store processed `event.id` in Redis (TTL 48h) for idempotency. |
| D58 | **Portal URL format and token delivery defined** | URL format: `{host}/portal?token={token}`. On first visit: middleware validates token, sets `HttpOnly; Secure; SameSite=Strict; Path=/portal` cookie named `_mia_viewer`, then 302 redirects to `{host}/portal` (strips token from URL). Subsequent visits use cookie. Token auto-refresh (D44) happens during cookie-set middleware. Expired token page: agency-branded error with "This link has expired. Contact {agency_name} for a new one." Share link the agency copies: `{host}/portal?token={token}` where `{host}` is custom domain if active, else `{slug}.mentionedin.app`. |
| D59 | **Caddy `ask` endpoint required** | Caddy `on_demand_tls` MUST be configured with `ask https://localhost:3000/api/caddy/ask`. The `/api/caddy/ask` Next.js endpoint checks: (1) domain exists in Agency.custom_domain, (2) custom_domain_status = 'active', (3) CNAME verified within last 7 days. Returns 200 to allow cert provisioning, 403 to deny. Without this, anyone can point a domain at the server and get a valid TLS cert. |

---

## 1. Product Vision

**MentionedIn.ai is the agency toolkit for selling and delivering AI visibility services** — track how brands appear in ChatGPT, Gemini, and Google AI Overviews, generate white-labeled client reports, and follow proven implementation playbooks. All under the agency's own brand.

**One-liner:** "Get Mentioned In AI — track visibility, prove ROI, deliver results."

**Brand architecture:**
- **MentionedIn.ai** — the SaaS product (dashboard, audits, reports, white-label)
- **The AEO Protocol** — the methodology taught in Skool/YouTube (the "how")
- **Skool community** — name TBD (where the community lives)
- **YouTube** — personal brand channel (content marketing engine)

**The empty quadrant we own:**

|  | Cheap ($49-299) | Expensive ($500+) |
|---|---|---|
| **Tracking only** | Otterly, Nimt.ai, LLMrefs, Ahrefs | Peec, Profound, PromptWatch |
| **Content autopilot** | AutoSEO, RankPill, BabyLoveGrowth | GrackerAI ($2K+) |
| **Tracking + Implementation** | **MentionedIn.ai (US)** | AEO Engine ($797+) |

---

## 2. Target User

### Primary: Agency AEO Lead

- **Title:** Founder, Head of SEO, Account Manager at digital marketing agency
- **Agency size:** 5-50 people, managing 10-30+ clients
- **Current state:** Cobbles together 5-8 tools (Semrush + manual ChatGPT queries + Google Sheets + screenshots + AgencyAnalytics)
- **Biggest pain:** Manual query testing across ChatGPT/Gemini eats 4-8 hrs/client/month. No standard methodology. Can't prove ROI. Client reports are manual screenshot hell.
- **Budget:** $100-300/mo for tooling (needs to maintain 65-75% margin on $2.5K-5K/mo AEO retainers)
- **Decision trigger:** Competitor agency starts offering AEO services, or client asks "are we showing up in ChatGPT?"

### Secondary: AEO Opportunity Seeker ("Start an AEO Business")

- **Who:** Complete beginners, career changers, side hustlers, aspiring agency owners — anyone who sees AEO as a money-making opportunity. Zero marketing experience required.
- **Motivation:** "Agencies charge $2.5K-5K/mo for AEO. I can learn this and start selling it tomorrow."
- **Current state:** No AEO expertise, no clients, possibly no marketing background at all. Discovers AEO through YouTube and thinks "I could do this." The tool + methodology + community does the heavy lifting, not their expertise.
- **What they need:** Step-by-step methodology (the Skool course) + done-for-you tools (run audit, get report, send to client) + community (support, accountability, pitch templates, objection scripts) + proof (case studies to show prospects)
- **Journey:** YouTube video → Free Skool community → Paid Skool ($97/mo, learns methodology + gets first client) → Needs SaaS to deliver ($49-149/mo) → Scales to multiple clients
- **Budget:** $97/mo Skool + $49-149/mo SaaS once they land clients
- **Why they matter:** This is the GoHighLevel / BookedIn model. GHL didn't grow to $2B selling to existing agencies — they grew by creating NEW agency owners. These users become evangelists who tell others about the opportunity, growing the community organically. They're the Skool engine and the YouTube growth loop.
- **Key messaging:** "Start an AEO business with zero experience" / "Sell a $3K/mo service using our tools" / "The tool does the work, you close the deal"

### Tertiary: Freelance SEO Consultant

- Solo or small team, 3-10 existing clients
- Wants to add AEO as a new service line to existing SEO retainers
- Already has methodology for SEO, needs AEO-specific tooling
- Budget: $49-149/mo

### Quaternary: In-House Marketing Team (Post-MVP)

- Wants to track own brand's AI visibility
- Less need for white-label, more need for depth
- Budget: $99-299/mo

---

## 3. Core Features (MVP — Launch in 10-12 Weeks)

### 3.1 Brand Audit Engine (Flagship Feature)

**What:** Run a full 8-query audit across ChatGPT, Gemini, and Google for any brand. Auto-generates visibility score.

**Existing asset:** `run_brand_audit` MCP tool (works today)

**Queries generated automatically:**
1. What is [brand]?
2. [brand] pricing / cost
3. [brand] features
4. [brand] reviews
5. Best [category] tools/services
6. [brand] vs [competitor]
7. Is [brand] good?
8. [brand] alternatives

**Plus:** 5 custom "dream queries" from agency intake form

**Output per query:**
- ChatGPT response (full text + citations)
- Gemini response (full text + grounding citations)
- Google AI Overview (if present) + organic results
- Brand mentioned: yes/no per engine
- Brand position: top/second/third/not found
- Sentiment: positive/neutral/negative

**Aggregate output:**
- Overall visibility score (0-100)
- Per-engine mention rate
- Citation count
- Competitor comparison
- Gap analysis ("missing from these queries")

**API cost:** ~$0.184/audit (8 queries x 3 engines — D34 corrected)

### 3.2 10-Run Consistency Testing (Core Differentiator)

**What:** Run any query 10 times on ChatGPT and 10 times on Gemini. Report mention rate (7/10 = 70%), position variance, sentiment distribution.

**Existing asset:** `run_consistency_test` MCP tool (works today)

**Why it matters:** AI responses vary 40-60% between runs. Running 1x (what every competitor does) is a coin flip. Running 10x gives statistical confidence. Agencies can show clients: "You went from 30% to 80% mention rate."

**Output:**
- Mention rate per engine (e.g., ChatGPT: 7/10, Gemini: 4/10)
- Consistency score: STRONG (>70%) / MODERATE (40-70%) / WEAK (10-40%) / INVISIBLE (<10%)
- Position distribution (how often in top 3 vs buried)
- Sentiment breakdown
- Context snippets (what the AI said about the brand each time)

**API cost:** ~$0.18/test (10 runs x 2 engines — D34 corrected)

### 3.3 Three-Engine Query Comparison

**What:** Side-by-side comparison of ChatGPT vs Gemini vs Google for any query. The daily-use quick check.

**Existing asset:** `compare_llms` MCP tool (works today)

**UI:** Three columns showing each engine's response, with brand mentions highlighted.

**API cost:** ~$0.023/query (D34 corrected)

### 3.4 Multi-Client Dashboard

**What:** Agency-level view of all client brands. Quick-switch between clients. At-a-glance visibility scores.

**New build** (no existing asset)

**Layout:**
- Client list sidebar (logo + name + visibility score)
- Overview dashboard: visibility scores across all clients as cards/table
- Per-client deep dive: audit results, consistency tests, trend charts, playbook
- Activity feed: recent audits, score changes, alerts

**UX pattern:** GoHighLevel sub-account model / AgencyAnalytics client switcher

### 3.5 Client Intake Wizard

**What:** Guided form to onboard a new client brand. Collects brand facts, dream queries, competitors, key claims.

**Existing asset:** Protocol SOP lines 2703-2770 (client intake questionnaire)

**Fields:**
- Brand name, website URL, category/industry
- Brand description (WHO/WHAT/WHERE in one paragraph)
- 5 "dream queries" (what they want to rank for in AI)
- 3 competitors
- Key claims/differentiators
- Price range (for First 50 Words validation)
- Target geography

**Auto-generates:** Suggested audit queries from brand + category

### 3.6 White-Label Reports (Web)

**What:** Agency-branded audit reports as shareable web links. Browser print-to-PDF available. Native PDF generation deferred to Post-MVP Phase A (D6).

**Existing asset:** `report-generator` agent (generates structured reports)

**Branding applied:**
- Agency logo (header + footer)
- Agency colors (primary, secondary, accent)
- Agency domain on shareable links
- Custom report header text
- "Powered by [agency name]" (not MentionedIn)

**Report sections:**
1. Executive Summary (visibility score, key findings)
2. Per-Engine Results (ChatGPT, Gemini, Google)
3. Consistency Test Results (mention rates, confidence)
4. Competitor Comparison
5. Gap Analysis (missing queries)
6. Quick Wins (top 3 actions to take)
7. Full Query Details (expandable)

**Tech:** Next.js dynamic routes for web reports, Supabase Storage for assets. React-PDF added Post-MVP Phase A.

### 3.7 Auth + Multi-Tenancy

**What:** Agency signs up, creates org, invites team, manages clients.

**Tech:** Clerk Organizations

**Roles (MVP — simplified, see Decision D7):**
| Role | Access | Auth Method |
|---|---|---|
| Agency Admin | All clients, billing, settings | Clerk account (email + Google SSO) |
| Client Viewer | Read-only access to their brand's dashboard + reports | Client share link (D43 — no Clerk account — agency generates shareable URL with ClientViewerToken, expires in 30 days, auto-refreshes on access within last 7 days (D44), revocable) |

**Post-MVP Phase A addition:** Agency User role (assigned clients only, Clerk account, invited by admin).

### 3.8 Billing (Stripe)

**What:** Per-org subscription plans with client seat limits and overage billing (D1, D28, D57).

**Model:**
- 1 Stripe Product, 8 Prices (4 monthly + 4 annual), 2 metered items per subscription (D57)
- Stripe Checkout (redirect) for new subscriptions, `subscriptions.update()` for plan changes
- Per-client overage billing when exceeding tier limit
- Stripe Customer Portal for self-serve management (cancel, payment method, invoices)
- Webhook signature verification + idempotency via Redis event.id cache (D57)

---

## 4. Feature Roadmap (Post-MVP)

> **Note:** Phase numbering below uses "Post-MVP A/B/C" to avoid confusion with Build Plan phases 1-6 (D31).
> Features marked "Pulled into MVP" were moved by D3/D4 and now ship in Build Plan Phase 3.

### Post-MVP Phase A: Advanced Features (Weeks 13-18)

| Feature | Source Asset | Priority | Notes |
|---|---|---|---|
| **Full AI Playbook Generator** | `playbook-creator` agent | HIGH | Upgrade from basic templated (MVP) to full Sonnet-generated URL-specific plans |
| **Battle Cards** | Protocol methodology | HIGH | Per missing query, specific content/technical fix |
| **Alert System** | New | HIGH | Email/Slack when mention rate drops >10% |
| **First 50 Words Scanner** | Protocol lines 850-900 | MEDIUM | Crawl key pages, check WHO/WHAT/WHERE/PRICE |
| **PDF Report Generation** | React-PDF | MEDIUM | Native PDF export (D6 — deferred from MVP) |
| **Perplexity + Claude engines** | New API integrations | HIGH | Closes gap vs Nimt.ai (4-5 engines), Briljant (6) |
| **Team invite + "User" role** | Clerk | MEDIUM | Assigned clients only, Clerk account, invited by admin |
| **Embeddable audit widget** | New | MEDIUM | Agencies embed on their site for lead gen (D12) |

### Post-MVP Phase B: Content + SEO (Weeks 19-26)

| Feature | Source Asset | Priority |
|---|---|---|
| **Content Optimizer** | `content-optimizer` agent | MEDIUM — paste URL, get AEO-optimized rewrite suggestions |
| **Keyword Gap Analysis** | `keyword_gap` MCP tool | MEDIUM — show keywords competitor has that client doesn't |
| **SEO Baseline** | `ranked_keywords` MCP tool | MEDIUM — what client already ranks for in Google |
| **Technical Site Audit** | `sitemap-audit` skill | MEDIUM — robots.txt, SSR, schema, AI crawler access |
| **Comparison Page Templates** | Protocol methodology | MEDIUM — generate vs-[competitor] page drafts |
| **Competitor tracking dashboard** | New | MEDIUM — historical competitor scores over time |

### Post-MVP Phase C: Scale + Ecosystem (Weeks 27+)

| Feature | Priority |
|---|---|
| **API for agencies** (webhook alerts, custom integrations) | HIGH |
| **Affiliate program** (30% recurring commission) | HIGH |
| **Template marketplace** (share audit templates, report templates) | MEDIUM |
| **Integrations** (GA4, GSC, Semrush, Slack, HubSpot) | MEDIUM |
| **Bulk audit tools** (audit 10 brands simultaneously) | MEDIUM |
| **AI image generation** (from `imagen-mcp`) | LOW |

---

## 5. Screen-by-Screen Spec

### 5.1 Marketing Site (Public)

**Pages:**
- `/` — Landing page (positioning, pricing preview, free audit CTA)
- `/pricing` — Full pricing table with feature comparison
- `/free-audit` — Single-brand audit tool (no signup required, captures email)
- `/login` — Clerk-hosted auth (Google SSO + email/password)
- `/signup` — Org creation flow

### 5.2 Onboarding Flow (Post-Signup) — Branching by Persona (Decision D18)

**Fork question:** "How would you describe yourself?"
- **Option A:** "I run an agency / have existing clients" → Agency Path
- **Option B:** "I'm starting an AEO business" → Beginner Path

**Agency Path:**

**Step 1: Brand Your Portal** (30 seconds)
- Upload agency logo
- Pick primary + accent color
- Preview of branded dashboard

**Step 2: Add First Client** (60 seconds)
- Brand name + URL + category
- 3-5 dream queries (with AI suggestions based on category)
- 1-3 competitors

**Step 3: Run First Audit** (live, 60-90 seconds)
- Real-time progress: "Querying ChatGPT... Querying Gemini... Analyzing..."
- Results appear as they complete
- **AHA MOMENT:** Client brand absent from AI responses. Competitor present.

**Step 4: Share First Report** (30 seconds)
- One-click shareable web link (no PDF at MVP — browser print available)
- Preview: "This is what your client sees" (white-labeled)

**Progress bar:** 4 steps shown at top. Persistent until all complete.

**Beginner Path:**

**Step 1: Welcome + Context** (30 seconds)
- "Welcome to MentionedIn.ai! Let's get you set up."
- Skip branding — use MentionedIn defaults. Agency branding available later in Settings.
- Link: "New to AEO? Start with the free course" → Skool community link

**Step 2: Try a Demo Audit** (60 seconds)
- Pre-loaded demo client (e.g., a sample brand in their chosen category)
- OR enter any brand name to audit (curiosity hook)
- Real-time audit runs, results appear
- **AHA MOMENT:** "See how [brand] is invisible in ChatGPT? You can sell the fix."

**Step 3: Your First Client** (when ready)
- "Ready to add a real client? Here's how to get your first one."
- Link to Skool modules: "How to Land Your First AEO Client"
- [Add Client] button when they're ready

**Progress bar:** 3 steps. Less intimidating than agency path.

### 5.3 Agency Dashboard (Main View)

```
┌─────────────────────────────────────────────────────┐
│ [Agency Logo]  Client Switcher ▾    [+ Add Client]  │
│                                                      │
│ ┌──────────────────────────────────────────────────┐│
│ │ ALL CLIENTS OVERVIEW                             ││
│ │                                                  ││
│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐         ││
│ │ │ Brand A  │ │ Brand B  │ │ Brand C  │ ...     ││
│ │ │ Score 72 │ │ Score 34 │ │ Score 8  │         ││
│ │ │ ▲ +12    │ │ ▼ -5     │ │ → 0      │         ││
│ │ │ [View]   │ │ [View]   │ │ [Audit]  │         ││
│ │ └──────────┘ └──────────┘ └──────────┘         ││
│ │                                                  ││
│ │ Recent Activity                                  ││
│ │ • Brand A consistency test completed (7/10 ChatGPT)│
│ │ • Brand B mention rate dropped 15% ⚠️            ││
│ │ • Brand C first audit pending                    ││
│ └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

### 5.4 Client Detail View

```
┌─────────────────────────────────────────────────────┐
│ ← All Clients    [Brand Name]    [Run Audit] [Report]│
│                                                      │
│ TABS: Overview | Audits | Consistency | Competitors | │
│       Playbook | Reports | Settings                  │
│                                                      │
│ ┌── OVERVIEW TAB ──────────────────────────────────┐│
│ │                                                  ││
│ │  Visibility Score    Mention Rate    Citations   ││
│ │     ┌────┐          ChatGPT: 70%    12 total    ││
│ │     │ 64 │          Gemini:  40%                ││
│ │     └────┘          Google:  Yes                ││
│ │                                                  ││
│ │  Trend (Last 4 Weeks)                           ││
│ │  ▁▂▄▆ Score improving                           ││
│ │                                                  ││
│ │  Dream Queries Status                           ││
│ │  ✅ "best [category] in [city]"    80% mention  ││
│ │  ⚠️ "top [category] services"      40% mention  ││
│ │  ❌ "[brand] vs [competitor]"       0% mention   ││
│ │  ❌ "[brand] reviews"               10% mention  ││
│ │  ✅ "what is [brand]"              90% mention   ││
│ └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

### 5.5 Audit Results View

```
┌─────────────────────────────────────────────────────┐
│ AUDIT: Brand X — Jan 28, 2026                       │
│                                                      │
│ Overall Score: 42/100    [Share Report] [Print]      │
│                                                      │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Query: "best hair transplant clinic in Europe"  │ │
│ │                                                 │ │
│ │ ChatGPT          Gemini           Google AIO    │ │
│ │ ┌───────────┐   ┌───────────┐   ┌───────────┐ │ │
│ │ │ ✅ Mentioned│  │ ❌ Missing │  │ ✅ In AIO  │ │ │
│ │ │ Position: 2│  │           │  │ Organic: 4 │ │ │
│ │ │ Sentiment: │  │           │  │            │ │ │
│ │ │ Positive   │  │           │  │            │ │ │
│ │ └───────────┘   └───────────┘   └───────────┘ │ │
│ │ [Expand full responses]                        │ │
│ └─────────────────────────────────────────────────┘ │
│                                                      │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Query: "[brand] pricing"                        │ │
│ │ ...                                             │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### 5.6 Consistency Test View

```
┌─────────────────────────────────────────────────────┐
│ CONSISTENCY TEST: "best [category] in [city]"       │
│ Ran 10x on ChatGPT + 10x on Gemini — Feb 3, 2026  │
│                                                      │
│ ChatGPT Mention Rate: ████████░░ 7/10 (70%) STRONG │
│ Gemini Mention Rate:  ████░░░░░░ 4/10 (40%) MODERATE│
│                                                      │
│ Position Distribution (ChatGPT):                    │
│ Top mention:    ████ 4/10                           │
│ Second mention: ███  3/10                           │
│ Not mentioned:  ███  3/10                           │
│                                                      │
│ Sentiment: Positive (8/10), Neutral (2/10)          │
│                                                      │
│ ┌── Run Details ──────────────────────────────────┐ │
│ │ Run 1: ✅ Mentioned (top) "Brand X is one of..."│ │
│ │ Run 2: ✅ Mentioned (2nd) "Another option is..."│ │
│ │ Run 3: ❌ Not mentioned                         │ │
│ │ Run 4: ✅ Mentioned (top) "Brand X leads..."    │ │
│ │ ...                                             │ │
│ └─────────────────────────────────────────────────┘ │
│                                                      │
│ Trend: ▁▃▅▇ (improving over 4 weeks)               │
└─────────────────────────────────────────────────────┘
```

### 5.7 White-Label Settings

```
┌─────────────────────────────────────────────────────┐
│ SETTINGS > White-Label                              │
│                                                      │
│ Agency Name:  [Digital Growth Co          ]         │
│ Logo:         [Upload]  ✅ dgc-logo.svg             │
│ Favicon:      [Upload]  ✅ dgc-favicon.ico          │
│                                                      │
│ Colors:                                             │
│ Primary:   [#2563EB] ■                              │
│ Secondary: [#1E40AF] ■                              │
│ Accent:    [#F59E0B] ■                              │
│                                                      │
│ Custom Domain: (Agency tier+)                       │
│ [app.digitalgrowth.co     ]                         │
│ Status: ✅ Active (SSL provisioned)                 │
│ CNAME: Point to custom.mentionedin.app               │
│                                                      │
│ Email From Name: [Digital Growth Co       ]         │
│ Report Footer:   [© 2026 Digital Growth Co]         │
│                                                      │
│ [Preview Client Portal]  [Save Changes]             │
└─────────────────────────────────────────────────────┘
```

### 5.8 Client Portal (What Clients See)

Minimal read-only view. Agency-branded. No mention of MentionedIn.

```
┌─────────────────────────────────────────────────────┐
│ [Agency Logo]    AI Visibility Dashboard            │
│                                                      │
│ Brand: [Client Brand Name]                          │
│                                                      │
│ Your AI Visibility Score: 64/100 (▲ +12 this month)│
│                                                      │
│ ChatGPT Mention Rate: 70%                           │
│ Gemini Mention Rate: 40%                            │
│ Google AI Overview: Present                         │
│                                                      │
│ Monthly Trend: ▁▂▄▆ Improving                       │
│                                                      │
│ Latest Report: [View Report] [Print]                │
│                                                      │
│ ┌── What We're Working On ────────────────────────┐│
│ │ ✅ Technical SEO fixes (complete)               ││
│ │ 🔄 Homepage content optimization (in progress)  ││
│ │ ⬜ Comparison pages (week 3)                    ││
│ │ ⬜ Backlink campaign (week 4)                   ││
│ └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

---

## 6. Data Model

### Core Schema (PostgreSQL + Prisma)

```
Agency (tenant)
├── id                  UUID PRIMARY KEY
├── slug                VARCHAR UNIQUE (subdomain: {slug}.mentionedin.app)
├── name                VARCHAR
├── clerk_org_id        VARCHAR UNIQUE
├── stripe_customer_id  VARCHAR
├── plan                ENUM (free, starter, pro, agency, scale)
├── trial_ends_at       TIMESTAMP NULLABLE (D45: set on trial signup, NULL for paid/free)
├── client_limit        INT (based on plan)
├── custom_domain       VARCHAR NULLABLE
├── logo_url            VARCHAR NULLABLE
├── favicon_url         VARCHAR NULLABLE
├── primary_color       VARCHAR DEFAULT '#2563EB'
├── secondary_color     VARCHAR DEFAULT '#1E40AF'
├── accent_color        VARCHAR DEFAULT '#F59E0B'
├── email_from_name     VARCHAR NULLABLE
├── report_footer       VARCHAR NULLABLE
├── created_at          TIMESTAMP
├── updated_at          TIMESTAMP
│
├── AgencyUser (Clerk-authenticated team members only — NOT client viewers)
│   ├── id              UUID PRIMARY KEY
│   ├── agency_id       UUID FK → Agency
│   ├── clerk_user_id   VARCHAR
│   ├── role            ENUM (admin)  -- "user" role + AgencyUserClient join table added Post-MVP Phase A (D7, D17)
│   └── created_at      TIMESTAMP
│
├── ClientViewerToken (D24 — client share link auth for client portal, NO Clerk account)
│   ├── id              UUID PRIMARY KEY
│   ├── token           VARCHAR(64) UNIQUE (crypto.randomBytes(32).toString('hex'))
│   ├── client_id       UUID FK → Client
│   ├── agency_id       UUID FK → Agency (denormalized for fast lookup)
│   ├── label           VARCHAR NULLABLE (e.g., "John's portal link")
│   ├── expires_at      TIMESTAMP (default: 30 days from creation)
│   ├── revoked_at      TIMESTAMP NULLABLE
│   ├── last_accessed_at TIMESTAMP NULLABLE
│   └── created_at      TIMESTAMP
│
├── Client
│   ├── id              UUID PRIMARY KEY
│   ├── agency_id       UUID FK → Agency
│   ├── name            VARCHAR
│   ├── domain          VARCHAR
│   ├── category        VARCHAR
│   ├── description     TEXT (WHO/WHAT/WHERE paragraph)
│   ├── price_range     VARCHAR NULLABLE
│   ├── geography       VARCHAR NULLABLE
│   ├── competitors     JSONB (array of {name, domain})
│   ├── dream_queries   JSONB (array of strings, max 10)
│   ├── key_claims      JSONB (array of strings)
│   ├── status          ENUM (active, paused, archived)
│   ├── created_at      TIMESTAMP
│   └── updated_at      TIMESTAMP
│
│   ├── Audit
│   │   ├── id              UUID PRIMARY KEY
│   │   ├── client_id       UUID FK → Client
│   │   ├── agency_id       UUID FK → Agency (D33: denormalized for RLS)
│   │   ├── type            ENUM (full, consistency, quick)  -- quick = 3-query free audit (Appendix A)
│   │   ├── status          ENUM (pending, running, completed, failed, partial)  -- partial = some API calls failed (D48 retry policy)
│   │   ├── progress        JSONB NULLABLE  -- real-time step tracking: { step: "chatgpt", completed: 3, total: 8 }
│   │   ├── visibility_score INT NULLABLE (0-100)
│   │   ├── summary         TEXT NULLABLE (AI-generated)
│   │   ├── started_at      TIMESTAMP
│   │   ├── completed_at    TIMESTAMP NULLABLE
│   │   └── created_at      TIMESTAMP
│   │
│   │   └── AuditQuery
│   │       ├── id              UUID PRIMARY KEY
│   │       ├── audit_id        UUID FK → Audit
│   │       ├── agency_id       UUID FK → Agency (D53: denormalized for RLS)
│   │       ├── query_text      VARCHAR
│   │       ├── query_type      ENUM (standard, dream, competitor)
│   │       └── created_at      TIMESTAMP
│   │
│   │       └── AuditRun
│   │           ├── id              UUID PRIMARY KEY
│   │           ├── query_id        UUID FK → AuditQuery
│   │           ├── agency_id       UUID FK → Agency (D33: denormalized for RLS)
│   │           ├── engine          ENUM (chatgpt, gemini, google)
│   │           ├── run_number      INT (1-10)
│   │           ├── response_text   TEXT
│   │           ├── citations       JSONB (array of URLs)
│   │           ├── brand_mentioned BOOLEAN
│   │           ├── brand_position  ENUM (top, second, third, not_found)
│   │           ├── aio_mentioned   BOOLEAN DEFAULT false (D25: Google AIO distinction — true if brand in AI Overview specifically)
│   │           ├── competitor_mentioned BOOLEAN DEFAULT false  -- D8: track competitors too
│   │           ├── competitor_name VARCHAR NULLABLE  -- which competitor appeared
│   │           ├── competitor_position ENUM (top, second, third, not_found) NULLABLE
│   │           ├── sentiment       ENUM (positive, neutral, negative)
│   │           ├── context_snippet VARCHAR (what AI said about brand)
│   │           └── created_at      TIMESTAMP
│   │
│   ├── ScheduledTest
│   │   ├── id              UUID PRIMARY KEY
│   │   ├── client_id       UUID FK → Client
│   │   ├── agency_id       UUID FK → Agency (D33)
│   │   ├── queries         JSONB (subset of dream queries)
│   │   ├── frequency       ENUM (daily, weekly, monthly)
│   │   ├── engines         JSONB (array of engine enums)
│   │   ├── runs_per_query  INT DEFAULT 10
│   │   ├── is_active       BOOLEAN DEFAULT true
│   │   ├── last_run_at     TIMESTAMP NULLABLE
│   │   ├── next_run_at     TIMESTAMP
│   │   └── created_at      TIMESTAMP
│   │
│   ├── Report
│   │   ├── id              UUID PRIMARY KEY
│   │   ├── client_id       UUID FK → Client
│   │   ├── agency_id       UUID FK → Agency (D33)
│   │   ├── audit_id        UUID NULLABLE FK → Audit
│   │   ├── type            ENUM (audit)  -- weekly/monthly report types added Post-MVP Phase A with periodic report generation cron
│   │   ├── pdf_url         VARCHAR NULLABLE (Post-MVP Phase A — unused at MVP)
│   │   ├── share_token     VARCHAR UNIQUE (for public link)
│   │   ├── date_range_start DATE
│   │   ├── date_range_end   DATE
│   │   └── created_at      TIMESTAMP
│   │
│   ├── Snapshot (weekly aggregation for trend charts — D15)
│   │   ├── id              UUID PRIMARY KEY
│   │   ├── client_id       UUID FK → Client
│   │   ├── agency_id       UUID FK → Agency (D33)
│   │   ├── week            DATE (Monday of week)
│   │   ├── visibility_score INT
│   │   ├── chatgpt_mention_rate DECIMAL
│   │   ├── gemini_mention_rate  DECIMAL
│   │   ├── google_aio_present   BOOLEAN
│   │   ├── avg_position    DECIMAL
│   │   ├── citation_count  INT
│   │   ├── competitor_mention_rate DECIMAL NULLABLE (D8)
│   │   └── created_at      TIMESTAMP
│   │
│   └── Playbook (D3 — basic templated in MVP, full Sonnet-generated Post-MVP Phase A)
│       ├── id              UUID PRIMARY KEY
│       ├── client_id       UUID FK → Client
│       ├── agency_id       UUID FK → Agency (D33)
│       ├── audit_id        UUID FK → Audit
│       ├── status          ENUM (draft, active, completed)
│       ├── generated_by    VARCHAR DEFAULT 'sonnet-4.5'
│       ├── created_at      TIMESTAMP
│       │
│       └── PlaybookAction
│           ├── id              UUID PRIMARY KEY
│           ├── playbook_id     UUID FK → Playbook
│           ├── agency_id       UUID FK → Agency (D53: denormalized for RLS)
│           ├── query_text      VARCHAR (which missing query this fixes)
│           ├── action_type     ENUM (content, technical, entity, citation, schema)
│           ├── description     TEXT (what to do)
│           ├── url_target      VARCHAR NULLABLE (which page to fix)
│           ├── priority        ENUM (critical, high, medium, low)
│           ├── status          ENUM (pending, in_progress, completed, skipped)
│           ├── completed_at    TIMESTAMP NULLABLE
│           └── created_at      TIMESTAMP
│
├── Lead (D10 — free audit email capture)
│   ├── id              UUID PRIMARY KEY
│   ├── email           VARCHAR
│   ├── brand_audited   VARCHAR
│   ├── audit_result    JSONB (snapshot of free audit results)
│   ├── utm_source      VARCHAR NULLABLE
│   ├── utm_medium      VARCHAR NULLABLE
│   ├── utm_campaign    VARCHAR NULLABLE
│   ├── converted_to_agency_id UUID NULLABLE FK → Agency
│   ├── nurture_step    INT DEFAULT 0 (D52: 0=none sent, 1=immediate, 2=day 2, 3=day 5)
│   ├── converted_at    TIMESTAMP NULLABLE
│   └── created_at      TIMESTAMP
│
├── ApiUsage (agency-level monthly totals)
│   ├── id              UUID PRIMARY KEY
│   ├── agency_id       UUID FK → Agency
│   ├── month           DATE (first of month)
│   ├── chatgpt_calls   INT DEFAULT 0
│   ├── gemini_calls    INT DEFAULT 0
│   ├── google_calls    INT DEFAULT 0
│   ├── sonnet_calls    INT DEFAULT 0 (playbook/battle card generation)
│   ├── consistency_tests_used INT DEFAULT 0 (against monthly cap — D9)
│   ├── total_cost      DECIMAL DEFAULT 0
│   └── created_at      TIMESTAMP
│
└── ClientUsage (D26 — per-client monthly query tracking)
    ├── id              UUID PRIMARY KEY
    ├── client_id       UUID FK → Client
    ├── agency_id       UUID FK → Agency (D33)
    ├── month           DATE (first of month)
    ├── queries_used    INT DEFAULT 0 (against per-brand quota: 15/25/50/100)
    └── created_at      TIMESTAMP
```

### Data Retention Policy (D16)
- **Raw AuditRun response_text:** Kept 90 days, then purged. Aggregated data in Snapshots survives.
- **Weekly Snapshots:** Kept indefinitely (small rows, critical for trend charts).
- **Playbooks + actions:** Kept indefinitely.
- **Leads:** Kept 1 year, then anonymized (GDPR compliance).

### Key Indexes
- `AuditRun(query_id, engine, run_number)` — fast lookup per test
- `AuditRun(audit_id)` — fetching all runs for an audit (most common dashboard query)
- `AuditRun(agency_id, created_at)` — tenant filtering + retention purge (D33)
- `AuditQuery(audit_id)` — fetching all queries for an audit
- `Audit(client_id, created_at)` — listing audits per client
- `Snapshot(client_id, week DESC)` — trend chart queries with ordering
- `Client(agency_id, status)` — active client listing
- `ClientUsage(client_id, month)` — per-brand quota enforcement (D26)
- `ClientViewerToken(token)` — client share link validation (D24/D43)
- `Agency(slug)` — subdomain routing
- `Agency(custom_domain)` — custom domain routing
- `Report(share_token)` — public report links
- `Lead(email)` — dedup + conversion tracking

### Composite Unique Constraints
- `Snapshot(client_id, week)` UNIQUE — prevents duplicate weekly snapshots
- `ClientUsage(client_id, month)` UNIQUE — prevents duplicate monthly counters
- `ApiUsage(agency_id, month)` UNIQUE — one usage record per agency per month
- `AgencyUser(agency_id, clerk_user_id)` UNIQUE — prevents duplicate user-agency mappings

### FK Cascade Rules
- **Client:** SOFT DELETE ONLY (set `status = archived`). Never hard-delete clients with data. Archived clients do NOT count against `client_limit`. Scheduled tests auto-pause for archived clients. Client portal links show "paused" message. Agency can unarchive to reactivate.
- **Agency:** Not supported at MVP. If needed later, cascade all children.
- **Audit:** CASCADE to AuditQuery, AuditRun on delete.
- **Playbook:** CASCADE to PlaybookAction on delete.
- **ClientViewerToken:** No cascade needed (leaf table). Expired tokens purged by `purge-old-runs` job.
- Add `deleted_at TIMESTAMP NULLABLE` to Client for proper soft-delete semantics (future-proofing).

### Row-Level Security
Every table with `agency_id` (direct or via join) gets Postgres RLS:
```sql
CREATE POLICY tenant_isolation ON client
  USING (agency_id = current_setting('app.current_tenant')::uuid);
```

Prisma middleware auto-sets `agency_id` filter on every query as application-layer defense.

---

## 7. API Architecture

### tRPC Routers

```
api/
├── auth/          (Clerk webhook handlers)
├── agency/
│   ├── get        (current agency details)
│   ├── update     (branding, settings)
│   └── usage      (API usage stats)
│
├── client/
│   ├── list       (all clients for agency)
│   ├── create     (new client + intake data)
│   ├── get        (single client details)
│   ├── update     (edit client info)
│   └── archive    (soft delete)
│
├── audit/
│   ├── run        (trigger full audit — enqueues Trigger.dev job)
│   ├── get        (single audit results)
│   ├── list       (audits for a client)
│   └── queries    (get suggested queries for brand)
│
├── consistency/
│   ├── run        (trigger 10-run test — enqueues job)
│   ├── get        (single test results)
│   ├── list       (tests for a client)
│   └── schedule   (CRUD scheduled tests)
│
├── compare/
│   └── query      (3-engine comparison — synchronous tRPC, 5-10s — D14/D30. Accessible from client detail view.)
│
├── playbook/ (D49)
│   ├── generate   (trigger from audit — enqueues Sonnet job)
│   ├── get        (single playbook with actions)
│   ├── list       (playbooks for a client)
│   └── updateAction (mark action complete/in_progress/skipped)
│
├── report/
│   ├── generate   (create web report — enqueues job. PDF added Post-MVP Phase A)
│   ├── list       (reports for a client)
│   ├── get        (single report)
│   └── share      (generate/revoke share token)
│
├── snapshot/
│   └── trend      (weekly snapshots for trend chart — D15)
│
├── clientToken/ (D24/D43 — manage client share links)
│   ├── create     (generate new token for client, returns shareable URL)
│   ├── list       (all tokens for a client)
│   ├── revoke     (invalidate a token)
│   └── refresh    (extend token expiry by 30 days)
│
├── billing/
│   ├── portal     (Stripe customer portal link)
│   ├── subscribe  (create/update subscription)
│   └── webhook    (Stripe webhooks — handles: customer.subscription.created, customer.subscription.updated, customer.subscription.deleted, invoice.payment_failed, invoice.paid — D50)
│
├── portal/ (D54 — authed via ClientViewerToken, NOT Clerk)
│   ├── overview   (client score, mention rates, trend summary)
│   ├── audit      (latest audit results)
│   ├── trend      (weekly snapshots for chart)
│   └── report     (latest report)
│
└── public/
    ├── freeAudit  (no auth, rate-limited, single brand)
    └── report     (by share_token, no auth)
```

### Background Jobs (Trigger.dev)

| Job | Trigger | Duration | Concurrency |
|---|---|---|---|
| `full-audit` | User clicks "Run Audit" | 60-120s | 5 per agency |
| `consistency-test` | User clicks "Run Test" | 30-60s | 10 per agency |
| `generate-report` | User clicks "Generate Report" | 10-30s | 5 per agency |
| `generate-playbook` | After audit completes (D49) | 10-20s | 5 per agency |
| `scheduled-monitoring` | Cron (daily/weekly per client — D41: 1-run pulse checks, NOT full 10-run tests) | 15-30s | Global: 20 concurrent. Add 0-4hr jitter to spread load. |
| `aggregate-snapshots` | Weekly cron (Monday 2am UTC) | 10-30s per client | 1 global (D15) |
| `track-usage` | After every API call | <1s | Unlimited |
| `nurture-email` | Daily cron (D52) | 5-10s | 5 concurrent |
| `check-trial-expiry` | Daily cron (D45) | 2-5s | 1 global |
| `purge-old-runs` | Weekly cron | 5-30s | 1 (D16: 90-day retention + expired ClientViewerToken cleanup) |
| `send-alert` | *(Post-MVP Phase A)* After monitoring if threshold breached | 2-5s | Unlimited |

> **Note:** `compare-query` is synchronous tRPC, NOT a Trigger.dev job (D14/D30). 5-10s is acceptable for a direct API call.

### External API Integration

| Service | Purpose | Auth | Rate Limit |
|---|---|---|---|
| OpenAI (GPT-5) | ChatGPT queries with web search | API key | Per-account |
| Google GenAI (Gemini 3 Flash) | Gemini queries with grounding | API key | Per-account |
| ScrapingBee | Google SERP + AI Overview | API key | Credits-based |
| DataForSEO | Keyword data (Post-MVP Phase B) | Login/password | Per-account |
| Stripe | Billing | Secret key | Standard |
| Clerk | Auth | Secret key | Standard |
| Resend | Transactional email | API key | Free tier: 3K/mo |

### Auth Middleware Strategy (D42)

```
middleware.ts route resolution:
  /app/*       → Clerk auth required (agency dashboard)
  /portal/*    → ClientViewerToken required (token in URL param or cookie)
  /report/*    → Report.share_token in URL (public, no auth)
  /free-audit  → public (no auth, rate-limit by email)
  /api/trpc/*  → Clerk auth (agency routes) OR token auth (portal/* routes)
```

**`resolveAuth()` returns discriminated union:**
- `{ type: 'clerk', agencyId: string, userId: string }` — agency admin accessing dashboard
- `{ type: 'viewer', clientId: string, agencyId: string }` — client viewing portal via token
- `{ type: 'public' }` — free audit, shared report, marketing pages

Every tRPC procedure checks `ctx.auth.type` before executing. Portal routes reject Clerk auth. Agency routes reject viewer auth.

**Token validation rate limiting:** 10 failed lookups per IP per minute (Upstash Redis). Return identical error for "invalid" and "expired" tokens (prevent timing attacks).

**Multi-tenant routing (D51):**
1. Extract hostname from request
2. If `{slug}.mentionedin.app` → lookup Agency by `slug`
3. If matches a `custom_domain` → lookup Agency by `custom_domain`
4. If neither → serve marketing site (mentionedin.ai)
5. Cache result in Upstash Redis (TTL 5 min) to avoid DB lookup on every request

### tRPC Error Types

```typescript
enum AppError {
  UNAUTHORIZED,        // Not logged in
  FORBIDDEN,           // Logged in but wrong agency/role
  NOT_FOUND,           // Resource doesn't exist
  QUOTA_EXCEEDED,      // Client/consistency test limit hit
  RATE_LIMITED,        // Too many requests
  PAYMENT_REQUIRED,    // Feature needs higher tier or trial expired
  EXTERNAL_API_FAILURE,// ChatGPT/Gemini/Google down
  VALIDATION_ERROR,    // Bad input
}
```

**Per-route rate limits (Upstash `@upstash/ratelimit` sliding window):**
- `compare.query`: 30/minute per agency
- `audit.run`: 5/hour per agency
- `consistency.run`: 5/hour per agency
- `public.freeAudit`: 1/email/week, 5/IP/day
- `portal.*`: 60/minute per token

### Global API Rate Limiter (D48)

Redis semaphore via `@upstash/ratelimit`. Jobs acquire a slot before making API calls, release after.

| Engine | Max Concurrent | Max Per Minute | Notes |
|---|---|---|---|
| OpenAI (ChatGPT) | 20 | 60 | Adjust based on OpenAI tier. Check account RPM/TPM limits. |
| Google GenAI (Gemini) | 30 | 120 | Google AI Studio limits. |
| ScrapingBee (Google) | 10 | 30 | Credits-based, more conservative. |

**Fallback when API is down (D55):**
- 1 engine fails: complete audit with available engines, show "[Engine] unavailable" in results, recalculate score excluding that engine (algorithm handles this via D55 weight redistribution)
- All 3 fail: mark audit as `failed`, show "Service temporarily unavailable, please retry"
- Circuit breaker: if engine fails 5x in 5 minutes, stop requests for 2 minutes

**Retry policy per job:**
- API call failures: retry 3x with exponential backoff (1s, 4s, 16s)
- If >3 runs fail in a consistency test, mark test as `partial` (not `completed`). Exclude failed runs from mention rate calculation (never count API errors as "not mentioned").
- Report generation: retry 2x, then mark as `failed` with error message

### Overage Billing Flow (D50)

**Client overage (exceeding client_limit):**
1. Agency tries to add client N+1 (over limit)
2. Modal: "Adding a 4th client costs $15/mo. Continue?"
3. On confirm: create Stripe metered subscription item
4. Billed on next invoice (end of billing period)

**Consistency test overage (exceeding monthly cap):**
1. Agency runs test when `ApiUsage.consistency_tests_used >= plan_limit`
2. Test is allowed (soft limit), usage record sent to Stripe via `stripe.subscriptionItems.createUsageRecord()`
3. Charged at end of billing period at tier rate ($2/test Starter down to $0.50/test Scale)
4. Email warning at 80% and 90% of cap (D52)

**Plan downgrade behavior:**
- Existing data is NEVER deleted on downgrade
- Excess clients marked `paused` (agency chooses which to keep active)
- Scheduled tests for paused clients deactivated
- Client portal links for paused clients show "paused" message
- Agency can upgrade again to reactivate

**Trial expiry flow (D45):**
- Day 1-14: Full Agency tier features, no card on file
- Day 12: Email reminder "Trial ending in 2 days, add payment to keep features"
- Day 14: If no card → downgrade to `free` plan (read-only access to existing data, cannot run audits/add clients)
- If card added during trial → start billing at selected plan
- All existing data (clients, audits, reports) remain accessible in read-only mode on `free` plan

### Email System (D52)

| Email | Trigger | Timing |
|---|---|---|
| Audit complete | `full-audit` job completes | Immediate |
| Report ready | `generate-report` job completes | Immediate |
| Trial ending | `check-trial-expiry` cron | Day 12 of trial |
| Cap warning (80%) | `track-usage` detects threshold | When 80% of consistency cap used |
| Cap warning (90%) | `track-usage` detects threshold | When 90% of consistency cap used |
| Weekly monitoring summary | `aggregate-snapshots` cron | Monday morning (after snapshot) |
| Nurture email 1 | Free audit completed | Immediate (full results + score) |
| Nurture email 2 | `nurture-email` cron | Day 2 ("How [competitor] is beating you") |
| Nurture email 3 | `nurture-email` cron | Day 5 (Case study + CTA) |

**Email sender:** `noreply@mentionedin.app` (default). Agency `email_from_name` customizes the "From" display name. Custom email domains added Post-MVP.

**Templates:** Built with React Email during implementation. Each email has: subject line, header (agency logo if applicable), body content, CTA button, footer.

### Infrastructure (D46/D47)

**Docker Compose:**
```yaml
services:
  app:           # Next.js 15 application (port 3000)
  caddy:         # Reverse proxy + SSL + subdomain routing
  trigger-worker: # Trigger.dev worker process

volumes:
  caddy_data:    # SSL certificates
  caddy_config:  # Caddy configuration

# External managed services (not in compose):
# Supabase (PostgreSQL + Storage), Clerk, Stripe, Upstash Redis, Resend
```

**CI/CD (GitHub Actions):**
1. On push to `main`: lint + type-check + test
2. Build Docker image, push to GitHub Container Registry (GHCR)
3. SSH to VPS: `docker compose pull && docker compose up -d`
4. Zero-downtime via Caddy health checks + rolling restart
5. Environment: `.env` on VPS (never in git), managed via SSH

**Monitoring:**
- Sentry: error tracking + performance monitoring
- Uptime monitor (Better Stack free tier or Uptime Robot): 5-minute checks on app URL + Caddy + Trigger.dev health endpoint
- PostHog: product analytics, feature flags, session replay

**Backups:**
- Supabase Pro: daily automated backups, 7-day retention
- Enable Point-in-Time Recovery (PITR) when available on Supabase
- Supabase Storage (logos/assets): weekly sync to backup bucket (Post-MVP)

### Custom Domain Validation Rules (D51)

Before activating a custom domain:
1. Domain must resolve (DNS lookup check)
2. CNAME must point to `custom.mentionedin.app` (verify before activating)
3. Domain must not already be claimed by another agency
4. Block reserved domains (mentionedin.ai, mentionedin.app, etc.)
5. Re-verify CNAME weekly via `purge-old-runs` cron (deactivate if CNAME removed)
6. Let's Encrypt rate limits: 50 certs/registered domain/week (acceptable for MVP scale)

### Audit Progress (Real-time Updates)

**Polling (recommended for MVP):**
1. Frontend starts audit, gets back `auditId`
2. Frontend polls `audit.get(auditId)` every 2 seconds
3. Trigger.dev job updates `Audit.status` + new `progress` JSONB field: `{ step: "chatgpt", completed: 3, total: 8 }`
4. Frontend reads progress → renders "Querying ChatGPT... (3/8)"
5. When `status = completed`, stop polling, show results

Add `progress JSONB NULLABLE` to Audit table for real-time step tracking.

### AuditRun Field Extraction (D56)

Each AuditRun stores structured data extracted from raw LLM responses. Extraction happens via ONE Sonnet 4.5 call per response (~$0.003/run) that returns structured JSON:

**Prompt template (sent to Sonnet 4.5):**
```
Given this AI response about "{query_text}" and the brand "{brand_name}"
(domain: {brand_domain}), with competitors [{competitor_list}]:

{response_text}

Return JSON:
{
  "brand_mentioned": boolean,
  "brand_position": "top" | "second" | "third" | "not_found",
  "sentiment": "positive" | "neutral" | "negative",
  "context_snippet": "200 chars around first brand mention or null",
  "competitor_mentioned": boolean,
  "competitor_name": "string or null",
  "competitor_position": "top" | "second" | "third" | "not_found" | null,
  "citations_from_brand_domain": ["urls matching brand_domain"]
}
```

**Rules:**
- `brand_mentioned`: true if brand name (case-insensitive) OR brand_domain appears anywhere in response
- `brand_position`: based on ordinal position in list/recommendation. "top" = first mentioned or #1 recommendation. "not_found" = brand not mentioned at all
- `sentiment`: only analyzed when brand_mentioned = true. Otherwise set to `neutral`
- `competitor_mentioned`: check ALL entries in `client.competitors[]` array. Report first one found
- For Google SERP results (engine = google): parse organic results array, not prose. Position = rank in results (1=top, 2=second, 3=third, 4+=not_found). No Sonnet call needed — pure data parsing
- `aio_mentioned` (D25): for Google engine, check if brand appears in `ai_overview` text specifically (substring match, no Sonnet call)

**Cost impact:** ~$0.003 per Sonnet classification call. Full audit (8 queries x 2 LLM engines) = 16 calls = ~$0.048 extra. Total audit cost: $0.184 (API) + $0.048 (extraction) = ~$0.23/audit.

### Stripe Product Architecture (D57)

```
Stripe Product: "MentionedIn.ai"
├── Price: starter_monthly    ($49/mo)
├── Price: starter_annual     ($441/yr — 25% off)
├── Price: pro_monthly        ($99/mo)
├── Price: pro_annual         ($891/yr)
├── Price: agency_monthly     ($149/mo)
├── Price: agency_annual      ($1,341/yr)
├── Price: scale_monthly      ($299/mo)
├── Price: scale_annual       ($2,691/yr)
├── Price: client_overage     ($15/unit metered — usage_type: metered, aggregate_usage: sum)
└── Price: consistency_overage ($2/unit metered — variable per tier, handled in code)
```

**Checkout flow:**
1. User clicks "Upgrade" → `billing.subscribe` creates Stripe Checkout Session with selected Price
2. Stripe redirects to hosted checkout page (collect card + confirm)
3. On success: Stripe fires `customer.subscription.created` webhook
4. Webhook handler: update `Agency.plan`, `Agency.client_limit`, `Agency.stripe_subscription_id`

**Plan change flow:**
1. User clicks different tier → `billing.changePlan` calls `stripe.subscriptions.update()` with new Price
2. `proration_behavior: 'create_prorations'` — unused time credited, new tier charged
3. Stripe fires `customer.subscription.updated` webhook → update Agency fields

**Webhook security:**
- ALL webhooks verified via `stripe.webhooks.constructEvent(body, sig, secret)`
- Store processed `event.id` in Redis with TTL 48h for idempotency
- On duplicate event.id → return 200 immediately, skip processing

**Plan-to-limits mapping (constants file):**
```typescript
const PLAN_LIMITS = {
  free:    { client_limit: 0,  consistency_cap: 0,   queries_per_brand: 0,   seats: 1  },
  starter: { client_limit: 3,  consistency_cap: 5,   queries_per_brand: 15,  seats: 1  },
  pro:     { client_limit: 8,  consistency_cap: 25,  queries_per_brand: 25,  seats: 2  },
  agency:  { client_limit: 15, consistency_cap: 50,  queries_per_brand: 50,  seats: 3  },
  scale:   { client_limit: 50, consistency_cap: 200, queries_per_brand: 100, seats: 10 },
}
```

### Portal URL Format and Token Delivery (D58)

**URL format:** `{host}/portal?token={token}`

**Token delivery flow:**
1. Agency clicks "Create Share Link" on client detail page
2. System generates `crypto.randomBytes(32).toString('hex')`, stores `SHA-256(token)` in ClientViewerToken table (NOT plaintext)
3. Returns full URL: `{host}/portal?token={raw_token}` where host = custom domain if active, else `{slug}.mentionedin.app`
4. Agency copies URL, sends to client via email/Slack/etc.

**Client visit flow:**
1. Client clicks link → hits `/portal?token={raw_token}`
2. Middleware: hash incoming token with SHA-256, lookup in DB
3. If valid + not expired: set `HttpOnly; Secure; SameSite=Strict; Path=/portal` cookie (`_mia_viewer`), 302 redirect to `/portal` (strips token from URL)
4. If within 7 days of expiry (D44): extend `expires_at` by 30 days during cookie set
5. Subsequent visits: middleware reads `_mia_viewer` cookie, validates hash
6. If expired/invalid: show agency-branded error page: "This link has expired. Contact {agency.name} for a new one."

**Security:** Tokens hashed with SHA-256 before DB storage. Raw token only exists in URL and cookie. DB compromise does not expose usable tokens.

### Caddy TLS Validation Endpoint (D59)

Caddy `on_demand_tls` MUST include an `ask` endpoint to prevent unauthorized certificate provisioning:

```caddyfile
{
  on_demand_tls {
    ask https://localhost:3000/api/caddy/ask
  }
}
```

**`/api/caddy/ask` endpoint logic:**
1. Caddy sends `GET /api/caddy/ask?domain={domain}`
2. Endpoint queries Agency table: `WHERE custom_domain = {domain} AND custom_domain_status = 'active'`
3. Return `200 OK` → Caddy provisions Let's Encrypt cert
4. Return `403 Forbidden` → Caddy rejects TLS handshake

**Without this endpoint:** Anyone on the internet can point a domain at the server IP, Caddy provisions a valid cert, consuming Let's Encrypt rate limits (50/week) and potentially enabling phishing.

---

## 8. Tech Stack

### Framework Decision: React/Next.js (Confirmed)

Flutter was considered (founder has production Flutter experience including white-label in DM Champ and a full multi-tenant access control system with Riverpod + Supabase + RLS). React/Next.js was chosen for three reasons:

1. **Data visualization ecosystem** — React has Recharts, Nivo, Visx, Tremor, D3 wrappers, plus Framer Motion for custom animations. Flutter has `fl_chart` and little else at this level. The SaaS is fundamentally a data dashboard.
2. **Existing components** — The `aeo-landing/` project already has production-quality React visualization components that map directly to SaaS screens (see Section 13, Reusable Components).
3. **White-label custom domains** — Cloudflare for SaaS handles SSL + domain provisioning via API. First 100 custom hostnames free.

Mobile app is **not on the roadmap** (zero of 12 AEO competitors have one), so Flutter's cross-platform advantage doesn't apply. If mobile is ever needed (Year 2+), a PWA or React Native wrapper covers it.

### Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Server components for dashboard, React ecosystem for data viz |
| **API** | tRPC | End-to-end type safety, no separate server needed initially |
| **Database** | PostgreSQL + Prisma (Supabase-hosted) | RLS for multi-tenancy safety net, type-safe ORM, managed hosting |
| **Auth** | Clerk Organizations | Native multi-tenancy, RBAC, pre-built UI components, org switching |
| **Payments** | Stripe (subscriptions + metered) | Per-seat billing, usage tracking, customer portal |
| **Hosting** | Docker on VPS (Hetzner/DigitalOcean) | Full control, no middleman markup, ~$10/mo for production VPS |
| **Reverse Proxy** | Caddy | Automatic HTTPS, clean config, handles subdomain routing |
| **Custom Domains** | Cloudflare for SaaS | Programmatic domain provisioning API, auto SSL, first 100 hostnames free, then $0.10/hostname/mo |
| **CDN** | Cloudflare (free tier) | Global CDN, DDoS protection, caching — all free |
| **Job Queue** | Trigger.dev | No timeout limits (audits take 60-120s), managed, TypeScript-native, cron |
| **Email** | Resend + React Email | React components for email templates, free tier 3K/mo |
| **PDF** | React-PDF | React components for reports (Post-MVP Phase A) |
| **File Storage** | Supabase Storage | Logos, assets |
| **Caching** | Upstash Redis | Serverless Redis, free tier 10K commands/day. Tenant config lookup, API response caching |
| **Monitoring** | Sentry | Error tracking, performance monitoring |
| **Analytics** | PostHog | Product analytics, feature flags, session replay |
| **Data Viz** | Framer Motion + Recharts | Framer Motion for custom animations (ProgressRing, bars), Recharts for trend charts |
| **UI Components** | Radix UI + Tailwind CSS | Same stack as aeo-landing, components portable |
| **Fonts** | Syne (headings) + Space Grotesk (body) | Matches existing brand from aeo-landing |

### Why No Vercel

Vercel is a middleman on top of AWS/Cloudflare. For a SaaS you own:
- **Vercel Pro** = $20/mo per seat, scales to $100s. A Hetzner VPS = $5-10/mo flat.
- **Vercel Domains API** = Cloudflare for SaaS does the same thing, cheaper, with better DDoS protection.
- **Vercel KV** = Upstash Redis (same underlying tech) but without the Vercel tax.
- **Vercel edge functions** = not needed. A VPS with Caddy handles routing fine for a SaaS dashboard.
- **Lock-in** = Vercel-specific features (edge middleware, ISR caching) make migration painful. Docker deploys anywhere.

### Infrastructure Cost at Launch

| Service | Plan | Monthly Cost |
|---|---|---|
| Hetzner VPS (CX21 or similar) | 4GB RAM, 2 vCPU | ~$5-10/mo |
| Supabase Pro | Pro | $25/mo |
| Clerk | 1,000 MAU | $25/mo |
| Trigger.dev | Hobby | $0-29/mo |
| Cloudflare | Free (CDN + DNS) | $0/mo |
| Cloudflare for SaaS | First 100 custom hostnames | $0/mo |
| Upstash Redis | Free tier | $0/mo |
| Resend | Free | $0/mo |
| Sentry | Free | $0/mo |
| PostHog | Free | $0/mo |
| **Total** | | **~$55-90/mo** |

**Savings vs Vercel stack: ~$20-30/mo at launch, scales to $100s/mo as you grow.**

---

## 9. White-Label Specification

### How It Works

**Subdomain routing (default):**
- Every agency gets `{slug}.mentionedin.app`
- Caddy reverse proxy routes based on hostname → Next.js reads tenant from request

**Custom domain (Agency tier+, Phase 4):**
- Agency adds CNAME: `app.theiragency.com` → `custom.mentionedin.app`
- Cloudflare for SaaS provisions SSL automatically via API call
- DNS verification flow: Pending → Verifying CNAME → Provisioning SSL → Active (with error states + "Verify DNS" button)
- Same Caddy routing, Cloudflare handles the SSL/domain layer

### What's Branded

| Element | Customizable | Where |
|---|---|---|
| Dashboard header logo | Yes | Top-left of every page |
| Favicon | Yes | Browser tab |
| Primary/secondary/accent colors | Yes | CSS variables, buttons, charts |
| Custom domain | Yes (Agency+) | URL bar |
| PDF report header/footer | Yes (Post-MVP Phase A) | Generated reports (D6: PDF deferred) |
| Email sender name | Yes | Alert and report emails |
| Client portal | Fully white-labeled | No MentionedIn branding visible |
| Login page | Agency logo + colors | Clerk custom branding |

### What's NOT Branded (MVP)
- Mobile app (none exists)
- Custom fonts (use system defaults)
- Custom CSS injection (Post-MVP)
- Custom email domain (requires DNS setup, Post-MVP)

---

## 10. Pricing Tiers

| | FREE | STARTER | **PRO (D22)** | AGENCY | SCALE |
|---|---|---|---|---|---|
| **Price** | $0 | $49/mo | **$99/mo** | **$149/mo** | $299/mo |
| **Annual (25% off)** | — | $37/mo | $74/mo | $112/mo | $224/mo |
| **Client brands** | 1 audit (snapshot) | 3 | 8 | 15 | 50 |
| **Queries per brand** | 3 (quick) | 15 | 25 | 50 | 100 |
| **Monitoring (D41: pulse checks)** | None (one-time) | Manual only | Weekly pulse (1-run checks, separate budget) | Weekly pulse (1-run checks, separate budget) | Daily pulse (1-run checks, separate budget) |
| **Consistency tests (full 10-run)** | None | 5/month | 25/month | 50/month | 200/month |
| **White-label** | No | No | No | Yes | Yes |
| **Client portal** | No | No | No | Yes (client share link, read-only) | Yes |
| **Custom domain** | No | No | No | Yes (Phase 4) | Yes (Phase 4) |
| **Reports** | 1 (watermarked, web only) | Unlimited (MentionedIn branded) | Unlimited (MentionedIn branded) | Unlimited (agency branded) | Unlimited (agency branded) |
| **Team seats (D35)** | 1 | 1 | 2 | 3 | 10 ($15/extra) |
| **Playbooks** | No | Basic checklist (templated) | Basic checklist (templated) | Basic checklist (templated, D27) | Basic checklist (templated) |
| **Battle cards** | No | No | No | Post-MVP Phase A | Post-MVP Phase A |
| **API access** | No | No | No | No | Yes |
| **Support** | Docs | Email | Email | Priority email | Slack + quarterly call |
| **Overage per client** | N/A | $15/client/mo | $12/client/mo | $10/client/mo | $5/client/mo |
| **Overage per 10 tests (D28)** | N/A | $20 | $15 | $10 | $5 |

**Anchor tier: Agency at $149/mo.** White-label unlocks here. Pro fills the dead zone for 4-8 client agencies (D22).

**Team seats (D35):** Seats = admin users who can log in via Clerk and manage clients. Client viewers (client share link) don't count as seats. "User" role with per-client assignment added Post-MVP Phase A.

**14-day free trial (D36/D45):** Free audit CTA offers 14-day Agency tier trial, no credit card required. After trial, downgrades to `free` plan (read-only access to existing data — D45). User can pick a paid plan at any time. Trial includes white-label, scheduled monitoring, and client portal. `trial_ends_at` tracked in Agency schema. Daily cron `check-trial-expiry` handles downgrades.

**"Query" definition:** 1 query = 1 unique query text tested, regardless of how many engines or runs. A full audit (8 queries x 3 engines) = 8 queries consumed. A consistency test (1 query x 10 runs x 2 engines) = 1 consistency test consumed (from consistency test cap), but does NOT also consume from the per-brand query quota (separate budgets to avoid double-billing). Reset monthly.

**Pulse monitoring (D41):** Weekly/daily monitoring runs 1-run pulse checks per engine per query. These are separate from the consistency test cap and do NOT consume consistency tests. Cost per pulse: ~$0.018/query (1 run x 2 engines). This makes monitoring affordable even at high client counts.

**MVP launch note:** PDF reports deferred to Post-MVP Phase A (D6). Custom domains ship in Phase 4 (D5/D21). At launch, agencies get subdomains + custom domains (Agency+) and web-based shareable report links (clients can print-to-PDF from browser).

**Domain requirement (D37):** Must register `mentionedin.app` before build starts. Subdomains use `{slug}.mentionedin.app`.

---

## 11. Cost Model

### AI Model Choice: Claude Sonnet 4.5

| Feature | Model | Why | Cost per call |
|---|---|---|---|
| Audit engine (ChatGPT queries) | GPT-5-chat-latest (OpenAI) | Web search grounding via Bing | ~$0.013/query |
| Audit engine (Gemini queries) | Gemini 3 Flash (Google) | Google Search grounding | ~$0.005/query |
| Audit engine (Google SERP) | ScrapingBee | Organic results + AIO | ~$0.005/query |
| **Playbook generation** | **Claude Sonnet 4.5** | Structured output, 5x cheaper than Opus | ~$0.045/playbook |
| **Battle card generation** | **Claude Sonnet 4.5** | Per missing query, structured | ~$0.02/card |
| **Audit summary** | **Claude Sonnet 4.5** | Synthesize audit findings | ~$0.03/summary |

**Why Sonnet over Opus:** Playbooks and battle cards are structured recommendations from audit data — Sonnet handles this perfectly. Opus costs 5x more ($0.225/playbook vs $0.045) with negligible quality difference for templated output. At scale, this saves $1,000+/month.

### Per-Engine API Costs (D34 — corrected calculations)

| Engine | Cost per call | Notes |
|---|---|---|
| ChatGPT (OpenAI) | ~$0.013 | Web search grounding via Bing |
| Gemini (Google) | ~$0.005 | Google Search grounding |
| Google SERP (ScrapingBee) | ~$0.005 | Organic + AI Overview |
| Sonnet 4.5 (Anthropic) | ~$0.045/playbook, ~$0.02/battle card, ~$0.03/summary | Structured output |

**Cost per operation:**
- Full audit (8 queries x 3 engines): 8 x ($0.013 + $0.005 + $0.005) = **$0.184/audit**
- Consistency test (1 query x 10 runs x 2 engines): 10 x ($0.013 + $0.005) = **$0.18/test**
- Ad-hoc compare (1 query x 3 engines): $0.013 + $0.005 + $0.005 = **$0.023/query**
- Playbook + summary per client: $0.045 + $0.03 = **$0.075/client**

### Margin by Tier (D34 — corrected, with caps + Sonnet)

| Tier | Price | Clients (full/typical) | Consistency Cap | API Cost (full) | API Cost (50%) | Margin (full) | Margin (50%) |
|---|---|---|---|---|---|---|---|
| Starter ($49) | $49/mo | 3 / 2 | 5/mo | $1.96 | $1.10 | **96%** | **98%** |
| Pro ($99) | $99/mo | 8 / 5 | 25/mo | $6.47 | $3.70 | **93%** | **96%** |
| Agency ($149) | $149/mo | 15 / 8 | 50/mo | $12.76 | $7.20 | **91%** | **95%** |
| Scale ($299) | $299/mo | 50 / 25 | 200/mo | $47.70 | $25.50 | **84%** | **91%** |

**Key improvement over v1.2:** Caps eliminate the 18% margin floor. Worst case is now 84% on Scale at full capacity (was 18% on old Agency "unlimited"). Cost calculations corrected in v1.4 — margins are better than v1.3 reported.

### Break-Even Analysis

| Fixed costs | Monthly |
|---|---|
| Infrastructure (VPS + Supabase + Clerk + Trigger.dev) | ~$65 |
| Domain/DNS | ~$10 |
| Sohaib's time (opportunity cost) | ~$5,000 |
| YouTube production | ~$3,000 |
| **Total fixed** | **~$8,000/mo** |

**Break-even at:** ~81 customers at $99 avg ARPU = **Month 9-10** (realistic with Pro tier lowering avg ARPU)

### 12-Month Revenue Projection (D29 — realistic, with ~5% monthly churn)

| Month | New | Churn | Net | Total | Avg ARPU | MRR |
|---|---|---|---|---|---|---|
| 1 | 3 | 0 | 3 | 3 | $49 | $147 |
| 3 | 5 | 0 | 5 | 12 | $89 | $1,068 |
| 6 | 8 | 1 | 7 | 29 | $99 | $2,871 |
| 9 | 12 | 2 | 10 | 54 | $109 | $5,886 |
| 12 | 15 | 4 | 11 | 86 | $99 | $8,514 |

**Year 1 SaaS exit ARR: ~$102K** (realistic with churn — excludes Skool + B2B)

### Combined Revenue Projection (All Streams — D29 realistic)

| Month | SaaS MRR | Skool MRR | B2B/Concierge | Overages | Total MRR |
|---|---|---|---|---|---|
| 3 | $1,068 | $970 (10 x $97) | $699 (1 concierge) | $0 | **$2,737** |
| 6 | $2,871 | $2,910 (30 x $97) | $2,097 (3 concierge) | $300 | **$8,178** |
| 9 | $5,886 | $4,850 (50 x $97) | $2,097 (3 concierge) | $700 | **$13,533** |
| 12 | $8,514 | $6,790 (70 x $97) | $3,495 (5 concierge) | $1,000 | **$19,799** |

**Year 1 combined exit ARR: ~$238K** (realistic — D29)

> **Note on B2B:** Replaced $5K/mo done-for-you service with $699/mo "Concierge SaaS" tier (SaaS + monthly strategy call). Lighter delivery, scalable alongside SaaS development. Full $5K service is unsustainable while building everything else.

---

## 12. Build Plan

**Total estimated: 8-10 weeks to MVP** (down from 12 weeks due to reusable aeo-landing components)

**What's IN MVP (launches):** Audit engine, consistency testing, compare tool, client management, basic playbooks (templated), weekly pulse monitoring (D41), trend charts, web reports (shareable links), white-label branding (subdomains + custom domains), client portal (client share link), free audit page, onboarding, 14-day free trial.

**What's CUT from MVP (deferred to Post-MVP):** PDF reports (Phase A), full AI playbooks (Phase A), battle cards (Phase A), "User" role + team management (Phase A), alert system (Phase A), First 50 Words scanner (Phase A), Perplexity/Claude engines (Phase A), API access (Phase C).

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up Next.js 15 project with Docker Compose (D46: app + caddy + trigger-worker)
- [ ] GitHub Actions CI/CD pipeline (D47: lint, build, push to GHCR, SSH deploy)
- [ ] Set up Supabase project (database + storage + RLS)
- [ ] Integrate Clerk Organizations (auth: admin + client_viewer roles only)
- [ ] Unified auth middleware (D42: resolveAuth discriminated union — Clerk | ClientViewerToken | public)
- [ ] Prisma schema with all core tables (including Lead, Playbook, PlaybookAction, ClientViewerToken, composite unique constraints)
- [ ] Stripe integration (4 paid tiers + metered overage items + customer portal — D50. Free tier handled outside Stripe.)
- [ ] Port aeo-landing design system (colors, fonts, Tailwind config, Radix UI, Framer Motion)
- [ ] Basic dashboard layout with tenant branding (CSS variables from DB)
- [ ] Agency settings page (logo, colors, subdomain)
- [ ] Uptime monitoring (Better Stack free tier or Uptime Robot)

### Phase 2: Core Audit Engine + Free Audit (Weeks 3-5)
- [ ] Port `queryChatGPT()`, `queryGemini()`, `queryGoogle()` into tRPC endpoints
- [ ] Build `run_brand_audit` as Trigger.dev job (8 queries, 3 engines, with `progress` JSONB field + competitor mention detection + aio_mentioned)
- [ ] Build `run_consistency_test` as Trigger.dev job (10 runs, 2 engines, with competitor tracking)
- [ ] Build `compare_llms` as synchronous tRPC endpoint (not Trigger.dev — D14/D30)
- [ ] Compare tool UI (three-column engine comparison view, accessible from client detail view)
- [ ] Build `get_audit_queries` suggestions from brand + category
- [ ] Results storage in AuditRun table (including competitor_mentioned, competitor_position, aio_mentioned — D25)
- [ ] Audit results UI — adapt HeadlineResult + KeyFindings components from aeo-landing
- [ ] Visibility score calculation algorithm (see Appendix B for full pseudocode — D38/D55)
- [ ] Consistency test UI — adapt ResultsProof (bars) + ProgressRing components
- [ ] Audit summary generation via Claude Sonnet 4.5
- [ ] **Free audit landing page** (D23: moved from Phase 4 — email-first gate, adapt from aeo-landing patterns. Lead gen starts Week 5.)
- [ ] Global API rate limiter (D48: Upstash Redis semaphore — OpenAI 20, Gemini 30, ScrapingBee 10 concurrent)
- [ ] Audit polling for real-time progress (2s interval, reads `progress` JSONB field)

### Phase 3: Client Management + Playbooks + Monitoring (Weeks 6-7)
- [ ] Client intake wizard (form with dream queries, competitors, brand facts)
- [ ] Multi-client dashboard — adapt CurrentVisibility grid pattern from aeo-landing
- [ ] Client detail view (overview, audits, consistency tests, competitors tab, playbook tab, reports tab, settings tab)
- [ ] **Basic playbook generator** (D49: Sonnet-generated templated checklists from audit gaps — D3. UI = checklist grouped by action_type, mark complete/skip.)
- [ ] **Weekly pulse monitoring** (D41: Trigger.dev cron, 1-run checks per engine per query, separate from consistency test budget. Schedule config UI.)
- [ ] **Weekly Snapshot aggregation** (automated from monitoring results — D15. `aggregate-snapshots` cron.)
- [ ] Trend chart (Recharts line chart, weekly snapshots over time)
- [ ] Shareable web report links (public, no auth, by share_token)
- [ ] Client share link management (D43: create, list, copy, revoke tokens via clientToken tRPC router)
- [ ] Email notifications (D52: audit complete, report ready, cap warnings at 80%/90% — via Resend + React Email)
- [ ] Nurture email sequence (D52: nurture-email cron, 3 emails over 5 days for free audit leads)
- [ ] API usage tracking + quota enforcement (per-brand queries via ClientUsage + consistency test caps via ApiUsage — D26)
- [ ] Per-client and per-test overage billing via Stripe metered (D50: modal on cap hit, charge at billing period end)

### Phase 4: White-Label + Polish + Launch (Weeks 8-10)
- [ ] Caddy on_demand_tls as primary for custom domains (D51: build Caddy-first, CF for SaaS as upgrade later)
- [ ] Caddy reverse proxy + subdomain routing (`{slug}.mentionedin.app` — D37: must own domain)
- [ ] Multi-tenant hostname resolution (D42: slug lookup → custom_domain lookup → marketing site. Redis cache TTL 5min.)
- [ ] Custom domain validation rules (D51: CNAME verification, uniqueness check, reserved domain blocking)
- [ ] Cloudflare for SaaS integration (if approved by D39 — custom domain provisioning via API)
- [ ] DNS verification flow (Pending → Verifying CNAME → Provisioning SSL → Active, with error states + "Verify DNS" button)
- [ ] Client portal (read-only via ClientViewerToken — D24/D43/D44: auto-refresh on access within last 7 days)
- [ ] Portal tRPC routes (D54: overview, audit, trend, report — authed via token, not Clerk)
- [ ] Onboarding flow (branching: agency path vs beginner path — see Section 5.2. Includes demo client seed data for beginner path.)
- [ ] 14-day free trial flow (D36/D45: Agency tier trial, no credit card. check-trial-expiry daily cron. Downgrades to free plan.)
- [ ] Responsive dashboard (mobile-friendly: dashboard overview, client scores, reports, client portal)
- [ ] Error handling, loading states, empty states (see Section 5 wireframes for each page)
- [ ] Search/filter/pagination for client list, audit history, consistency test list
- [ ] Production deployment to VPS (Docker Compose + Caddy), monitoring (Sentry), analytics (PostHog), uptime checks

### Post-MVP Phase A: Advanced Features (Weeks 13-18)
- [ ] PDF report generation (React-PDF, white-labeled)
- [ ] Full AI playbook generator (Sonnet-generated, URL-specific action plans — upgrade from basic)
- [ ] Battle cards per missing query (Sonnet-generated)
- [ ] First 50 Words scanner (crawl + analyze key pages)
- [ ] Perplexity + Claude engine support (closes gap vs Nimt.ai/Briljant)
- [ ] Alert system (email when mention rate drops + Slack webhook)
- [ ] Team invite flow + "User" role (assigned clients)
- [ ] Embeddable audit widget (agencies embed on their own site for lead gen — D12)

### Post-MVP Phase B: Content + SEO (Weeks 19-26)
- [ ] Content optimizer (URL → AEO rewrite suggestions via Sonnet)
- [ ] SEO data integration (ranked keywords, keyword gap)
- [ ] Competitor tracking dashboard (historical competitor scores)
- [ ] Technical site audit (robots.txt, SSR, schema, AI crawlers)

### Post-MVP Phase C: Growth + Ecosystem (Weeks 27+)
- [ ] Public API for agencies
- [ ] Affiliate program (30% recurring via Rewardful)
- [ ] Integrations (GA4, GSC, Slack, HubSpot)
- [ ] Bulk audit tools
- [ ] AppSumo launch (after Month 6, once churn data exists)
- [ ] Supabase migration plan (D40: at ~300 customers, migrate to self-hosted Postgres)

---

## 13. Existing Asset Integration

### What Already Works (Wrap in Web API)

| Asset | Current State | SaaS Integration | Effort |
|---|---|---|---|
| `queryChatGPT()` | MCP tool, TypeScript | Copy function into tRPC endpoint | Low (1 day) |
| `queryGemini()` | MCP tool, TypeScript | Copy function into tRPC endpoint | Low (1 day) |
| `queryGoogle()` | MCP tool, TypeScript | Copy function into tRPC endpoint | Low (1 day) |
| `compare_llms()` | MCP tool, runs all 3 in parallel | Copy into tRPC, add caching | Low (1 day) |
| `run_brand_audit()` | MCP tool, 8 queries sequential | Move to Trigger.dev job, add progress | Medium (3 days) |
| `run_consistency_test()` | MCP tool, 10 parallel runs | Move to Trigger.dev job, add storage | Medium (3 days) |
| `get_audit_queries()` | MCP tool, generates suggestions | Copy into tRPC endpoint | Low (0.5 day) |

**Total integration effort for core engine: ~10 development days**

### Reusable React Components (from aeo-landing/)

The existing `aeo-landing/` project (React + Vite + Tailwind + Framer Motion + Radix UI) has production-quality visualization components that map directly to SaaS dashboard screens. Same stack, same design system — copy and adapt.

| aeo-landing Component | SaaS Screen | What It Does | Adaptation Needed |
|---|---|---|---|
| `ProgressRing.tsx` | Visibility score per engine | SVG animated circle, color-coded (green/yellow/red), scroll-triggered | Make dynamic (accept data props vs hardcoded) |
| `CurrentVisibility.tsx` | Client overview — 3-engine grid | 3 ProgressRings in responsive grid, staggered animation | Wire to audit data from API |
| `ResultsProof.tsx` | Trend improvement bars | Before/after animated horizontal bars with delta badges | Wire to snapshot comparison data |
| `HeadlineResult.tsx` | Audit results per query | Before/after comparison cards with arrow animation | Wire to AuditRun data |
| `KeyFindings.tsx` | Gap analysis display | Severity-tagged cards (Critical/Important/Minor), staggered slide-in | Wire to audit gap analysis |
| `CompetitorPosition.tsx` | Competitor tracking view | Tier-based grid with hover effects | Wire to competitor data |
| `ChecklistStats.tsx` | Playbook progress tracker | Progress bar with done/remaining counts, export CSV | Wire to playbook actions |
| `HundredBrandsAudit.tsx` patterns | Multi-client overview | Bar charts, data tables, big-number stats, comparison boxes | Extract chart patterns, make reusable |
| `GradientOrb.tsx` | Background ambiance | Continuous breathing animation, premium dark feel | Copy as-is |
| Design system (index.css) | Global theme | Dark theme, glow effects, `.text-gradient`, `.card-3d`, Syne/Space Grotesk | Copy as-is |
| Radix UI components | UI primitives | Accordion, Dialog, Badge, Button, Card, Input | Copy as-is |

**Estimated time saved: ~2 weeks** (no need to design/build data viz from scratch)

**Design system carries over:**
- Colors: Primary `#00d4ff` (cyan), secondary `#3b82f6`, accent `#8b5cf6`, dark bg `#0a0a0f`
- Fonts: Syne (headings), Space Grotesk (body)
- Effects: `.glow`, `.text-gradient`, `.card-3d`, `.stat-3d`
- Dark mode first (matches premium SaaS positioning)

### What Needs Building From Scratch

| Feature | Effort | Notes |
|---|---|---|
| Multi-tenant dashboard | 1 week | Layout is new, but cards/charts reuse aeo-landing components |
| Client intake wizard | 3 days | Form from protocol questionnaire |
| PDF report generation | 1 week | React-PDF, white-label templates (Post-MVP Phase A) |
| Visibility score algorithm | 2 days | Weighted scoring from audit data |
| Scheduling engine | 1 week | Trigger.dev cron + management UI |
| Alert system | 3 days | Threshold config + email/webhook |
| Client portal | 3 days | Read-only branded view (reuses dashboard components) |
| Auth + billing | 1 week | Clerk + Stripe boilerplate |
| Onboarding flow | 3 days | Agency path (4 steps) + beginner path (3 steps) |
| Free audit page | 1 day | Adapt existing aeo-landing free audit patterns |

---

## 14. Competitive Differentiation

### Instagram Ad Competitors (Feb 7, 2026 — 14 companies scraped)

Two distinct categories of competitors are actively running Instagram ads:

**Category 1: AI Visibility Trackers (Direct Competitors)**
| Tool | Price | White-Label | Engines | Implementation? |
|------|-------|-------------|---------|-----------------|
| Nimt.ai | $79-179/mo | No | ChatGPT, Gemini, Claude, Perplexity | No (tracking only) |
| Briljant.nl | EUR39-99/mo | Yes (partner badges) | ChatGPT, Gemini, Claude, Grok, Copilot | Partial (technical GEO tools) |
| PromptWatch | Enterprise (hidden) | Yes (agency solution) | 9 engines incl. DeepSeek, Mistral | Content generation |
| AnswerRank | Unknown | Unknown | Unknown (JS-blocked) | Unknown |

**Category 2: Content Autopilots (Indirect Competitors)**
| Tool | Price | What they do | AI focus? |
|------|-------|-------------|-----------|
| AutoSEO | ~$99/mo | 30 articles/mo + backlinks | Partial (mentions ChatGPT) |
| RankPill | $99/mo | 30 articles/mo + auto-publish | Partial |
| BabyLoveGrowth | GBP99/mo | Articles + backlinks + LLM tracking | Yes (only one combining both) |
| Outrank | Unknown | SEO content automation | No |

**Category 3: Traditional SEO Tools (Tangential)**
| Tool | Price | Focus |
|------|-------|-------|
| HikeSEO | $90-749/mo | AI SEO agent for small agencies (extensive white-label) |
| Climbo | $1,497-2,997 lifetime | White-label review management + GEO bolt-on |
| Soogle | $67/mo | Automated backlink marketplace |
| Bazoom | Pay-per-link | Link building service |
| RankingMasters | Agency services | Dutch e-commerce SEO |

### Full Feature Comparison Matrix

| Feature | MentionedIn.ai | Nimt.ai | Briljant | PromptWatch | Otterly | GrackerAI | HikeSEO |
|---|---|---|---|---|---|---|---|
| **Price (agency)** | $149/mo | $179/mo | EUR99/mo | Enterprise | $189-989/mo | $2,500+/mo | $90-749/mo |
| **Engines tracked** | 3 (ChatGPT, Gemini, Google AIO) | 4-5 | 6 | 9 | 4-6 | 5+ | Partial |
| **10-run consistency** | Yes (core) | No | No | No | No | No | No |
| **White-label** | Yes ($149+) | No | Yes (EUR99+) | Yes | No | Yes ($2.5K+) | Yes ($299+) |
| **Client portal** | Yes | No | Partial | Yes | No | Yes | Yes |
| **Custom domain** | Yes (MVP Phase 4) | No | No | Unknown | No | Unknown | Yes |
| **Implementation playbooks** | Yes (basic MVP, full Post-MVP Phase A) | No | No | No | No | No | Full SEO (not AEO) |
| **Battle cards** | Yes | No | No | No | No | No | No |
| **Content generation** | Post-MVP Phase B | No | No | Yes | No | Yes (30-75/mo) | Yes (blog) |
| **Self-serve** | Yes | Yes | Yes | Partial | Yes | Yes | Yes |
| **Free tier** | Yes (1 audit) | No (7-day trial) | No (7-day trial) | No | No | Yes (limited) | No (14-day MBG) |
| **Multi-client dashboard** | Yes | Yes | Yes (agency tier) | Yes | Yes (workspaces) | Yes | Yes |
| **PDF reports** | Post-MVP Phase A (web reports at launch) | Unknown | Unknown | Unknown | No | Yes | Yes |
| **Skool community** | Yes (included) | No | No | No | No | No | No |
| **"Business in a box"** | Yes (methodology + tool + training) | No | No | No | No | No | No |

### Why MentionedIn.ai Wins

1. **Only tool with 10-run consistency testing** — statistical proof, not snapshots. Every competitor runs queries 1x.
2. **Only affordable white-label with implementation** — $149/mo vs Briljant EUR99 (no playbooks), HikeSEO $299+ (traditional SEO only), GrackerAI $2,500+ (enterprise)
3. **Only tool with audit-to-playbook engine** — audits produce URL-specific actions, not just scores. Nimt.ai and Briljant show the problem but don't fix it.
4. **Battle cards per missing query** — when brand isn't mentioned, we tell you exactly what to create, which entities to include, which sources to target
5. **First 50 Words technical audit** — unique methodology (WHO/WHAT/WHERE/PRICE check) that zero competitors offer
6. **"Business in a box" ecosystem** — YouTube education + Skool community + SaaS tool + client acquisition training. Not just software. This is how GoHighLevel grew to $2B.
7. **Free audit as PLG entry** — Nimt.ai and Briljant offer 7-day trials. We offer unlimited free single audits. Lower barrier.
8. **Built by a practitioner** — real case study (FueGenix), real methodology (3500-line protocol), real audit data from 100+ brands

### Instagram Ad Messaging Patterns (What's Working)

| Pattern | Used by | Example |
|---------|---------|---------|
| **FOMO / Invisibility** | Nimt.ai, Briljant, BabyLoveGrowth, AutoSEO | "Your competitors are in ChatGPT. You're not." |
| **Fire your agency** | AutoSEO, RankPill | "Stop paying $5,000/month for agencies" |
| **Autopilot / Sleep** | RankPill, Outrank, BabyLoveGrowth, Soogle | "Grow traffic while you sleep" |
| **Agency revenue stream** | HikeSEO, Climbo, Briljant | "A big revenue stream for your small agency" |

**MentionedIn.ai ad angle:** Pattern 1 + Pattern 4 combined:
> "Your clients are invisible in ChatGPT. Sell them the fix — white-labeled under YOUR brand."

> Full competitor analysis: `systems/instagram-competitor-analysis.md`

---

## Appendix A: Free Audit Lead Magnet Spec

### URL: `/free-audit`

**Email captured BEFORE results (Decision D10).** Every API cost generates a lead.

**Flow:**
1. Enter brand name + category + website URL
2. **Enter email** (required to run audit — "We'll send your full report here")
3. System runs quick audit (3 standard queries x 3 engines = 9 API calls)
4. Show results: visibility score, per-engine mention, competitor comparison
5. CTA: "Track this weekly → Start free trial" (D36: 14 days of Agency tier, no credit card)
6. Email auto-sent: full audit results + "Your brand is [SCORE]. Here's how to fix it."

**Rate limit:** 1 free audit per email per week (prevents abuse better than IP-based)

**Email verification:** Required (link click) before second audit

**API cost:** ~$0.069 per free audit (3 queries x $0.023 = $0.069; with optional Sonnet summary: $0.099 — D34 corrected)

**Lead storage:** Saved to Lead table with UTM params for attribution

**Email nurture sequence:**
- Email 1 (immediate): Full audit results + visibility score
- Email 2 (day 2): "How [competitor] is beating you in ChatGPT" (competitor data from audit)
- Email 3 (day 5): Case study (FueGenix) + CTA to free trial or Skool

**Purpose:** YouTube CTA destination, LinkedIn lead magnet, Instagram ad landing page, viral sharing

---

## Appendix B: Visibility Score Algorithm (Decision D4 — full pseudocode)

```python
def calculate_visibility_score(audit_runs, has_consistency_data, brand_domain):
    """
    D38/D55: Fixed algorithm bugs. Symmetric weight redistribution for ANY missing engine.
    Two modes:
    - Single-run mode (free audit, first audit): binary mention per query, then averaged
    - Consistency mode (after 10-run tests): statistical mention rates across all runs
    brand_domain: str — client's domain for citation URL matching (D55)
    """

    # Separate runs by engine
    chatgpt_runs = [r for r in audit_runs if r.engine == 'chatgpt']
    gemini_runs = [r for r in audit_runs if r.engine == 'gemini']
    google_runs = [r for r in audit_runs if r.engine == 'google']

    def engine_score(runs):
        """Calculate mention score for an engine. Returns (score, has_data)."""
        if len(runs) == 0:
            return (0, False)
        if has_consistency_data:
            # Consistency mode: percentage across all runs
            mentioned = len([r for r in runs if r.brand_mentioned])
            return ((mentioned / len(runs)) * 100, True)
        else:
            # Single-run mode: group by query, binary per query, average across queries
            queries = {}
            for r in runs:
                qid = r.query_id
                if qid not in queries:
                    queries[qid] = False
                if r.brand_mentioned:
                    queries[qid] = True
            if len(queries) == 0:
                return (0, True)
            mentioned_queries = sum(1 for v in queries.values() if v)
            return ((mentioned_queries / len(queries)) * 100, True)

    chatgpt_score, chatgpt_has_data = engine_score(chatgpt_runs)
    gemini_score, gemini_has_data = engine_score(gemini_runs)

    # 3. Google AI Overview component — uses aio_mentioned field (D25)
    if len(google_runs) > 0:
        aio_mentioned = len([r for r in google_runs if r.aio_mentioned])
        aio_score = (aio_mentioned / len(google_runs)) * 100
        aio_has_data = True
    else:
        aio_score = 0
        aio_has_data = False

    # 4. Position component
    position_map = {'top': 100, 'second': 66, 'third': 33, 'not_found': 0}
    mentioned_runs = [r for r in audit_runs if r.brand_mentioned]
    if len(mentioned_runs) > 0:
        position_score = sum(position_map.get(r.brand_position, 0) for r in mentioned_runs) / len(mentioned_runs)
    else:
        position_score = 0

    # 5. Citation component — uses brand_domain param (D55)
    def brand_domain_in(citations):
        """Check if any citation URL contains the brand's domain."""
        return any(brand_domain.lower() in c.lower() for c in citations if c)

    total_runs_count = len(audit_runs)
    if total_runs_count > 0:
        runs_with_citations = len([r for r in audit_runs if r.citations and brand_domain_in(r.citations)])
        citation_score = (runs_with_citations / total_runs_count) * 100
    else:
        citation_score = 0

    # D55: Symmetric weight redistribution for ANY missing engine
    # Base weights: ChatGPT 0.30, Gemini 0.30, AIO 0.20, Position 0.10, Citation 0.10
    components = []
    if chatgpt_has_data: components.append(('chatgpt', chatgpt_score, 0.30))
    if gemini_has_data:  components.append(('gemini', gemini_score, 0.30))
    if aio_has_data:     components.append(('aio', aio_score, 0.20))
    # Position and citation always included (derived from available data)
    components.append(('position', position_score, 0.10))
    components.append(('citation', citation_score, 0.10))

    total_weight = sum(w for _, _, w in components)
    if total_weight == 0:
        return 0

    # Redistribute: scale weights proportionally so they sum to 1.0
    score = sum((s * w / total_weight) for _, s, w in components)

    return round(min(max(score, 0), 100))  # Clamp 0-100

def score_confidence(has_consistency_data, total_runs):
    """Show confidence level alongside score. D38: fixed thresholds."""
    if has_consistency_data and total_runs >= 20:
        return "HIGH"   # 10+ runs per engine — full consistency test
    elif has_consistency_data and total_runs >= 10:
        return "MEDIUM" # Partial consistency data
    elif total_runs >= 16:
        return "MEDIUM" # Full 8-query audit (8 x 3 engines = 24 runs, but >16 catches partial)
    else:
        return "LOW"    # Free audit (3 queries x 3 engines = 9 runs)
```

**Score interpretation:**
- 80-100: DOMINANT — brand consistently recommended
- 60-79: STRONG — brand regularly appears, room to improve
- 40-59: MODERATE — inconsistent visibility, significant gaps
- 20-39: WEAK — rarely mentioned, major optimization needed
- 0-19: INVISIBLE — brand not in AI responses

**Confidence badge shown in UI:** HIGH / MEDIUM / LOW — encourages users to run consistency tests for more accurate scores (upgrade driver).

---

## Appendix C: Glossary

| Term | Definition |
|---|---|
| **AEO** | Answer Engine Optimization — optimizing brand visibility in AI search (ChatGPT, Gemini, etc.) |
| **Client Share Link** | A shareable URL with a ClientViewerToken that gives read-only access to the client portal. NOT a Clerk magic link (D43). |
| **Consistency Test** | Running the same query 10x to measure how often a brand is mentioned (vs 1x snapshot). Uses full 10-run budget. |
| **Dream Query** | A search query the client wants to rank for in AI responses |
| **Mention Rate** | Percentage of AI responses that mention the brand (e.g., 7/10 = 70%) |
| **Pulse Check** | A 1-run-per-engine monitoring check (D41). Lighter than a full consistency test. Used for scheduled monitoring. Separate budget from consistency tests. |
| **Battle Card** | A specific action plan to get mentioned for a query where the brand is currently absent |
| **First 50 Words** | Rule that every key page should state WHO/WHAT/WHERE/PRICE in the first 50 words for LLM extraction |
| **Visibility Score** | 0-100 aggregate score measuring overall AI visibility across engines |
| **White-Label** | Agency's own branding on the dashboard, reports, and client portal (no MentionedIn branding visible) |
| **Quick Audit** | The 3-query free audit (Appendix A). Maps to `Audit.type = 'quick'`. |
| **Concierge SaaS** | Manually-billed $699/mo tier (SaaS + monthly strategy call). Not a self-serve plan — sold via LinkedIn outreach. Not in Agency.plan ENUM. |
