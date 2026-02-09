---
paths:
  - "systems/**"
---

# MentionedIn.ai SaaS Decisions

**Spec:** `systems/saas-mvp-spec.md` (v1.6, Decisions Log D1-D59)

## Product

SaaS for agencies to track/improve AI visibility (ChatGPT, Gemini, Google AIO).
- Domain: mentionedin.ai (domain IS the tagline: "Mentioned In AI")
- Subdomain: mentionedin.app (D37: must purchase before build)
- Brand architecture: MentionedIn.ai (SaaS) + The AEO Protocol (methodology) + Skool (community) + YouTube (personal brand)

## Tech Stack

Next.js 15 + tRPC + Supabase (PostgreSQL + Prisma) + Clerk + Stripe + Trigger.dev + Docker/VPS (Hetzner) + Caddy + Cloudflare for SaaS + Upstash Redis + Resend + Sonnet 4.5

## Critical Decisions

- **Pricing:** Per-org subscription ($49/$99/$149/$299), NOT per-client. Pro at $99 fills dead zone (D22).
- **Caps:** Consistency tests 5/25/50/200. Queries per brand 15/25/50/100. Overage billing on top (D28).
- **Monitoring:** Pulse checks (1-run per engine), NOT full 10-run tests (D41). Separate budget from consistency tests.
- **AI model:** Claude Sonnet 4.5 for all SaaS AI features. 5x cheaper than Opus.
- **Custom domains:** Caddy on_demand_tls as PRIMARY (D51). CF for SaaS as upgrade when approved. White-label IS the product.
- **Auth:** Unified middleware with discriminated union (D42). "Client share link" NOT "magic link" (D43). Auto-refresh tokens (D44).
- **Free plan:** Read-only access to existing data after trial expires (D45). trial_ends_at on Agency schema.
- **Infrastructure:** Docker Compose (app + caddy + trigger-worker) (D46). GitHub Actions CI/CD (D47).
- **Rate limiting:** Redis semaphore: OpenAI 20, Gemini 30, ScrapingBee 10 concurrent (D48).
- **Playbook:** Has tRPC routes (D49). UI = checklist grouped by action_type.
- **Overage:** Stripe metered items (D50). Modal on cap hit. 5 webhook events defined.
- **Emails:** 8 types defined (D52). nurture_step on Lead table.
- **Schema:** agency_id on ALL child tables incl. PlaybookAction + AuditQuery (D33/D53). Composite unique constraints.
- **Portal:** Dedicated tRPC routes authed via ClientViewerToken (D54).
- **Algorithm:** Symmetric weight redistribution for any missing engine (D55). brand_domain param for citations.
- **AuditRun extraction:** Single Sonnet call per response (~$0.003/run). Google SERP = pure data parsing (D56).
- **Stripe:** 1 Product, 8 Prices, 2 metered items. Checkout redirect. Webhook sig verification + event.id idempotency in Redis (D57).
- **Portal URL:** `{host}/portal?token={token}` -> cookie set -> redirect strips token. SHA-256 hash (D58).
- **Caddy ask:** `/api/caddy/ask` endpoint for on_demand_tls. Validates domain ownership (D59).
