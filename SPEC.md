# Home Procurement Workspace — Product Spec v1

## What it is

An open-source, local-first **home procurement workspace** for people setting up a new home, renovating, or making major purchasing decisions across appliances, furniture, and services.

The user clones the repo, opens it in their AI agent of choice (Claude Code primary), and works with the agent to research, decide, and track every purchase as part of a single project — with a real-time budget, a project view in a browser, and persistent decision rationale.

Not a SaaS. Not a SKU comparison site. A project workspace where the AI is the procurement officer and the markdown files are the project plan.

## Core principles

1. **Project, not purchases.** A home setup is one project with one budget and a dependency graph, not 30 atomic shopping trips.
2. **TCO over sticker.** Every value judgment is over total cost of ownership: purchase + energy + repair + replacement. Each category has its own value formula.
3. **Local-first, AI-native.** All data is markdown files in the user's repo. The AI lives outside the app (Claude Code, Codex, etc.) and operates on the same files the viewer renders.
4. **Opinionated, not exhaustive.** The agent recommends a pick; it doesn't dump comparison tables. It explains uncommon terms inline, but tersely.
5. **No backend, no API keys, no SaaS.** Users bring their own AI subscription. The app is a viewer.
6. **Pluggable skills.** Category knowledge, market knowledge, and value models are all skill files the agent reads.

## Personas

- **Primary**: A homeowner setting up a new home or doing a major renovation, who wants thorough research without becoming a full-time researcher. Tech-comfortable enough to clone a repo and run a dev server.
- **Secondary**: Same person 5 years later, replacing a broken appliance — looks back at their decision journal, re-runs research with updated criteria.

## User flow

### First-time setup
1. Clone repo. `pnpm install && pnpm dev` — viewer at `http://localhost:4321`.
2. Open Claude Code in the project directory.
3. Tell the agent: *"Set up a new house called 'Tel Aviv apartment'."* Agent runs the `house-setup` flow: asks address, sqm, household size, electrical specs, hard budget cap, soft target, move-in date.
4. Agent writes `houses/tel-aviv/house.md` and `houses/tel-aviv/budget.md`.

### Researching an item (the dishwasher example)
1. User: *"Research a dishwasher for the Tel Aviv apartment."*
2. Agent loads `skills/category/dishwasher.md` + `skills/market/il.md` + `skills/core/value-models.md`. Discovers needs interactively (sync mode):
   - Width? (default 60cm — flag if user says 45cm)
   - Place settings? (asks household size, recommends 9 / 13 / 14)
   - Must-haves? (e.g., quiet < 45dB, half-load, third tray)
   - Deal-breakers? (e.g., no plastic interior)
   - Hard cap and soft target?
   - Yevuan moy OK or only official import? *(Inline glossary: yevuan moy = parallel import, cheaper but warranty is from a local importer, not the manufacturer.)*
3. Agent confirms profile, switches to async: writes a draft card to `houses/tel-aviv/items/kitchen-dishwasher.md` with `status: researching`. Agent goes off to search.
4. When draft ready, agent notifies user. User reviews top 3 picks + upsell candidate in the viewer, asks follow-ups in chat, picks one. Agent updates `status: decided` and recomputes `budget.md`.

### Browsing the project
- Open the viewer at localhost. See house overview, budget pie, item cards grouped by type, sequencing timeline, "decided not to buy" list, upcoming replacement reminders.

## Architecture

```
+----------------------------+         +----------------------------+
|  Claude Code (or other)    |  read   |  Local web viewer (Astro)  |
|  - Reads CLAUDE.md         |  /write |  - Renders markdown        |
|  - Loads skills as needed  | <-----> |  - Cards, budget, timeline |
|  - Edits markdown files    |         |  - Hot reload on file save |
+----------------------------+         +----------------------------+
              |                                       |
              +------- shared filesystem -------------+
                              |
                  +-----------v-----------+
                  |  houses/<name>/...    |  (markdown + frontmatter)
                  |  skills/...           |
                  |  CLAUDE.md            |
                  +-----------------------+
```

No server. No DB. No auth. The viewer is a local dev server. The agent is whatever the user runs in their terminal.

## Tech stack (defaults — flag if you want different)

- **Viewer**: **Astro** — static site, native markdown rendering, fast, hot-reloads on file change. Best fit for "render markdown" with no DB.
- **Markdown parsing**: `gray-matter` (frontmatter) + `remark` (rendering).
- **Charts**: `recharts` (budget pie, energy bar). Lightweight, React-compatible.
- **Package manager**: `pnpm`.
- **Node**: 20+.
- **Lint/format**: `biome` (single tool, fast).
- **License**: MIT.

## Data model

### Directory layout

```
home-products/
├── CLAUDE.md                          # agent persona + workflow
├── README.md                          # how to install and run
├── SPEC.md                            # this file
├── package.json
├── astro.config.mjs
├── src/                               # Astro site
│   ├── pages/
│   │   ├── index.astro                # all houses
│   │   └── [house]/
│   │       ├── index.astro            # house overview + budget
│   │       ├── items/[item].astro     # item card detail
│   │       └── timeline.astro
│   └── components/
│       ├── ItemCard.astro
│       ├── BudgetPie.astro
│       └── ...
├── skills/
│   ├── core/
│   │   ├── value-models.md            # TCO formulas per category
│   │   ├── glossary-il.md             # IL home-buying jargon definitions
│   │   └── house-setup.md             # bootstraps a new house
│   ├── market/
│   │   └── il.md                      # Zap, Ksp, Bug, Yad2, tashlumim, hashmal specs
│   └── category/
│       ├── _generic-appliance.md      # fallback for any appliance
│       ├── _generic-furniture.md      # fallback for furniture
│       ├── _generic-service.md        # fallback for services
│       ├── oven.md                    # specialized
│       ├── dishwasher.md              # specialized
│       ├── refrigerator.md            # specialized
│       ├── washer.md                  # specialized
│       └── ac.md                      # specialized
└── houses/
    └── tel-aviv/
        ├── house.md
        ├── budget.md
        ├── timeline.md
        ├── decided-not-to-buy.md
        ├── items/
        │   ├── kitchen-oven.md
        │   ├── kitchen-dishwasher.md
        │   └── living-couch.md
        └── services/
            ├── one-time/
            │   └── move-in-cleaning.md
            └── recurring/
                └── biweekly-cleaning.md
```

### Item file schema — Buy (one-time goods)

```markdown
---
type: buy
status: drafting | researching | ready-for-review | decided | skipped
category: dishwasher
title: Kitchen dishwasher
priority: must-have | nice-to-have | luxury
sequence: pre-move | first-30-days | later
required_by: 2026-08-01
constraints:
  width_cm: 45
  place_settings_min: 9
  noise_db_max: 45
  must_have: [third-tray]
  deal_breakers: [plastic-interior]
budget:
  hard_cap_ils: 4500
  soft_target_ils: 3500
options_considered: 5
selected:
  brand: Bosch
  model: SPS6ZMI35E
  price_ils: 3890
  vendor: Bug
  vendor_url: https://...
  warranty: official-import-3y
  tashlumim_available: 36
decision_date: 2026-05-20
energy:
  kwh_per_year: 220
  est_annual_cost_ils: 145
expected_lifespan_years: 12
replacement_due: 2038-05-20
upsell_considered:
  - brand: Miele
    model: G 5050 SCVi Active
    price_ils: 6800
    why_skipped: 50% over budget; 20y lifespan doesn't justify in this kitchen
power_amps: 10
---

## Why we picked this
- Lowest noise in 45cm class (42dB) — important because open-plan kitchen
- Crystal-glass cycle covers our wine glass collection
- +400 ILS over the cheaper Beko but expected 12y vs 6y lifespan = better TCO

## Alternatives considered
- Beko BDIN16431 — 3450 ILS, but 48dB and known for pump failures at year 5
- Miele G 5050 — see upsell_considered above
- Electra ESL45 — 2900 ILS, IL warranty advantage but 12 place settings won't fit in 45cm well
```

### Item file schema — Book (one-time service)

```markdown
---
type: book
status: drafting | researching | ready-for-review | booked | completed
service: move-in-cleaning
title: Move-in deep clean
date_needed: 2026-07-25
budget:
  hard_cap_ils: 1200
selected:
  provider: SuperClean Tel Aviv
  price_ils: 950
  contact: ...
  notes: 4 cleaners x 5 hours, includes inside-cabinet
---
```

### Item file schema — Subscribe (recurring service)

```markdown
---
type: subscribe
status: drafting | researching | ready-for-review | active | cancelled
service: biweekly-cleaning
cadence: every-2-weeks
budget:
  monthly_ils: 800
  annual_ils: 9600
selected:
  provider: ...
  monthly_ils: 800
  start_date: 2026-08-15
  cancellation_terms: 30-day notice
---
```

### budget.md schema

```markdown
---
hard_cap_ils: 80000
soft_target_ils: 65000
breakdown:
  appliances:
    cap_ils: 35000
    spent_ils: 12340       # decided + paid
    committed_ils: 8900    # decided, not yet paid
  furniture:
    cap_ils: 25000
    spent_ils: 0
    committed_ils: 0
  services_one_time:
    cap_ils: 5000
    spent_ils: 0
  services_recurring_monthly:
    cap_ils: 1500
    committed_ils: 800
electrical_amperage_used: 47       # rolled up from items
kitchen_counter_cm_used: 180       # rolled up from items
---
```

The viewer reads these files at request time, computes deltas vs caps, renders.

## Skill system

A skill is a markdown file the agent reads when relevant. The agent decides what to load based on the task. CLAUDE.md tells it where to look.

### Skill types for v1

**Category skills** (`skills/category/`)
- `_generic-appliance.md` — fallback for any appliance (asks dimensions, watts, features, brand pref, warranty, energy class)
- `_generic-furniture.md` — fallback for furniture (dimensions, materials, longevity, comfort, return policy)
- `_generic-service.md` — fallback for services (vetting, price benchmarks, contract terms)
- Specialized: `oven.md`, `dishwasher.md`, `refrigerator.md`, `washer.md`, `ac.md`. These override the generic with category-specific questions, default dimensions, must-ask features, value model, common Israeli model gotchas.

**Market skills** (`skills/market/`)
- `il.md` — Israeli market: searching Zap/Ksp/Bug/Yad2; Yevuan moy vs official; tashlumim handling; חג / Black Friday timing; Israeli electrical specs (220V, 16A); haranha (installation) cost ranges; importer-vs-manufacturer service network differences. Reuses / borrows from the agentskills.co.il Israeli price comparator skill.

**Core skills** (`skills/core/`)
- `value-models.md` — TCO formulas. For each category: `(purchase + lifespan_years × annual_energy_cost + expected_repair_cost) / (lifespan_years × usage_intensity_factor)`. Lookup table for typical lifespans and energy use per category.
- `glossary-il.md` — One-line definitions of Israeli home jargon (yevuan moy, tashlumim, hashmal, haranha, haavarat lakuach…). Agent quotes from this when terms appear.
- `house-setup.md` — Bootstraps a new house: questions, file scaffolding, sets up `budget.md`.

### Skill file format (template)

```markdown
---
name: dishwasher
type: category
applies_to: [dishwasher]
---

# Discovery questions
1. Width (default 60cm, flag if 45cm)
2. Place settings — ask household size, recommend: 9 (1-2 ppl), 13 (3-4), 14 (5+)
3. Noise tolerance — open-plan kitchen?
4. ...

# Defaults to assume (don't re-ask)
- depth_cm: 60
- height_cm: 82-85
- electrical: 220V 10A
- water inlet: standard 3/4"

# Features that matter (and why)
- Noise level (dB) — critical for open-plan kitchens
- Third tray — significantly more capacity for utensils
- ...

# Common Israeli pitfalls
- Beko 4xx series has known pump failures around year 5
- Bosch yevuan moy 3y warranty vs official 5y — quantify the price delta
- ...

# Value model override
- Default lifespan: 10y official import, 7y yevuan moy
- Default annual energy cost (IL rates): 130-220 ILS
- ...

# Upsell triggers
- If user has open-plan kitchen and selected model is >45dB, suggest quieter model up to 25% over cap
- If household size 5+ and selected is 9-place, suggest 13-place even at +30%
```

## The agent — content for `CLAUDE.md`

```markdown
# Home Procurement Agent

You are the user's personal procurement advisor for their home setup. Think: a know-it-all salesman who genuinely puts the user first. You know the products, you know the market, you know the pitfalls — and you use that knowledge to get them the best quality item for the lowest price within their budget.

## Mission

For every item the user wants to buy, book, or subscribe to:
1. Discover their needs (use the relevant category skill)
2. Apply the value model (use core/value-models.md and any category override)
3. Search the market (use the relevant market skill)
4. Recommend a top pick with rationale, plus 2 alternatives
5. Flag a worthwhile upgrade if it's slightly above budget and meaningfully better
6. Write the decision to the item file
7. Update budget.md

## Behavior rules

- **Be opinionated.** Recommend one. Don't list six and abdicate. The user wants a decision-maker, not a search engine.
- **Speak like a human, not a comparison table.** Short, direct, confident.
- **Inline glossary.** When you use a term that a non-expert might not know (yevuan moy, hard water, COP, IPx ratings…), define in one short sentence. Don't make the user ask.
- **Stay terse.** No walls of text. Long explanations go in the item file's prose section, not the chat. Find the sweet spot — enough to inform, never enough to bury.
- **Upsell with restraint.** Only flag an upgrade if it's <30% over the soft target AND the value-model says lifespan/energy/quality justifies it. Always one-line justification. Never push.
- **TCO, not sticker.** Reason in total cost of ownership. State assumed lifespan and energy cost.
- **Israeli context first.** Default to IL market, IL electrical, Hebrew vendor names, ILS prices. Flag yevuan moy vs official import for every appliance.
- **Single source of truth: the markdown files.** Every decision, rationale, and number lives in the file. The chat is for thinking out loud — the file is the deliverable.
- **Hybrid research flow.** Discovery is sync (~5 min of grilling). Research is async (you go work, user comes back). Update file status as you go: drafting → researching → ready-for-review → decided.
- **Update budget.md after every committed decision.** Recompute breakdown sums, electrical amperage, counter space.

## Workflow on "Research an X"

1. Identify house from context.
2. Load `skills/category/<x>.md` if present, else `_generic-appliance.md` (or furniture/service).
3. Load `skills/market/il.md` and `skills/core/value-models.md`.
4. Run discovery questions interactively. Confirm constraint profile.
5. Write item file with `status: researching`.
6. Search per market skill. Apply value model. Pick top 3 + upsell candidate.
7. Update item file: `status: ready-for-review` with options + rationale.
8. Notify user. On confirmation, update `status: decided`. Update budget.md.

## Workflow on "Set up a new house"

Run `skills/core/house-setup.md`.

## Files you should never touch

- The viewer source (src/, package.json, etc.) unless the user explicitly asks for app changes.
```

## Web viewer — what it shows

### Home page (`/`)
- List of houses. Click in.

### House page (`/<house>`)
- Header: house name, address, sqm, household size, hard cap, soft target, move-in date.
- **Budget panel**: pie chart of categories, hard-cap progress bar (green/amber/red), per-category caps and committed.
- **Power & space panel**: amperage used vs available, kitchen counter cm used.
- **Item grid**: cards grouped by type (Appliances, Furniture, One-time Services, Recurring Services). Each card shows status badge, picked product, price, vendor link, brief rationale (first line).
- **"Decided not to buy"** collapsible section.
- **Timeline tab**: items sorted by sequence (pre-move / first-30-days / later) and required_by.

### Item page (`/<house>/items/<item>`)
- Full card: status, constraints, selected option, alternatives considered, decision rationale, upsell-considered, energy + TCO, expected lifespan, replacement reminder, vendor link.
- "Edit via Claude Code" hint with the file path.
- "Refresh price" button: writes a marker the agent picks up to re-check current price.

## What v1 explicitly does NOT include

- Multi-user / shared decisions with a partner (deferred to v2)
- Embedded chat / API integration (never — external AI by design)
- Project skills (kitchen-renovation workflows, etc.) — design is ready but skip for v1
- Notifications outside the agent's tool capabilities
- Auto-buying / cart integrations
- Mobile-first responsive (desktop-first; mobile usable but not optimized)
- Hosted SaaS

## v2 candidates

- Partner mode: per-item votes / vetoes / "agreed to defer"
- Project skills (renovation workflows that sequence sub-projects)
- Auto re-research when "decided" item's price drops >X%
- ICS export for service appointments and replacement reminders
- More market skills (US, EU, UK)
- Used-market integration (Yad2, Facebook Marketplace) as a first-class option in cards
- Receipt + warranty doc storage attached to items

## Open questions (revisit after v1 use)

1. How heavy do specialized category skills need to be? Does `dishwasher.md` actually need to know specific Bosch model gotchas, or is that overfitting? Learn from real use.
2. Is the upsell rule (<30%, lifespan-justified) right? Tune from feedback.
3. Does a user actually want the timeline view, or is it noise?

## Build order

1. Repo skeleton: `package.json`, Astro config, `pnpm dev` works at localhost
2. `CLAUDE.md` + `skills/` with: house-setup, generic-appliance, dishwasher, market/il, value-models, glossary-il
3. Data scaffolding: `houses/example/` with one example item file (so viewer has something to render)
4. Viewer: home page, house page, item page (read-only first)
5. Budget panel + power/space panel
6. Add 4 more category skills (oven, fridge, washer, AC)
7. Generic-furniture and generic-service skills
8. Polish: timeline view, decided-not-to-buy, refresh button
