# CritiqAI Architecture and Folder Structure

This document describes the architecture that is implemented in this repository. It is intended as a working reference for contributors who need to understand where a concern belongs, how data moves through the system, and which runtime owns each responsibility.

## 1. System overview

CritiqAI is a pnpm/Turborepo monorepo for auditing websites. A user-facing Next.js application creates an analysis request, a background worker performs browser-based and AI-assisted checks, PostgreSQL persists both progress and results, and the web application streams persisted changes back to the browser.

```text
Browser
  |
  | Next.js pages, React components, NextAuth session
  v
apps/web (Next.js, port 3000)
  |                 |                         ^
  | Prisma          | BullMQ enqueue           | Server-Sent Events, 1.5 s polling
  v                 v                         |
PostgreSQL      Redis / BullMQ  <---  apps/worker writes status and results
                    |
                    v
              apps/worker
              Playwright + Lighthouse + axe + Cheerio + OpenAI
```

The analysis record is the integration boundary between the web runtime and the worker runtime: the web app creates it and reads it; the worker advances its status and populates its reports; the stream endpoint exposes selected fields to the browser.

## 2. Architectural style and boundaries

### Monorepo boundary

The root `pnpm-workspace.yaml` includes `apps/*` and `packages/*`. Turborepo orchestrates builds, development processes, linting, type checks, and Prisma tasks. Workspace imports use the `@repo/*` namespace.

| Area | Owns | Must not own |
| --- | --- | --- |
| `apps/web` | HTTP/UI boundary, authentication, dashboard pages, request initiation, live result presentation | Long-running audits or browser automation |
| `apps/worker` | Long-running analysis pipeline and result persistence | Page rendering or session/UI behavior |
| `packages/database` | Prisma schema, migrations, generated client, shared database connection | Web-specific query presentation |
| `packages/queue` | Queue names, job contracts, BullMQ factories, retries and worker wrapper | Audit implementation |
| `packages/ui` | Reusable presentational primitives | Product-specific page composition or data fetching |
| `packages/constants`, `packages/utils` | Cross-cutting values and small pure/client utilities | Application workflows |

This separation keeps slow and resource-heavy work out of the request/response lifecycle. Both the web app and worker import the same database and job contracts, reducing drift in record and queue use.

### Runtime boundary

There are two server-side Node.js processes that should be deployed and scaled independently:

1. **Web process** — runs Next.js, serves the App Router pages/API routes, authenticates users, writes initial database records, enqueues jobs, and holds SSE connections.
2. **Worker process** — consumes the `analysis` BullMQ queue and launches Chromium/Playwright, Lighthouse, axe, Cheerio, and the OpenAI client.

PostgreSQL and Redis are required shared infrastructure. `docker-compose.yml` currently provisions PostgreSQL only; Redis must be provided separately via `REDIS_URL`.

## 3. Repository map

```text
CritiqAI/
├── apps/
│   ├── web/                         # Primary product: Next.js 16 App Router
│   │   ├── app/                     # Routes, layouts, API route handlers
│   │   ├── components/              # Web-only page and layout composition
│   │   ├── lib/                     # Auth, actions, DB access, validation helpers
│   │   ├── assets/fonts/            # Local font declarations and files
│   │   ├── proxy.ts                 # Adds x-pathname request header
│   │   └── next.config.js
│   ├── worker/                      # Dedicated asynchronous analysis runtime
│   │   └── src/workers/             # Individual analysis stages
│   └── docs/                        # Separate, minimal Next.js documentation site
├── packages/
│   ├── database/                    # Prisma schema, migrations, client
│   ├── queue/                       # BullMQ queue contract and factories
│   ├── ui/                          # Shared React UI primitives
│   ├── constants/                   # Shared numeric, page, and layout constants
│   ├── utils/                       # `cn`, cookies, scrolling helpers
│   ├── tailwind-config/             # Shared global Tailwind stylesheet
│   ├── typescript-config/           # Shared TypeScript base configs
│   └── eslint-config/               # Shared ESLint configs
├── docker-compose.yml               # Local PostgreSQL service
├── package.json                     # Workspace-level scripts and tool versions
├── pnpm-workspace.yaml              # pnpm workspace membership
└── turbo.json                       # Task graph and cache/environment settings
```

## 4. `apps/web`: web application architecture

`apps/web` is the public HTTP boundary. It uses Next.js App Router and React 19. Route files stay thin; product UI is generally composed under `components/pages`, and server-facing code lives under `lib`.

### 4.1 App Router structure

```text
apps/web/app/
├── layout.tsx                       # Root document, fonts, SessionProvider, site header/footer
├── globals.css                      # Application-wide CSS and Tailwind imports
├── page.tsx                         # Marketing home route: /
├── features/page.tsx                # Feature route: /features
├── auth/
│   ├── (forms)/layout.tsx           # Shared login/register form layout
│   ├── (forms)/login/page.tsx       # /auth/login
│   ├── (forms)/register/page.tsx    # /auth/register
│   └── verify-email-sent/page.tsx   # /auth/verify-email-sent
├── dashboard/
│   ├── layout.tsx                   # Dashboard shell: sidebar, header, mobile nav
│   ├── overview/page.tsx            # /dashboard/overview
│   └── analyses/
│       ├── page.tsx                 # /dashboard/analyses
│       └── [id]/page.tsx            # /dashboard/analyses/:id
└── api/
    ├── auth/[...nextauth]/route.ts  # NextAuth catch-all handler
    ├── auth/verify-email/route.ts   # Email verification route
    └── stream/[id]/route.ts         # Live analysis SSE endpoint
```

Route groups such as `auth/(forms)` organize files without adding a URL segment. The root layout currently renders the marketing `Header` and `Footer` around every route, while `dashboard/layout.tsx` adds the dashboard navigation shell for dashboard routes.

### 4.2 Component organization

```text
apps/web/components/
├── common/                          # Site-wide Header, Footer, and profile controls
├── layouts/dashboard/               # Sidebar, desktop header, mobile navigation, layout utilities
├── pages/
│   ├── home/                        # Hero, feature cards, analytics, CTA, preview
│   ├── features/                    # Feature-page sections and data helpers
│   ├── auth/                        # Login/register/social/verification components
│   └── dashboard/
│       ├── overview/                # Dashboard overview
│       └── analyses/                # List and detailed analysis result screen
├── providers/client/                # Client-side providers (including session context)
└── shared/                          # Product-level reusable cards and score badges
```

Use `packages/ui` for primitives that can be used by more than one app, and `apps/web/components` for components tied to CritiqAI’s routes, copy, domain data, or layout. The detailed analysis screen is intentionally decomposed into independently reusable display sections (`scores`, `issues`, `quick-wins`, `performance-metrics`, `ai-feedback`, `screenshot`, and `steps`).

### 4.3 Web `lib` responsibilities

```text
apps/web/lib/
├── actions/                         # Use-case entry points, e.g. startAnalysis
├── auth/                            # NextAuth configuration, email and helper functions
├── db/                              # Focused Prisma data-access helpers for User and Analysis
├── ai/                              # Prototype/reference AI analyzer files
├── accessibility/, lighthouse/, scraper/
│                                     # Browser/audit utilities currently present in web
└── utils/                           # URL validation, score normalization, in-memory limiter
```

`startAnalysis` is the central use case: it creates an `Analysis` record through `lib/db/analysis.ts`, enqueues an `analysis` job through `@repo/queue`, and returns the analysis ID plus an SSE URL. Any new UI that starts an audit should call this use case (or an API/server action that delegates to it) instead of creating queue jobs directly.

### 4.4 Authentication

Authentication is configured in `lib/auth/config.ts` using NextAuth with PrismaAdapter:

- OAuth: Google and GitHub providers.
- Credentials: email/password validated with Zod and compared using bcrypt.
- Session strategy: JWT, with `user.id` copied from the JWT into the session.
- Credentials login requires `emailVerified`; OAuth account linking marks the user verified.
- NextAuth HTTP handling is exposed through `app/api/auth/[...nextauth]/route.ts`.

`proxy.ts` currently only injects `x-pathname` into request headers. Its commented-out middleware shows an earlier route-protection design, but authentication enforcement is not active there. Dashboard access control must therefore be verified at each sensitive server-side entry point before relying on it as a protected route.

### 4.5 Live updates

`app/api/stream/[id]/route.ts` implements server-sent events (SSE). For a given analysis ID, it polls PostgreSQL every 1.5 seconds, compares a snapshot to the previous one, and emits only changed data:

| SSE event | Meaning |
| --- | --- |
| `progress` | The persisted `Analysis.status` changed or was initially read |
| `screenshot` | A screenshot path became available |
| `lighthouse` | Lighthouse report changed |
| `accessibility` | Accessibility issue data changed |
| `seo` | SEO issue data changed |
| `ai_feedback` | AI suggestion data changed |
| `complete` | Status transitioned to `COMPLETED`; stream closes shortly afterward |

The analysis detail client (`components/pages/dashboard/analyses/id/stream-client.tsx`) opens an `EventSource`, maps events to its local presentation model, and closes on completion or unmount.

## 5. Analysis workflow

### 5.1 Request lifecycle

```text
1. UI invokes startAnalysis({ url, userId })
2. Web creates Analysis(status=PENDING) in PostgreSQL
3. Web adds { url, userId, analysisId } to BullMQ queue "analysis"
4. Worker claims job; queue wrapper sets status=SCRAPING
5. Playwright scrape saves screenshot, HTML, assets and performance entries; status=ANALYZING
6. Lighthouse calculates category scores and baseline issue lists
7. axe runs WCAG/best-practice accessibility checks
8. Cheerio parses stored HTML for SEO checks
9. OpenAI generates UX/performance suggestions
10. Worker writes final aggregate data and status=COMPLETED
11. SSE endpoint observes database changes and pushes them to the result page
```

Each stage writes to the same `Analysis` record. This enables progress recovery after page reloads and lets the web process remain stateless apart from its database connections.

### 5.2 Queue contract and reliability

`packages/queue/src/jobs.ts` defines `AnalysisJobData`:

```ts
{ url: string; userId?: string; analysisId?: string }
```

The queue name is the constant `analysis`. `enqueueAnalysis` adds jobs with three attempts by default. The generic worker wrapper marks the related analysis as `FAILED` if its processor throws. The worker’s queue concurrency defaults to `3` and is configurable with `WORKER_CONCURRENCY`.

Redis is configured through `REDIS_URL`, defaulting to `redis://localhost:6379` in the queue package. Queue producers and consumers must point to the same Redis instance.

### 5.3 Worker stages

| Module | Technology | Output written to `Analysis` |
| --- | --- | --- |
| `playwright.worker.ts` | Playwright/Chromium | Full-page PNG path, HTML, stylesheet/script lists, browser performance entries |
| `lighthouse.worker.ts` | Chrome Launcher + Lighthouse | Performance, SEO, accessibility, and best-practice (UX) scores; report; selected audit issues |
| `axe.worker.ts` | Playwright + injected axe-core | Detailed WCAG/best-practice violations |
| `seo.worker.ts` | Cheerio | Title, description, heading, image, Open Graph, JSON-LD, and link findings |
| `ai-analyzer.worker.ts` | OpenAI chat completions | UX feedback, redesign suggestions, and placeholder arrays for quick wins/bottlenecks |

The worker pipeline is sequential. This is appropriate because later stages rely on data from earlier stages, especially SEO and AI analysis reading data saved by the scraper/Lighthouse. If stages become independent, they can be split into child jobs, but then finalization and failure handling must coordinate multiple job outcomes.

## 6. Data architecture

### 6.1 Database package

`packages/database` owns the PostgreSQL/Prisma boundary:

- `prisma/schema.prisma`: canonical models and enum definitions.
- `prisma/migrations/`: versioned database migrations.
- `src/client.ts`: singleton Prisma client configured with `@prisma/adapter-pg` and `DATABASE_URL`.
- `src/index.ts`: exports the client and generated Prisma types.

Callers should import `prisma` from `@repo/db`, not create local `PrismaClient` instances. The singleton prevents excess connections during Next.js development reloads.

### 6.2 Core data model

```text
User 1 ─── * Analysis
User 1 ─── * Account       (NextAuth OAuth accounts)
User 1 ─── * Session       (NextAuth sessions)
VerificationToken          (email verification token)
VerificationRateLimit      (email verification resend throttling)
```

`Analysis` is the domain aggregate for a website audit. Its key fields are:

| Field group | Fields | Purpose |
| --- | --- | --- |
| Identity/ownership | `id`, `userId`, `url` | Identifies the audit and its owner |
| Lifecycle | `status`, `createdAt`, `completedAt` | Tracks the workflow state and timing |
| Scores | `perfScore`, `seoScore`, `a11yScore`, `uxScore` | Stores normalized 0–100 category scores |
| Detailed artifacts | `lighthouseReport`, `accessibilityIssues`, `seoIssues`, `aiSuggestions` | JSON payloads produced by stages |
| Visual artifact | `screenshotUrl` | Current implementation stores a worker-local screenshot path |

Valid statuses are `PENDING`, `SCRAPING`, `ANALYZING`, `AI_PROCESSING`, `COMPLETED`, and `FAILED`. The implementation currently sets `PENDING`, `SCRAPING`, `ANALYZING`, `COMPLETED`, and `FAILED`; `AI_PROCESSING` is available in the schema but is not currently assigned by the worker.

## 7. Shared packages

### `packages/ui`

Exports common React primitives through subpath imports, for example `@repo/ui/button`. Current components include buttons, inputs, badges, cards, labels, code blocks, tabs, skeletons, and section headers. Each component lives in its own folder with an `index.tsx`; component-specific types stay nearby.

### `packages/constants`

Holds cross-app values such as numeric verification-delay settings and layout/page constants. Use this package when a value has domain meaning and will be shared, rather than duplicating magic numbers in an app.

### `packages/utils`

Contains generic helpers such as Tailwind class merging (`cn`), cookie access, and scroll-to-target behavior. Keep it free of database, authentication, and CritiqAI domain rules.

### Tooling packages

- `packages/typescript-config`: base, Next.js, and React-library TypeScript configuration presets.
- `packages/eslint-config`: shared base, React-internal, and Next.js lint configurations.
- `packages/tailwind-config`: shared Tailwind global CSS layer.

## 8. Configuration and environment

Turborepo declares the following environment values as task inputs: `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, OAuth client credentials, email settings, `OPENAI_API_KEY`, `PLAYWRIGHT_TIMEOUT`, and `REDIS_URL`.

| Variable | Consumer | Required purpose |
| --- | --- | --- |
| `DATABASE_URL` | web, worker, database package | PostgreSQL connection string |
| `REDIS_URL` | queue producer and worker | Shared BullMQ Redis connection |
| `AUTH_SECRET` / NextAuth secret | web | Session/JWT security; keep naming consistent with deployed NextAuth configuration |
| `NEXTAUTH_URL` | web | Canonical application URL for NextAuth |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | web | Google OAuth |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | web | GitHub OAuth |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM` | web | Verification email delivery |
| `OPENAI_API_KEY` | worker | AI analysis calls |
| `PLAYWRIGHT_TIMEOUT` | worker | Browser navigation timeout (defaults to 30 seconds) |
| `WORKER_CONCURRENCY` | worker | Concurrent BullMQ job processing (defaults to 3) |

Do not commit secrets. Keep local environment files outside source control and configure the same shared values for both web and worker deployments.

## 9. Development and build graph

At the root, `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm check-types` dispatch to all relevant workspace packages through Turborepo. The `dev` task depends on database client generation (`^db:generate`), while builds respect dependent workspace builds (`^build`).

Useful commands:

```bash
pnpm dev                              # Start development tasks across the monorepo
pnpm --filter=web dev                 # Start only the Next.js web app
pnpm --filter=worker dev              # Compile the worker in watch mode
pnpm --filter=@repo/db db:generate    # Generate the Prisma client
pnpm --filter=@repo/db db:migrate     # Create/apply development migration
pnpm --filter=@repo/db db:deploy      # Apply committed migrations in deployment
pnpm build                            # Build all packages/apps in dependency order
pnpm lint
pnpm check-types
```

For a usable local end-to-end stack, start PostgreSQL (the supplied Compose file), start Redis, apply/generate Prisma artifacts, then run both web and worker processes. Chromium dependencies required by Playwright/Lighthouse must also be available in the worker environment.

## 10. Extension guide

### Add a page or route

1. Create a route file under `apps/web/app` using App Router conventions.
2. Compose its product-specific UI under `apps/web/components/pages/<feature>`.
3. Put generic reusable controls in `packages/ui` only if another app can reasonably use them.
4. Add server-side access checks before returning user-owned data or performing mutations.

### Add an analysis stage

1. Implement the stage under `apps/worker/src/workers`.
2. Define its typed input/output next to the worker.
3. Decide which stable fields or JSON shape it persists on `Analysis`; add a migration if schema changes are needed.
4. Invoke it from `apps/worker/src/index.ts` in a deliberate order.
5. Emit a meaningful lifecycle status before long work if the UI needs stage-level progress.
6. Extend the SSE snapshot/event mapping and result UI when the new data should be live-visible.

### Add persisted data

1. Update `packages/database/prisma/schema.prisma`.
2. Create and commit a Prisma migration.
3. Regenerate the Prisma client.
4. Add narrow helpers under `apps/web/lib/db` rather than spreading raw queries across pages/components.
5. Update worker writes, stream serialization, and UI types as appropriate.

## 11. Current implementation notes

These are important boundaries to preserve or improve as the product matures:

- **Authorization is not enforced in the SSE route.** `GET /api/stream/:id` currently fetches an analysis solely by ID. Before production, authenticate the request and ensure `analysis.userId` matches the session user.
- **Analysis initiation is not exposed by the checked-in UI.** `startAnalysis` exists as a server-side use case, but the current pages/results contain mock data and no visible integrated submission flow. Wire the action through a protected server action or API route with URL validation and ownership checks.
- **Some result UI is still mock-backed.** `stream-client.tsx` starts from `mockAnalysis` and only maps selected live fields. Define a shared DTO that exactly matches persisted `Analysis` data to remove type casts and placeholders.
- **Status granularity is incomplete.** `AI_PROCESSING` exists but is not assigned. Set it immediately before the OpenAI stage if the UI should distinguish AI work from earlier analysis.
- **Screenshot paths are local filesystem paths.** The worker stores paths like `screenshots/<id>.png`. In multi-instance/container deployments, upload screenshots to object storage and persist a browser-accessible, signed or public URL instead.
- **Accessibility audit relies on a CDN script.** The axe worker injects axe-core from cdnjs at runtime; production deployments need outbound network access and should consider bundling/pinning the injected asset for reliability.
- **The supplied Compose stack lacks Redis and worker services.** Add them, or provision managed equivalents, for a one-command local/production stack.
- **URL validation alone does not mitigate SSRF.** Browser workers navigate to user-provided URLs. Add DNS/IP allow/deny rules, redirect validation, private-network blocking, and resource limits before exposing audits publicly.

## 12. Recommended ownership rules

Keep the architecture predictable by following these rules:

1. Never run Playwright, Lighthouse, axe, or OpenAI calls in a Next.js request handler; enqueue a job.
2. Treat PostgreSQL as the source of truth for analysis lifecycle and results; Redis is transport, not durable business state.
3. Keep queue job payloads small and serializable—pass IDs and URLs, not reports or browser data.
4. Keep framework-specific concerns in apps and reusable, framework-light code in packages.
5. Enforce user ownership at every read/write boundary, including route handlers, server actions, and streaming endpoints.
6. Make worker stages idempotent where possible, because queue retries can run the same job more than once.
7. Evolve JSON report fields through typed DTOs or schema validation when they become a stable client contract.
