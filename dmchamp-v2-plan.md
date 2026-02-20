# DMChamp V2: Open-Core Transformation Plan

**Status:** Draft for review - no execution yet
**Date:** February 19, 2026
**Scope:** Full product transformation from closed Firebase SaaS to open-core, code-customizable platform

---

## 1. Executive Summary

DMChamp is a $100K/yr ARR multi-channel sales automation platform running on Firebase/GCP with a Flutter frontend. It has 360+ Cloud Functions, 40+ Firestore collections, and 161 custom actions - most of which are unused or used by 1-2 customers.

Every customer asks for the same thing: customization. Different AI models, different workflows, different integrations, different UI. The current architecture makes this impossible without you personally building every feature request.

**The plan:** Transform DMChamp into an open-core, code-customizable platform where customers get full source code access to their instance, customize it via Claude Code, and you run the hosting/infrastructure. Strip the product down to a tight core, move everything else into a per-customer customization layer, and migrate to a fully self-hostable stack.

**The outcome:**
- You stop maintaining features for 1 person
- Customers get unlimited customization without waiting for your roadmap
- New revenue stream: platform fees + hosting (not just credits)
- The transformation becomes Claudify's flagship build-along project
- DMChamp becomes the "Chatwoot of sales automation" - open-core, self-hostable, AI-first

---

## 2. Current State Assessment

### What DMChamp is today

| Dimension | Current State | Problem |
|-----------|--------------|---------|
| **Backend** | 360+ Firebase Cloud Functions (Node.js/TS) | 15-30 min deploys, 360 cold starts, $79/mo GCP |
| **Frontend** | Flutter/FlutterFlow (Dart) | Hard to customize, poor web performance, FlutterFlow lock-in |
| **Database** | Firestore (NoSQL) with 1,694 indexes | Vendor-locked, expensive at scale, complex queries |
| **AI** | Claude + Gemini + OpenAI with BYOK | Good foundation, but model routing is per-user config, not per-instance code |
| **Multi-tenancy** | Row-level isolation + agency sub-accounts | Already works, needs to scale to per-customer forks |
| **Deployment** | Firebase CLI + Cloud Build + Cloud Run | GCP-only, not self-hostable |
| **Pricing** | Credit-based (AI messages + phone numbers) | Works, but no platform/hosting fee component |
| **Customization** | Feature flags (40+) + webhook events (13) + custom functions | Not enough - customers want code-level changes |

### What's already good (keep these)

1. **BYOK (Bring Your Own Keys)** - Custom AI keys with fallback. This is ahead of most competitors.
2. **AI Agent System** - 10+ tools (booking, calendar, web search, contact updates, human escalation) with chained tool calling. Solid architecture.
3. **Credit Manager** - Clean class-based credit system with agency sub-account support, auto-recharge, and analytics tracking.
4. **Webhook System** - 13 event types with health tracking and auto-disable on failure. Good extensibility foundation.
5. **Custom Functions** - Users can already define webhook-based custom tools for the AI agent. This is proto-customization.
6. **WhatsApp Web Service** - Already containerized, already a separate microservice. Migration-ready.
7. **Multi-channel abstraction** - WhatsApp, SMS, Instagram, Facebook, custom channels through unified interface.

### What's broken (fix or kill)

1. **360 Cloud Functions organized by technical type** (callable/, http/, trigger/) instead of business domain. The ARCHITECTURE_REFACTOR.md already identifies this.
2. **94 Firestore triggers** - Hidden chains where one write cascades into 5-10 function invocations. Unpredictable costs, hard to debug.
3. **Feature bloat** - Restaurant integrations (Zenchef, Formitable), Deals CRM, advanced appointments, FAQ generation, video tutorials, multiple update screens. Most unused.
4. **Flutter/FlutterFlow frontend** - Generated code that's anti-customizable. Dart is not Claude Code's strongest language. Web performance is poor.
5. **Firebase/GCP vendor lock** - Can't self-host, can't offer open-core, pricing is opaque.

---

## 3. Target Vision: DMChamp V2

### The product in one sentence

**DMChamp V2 is an open-core, AI-powered sales automation platform where every customer gets a customizable codebase deployed on managed infrastructure.**

### How it works for customers

```
Customer signs up for DMChamp
    |
    v
Gets a private Git repo with their instance code
    |
    v
Uses Claude Code (or any IDE) to customize:
  - Swap AI models (Claude, GPT, Gemini, Llama via OpenRouter)
  - Add custom integrations (their CRM, their POS, their tools)
  - Modify UI (dashboards, workflows, branding)
  - Create custom AI agent tools
  - Build custom automation logic
    |
    v
Pushes changes to their repo
    |
    v
DMChamp platform auto-deploys to managed infrastructure
    |
    v
Customer uses their customized product
```

### How it works for you

```
You maintain the CORE:
  - Messaging engine (all channels)
  - AI layer (provider abstraction, tool calling, context management)
  - Contact + campaign engine
  - Credit system + billing
  - Auth + multi-tenancy
  - REST API
  - Deployment pipeline

You DON'T maintain:
  - Zenchef integration (that one customer maintains it in their fork)
  - Formitable integration (same)
  - Deals CRM (customer who needs it builds it)
  - Custom dashboards (each customer builds their own)
  - Niche workflow logic (lives in customer's /workflows/ directory)
```

---

## 4. Target Architecture

### Tech Stack

```
FRONTEND (new)
├── Vite + React (SPA, no framework overhead)
├── TypeScript
├── Tanstack Router (type-safe file-based routing)
├── Tanstack Query (data fetching + caching)
├── Tailwind CSS + shadcn/ui (components)
└── Supabase JS client (auth + realtime)

BACKEND (refactored)
├── API Service (Fastify or Hono on Node.js)
│   ├── REST API (contacts, campaigns, messages, billing)
│   ├── Webhook receivers (Twilio, Meta, Stripe, Telnyx)
│   └── Auth middleware (Supabase Auth + API keys)
│
├── Worker Service (BullMQ on Node.js)
│   ├── Message sending jobs (WhatsApp, SMS, IG, FB)
│   ├── AI message generation jobs
│   ├── Campaign execution jobs
│   ├── Follow-up scheduling jobs
│   ├── Analytics aggregation jobs
│   └── Cron jobs (credit reset, token refresh, cleanup)
│
└── WhatsApp Web Service (existing, containerized)
    ├── Baileys (WhatsApp Web protocol)
    ├── Session management + proxy rotation
    └── Already Docker + Cloud Run ready

DATA LAYER (migrated)
├── Supabase
│   ├── PostgreSQL (primary database, replaces Firestore)
│   ├── Auth (replaces Firebase Auth)
│   ├── Realtime (replaces Firestore listeners)
│   ├── Storage (replaces Cloud Storage)
│   └── Row-Level Security (replaces Firestore rules)
│
└── Redis
    ├── BullMQ (job queue, replaces Cloud Tasks + Pub/Sub)
    ├── Rate limiting (replaces Firestore rate limiter)
    └── Session cache
```

### Architecture Diagram

```
                    ┌─────────────────────┐
                    │  Vite + React SPA   │
                    │  (per-customer UI)  │
                    └──────────┬──────────┘
                               │
                    ┌──────────v──────────┐
                    │    API Service       │
                    │  (Fastify/Hono)      │
                    │                      │
                    │  /api/contacts       │
                    │  /api/campaigns      │
                    │  /api/messages       │
                    │  /api/billing        │
                    │  /webhooks/*         │
                    └──┬───────────────┬──┘
                       │               │
              ┌────────v───┐    ┌──────v──────┐
              │   Supabase │    │   Redis +   │
              │            │    │   BullMQ    │
              │  Postgres  │    │             │
              │  Auth      │    │  Job Queue  │
              │  Realtime  │    │  Rate Limit │
              │  Storage   │    │  Cache      │
              └────────────┘    └──────┬──────┘
                                       │
                            ┌──────────v──────────┐
                            │   Worker Service     │
                            │                      │
                            │  Message sending     │
                            │  AI generation       │
                            │  Campaign execution  │
                            │  Follow-ups          │
                            │  Cron jobs           │
                            └──────────┬──────────┘
                                       │
                    ┌──────────────────┬┴──────────────────┐
                    │                  │                    │
            ┌───────v──────┐  ┌───────v──────┐   ┌────────v─────┐
            │  WhatsApp    │  │  Twilio/     │   │  Meta        │
            │  Web Service │  │  Telnyx      │   │  (IG/FB)     │
            │  (Baileys)   │  │  (SMS/WA)    │   │              │
            └──────────────┘  └──────────────┘   └──────────────┘
```

### Per-Customer Customization Layer

Each customer gets a Git repo with this structure:

```
customer-instance/
├── /core/                    # DMChamp core (read-only, you push updates)
│   ├── /api/                 # API routes + controllers
│   ├── /worker/              # Job handlers
│   ├── /lib/                 # Shared business logic
│   │   ├── messaging/        # Channel abstraction
│   │   ├── ai/               # LLM provider abstraction + tool calling
│   │   ├── campaigns/        # Campaign engine
│   │   ├── contacts/         # Contact management
│   │   ├── billing/          # Credit + subscription logic
│   │   └── auth/             # Authentication
│   └── /ui/                  # Base UI components
│
├── /custom/                  # Customer's code (they own this)
│   ├── /integrations/        # Custom integrations (Zenchef, their CRM, etc.)
│   ├── /workflows/           # Custom automation logic
│   ├── /ai-tools/            # Custom AI agent tools
│   ├── /ui-components/       # Custom dashboard widgets
│   ├── /api-extensions/      # Custom API endpoints
│   └── /triggers/            # Custom event handlers
│
├── /config/                  # Customer configuration
│   ├── ai.config.ts          # Model selection, routing, custom prompts
│   ├── channels.config.ts    # Channel setup (WhatsApp, SMS, etc.)
│   ├── billing.config.ts     # Credit costs, plan limits
│   ├── brand.config.ts       # White-label, custom domain
│   └── features.config.ts    # Feature flags
│
├── docker-compose.yml        # Self-host option
├── package.json
└── README.md
```

**Key design principle:** The `/core/` directory is a Git submodule or package that you control. You push updates to it. The `/custom/` directory is the customer's space - they modify it freely. Updates to core don't conflict with custom code because they're in separate directories.

---

## 5. Database Migration: Firestore to PostgreSQL

### Why PostgreSQL

| Firestore | PostgreSQL |
|-----------|-----------|
| NoSQL document model | Relational model (DMChamp's data IS relational) |
| 1,694 composite indexes (manually managed) | Automatic query planning + simple indexes |
| Array-contains queries (limited) | Full JOIN support, subqueries, CTEs |
| No aggregation (must compute client-side) | GROUP BY, SUM, COUNT, window functions |
| $0.06/100K reads + $0.18/100K writes | Fixed cost (self-hosted) or usage-based (Supabase cloud) |
| Vendor-locked to Google | Self-hostable, portable |
| Firestore security rules (custom language) | Row-Level Security (standard SQL policies) |

### Schema Design (core tables)

```sql
-- Multi-tenancy: every table has org_id for row-level security
-- RLS policy: current_user_org_id() = org_id

-- Organizations (replaces agency model)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  parent_org_id UUID REFERENCES organizations(id),  -- sub-accounts
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT DEFAULT 'free',
  credits INTEGER DEFAULT 0,
  recurring_credits INTEGER DEFAULT 0,
  auto_recharge JSONB,
  custom_ai_keys JSONB,  -- BYOK
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Users (org members)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'member',  -- owner, admin, member
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contacts
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  phone_number TEXT,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  channel TEXT,  -- whatsapp, sms, instagram, messenger, custom
  instagram_id TEXT,
  messenger_id TEXT,
  is_bot_active BOOLEAN DEFAULT true,
  bot_message_count INTEGER DEFAULT 0,
  do_not_disturb BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'lead',  -- lead, customer, inactive
  custom_fields JSONB DEFAULT '{}',
  last_activity_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  type TEXT,  -- broadcast, drip, template, incoming
  status TEXT DEFAULT 'draft',  -- draft, live, paused, completed
  bot_instructions TEXT,
  sales_page_content TEXT,
  execution_date TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Campaign-Contact junction
CREATE TABLE campaign_contacts (
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  PRIMARY KEY (campaign_id, contact_id)
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  contact_id UUID NOT NULL REFERENCES contacts(id),
  campaign_id UUID REFERENCES campaigns(id),
  direction TEXT NOT NULL,  -- inbound, outbound
  channel TEXT NOT NULL,  -- whatsapp, sms, instagram, messenger, custom
  body TEXT,
  media_url TEXT,
  media_type TEXT,
  status TEXT DEFAULT 'pending',  -- pending, sent, delivered, read, failed
  is_bot BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  contact_id UUID REFERENCES contacts(id),
  title TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled',  -- scheduled, completed, canceled
  google_calendar_event_id TEXT,
  zoom_meeting_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tags
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  color TEXT,
  UNIQUE(org_id, name)
);

-- Contact-Tag junction
CREATE TABLE contact_tags (
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (contact_id, tag_id)
);

-- Lists
CREATE TABLE lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact-List junction
CREATE TABLE list_contacts (
  list_id UUID REFERENCES lists(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  PRIMARY KEY (list_id, contact_id)
);

-- Phone Numbers
CREATE TABLE phone_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  phone_number TEXT NOT NULL,
  provider TEXT,  -- twilio, telnyx
  channel_type TEXT,  -- sms, whatsapp, whatsapp_web
  status TEXT DEFAULT 'active',
  provider_config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp Templates
CREATE TABLE whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  body TEXT NOT NULL,
  approval_status TEXT DEFAULT 'pending',
  language TEXT DEFAULT 'en',
  variables JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- FAQs (with vector embeddings for smart matching)
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  campaign_id UUID REFERENCES campaigns(id),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  embedding VECTOR(1024),  -- pgvector for semantic search
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Credit Usage (audit log)
CREATE TABLE credit_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  campaign_id UUID REFERENCES campaigns(id),
  contact_id UUID REFERENCES contacts(id),
  ai_model TEXT,
  custom_keys_used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Webhook Configs
CREATE TABLE webhook_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT,
  url TEXT NOT NULL,
  subscribed_to TEXT[] NOT NULL,  -- array of event types
  health_status TEXT DEFAULT 'healthy',
  failure_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Custom AI Tools (replaces custom_functions)
CREATE TABLE custom_ai_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  method TEXT DEFAULT 'POST',
  headers JSONB DEFAULT '{}',
  parameters JSONB DEFAULT '[]',
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Jobs (BullMQ job tracking)
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  payload JSONB,
  result JSONB,
  scheduled_for TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Analytics (event-based, replaces Firestore analytics collection)
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  event_type TEXT NOT NULL,
  contact_id UUID REFERENCES contacts(id),
  campaign_id UUID REFERENCES campaigns(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row-Level Security (every table)
-- Example for contacts:
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "org_isolation" ON contacts
  USING (org_id = current_setting('app.current_org_id')::UUID);
```

### Migration Strategy

**NOT a big-bang migration.** Dual-write during transition:

1. New writes go to both Firestore AND Postgres
2. New reads come from Postgres
3. Historical data migrated in batches (contacts, messages, campaigns)
4. Once verified, Firestore writes stop
5. Firestore kept read-only for 30 days as safety net

**Data volume estimation:**
- Contacts: Likely 100K-1M rows (manageable)
- Messages: Likely 1M-10M rows (largest table, needs partitioning by created_at)
- Campaigns: Likely 10K-50K rows
- Analytics: Likely 1M+ rows (partition by month)

---

## 6. Feature Triage

### CORE (you maintain forever)

These are the 20% of features that deliver 80% of value:

| Feature | Current code | V2 equivalent |
|---------|-------------|---------------|
| Multi-channel messaging (send/receive) | 66 HTTP + 18 Pub/Sub handlers | API Service + Worker jobs |
| Contact management (CRUD, tags, lists) | 15+ callables + 10+ triggers | API endpoints + Postgres |
| Campaign engine (create, schedule, batch, follow-ups) | 20+ functions | API + Worker jobs |
| AI message generation (Claude/Gemini/OpenAI + BYOK) | aiMessageHandlerHelpers + geminiHelpers | Worker job + AI lib |
| AI agent tools (booking, calendar, web search, human alert) | 10 built-in tools | Core /lib/ai/tools/ |
| Credit system (deduction, auto-recharge, tracking) | CreditManager class | Billing lib + Postgres |
| Auth + multi-tenancy (orgs, users, sub-accounts) | Firebase Auth + agency model | Supabase Auth + RLS |
| Webhook system (13 event types, health tracking) | webhookHelper.ts | API + Worker |
| Phone number management (buy, release, status) | Twilio/Telnyx callables | API endpoints |
| REST API (v1) | Express router with 17 route groups | Fastify/Hono API Service |

**Estimated scope:** ~100 API endpoints, ~20 job types, ~15 cron jobs

### CUSTOMIZATION LAYER (customers maintain in their forks)

| Feature | Why it moves | Who needed it |
|---------|-------------|---------------|
| Zenchef restaurant integration | Niche, 1-2 customers | Restaurant clients |
| Formitable restaurant integration | Niche, 1-2 customers | Restaurant clients |
| Deals/CRM pipeline | Barely used, not core messaging | Nobody actively |
| Advanced appointment + Google Calendar sync | Power feature, not universal | Subset of customers |
| Zoom meeting auto-creation | Nice-to-have, not core | Few customers |
| FAQ generation from sales pages | AI feature, not essential | Optional |
| Chat widget (embedded JS) | Not all customers need it | Website-focused clients |
| Custom channel API | Power feature | API-savvy customers |
| AppSumo integration | Distribution channel, not core product | AppSumo cohort |
| FirstPromoter/Rewardful affiliate tracking | Marketing, not product | You (can re-add later) |
| Advanced analytics aggregation | Over-engineered for usage | Could be simpler |
| WhatsApp profile management | Nice-to-have | Some customers |
| Email notifications (Mailgun) | Not core to messaging platform | Some customers |

**These features don't die.** They become templates/examples in the `/custom/` directory. The Zenchef customer keeps their integration - it just lives in their fork, not your core.

### KILL (delete entirely)

| Feature | Why |
|---------|-----|
| Multiple update screens (update, update_2) | Technical debt |
| Duplicate calendar functions | Code duplication |
| Multiple phone number retrieval variants | Same data, different wrappers |
| Unused custom code actions (shadows of callables) | FlutterFlow artifacts |
| Video tutorial page | Static content, not a feature |
| Debug/emulator utility actions | Dev tools, not product |
| Hotjar/Microsoft Clarity init | Analytics SDKs, add via config |
| redirect_from_update_to_home / home2 | Navigation debt |

---

## 7. Frontend: Flutter to Vite + React

### Why Vite + React (not Next.js, not Flutter)

DMChamp is a dashboard behind a login. No public pages, no SEO, no static content. Next.js adds SSR, server components, and framework complexity that a B2B SaaS dashboard doesn't need. Vite + React is the right tool: fast builds, zero framework opinions, and Claude Code is equally strong at plain React.

| Factor | Flutter/FlutterFlow | Vite + React + shadcn |
|--------|-------------------|------------------|
| Claude Code compatibility | Decent (Dart) | Excellent (TypeScript, React) |
| Customer customizability | Poor (FlutterFlow lock-in) | Excellent (standard React, no framework magic) |
| Web performance | Poor (canvas rendering) | Excellent (native DOM, tiny bundle) |
| Component ecosystem | Limited | Massive (npm) |
| Hiring pool | Small | Enormous |
| Full-stack TypeScript | No (Dart + TypeScript) | Yes (one language) |
| Framework complexity | High (Flutter conventions) | None (just React) |
| Build speed | Slow | Instant (Vite HMR) |
| Deployment | Complex | Static files + nginx (or any CDN) |
| Mobile app | Yes (native) | PWA or Capacitor |

### Why NOT Next.js

- Everything is behind auth - no SSR needed
- No public pages - no static site generation needed
- Backend is a separate service - no API routes needed
- App Router / server components add complexity with zero benefit for a dashboard
- Self-hosting Next.js is harder than serving static files
- More framework magic = harder for customers to customize

### Mobile consideration

DMChamp currently supports iOS/Android via Flutter. Moving to Vite + React means web-only initially. Options:

1. **PWA (Progressive Web App)** - Works well for dashboard/chat apps. Push notifications via service worker. Covers 90% of mobile use cases.
2. **Capacitor** - Wrap the React SPA in a native shell. App store presence, push notifications, camera access. Used by Ionic, works well for B2B apps.
3. **React Native later** - If native app is truly needed, share TypeScript business logic. Same language, different UI layer.

**Recommendation:** Ship V2 as web-only (PWA). Most B2B SaaS users live in the browser. Add Capacitor wrapper if customers demand app store presence.

### UI architecture

```
/src
├── /routes                    # Tanstack Router (file-based routing)
│   ├── __root.tsx             # Root layout
│   ├── _auth/                 # Auth layout (unauthenticated)
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── reset-password.tsx
│   │
│   ├── _dashboard/            # Dashboard layout (authenticated, sidebar + header)
│   │   ├── index.tsx          # Dashboard overview
│   │   ├── chats/
│   │   │   ├── index.tsx      # Chat list
│   │   │   └── $contactId.tsx # Chat thread
│   │   ├── contacts/
│   │   │   ├── index.tsx      # Contact list
│   │   │   └── $contactId.tsx # Contact detail
│   │   ├── campaigns/
│   │   │   ├── index.tsx      # Campaign list
│   │   │   ├── new.tsx        # Campaign builder
│   │   │   └── $campaignId.tsx# Campaign detail
│   │   ├── phone-numbers.tsx  # Channel management
│   │   ├── templates.tsx      # WhatsApp templates
│   │   ├── analytics.tsx      # Dashboard + reports
│   │   ├── settings/
│   │   │   ├── general.tsx
│   │   │   ├── billing.tsx
│   │   │   ├── api-keys.tsx
│   │   │   ├── webhooks.tsx
│   │   │   ├── ai-config.tsx
│   │   │   ├── team.tsx
│   │   │   └── white-label.tsx
│   │   └── admin.tsx          # Agency sub-account management
│
├── /components                # Reusable UI components (shadcn/ui based)
├── /lib                       # API client, auth helpers, utils
├── /hooks                     # Custom React hooks
└── /stores                    # Client state (Zustand or Tanstack Store)
```

### Key pages to build

| Page | Complexity | Notes |
|------|-----------|-------|
| Chat inbox + thread | High | Real-time messages via Supabase Realtime, multi-channel indicators |
| Contact list + detail | Medium | Table with filters, tags, lists, custom fields |
| Campaign builder | High | Multi-step form, template selection, scheduling |
| Dashboard/analytics | Medium | Charts, metrics, date range filters |
| Settings | Low-Medium | Forms, API key management, webhook config |
| Phone numbers | Low | List + buy flow (Twilio/Telnyx API) |
| Templates | Low | CRUD + approval status display |
| Admin (agency) | Medium | Sub-account management, credit distribution |
| Billing | Low | Stripe Customer Portal embed |

---

## 8. Business Model Changes

### Current pricing

Credit-based: customers buy credits, each action (message, AI call) costs credits. Monthly recurring credits based on subscription tier.

### V2 pricing

Two revenue streams: **platform fee** + **usage**.

```
┌─────────────────────────────────────────────────────────────┐
│  STARTER ($99/mo)                                           │
│  - Managed hosting (your infrastructure)                    │
│  - 1 channel (WhatsApp OR SMS OR Instagram)                │
│  - 500 AI credits/mo                                        │
│  - 1,000 contacts                                           │
│  - Community support                                        │
│  - Standard UI (no custom code access)                      │
├─────────────────────────────────────────────────────────────┤
│  PRO ($299/mo)                                              │
│  - Everything in Starter                                    │
│  - Unlimited channels                                       │
│  - 2,000 AI credits/mo                                      │
│  - 10,000 contacts                                          │
│  - API access + webhooks                                    │
│  - Custom AI model selection (BYOK)                         │
│  - Private Git repo (code-level customization)              │
│  - Email support                                            │
├─────────────────────────────────────────────────────────────┤
│  AGENCY ($499/mo)                                           │
│  - Everything in Pro                                        │
│  - Unlimited contacts                                       │
│  - 5 sub-accounts included (more at $49/mo each)           │
│  - White-label (custom domain, branding removed)            │
│  - Priority support                                         │
│  - Custom deployment options                                │
├─────────────────────────────────────────────────────────────┤
│  SELF-HOST (free)                                           │
│  - Full source code (BSL license)                           │
│  - You handle everything (hosting, updates, support)        │
│  - No access to managed infrastructure                      │
│  - No access to WhatsApp Web proxy network                  │
│  - Community support only                                   │
│  - "Powered by DMChamp" attribution required                │
└─────────────────────────────────────────────────────────────┘

Usage add-ons:
  - Extra AI credits: $10 per 500 credits
  - Extra sub-accounts: $49/mo each
  - Extra phone numbers: Pass-through Twilio/Telnyx cost + 20% markup
```

### Why self-host free works in your favor

1. **WhatsApp Web proxy network** is the moat. Self-hosters need to set up their own BrightData proxies, manage session persistence, handle IP rotation. This is hard. Most will pay for your managed version just for this.
2. **Self-hosters become evangelists.** They tell everyone about DMChamp. Some grow and convert to paid when they don't want to maintain infrastructure anymore.
3. **BSL license** prevents anyone from competing with your hosted version. They can use it, modify it, but can't offer "DMChamp hosting" as a service.

### Licensing: Business Source License (BSL)

```
License: Business Source License 1.1
Licensed Work: DMChamp V2
Change Date: 3 years from each release
Change License: Apache 2.0

Additional Use Grant:
You may use the Licensed Work for your own internal business purposes,
including modifying and self-hosting for your own organization.

You may NOT:
- Offer the Licensed Work as a hosted service to third parties
- Sell, distribute, or sublicense the Licensed Work
- Remove "Powered by DMChamp" attribution (unless on Agency plan)
```

After 3 years, each version becomes fully Apache 2.0 open-source. This builds trust while protecting your business.

---

## 9. Build Phases (New Project, No Migration)

DMChamp V2 is a fresh build. The existing V1 codebase is a reference for business logic, not a migration source. V1 keeps running independently for existing customers.

### Phase 0: Foundation (Days 1-3)

**Goal:** Scaffold the entire project, get everything connected.

- [ ] Create new monorepo (pnpm workspaces)
- [ ] Set up Supabase project (Postgres, Auth, Realtime, Storage)
- [ ] Create PostgreSQL schema (tables, RLS policies, indexes)
- [ ] Set up Redis (Docker for local, managed for prod)
- [ ] Create API Service skeleton (Hono on Node.js)
- [ ] Create Worker Service skeleton (BullMQ)
- [ ] Set up Docker Compose for local development (Supabase + Redis + API + Worker)
- [ ] Set up CI/CD (GitHub Actions: lint, test, build, deploy)
- [ ] Connect WhatsApp Web Service (existing, Docker, just point it at new API)

**Deliverable:** `docker compose up` boots the entire stack locally. Services connect to Supabase + Redis. WhatsApp Web Service talks to new API.

### Phase 1: Core Backend (Weeks 1-3)

**Goal:** Build the core backend, using V1 code as reference for business logic.

**Week 1: Messaging + Contacts**
- [ ] Channel abstraction (WhatsApp, SMS, Instagram, Messenger) - port from V1's multi-channel handlers
- [ ] Incoming message webhook receivers (Twilio, Meta, Telnyx, WhatsApp Web)
- [ ] Outgoing message sending via BullMQ jobs
- [ ] Contact CRUD API endpoints
- [ ] Tag and list management
- [ ] Message storage + real-time via Supabase Realtime

**Week 2: Campaigns + AI**
- [ ] Campaign CRUD + scheduling
- [ ] Batch send logic (BullMQ jobs with rate limiting)
- [ ] Follow-up system (delayed BullMQ jobs, port V1's cycle logic)
- [ ] AI message handler (Claude/Gemini/OpenAI) - port from V1's aiMessageHandlerHelpers
- [ ] Tool calling system (booking, calendar, web search, human alert) - port from V1's aiAgents
- [ ] BYOK (custom AI keys with fallback) - port from V1's CustomAiKeys
- [ ] Smart FAQ loading with pgvector

**Week 3: Billing + Auth + Infrastructure**
- [ ] Supabase Auth (email/password, OAuth, API keys)
- [ ] Organization + user management (multi-tenancy via RLS)
- [ ] Sub-account creation (port V1's agency model)
- [ ] Stripe integration (subscriptions, customer portal, checkout)
- [ ] Credit system (port V1's CreditManager for Postgres)
- [ ] Auto-recharge logic
- [ ] Webhook event system (13 event types + health tracking)
- [ ] Analytics event tracking
- [ ] Cron jobs via BullMQ repeatable jobs (credit reset, token refresh, cleanup)
- [ ] Phone number management (buy/release via Twilio/Telnyx APIs)

**Deliverable:** Full working backend. All core APIs functional. Can send/receive messages, run campaigns, generate AI responses, process payments.

### Phase 2: Frontend (Weeks 3-6)

**Goal:** Build the Vite + React SPA. Can start mid-Week 3 once API endpoints exist.

**Week 3-4: Core pages**
- [ ] Scaffold Vite + React + Tanstack Router + shadcn/ui
- [ ] Auth pages (login, signup, reset password) with Supabase Auth
- [ ] Dashboard layout (sidebar + header)
- [ ] Dashboard overview (key metrics)
- [ ] Chat inbox + conversation thread (real-time via Supabase Realtime)
- [ ] Contact list (table + filters + search) + detail view (info, tags, lists, messages)

**Week 5: Campaign + channels**
- [ ] Campaign list + campaign builder (multi-step form)
- [ ] Phone number management (list + buy flow)
- [ ] WhatsApp template management (CRUD + approval status)

**Week 6: Settings + admin + polish**
- [ ] Settings pages (general, billing, API keys, webhooks, AI config, team, white-label)
- [ ] Admin/agency pages (sub-account management, credit distribution)
- [ ] Analytics dashboard (charts, date ranges, campaign performance)
- [ ] Onboarding flow (simplified)
- [ ] PWA manifest + service worker

**Deliverable:** Full React SPA. All core pages functional. Deployed as static files.

### Phase 3: Open-Core Packaging (Week 7)

**Goal:** Package for distribution and self-hosting.

- [ ] Production docker-compose.yml (Supabase + API + Worker + Redis + WhatsApp Web)
- [ ] BSL license file
- [ ] `/custom/` directory with example integrations (sample CRM integration, sample custom AI tool)
- [ ] `config/` templates (ai.config.ts, channels.config.ts, brand.config.ts)
- [ ] Self-hosting README (one-command setup: `docker compose up`)
- [ ] Per-customer Git repo system (GitHub App)
- [ ] CI/CD pipeline for customer deployments (push -> build -> deploy)
- [ ] Customer onboarding flow (sign up -> repo created -> deployed)

**Deliverable:** Anyone can `git clone` + `docker compose up` and have a running DMChamp instance.

### Phase 4: Claudify Integration (Week 8+)

**Goal:** Make DMChamp V2 the flagship project in the Claudify community.

- [ ] Document the build journey as content (YouTube + Claudify)
- [ ] Create "Customize DMChamp with Claude Code" tutorial series
- [ ] Public repo (BSL license)
- [ ] Community contributions (custom integrations, AI tools, UI components)
- [ ] Template marketplace in Claudify (members share customizations)

---

## 10. Risk Assessment

### High risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Scope creep** | High (timeline blows up) | Strict core vs. customization layer boundary. If it's not core, it doesn't go in V2 launch. |
| **WhatsApp Web Service integration** | High (revenue impact) | Service stays untouched, only API contract changes. Test thoroughly before launch. |
| **Stripe billing parity** | High (revenue) | V2 needs identical credit/subscription logic to V1. Port CreditManager carefully, test with Stripe test mode. |

### Medium risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Customers don't want code customization** | Medium | Keep a "managed" tier where you handle customization for them (professional services) |
| **Self-hosters strain support** | Medium | Community forum for self-host support, paid support for hosted customers only |
| **Merge conflicts on core updates** | Medium | Clean separation between /core/ and /custom/ directories, semver for core releases |
| **V1 customers resist re-onboarding to V2** | Medium | Offer migration assistance, keep V1 running until they're ready, incentivize with better pricing |
| **Feature gaps vs V1** | Medium | V2 launches with core only. Niche V1 features (Zenchef, Deals, etc.) are NOT in V2 - customers build them in /custom/ |

### Low risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Competitors copy the approach** | Low | First-mover advantage, community moat, WhatsApp Web proxy network as differentiator |
| **Supabase goes down/changes pricing** | Low | Self-hostable (Supabase is open-source itself), can migrate to any Postgres host |
| **BSL license legal issues** | Low | Well-established license used by MariaDB, Sentry, CockroachDB, HashiCorp |

---

## 11. Competitive Positioning

### Post-transformation landscape

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                    OPEN SOURCE                                   │
│                                                                  │
│   Chatwoot ●                              DMChamp V2 ●           │
│   (Support/Inbound)                       (Sales/Outbound)       │
│                                                                  │
│                                                                  │
│                    CLOSED SOURCE                                 │
│                                                                  │
│   Intercom ●          Respond.io ●        Close ●               │
│   Zendesk ●           WATI ●              Outreach ●            │
│   Freshdesk ●         360dialog ●                                │
│                                                                  │
│   ←─── SUPPORT ─────────────────────── SALES ───→               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**DMChamp V2's unique position:**
- Only open-core, code-customizable sales automation platform
- AI-first (not AI-added-later like Chatwoot)
- WhatsApp Web support (most competitors only support official API)
- BYOK for AI models (unique differentiator)
- Code-level customization via Claude Code (nobody else offers this)

### Chatwoot comparison (direct)

| | Chatwoot | DMChamp V2 |
|---|---|---|
| Focus | Customer support (inbound) | Sales automation (outbound) |
| AI | Basic, added recently | Core product, multi-model, tool-calling |
| Customization | Fork and modify | Fork + Claude Code + managed hosting |
| Self-host | Yes (free) | Yes (free, BSL license) |
| Hosted pricing | $19-99/agent/mo | $99-499/mo per org |
| WhatsApp | Official API only | Official API + Web (Baileys) |
| BYOK | No | Yes (already built) |
| Revenue model | Per-agent pricing | Platform fee + usage credits |

**You're not competing with Chatwoot.** You're the sales counterpart. Together you cover the full customer communication spectrum.

---

## 12. Claudify Integration

### How DMChamp V2 fits into Claudify

DMChamp V2 serves three purposes in the Claudify ecosystem:

**1. Proof of concept** - "I built a $100K ARR SaaS and transformed it into an open-core platform using Claude Code. Here's exactly how."

**2. Build-along content** - The transformation itself is content:
- Phase 1-2 (backend): "How I migrated 360 Firebase functions to 3 services"
- Phase 3 (frontend): "Rebuilding a Flutter app in React with Claude Code"
- Phase 4 (open-core): "How to package your SaaS for self-hosting"
- Ongoing: "How customers customize DMChamp with Claude Code"

**3. Template/pattern** - The architecture pattern (core + customization layer + managed hosting) is reusable. Claudify members building their own SaaS can follow the same pattern.

### Content calendar alignment

| Claudify Month | DMChamp Phase | Content |
|---------------|---------------|---------|
| Month 1-2 | Phase 0-1 (backend) | "Why I'm rebuilding my SaaS" + technical deep-dives |
| Month 3-4 | Phase 2-3 (migration + frontend) | "Firebase to Supabase migration" + "Flutter to React" |
| Month 5 | Phase 4 (open-core) | "Making my SaaS open-core" + launch content |
| Month 6+ | Phase 5 (community) | "How to customize with Claude Code" + member showcase |

---

## 13. Timeline Summary

```
PHASE 0: Foundation                    Days 1-3      (3 days)
PHASE 1: Core Backend                  Weeks 1-3     (3 weeks)
PHASE 2: Frontend                      Weeks 3-6     (4 weeks, overlaps with Phase 1)
PHASE 3: Open-Core Packaging           Week 7        (1 week)
PHASE 4: Claudify Integration          Week 8+       (ongoing)
──────────────────────────────────────────────────────
Total to V2 launch:                    ~7 weeks (~2 months)
```

**Key advantages of fresh build:**
- No migration scripts, no dual-write, no data integrity checks
- No Firestore compatibility layer
- No Flutter maintenance during transition
- V1 keeps running independently for existing customers
- Clean codebase from day 1 (no legacy debt carried over)
- Phase 1 and 2 overlap: frontend starts mid-Week 3 once API endpoints exist

**Caveats:**
- This is Claude Code-accelerated. Without AI coding, triple it.
- WhatsApp Web Service is the one carried-over piece (already Docker, minimal changes)
- Budget an extra 1-2 weeks for edge cases and surprises
- Existing V1 customers would need to re-onboard to V2 when ready (no auto-migration)

---

## 14. Decision Points (Need Your Input)

Before executing, these decisions need to be made:

### D1: Supabase Cloud vs. Self-Hosted Supabase
- **Cloud:** Faster setup, managed backups, automatic updates. $25/mo base.
- **Self-hosted:** Full control, cheaper at scale, but you manage Postgres/backups.
- **Recommendation:** Start with Cloud for speed, migrate to self-hosted when you need per-customer isolation.

### D2: Fastify vs. Hono for API Service
- **Fastify:** Mature, excellent plugin ecosystem, great TypeScript support. Heavier.
- **Hono:** Ultra-lightweight, runs everywhere (Node, Deno, Bun, Cloudflare Workers). Newer.
- **Recommendation:** Hono - lighter, faster, and if customers ever want to deploy to edge/serverless, it works everywhere.

### D3: Frontend mobile strategy
- **PWA only:** Fastest to ship, covers 90% of use cases. No app store.
- **PWA + Capacitor:** Native app shell around React SPA. Push notifications, app store presence. Minimal extra work.
- **PWA now, React Native later:** Best long-term but delays native app.
- **Recommendation:** PWA + Capacitor for V2 launch. Real native app only if customer demand justifies it.

### D4: Per-customer repos
- **GitHub App:** Create private repos in customer's GitHub org. They use GitHub's UI.
- **Self-hosted Gitea:** Run your own Git server. More control, cheaper, but another service to maintain.
- **GitLab:** Similar to GitHub but self-hostable.
- **Recommendation:** GitHub App initially (customers are already on GitHub). Gitea later if cost matters.

### D5: Customer deployment pipeline
- **Container-per-customer on shared Kubernetes:** Most flexible, medium complexity.
- **Serverless-per-customer (Vercel/Cloudflare):** Cheapest at scale, but less customization depth.
- **Docker Compose on managed VPS (Railway/Fly.io):** Simple, moderate cost.
- **Recommendation:** Docker Compose on Railway or Fly.io initially. Kubernetes when you hit 50+ customers.

### D6: What happens to the Flutter app during migration?
- **Keep it running:** Both Flutter and React available during transition.
- **Feature freeze:** No new Flutter features, all new work goes to React.
- **Hard cutover:** Pick a date and switch.
- **Recommendation:** Feature freeze on Flutter. Keep it running for existing customers. All new features React only. Hard cutover after 30-day parallel run.

### D7: Migration order - backend first or frontend first?
- **Backend first:** (Recommended) Migrate data + logic, keep Flutter frontend pointing to new backend. Then replace frontend.
- **Frontend first:** Build React SPA connected to existing Firebase backend. Then migrate backend.
- **Recommendation:** Backend first. The backend refactor was already planned. Frontend can follow.

---

## 15. What This Means for Your Time

### During build (~2 months)
- DMChamp V1 runs as-is (maintenance mode, no new features)
- Your engineering time goes to V2 build
- Claude Code does 70-80% of the implementation work
- You focus on architecture decisions, testing, and key integrations (Stripe, WhatsApp Web)

### After V2 launch
- Core maintenance: ~20% of your time (the core is much smaller than V1)
- Customer customization requests: $0 of your time (they do it themselves or via Claude Code)
- New core features: Only when it benefits ALL customers
- Claudify content: The build story IS the content

### Revenue impact
- Short-term (months 1-2): No change. V1 keeps running. Existing $100K ARR continues.
- Month 3: V2 launches for new customers. New pricing tiers. V1 customers invited to try V2.
- Month 4+: Open-core flywheel. Self-hosters -> evangelists -> hosted customers. Plus Claudify community driving awareness.
- V1 stays running as long as needed. No forced migration.

---

*This plan is a living document. It will be updated as decisions are made and implementation begins.*
