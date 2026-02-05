# AEO Protocol SaaS — MVP Specification

> **Version:** 1.1
> **Date:** February 5, 2026
> **Status:** Spec complete, ready for build
> **Frontend Decision:** React/Next.js (confirmed over Flutter — see Section 8)
> **Research:** 5 parallel agents across competitors, agency workflows, tech architecture, asset mapping, pricing/GTM

---

## 1. Product Vision

**AEO Protocol is the agency toolkit for selling and delivering AI visibility services** — track how brands appear in ChatGPT, Gemini, and Google AI Overviews, generate white-labeled client reports, and follow proven implementation playbooks. All under the agency's own brand.

**One-liner:** "Track AI visibility, prove ROI, deliver results — white-labeled under your brand."

**The empty quadrant we own:**

|  | Cheap ($49-299) | Expensive ($500+) |
|---|---|---|
| **Tracking only** | Otterly, LLMrefs, Ahrefs | Peec, Profound, Scrunch |
| **Tracking + Implementation** | **AEO Protocol (US)** | GrackerAI ($2K+), AEO Engine ($797+) |

---

## 2. Target User

### Primary: Agency AEO Lead

- **Title:** Founder, Head of SEO, Account Manager at digital marketing agency
- **Agency size:** 5-50 people, managing 10-30+ clients
- **Current state:** Cobbles together 5-8 tools (Semrush + manual ChatGPT queries + Google Sheets + screenshots + AgencyAnalytics)
- **Biggest pain:** Manual query testing across ChatGPT/Gemini eats 4-8 hrs/client/month. No standard methodology. Can't prove ROI. Client reports are manual screenshot hell.
- **Budget:** $100-300/mo for tooling (needs to maintain 65-75% margin on $2.5K-5K/mo AEO retainers)
- **Decision trigger:** Competitor agency starts offering AEO services, or client asks "are we showing up in ChatGPT?"

### Secondary: Freelance SEO Consultant

- Solo or small team, 3-10 clients
- Wants to add AEO as a new revenue stream
- Needs methodology (doesn't know AEO yet) + tools to deliver
- Budget: $49-149/mo

### Tertiary: In-House Marketing Team (Post-MVP)

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

**API cost:** ~$0.32/audit (8 queries x 3 engines)

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

**API cost:** ~$0.35-0.50/test (10 runs x 2 engines)

### 3.3 Three-Engine Query Comparison

**What:** Side-by-side comparison of ChatGPT vs Gemini vs Google for any query. The daily-use quick check.

**Existing asset:** `compare_llms` MCP tool (works today)

**UI:** Three columns showing each engine's response, with brand mentions highlighted.

**API cost:** ~$0.04/query

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

### 3.6 White-Label Reports (PDF + Web)

**What:** Agency-branded audit reports. PDF export or shareable web link.

**Existing asset:** `report-generator` agent (generates structured reports)

**Branding applied:**
- Agency logo (header + footer)
- Agency colors (primary, secondary, accent)
- Agency domain on shareable links
- Custom report header text
- "Powered by [agency name]" (not AEO Protocol)

**Report sections:**
1. Executive Summary (visibility score, key findings)
2. Per-Engine Results (ChatGPT, Gemini, Google)
3. Consistency Test Results (mention rates, confidence)
4. Competitor Comparison
5. Gap Analysis (missing queries)
6. Quick Wins (top 3 actions to take)
7. Full Query Details (expandable)

**Tech:** React-PDF for generation, Supabase Storage for hosting

### 3.7 Auth + Multi-Tenancy

**What:** Agency signs up, creates org, invites team, manages clients.

**Tech:** Clerk Organizations

**Roles:**
| Role | Access |
|---|---|
| Agency Admin | All clients, billing, settings, team management |
| Agency User | Assigned clients only, can run audits/reports |
| Client Viewer | Read-only access to their brand's dashboard + reports |

### 3.8 Billing (Stripe)

**What:** Subscription plans with per-client-seat expansion.

**Model:**
- Base subscription (Starter/Agency/Scale)
- Per-client overage billing when exceeding tier limit
- Stripe Customer Portal for self-serve management
- Usage tracking (API calls consumed)

---

## 4. Feature Roadmap (Post-MVP)

### Phase 2: Automation + Playbooks (Weeks 13-18)

| Feature | Source Asset | Priority |
|---|---|---|
| **Playbook Generator** | `playbook-creator` agent | HIGH — auto-generate week-by-week action plan from audit |
| **Battle Cards** | Protocol methodology | HIGH — per missing query, specific content/technical fix |
| **Scheduled Monitoring** | New (Trigger.dev cron) | HIGH — weekly/daily auto-runs, no manual trigger |
| **Alert System** | New | HIGH — email/Slack when mention rate drops >10% |
| **Trend Charts** | Requires historical data | HIGH — show improvement over time (line charts) |
| **First 50 Words Scanner** | Protocol lines 850-900 | MEDIUM — crawl key pages, check WHO/WHAT/WHERE/PRICE |

### Phase 3: Content + SEO (Weeks 19-26)

| Feature | Source Asset | Priority |
|---|---|---|
| **Content Optimizer** | `content-optimizer` agent | MEDIUM — paste URL, get AEO-optimized rewrite suggestions |
| **Keyword Gap Analysis** | `keyword_gap` MCP tool | MEDIUM — show keywords competitor has that client doesn't |
| **SEO Baseline** | `ranked_keywords` MCP tool | MEDIUM — what client already ranks for in Google |
| **Technical Site Audit** | `sitemap-audit` skill | MEDIUM — robots.txt, SSR, schema, AI crawler access |
| **Comparison Page Templates** | Protocol methodology | MEDIUM — generate vs-[competitor] page drafts |

### Phase 4: Scale + Ecosystem (Weeks 27+)

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

### 5.2 Onboarding Flow (Post-Signup)

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
- One-click PDF download or shareable link
- Preview: "This is what your client sees" (white-labeled)

**Step 5: Invite Team** (optional)
- Email invite for team members

**Progress bar:** 5 steps shown at top. Persistent until all complete.

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
│ Overall Score: 42/100    [Export PDF] [Share Link]   │
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
│ CNAME: Point to cname.aeoprotocol.app               │
│                                                      │
│ Email From Name: [Digital Growth Co       ]         │
│ Report Footer:   [© 2026 Digital Growth Co]         │
│                                                      │
│ [Preview Client Portal]  [Save Changes]             │
└─────────────────────────────────────────────────────┘
```

### 5.8 Client Portal (What Clients See)

Minimal read-only view. Agency-branded. No mention of AEO Protocol.

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
│ Latest Report: [Download PDF]                       │
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
├── slug                VARCHAR UNIQUE (subdomain: {slug}.aeoprotocol.app)
├── name                VARCHAR
├── clerk_org_id        VARCHAR UNIQUE
├── stripe_customer_id  VARCHAR
├── plan                ENUM (free, starter, agency, scale)
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
├── AgencyUser
│   ├── id              UUID PRIMARY KEY
│   ├── agency_id       UUID FK → Agency
│   ├── clerk_user_id   VARCHAR
│   ├── role            ENUM (admin, user, client_viewer)
│   ├── assigned_clients UUID[] (for user role)
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
│   │   ├── type            ENUM (full, consistency, quick)
│   │   ├── status          ENUM (pending, running, completed, failed)
│   │   ├── visibility_score INT NULLABLE (0-100)
│   │   ├── summary         TEXT NULLABLE (AI-generated)
│   │   ├── started_at      TIMESTAMP
│   │   ├── completed_at    TIMESTAMP NULLABLE
│   │   └── created_at      TIMESTAMP
│   │
│   │   └── AuditQuery
│   │       ├── id              UUID PRIMARY KEY
│   │       ├── audit_id        UUID FK → Audit
│   │       ├── query_text      VARCHAR
│   │       ├── query_type      ENUM (standard, dream, competitor)
│   │       └── created_at      TIMESTAMP
│   │
│   │       └── AuditRun
│   │           ├── id              UUID PRIMARY KEY
│   │           ├── query_id        UUID FK → AuditQuery
│   │           ├── engine          ENUM (chatgpt, gemini, google)
│   │           ├── run_number      INT (1-10)
│   │           ├── response_text   TEXT
│   │           ├── citations       JSONB (array of URLs)
│   │           ├── brand_mentioned BOOLEAN
│   │           ├── brand_position  ENUM (top, second, third, not_found)
│   │           ├── sentiment       ENUM (positive, neutral, negative)
│   │           ├── context_snippet VARCHAR (what AI said about brand)
│   │           └── created_at      TIMESTAMP
│   │
│   ├── ScheduledTest
│   │   ├── id              UUID PRIMARY KEY
│   │   ├── client_id       UUID FK → Client
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
│   │   ├── audit_id        UUID NULLABLE FK → Audit
│   │   ├── type            ENUM (audit, weekly, monthly)
│   │   ├── pdf_url         VARCHAR NULLABLE
│   │   ├── share_token     VARCHAR UNIQUE (for public link)
│   │   ├── date_range_start DATE
│   │   ├── date_range_end   DATE
│   │   └── created_at      TIMESTAMP
│   │
│   └── Snapshot (monthly aggregation for trend charts)
│       ├── id              UUID PRIMARY KEY
│       ├── client_id       UUID FK → Client
│       ├── month           DATE (first of month)
│       ├── visibility_score INT
│       ├── chatgpt_mention_rate DECIMAL
│       ├── gemini_mention_rate  DECIMAL
│       ├── google_aio_present   BOOLEAN
│       ├── avg_position    DECIMAL
│       ├── citation_count  INT
│       └── created_at      TIMESTAMP
│
└── ApiUsage
    ├── id              UUID PRIMARY KEY
    ├── agency_id       UUID FK → Agency
    ├── month           DATE (first of month)
    ├── chatgpt_calls   INT DEFAULT 0
    ├── gemini_calls    INT DEFAULT 0
    ├── google_calls    INT DEFAULT 0
    ├── total_cost      DECIMAL DEFAULT 0
    ├── quota_limit     INT (based on plan)
    └── created_at      TIMESTAMP
```

### Key Indexes
- `AuditRun(query_id, engine, run_number)` — fast lookup per test
- `Snapshot(client_id, month)` — trend chart queries
- `Agency(slug)` — subdomain routing
- `Agency(custom_domain)` — custom domain routing
- `Report(share_token)` — public report links

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
│   └── query      (3-engine comparison — enqueues job)
│
├── report/
│   ├── generate   (create PDF — enqueues job)
│   ├── list       (reports for a client)
│   ├── get        (single report + download link)
│   └── share      (generate/revoke share token)
│
├── snapshot/
│   └── trend      (monthly snapshots for trend chart)
│
├── billing/
│   ├── portal     (Stripe customer portal link)
│   ├── subscribe  (create/update subscription)
│   └── webhook    (Stripe webhooks)
│
└── public/
    ├── freeAudit  (no auth, rate-limited, single brand)
    └── report     (by share_token, no auth)
```

### Background Jobs (Trigger.dev)

| Job | Trigger | Duration | Concurrency |
|---|---|---|---|
| `full-audit` | User clicks "Run Audit" | 60-120s | 5 per agency |
| `consistency-test` | User clicks or cron schedule | 30-60s | 10 per agency |
| `compare-query` | User submits query | 5-10s | 20 per agency |
| `generate-report` | User clicks "Generate PDF" | 10-30s | 5 per agency |
| `scheduled-monitoring` | Cron (daily/weekly per client) | 60-120s | Unlimited |
| `send-alert` | After monitoring if threshold breached | 2-5s | Unlimited |
| `track-usage` | After every API call | <1s | Unlimited |

### External API Integration

| Service | Purpose | Auth | Rate Limit |
|---|---|---|---|
| OpenAI (GPT-5) | ChatGPT queries with web search | API key | Per-account |
| Google GenAI (Gemini 3 Flash) | Gemini queries with grounding | API key | Per-account |
| ScrapingBee | Google SERP + AI Overview | API key | Credits-based |
| DataForSEO | Keyword data (Phase 2) | Login/password | Per-account |
| Stripe | Billing | Secret key | Standard |
| Clerk | Auth | Secret key | Standard |
| Resend | Transactional email | API key | Free tier: 3K/mo |

---

## 8. Tech Stack

### Framework Decision: React/Next.js (Confirmed)

Flutter was considered (founder has production Flutter experience including white-label in DM Champ and a full multi-tenant access control system with Riverpod + Supabase + RLS). React/Next.js was chosen for three reasons:

1. **Data visualization ecosystem** — React has Recharts, Nivo, Visx, Tremor, D3 wrappers, plus Framer Motion for custom animations. Flutter has `fl_chart` and little else at this level. The SaaS is fundamentally a data dashboard.
2. **Existing components** — The `aeo-landing/` project already has production-quality React visualization components that map directly to SaaS screens (see Section 13, Reusable Components).
3. **White-label custom domains** — Vercel Domains API handles SSL + routing automatically. No self-managed Nginx/Caddy needed.

Mobile app is **not on the roadmap** (zero of 12 AEO competitors have one), so Flutter's cross-platform advantage doesn't apply. If mobile is ever needed (Year 2+), a PWA or React Native wrapper covers it.

### Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Multi-tenant ecosystem, Vercel Platforms Starter Kit, server components for dashboard |
| **API** | tRPC | End-to-end type safety, no separate server needed initially |
| **Database** | PostgreSQL + Prisma (Supabase-hosted) | RLS for multi-tenancy safety net, type-safe ORM, managed hosting |
| **Auth** | Clerk Organizations | Native multi-tenancy, RBAC, pre-built UI components, org switching |
| **Payments** | Stripe (subscriptions + metered) | Per-seat billing, usage tracking, customer portal |
| **Hosting** | Vercel | Custom domains API (critical for white-label), edge network, zero-config |
| **Job Queue** | Trigger.dev | No timeout limits (audits take 60-120s), managed, TypeScript-native, cron |
| **Email** | Resend + React Email | React components for email templates, free tier 3K/mo |
| **PDF** | React-PDF | React components for reports, serverless-compatible, no headless Chrome |
| **File Storage** | Supabase Storage | PDF reports, logos, assets |
| **Caching** | Vercel KV (Redis) | Tenant config lookup, API response caching |
| **Monitoring** | Sentry | Error tracking, performance monitoring |
| **Analytics** | PostHog | Product analytics, feature flags, session replay |
| **Data Viz** | Framer Motion + Recharts | Framer Motion for custom animations (ProgressRing, bars), Recharts for trend charts |
| **UI Components** | Radix UI + Tailwind CSS | Same stack as aeo-landing, components portable |
| **Fonts** | Syne (headings) + Space Grotesk (body) | Matches existing brand from aeo-landing |
| **Starter Kit** | Vercel Platforms Starter Kit | Free, official multi-tenant template with custom domain support |

### Infrastructure Cost at Launch

| Service | Plan | Monthly Cost |
|---|---|---|
| Vercel Pro | Pro | $20/mo |
| Supabase Pro | Pro | $25/mo |
| Clerk | 1,000 MAU | $25/mo |
| Trigger.dev | Hobby | $0-29/mo |
| Resend | Free | $0/mo |
| Sentry | Free | $0/mo |
| PostHog | Free | $0/mo |
| Domain + DNS | Cloudflare | $10/mo |
| **Total** | | **~$80-110/mo** |

---

## 9. White-Label Specification

### How It Works

**Subdomain routing (default):**
- Every agency gets `{slug}.aeoprotocol.app`
- Next.js middleware extracts hostname, looks up tenant, injects branding

**Custom domain (Agency tier+):**
- Agency adds CNAME: `app.theiragency.com` → `cname.aeoprotocol.app`
- Vercel Domains API provisions SSL automatically
- Same middleware, different hostname lookup

### What's Branded

| Element | Customizable | Where |
|---|---|---|
| Dashboard header logo | Yes | Top-left of every page |
| Favicon | Yes | Browser tab |
| Primary/secondary/accent colors | Yes | CSS variables, buttons, charts |
| Custom domain | Yes (Agency+) | URL bar |
| PDF report header/footer | Yes | Generated reports |
| Email sender name | Yes | Alert and report emails |
| Client portal | Fully white-labeled | No AEO Protocol branding visible |
| Login page | Agency logo + colors | Clerk custom branding |

### What's NOT Branded (MVP)
- Mobile app (none exists)
- Custom fonts (use system defaults)
- Custom CSS injection (Phase 2)
- Custom email domain (requires DNS setup, Phase 2)

---

## 10. Pricing Tiers

| | FREE | STARTER | AGENCY | SCALE |
|---|---|---|---|---|
| **Price** | $0 | $49/mo | **$149/mo** | $299/mo |
| **Annual** | — | $39/mo | $119/mo | $239/mo |
| **Client brands** | 1 audit (snapshot) | 3 | 15 | Unlimited |
| **Queries per brand** | 8 (standard) | 25 | 50 | 100 |
| **Monitoring** | None (one-time) | Weekly | Daily | Real-time |
| **Consistency tests** | None | 2/month | Unlimited | Unlimited |
| **White-label** | No | No | Yes | Yes |
| **Client portal** | No | No | Yes | Yes |
| **Custom domain** | No | No | Yes | Yes |
| **PDF reports** | 1 (watermarked) | Unlimited (branded AEO Protocol) | Unlimited (agency branded) | Unlimited (agency branded) |
| **Team seats** | 1 | 1 | 3 | 10 ($15/extra) |
| **Implementation playbooks** | No | Basic checklist | Full playbooks | Full + custom |
| **API access** | No | No | No | Yes |
| **Support** | Docs | Email | Priority email | Slack + quarterly call |
| **Overage per client** | N/A | $12/client/mo | $8/client/mo | Unlimited |

**Anchor tier: Agency at $149/mo.** This is where most revenue concentrates. White-label unlocks here (not at Scale) because it's the #1 feature agencies need.

---

## 11. Cost Model

### Per-Client API Costs (Monthly)

| Operation | Frequency | API Calls | Cost |
|---|---|---|---|
| Full brand audit (8 queries x 3 engines) | 1x/month | 24 | $0.32 |
| Consistency tests (5 queries x 10 runs x 2 engines) | 4x/month (weekly) | 400 | $7.00 |
| Ad-hoc query checks | ~20/month | 20 | $0.80 |
| **Total per client/month** | | **444** | **~$8.12** |

### Margin by Tier

| Tier | Price | Clients | Revenue | API Cost | Margin % |
|---|---|---|---|---|---|
| Starter ($49) | $49/mo | 3 clients | $49 | ~$24 | 51% |
| Agency ($149) | $149/mo | 15 clients | $149 | ~$122 | 18% |
| Agency ($149) | $149/mo | 8 clients (typical) | $149 | ~$65 | 56% |
| Scale ($299) | $299/mo | 25 clients (typical) | $299 | ~$203 | 32% |

**Note:** Margins improve when agencies don't use full quota. Typical usage is 50-60% of limit. At typical usage:

| Tier | Typical Usage | Revenue | API Cost | Effective Margin |
|---|---|---|---|---|
| Starter | 2 clients | $49 | ~$16 | 67% |
| Agency | 8 clients | $149 | ~$65 | 56% |
| Scale | 15 clients | $299 | ~$122 | 59% |

### Break-Even Analysis

| Fixed costs | Monthly |
|---|---|
| Infrastructure | ~$100 |
| Domain/DNS | ~$10 |
| Sohaib's time (opportunity cost) | ~$5,000 |
| YouTube production | ~$3,000 |
| **Total fixed** | **~$8,000/mo** |

**Break-even at:** ~54 customers at $149 ARPU = **Month 6-7**

### 12-Month Revenue Projection

| Month | New | Total | MRR | Cumulative |
|---|---|---|---|---|
| 1 | 3 | 3 | $447 | $447 |
| 3 | 8 | 16 | $2,384 | $4,023 |
| 6 | 20 | 58 | $8,642 | $22,648 |
| 9 | 38 | 141 | $21,009 | $71,669 |
| 12 | 60 | 273 | $40,677 | $172,244 |

**Year 1 ARR: ~$488K**

---

## 12. Build Plan

**Total estimated: 8-10 weeks to MVP** (down from 12 weeks due to reusable aeo-landing components)

### Phase 1: Foundation (Weeks 1-2)
- [ ] Fork Vercel Platforms Starter Kit
- [ ] Set up Supabase project (database + storage + RLS)
- [ ] Integrate Clerk Organizations (auth + multi-tenancy + RBAC)
- [ ] Prisma schema with all core tables
- [ ] Stripe integration (4 tiers + per-seat billing + customer portal)
- [ ] Port aeo-landing design system (colors, fonts, Tailwind config, Radix UI, Framer Motion)
- [ ] Basic dashboard layout with tenant branding (CSS variables from DB)
- [ ] Agency settings page (logo, colors, domain)
- [ ] Deploy to Vercel with staging environment

### Phase 2: Core Audit Engine (Weeks 3-5)
- [ ] Port `queryChatGPT()`, `queryGemini()`, `queryGoogle()` into tRPC endpoints
- [ ] Build `run_brand_audit` as Trigger.dev job (8 queries, 3 engines, with progress updates)
- [ ] Build `run_consistency_test` as Trigger.dev job (10 runs, 2 engines)
- [ ] Build `compare_llms` as tRPC endpoint (single query, 3 engines)
- [ ] Build `get_audit_queries` suggestions from brand + category
- [ ] Results storage in AuditRun table
- [ ] Audit results UI — adapt HeadlineResult + KeyFindings components from aeo-landing
- [ ] Visibility score calculation algorithm
- [ ] Consistency test UI — adapt ResultsProof (bars) + ProgressRing components

### Phase 3: Client Management + Reports (Weeks 6-7)
- [ ] Client intake wizard (form with dream queries, competitors, brand facts)
- [ ] Multi-client dashboard — adapt CurrentVisibility grid pattern from aeo-landing
- [ ] Client detail view (overview, audits, consistency tests)
- [ ] Trend chart (Recharts line chart, snapshots over time)
- [ ] PDF report generation (React-PDF, white-labeled, matching dashboard visuals)
- [ ] Shareable report links (public, no auth, by token)
- [ ] Email notifications (audit complete, report ready — via Resend)

### Phase 4: White-Label + Polish (Weeks 8-10)
- [ ] Custom domain provisioning (Vercel Domains API)
- [ ] Client portal (read-only view, reuses dashboard components)
- [ ] Onboarding flow (5-step wizard with progress bar)
- [ ] Free audit landing page (adapt from aeo-landing patterns)
- [ ] API usage tracking + quota enforcement
- [ ] Alert system (email when mention rate drops)
- [ ] Responsive dashboard (mobile-friendly)
- [ ] Error handling, loading states, empty states
- [ ] Production deployment, monitoring (Sentry), analytics (PostHog)

### Phase 5: Automation + Playbooks (Weeks 13-18)
- [ ] Scheduled consistency tests (Trigger.dev cron, daily/weekly)
- [ ] Playbook generator (auto-create action plan from audit)
- [ ] Battle cards per missing query
- [ ] First 50 Words scanner (crawl + analyze key pages)
- [ ] Competitor tracking dashboard
- [ ] Advanced alerts (Slack webhook, configurable thresholds)
- [ ] Team invite flow + role management

### Phase 6: Growth + Ecosystem (Weeks 19+)
- [ ] Public API for agencies
- [ ] Affiliate program (30% recurring)
- [ ] SEO data integration (ranked keywords, keyword gap)
- [ ] Content optimizer (URL → AEO rewrite suggestions)
- [ ] Template marketplace
- [ ] Integrations (GA4, GSC, Slack, HubSpot)
- [ ] Bulk audit tools

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
| PDF report generation | 1 week | React-PDF, white-label templates |
| Visibility score algorithm | 2 days | Weighted scoring from audit data |
| Scheduling engine | 1 week | Trigger.dev cron + management UI |
| Alert system | 3 days | Threshold config + email/webhook |
| Client portal | 3 days | Read-only branded view (reuses dashboard components) |
| Auth + billing | 1 week | Clerk + Stripe boilerplate |
| Onboarding flow | 3 days | 5-step wizard |
| Free audit page | 1 day | Adapt existing aeo-landing free audit patterns |

---

## 14. Competitive Differentiation

### Feature Comparison Matrix

| Feature | AEO Protocol | Otterly | GrackerAI | Profound | AEO Engine | Semrush AI |
|---|---|---|---|---|---|---|
| **Price (agency)** | $149/mo | $189-989/mo | $2,500+/mo | $499+/mo | $797+/mo | $239+/mo |
| **Engines tracked** | 3 (ChatGPT, Gemini, Google AIO) | 4-6 | 5+ | 1-10+ | 4 | 4 |
| **10-run consistency** | Yes (core) | No | No | No | No | No |
| **White-label** | Yes ($149+) | No | Yes ($2.5K+) | No | Yes ($797+) | Via Semrush |
| **Client portal** | Yes | No | Yes | No | No | Via Semrush |
| **Custom domain** | Yes | No | Unknown | No | No | No |
| **Implementation playbooks** | Yes (auto-generated) | No | No | No | Managed service | No |
| **Battle cards** | Yes | No | No | No | No | No |
| **Content generation** | Phase 2 | No | Yes (30-75/mo) | Yes (6/mo) | Yes (15-60/mo) | No |
| **Self-serve** | Yes | Yes | Yes | Partial | No (demo) | Yes |
| **Free tier** | Yes (1 audit) | No | Yes (limited) | No | No | No |
| **Multi-client dashboard** | Yes | Yes (workspaces) | Yes | No | Yes | Yes |
| **PDF reports** | Yes (branded) | No | Yes | No | Yes | Via Semrush |
| **API** | Yes (Scale) | No | Yes (Scale) | Enterprise | No | Advanced+ |
| **Skool community** | Yes (included) | No | No | No | No | No |

### Why We Win

1. **Only tool with 10-run consistency testing** — statistical proof, not snapshots
2. **Only affordable white-label** — $149/mo vs $2,500+ (GrackerAI) or $797+ (AEO Engine)
3. **Only tool with implementation playbooks** — audits turn into actions, not just scores
4. **Built by a practitioner** — real case study (FueGenix), real methodology (3500-line protocol)
5. **Ecosystem play** — YouTube education + Skool community + SaaS tool (not just software)
6. **Battle cards per missing query** — specific, actionable fixes, not generic recommendations
7. **Free audit as PLG entry** — Otterly, Profound, AEO Engine all require payment to start

---

## Appendix A: Free Audit Lead Magnet Spec

### URL: `/free-audit`

**No signup required. Captures email at results stage.**

**Flow:**
1. Enter brand name + category + website URL
2. System runs quick audit (3 standard queries x 3 engines = 9 API calls)
3. Show results with visibility score
4. Gate full results behind email: "Enter email to see complete breakdown + get PDF"
5. After email: show full results + CTA: "Track this weekly → Start free trial"

**Rate limit:** 3 free audits per IP per day

**API cost:** ~$0.12 per free audit (9 calls)

**Purpose:** YouTube CTA destination, LinkedIn lead magnet, viral sharing potential

---

## Appendix B: Visibility Score Algorithm

```
visibility_score = weighted average of:
  - ChatGPT mention rate (30% weight)
  - Gemini mention rate (30% weight)
  - Google AI Overview presence (20% weight)
  - Average position when mentioned (10% weight)
  - Citation rate (10% weight)

Mention rate = (brand_mentioned_runs / total_runs) per engine
Position score = top=100, second=66, third=33, not_found=0
Citation score = (queries_with_brand_citation / total_queries) x 100

Final score: 0-100, rounded to integer
```

**Score interpretation:**
- 80-100: DOMINANT — brand consistently recommended
- 60-79: STRONG — brand regularly appears, room to improve
- 40-59: MODERATE — inconsistent visibility, significant gaps
- 20-39: WEAK — rarely mentioned, major optimization needed
- 0-19: INVISIBLE — brand not in AI responses

---

## Appendix C: Glossary

| Term | Definition |
|---|---|
| **AEO** | Answer Engine Optimization — optimizing brand visibility in AI search (ChatGPT, Gemini, etc.) |
| **Consistency Test** | Running the same query 10x to measure how often a brand is mentioned (vs 1x snapshot) |
| **Dream Query** | A search query the client wants to rank for in AI responses |
| **Mention Rate** | Percentage of AI responses that mention the brand (e.g., 7/10 = 70%) |
| **Battle Card** | A specific action plan to get mentioned for a query where the brand is currently absent |
| **First 50 Words** | Rule that every key page should state WHO/WHAT/WHERE/PRICE in the first 50 words for LLM extraction |
| **Visibility Score** | 0-100 aggregate score measuring overall AI visibility across engines |
| **White-Label** | Agency's own branding on the dashboard, reports, and client portal (no AEO Protocol branding visible) |
