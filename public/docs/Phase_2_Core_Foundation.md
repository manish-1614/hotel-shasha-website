# Phase 2 — Core Foundation

> **Status:** Pending — to be started after Phase 1 issues are resolved.
>
> This document is a reference roadmap for Phase 2. It wires up the real backend behind the Phase 1 frontend: database persistence, email dispatch, analytics, and observability.

---

## Overview

Phase 1 left intentional stubs in the contact API route (`console.log` instead of DB write, no emails). Phase 2 connects the real infrastructure:

- **NeonDB + Drizzle ORM** for persistent enquiry storage
- **Resend** for transactional emails (host notification + guest confirmation)
- **PostHog** for behavioural analytics and funnel tracking
- **Sentry** for error monitoring, session replay, and Slack alerts
- **Pino + Axiom** for structured server-side logging

```
Guest Browser ──form submit──▶ /api/contact ──insert──▶ NeonDB
                                    │──send emails──▶ Resend
                                    │──structured logs──▶ Axiom
                                    │──exceptions──▶ Sentry
Browser ──events──▶ PostHog Cloud
Browser ──errors──▶ Sentry
Sentry / Axiom ──alerts──▶ Slack
```

---

## External Accounts Required

Before implementation, create accounts on these services (all have free tiers sufficient for Shasha's scale):

| Service | Purpose | What you need |
|---------|---------|---------------|
| **NeonDB** (neon.tech) | Serverless PostgreSQL | Create a project, get `DATABASE_URL` |
| **Resend** (resend.com) | Transactional email | Sign up, verify `shashajibhi.com` domain, get API key |
| **PostHog** (posthog.com) | Analytics & funnels | Create cloud project, get project API key + host URL |
| **Sentry** (sentry.io) | Error monitoring | Create Next.js project, get DSN |
| **Axiom** (axiom.co) | Log aggregation | Create dataset `shasha-production`, get API token |
| **Slack** | Alert channels | Create incoming webhook URLs for `#shasha-production` and `#shasha-bookings` |

---

## 1. Database Layer (NeonDB + Drizzle ORM)

### New dependencies

`drizzle-orm`, `@neondatabase/serverless`, `drizzle-kit` (dev), `dotenv` (dev for scripts)

### New files

- **`src/db/schema.ts`** — Drizzle schema defining `enquiries` and `rooms` tables with enums (`room_type_enum`, `meal_plan_enum`, `source_enum`, `enquiry_status_enum`). Type exports: `Enquiry`, `NewEnquiry`, `Room`. Full DDL reference: `public/docs/Shasha_DB_Schema_v1.txt` Section 5.
- **`src/db/index.ts`** — Drizzle client using `@neondatabase/serverless` HTTP driver (optimal for Vercel — no persistent connections). Reads `DATABASE_URL` from env.
- **`drizzle.config.ts`** — Drizzle Kit config pointing at `src/db/schema.ts`, migrations output to `./drizzle/`.
- **`src/db/seed.ts`** — Seed script populating rooms table with the 4 room types from `src/data/rooms.ts`.

### Modified files

- **`src/app/api/contact/route.ts`** — Replace `console.log` with `db.insert(enquiries)`. Compute `estimatedRevenue` and `ipHash` (SHA-256 of `x-forwarded-for`).
- **`package.json`** — Add `db:generate`, `db:push`, `db:studio`, `db:seed` scripts.

### Migration workflow

```bash
pnpm drizzle-kit generate  # generates SQL migration files
pnpm drizzle-kit push      # applies to NeonDB
pnpm db:seed               # seeds rooms + rate data
```

---

## 2. Email Dispatch (Resend + react-email)

### New dependencies

`resend`, `@react-email/components`

### New files

- **`src/lib/email.ts`** — Resend client + `sendHostNotification()` and `sendGuestConfirmation()`. Errors are caught, logged, and reported to Sentry — email failure does not fail the form submission.
- **`src/emails/HostNotification.tsx`** — React Email template for host alert: guest details table, stay summary, estimated revenue, click-to-call phone, referral source. Follows API Spec Section 4.1.
- **`src/emails/GuestConfirmation.tsx`** — React Email template for guest acknowledgement: stay summary, host phone numbers, Instagram, WhatsApp deep link. Follows API Spec Section 4.2.

### Modified files

- **`src/app/api/contact/route.ts`** — After validation, call both email functions via `Promise.allSettled()` (non-blocking, non-fatal).

---

## 3. PostHog Analytics

### New dependencies

`posthog-js`

### New files

- **`src/lib/analytics.ts`** — `initAnalytics()` with `capture_pageview: false`, `maskAllInputs: true`. Type-safe `track()` wrapper using the event taxonomy from SysArch Addendum Section 4.2.
- **`src/components/providers/AnalyticsProvider.tsx`** — Client component that inits PostHog on mount and captures `page_view` on route changes.

### Modified files

- **`src/app/layout.tsx`** — Wrap children with `<AnalyticsProvider>`.
- **`src/components/contact/MultiStepForm.tsx`** — Add `track()` calls: `form_step_started`, `form_step_completed`, `form_submitted`.
- **`src/components/home/RoomsPreview.tsx`** — Add `track('room_card_clicked', { room_type, source_page: 'home' })`.

---

## 4. Sentry Error Monitoring

### New dependencies

`@sentry/nextjs`

### New files

- **`src/instrumentation.ts`** — `register()` that imports Sentry config for `nodejs` or `edge` runtime.
- **`sentry.client.config.ts`** — Client-side init (DSN, replay with `maskAllInputs`, tracing sample rate).
- **`sentry.server.config.ts`** — Server-side init.
- **`sentry.edge.config.ts`** — Edge runtime init.
- **`src/app/global-error.tsx`** — Root error boundary that reports to Sentry.

### Modified files

- **`next.config.ts`** — Wrap with `withSentryConfig()` for source map upload and release tracking.

---

## 5. Structured Logging (Pino + Axiom)

### New dependencies

`pino`, `@axiomhq/pino` (production), `pino-pretty` (dev)

### New files

- **`src/lib/logger.ts`** — Pino logger: Axiom transport in production, `pino-pretty` in dev. Base fields: `env`, `service`, `version`.
- **`src/lib/slack.ts`** — `notifySlack(channel, message)` helper for Slack Block Kit messages. Channels: `production`, `bookings`, `ops`.

### Modified files

- **`src/app/api/contact/route.ts`** — Replace `console.log` with structured logger calls.
- **`src/app/api/health/route.ts`** — Add DB connectivity check (`SELECT 1`).

---

## 6. Environment & Config

### New files

- **`.env.example`** — All required environment variables:
  - `DATABASE_URL` (NeonDB)
  - `RESEND_API_KEY`, `RESEND_HOST_EMAIL`
  - `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`
  - `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`
  - `AXIOM_TOKEN`, `AXIOM_DATASET`
  - `SLACK_WEBHOOK_PRODUCTION`, `SLACK_WEBHOOK_BOOKINGS`, `SLACK_WEBHOOK_OPS`

### Modified files

- **`.gitignore`** — Ensure `.env.local`, `.env`, `drizzle/`, `.sentryclirc` are ignored.

---

## Full File Change Summary

| File | Action |
|------|--------|
| `src/db/schema.ts` | **New** — Drizzle schema (enquiries, rooms) |
| `src/db/index.ts` | **New** — DB client |
| `src/db/seed.ts` | **New** — Seed script |
| `drizzle.config.ts` | **New** — Drizzle Kit config |
| `src/lib/email.ts` | **New** — Resend client + send functions |
| `src/emails/HostNotification.tsx` | **New** — Host email template |
| `src/emails/GuestConfirmation.tsx` | **New** — Guest email template |
| `src/lib/analytics.ts` | **New** — PostHog init + track() |
| `src/components/providers/AnalyticsProvider.tsx` | **New** — Analytics provider |
| `src/instrumentation.ts` | **New** — Sentry registration |
| `sentry.client.config.ts` | **New** — Sentry client config |
| `sentry.server.config.ts` | **New** — Sentry server config |
| `sentry.edge.config.ts` | **New** — Sentry edge config |
| `src/app/global-error.tsx` | **New** — Root error boundary |
| `src/lib/logger.ts` | **New** — Pino structured logger |
| `src/lib/slack.ts` | **New** — Slack webhook helper |
| `.env.example` | **New** — Env var documentation |
| `src/app/api/contact/route.ts` | **Modified** — DB write + emails + logging |
| `src/app/api/health/route.ts` | **Modified** — DB health check |
| `src/app/layout.tsx` | **Modified** — Add AnalyticsProvider |
| `src/components/contact/MultiStepForm.tsx` | **Modified** — Add track() calls |
| `src/components/home/RoomsPreview.tsx` | **Modified** — Add track() call |
| `next.config.ts` | **Modified** — Sentry wrapper |
| `package.json` | **Modified** — New deps + db scripts |
| `.gitignore` | **Modified** — New ignore patterns |

---

*Reference: This document was generated from the Phase 2 Core Foundation plan. For the full PRD, see `public/docs/Shasha_PRD_v2.txt`.*
