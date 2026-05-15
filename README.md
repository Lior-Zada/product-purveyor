# Product Purveyor

A local-first, AI-native home procurement workspace. Set up a new home — or run a major renovation — without becoming a full-time researcher.

You bring an AI agent (Claude Code recommended). Product Purveyor is the workspace it operates on: opinionated skills that teach the agent what to ask, what to look for, and how to value a purchase over its full lifespan — not just sticker price.

## What it does

- **One project, one budget.** Track every appliance, piece of furniture, and service for a home as part of a single project — not 30 disconnected purchases.
- **TCO-aware research.** The agent reasons in total cost of ownership: purchase + energy + repair + replacement.
- **Markdown all the way down.** Every decision lives in a markdown file. Git-versioned. Edit by hand or by AI.
- **No backend, no API keys, no SaaS.** Clone the repo, point your AI agent at it, run the viewer.

## Quick start

```bash
git clone https://github.com/Lior-Zada/product-purveyor.git
cd product-purveyor
npm install         # or: pnpm install
npm run dev         # or: pnpm dev — viewer at http://localhost:4321
```

In a separate terminal in the same directory, open Claude Code:

```bash
claude
```

Then ask:

> Set up a new house called "Tel Aviv apartment".

The agent will run discovery, scaffold the house files under `houses/<slug>/`, and you can start researching items.

## Researching an item

```
> Research a dishwasher for the Tel Aviv apartment.
```

The agent will:

1. Grill you on dimensions, must-haves, deal-breakers, budget.
2. Search the local market (per the installed market skill — `skills/market/il.md` ships bundled).
3. Apply the TCO value model for that category (`skills/core/value-models.md` + any category override).
4. Write a draft card to `houses/<house>/items/<slug>.md` with top picks + an upsell candidate if worth it.
5. Notify you. You review in the viewer at `http://localhost:4321/<house>/`, pick one, the agent records the decision and updates `budget.md`.

## Three item types

| Type | Folder | Examples |
|---|---|---|
| **Buy** (one-time goods) | `houses/<house>/items/` | Oven, dishwasher, couch, bed |
| **Book** (one-time services) | `houses/<house>/services/one-time/` | Move-in cleaning, electrician install, inspection |
| **Subscribe** (recurring services) | `houses/<house>/services/recurring/` | Bi-weekly cleaning, lawn care |

## Project structure

```
.
├── CLAUDE.md           # The agent's persona and workflow — read every session
├── SPEC.md             # Product spec
├── skills/             # Pluggable knowledge (categories, markets, value models)
│   ├── category/       # What to ask about each product type
│   ├── market/         # How to search a regional market (IL bundled)
│   └── core/           # TCO formulas, glossary, house-setup flow
├── houses/             # Your projects (one folder per house)
│   └── <house>/
│       ├── house.md       # House metadata
│       ├── budget.md      # Budget caps + current spend
│       ├── items/         # Buy items
│       └── services/      # Book + Subscribe services
└── src/                # The viewer (Astro)
```

## The bundled example

`houses/example/` ships with one decided dishwasher item so the viewer has something to render the first time you run it. Browse it at <http://localhost:4321/example/>. Delete the directory when you're ready to start your own.

## Customizing

### Use a different region

The bundled market skill is for Israel (`skills/market/il.md`). To use elsewhere, drop a new file `skills/market/<your-country>.md` modeled on the IL one — list your local price comparators, retailers, electrical specs, and market quirks. The category skills are universal — they describe products, not markets.

### Add a category skill

Drop a new file in `skills/category/` (e.g., `coffee-machine.md`). Use `_generic-appliance.md` as the template. The agent will load it whenever you ask about that category.

### Use a different AI agent

The agent integration is plain markdown — `CLAUDE.md` (read automatically by Claude Code) plus the `skills/` directory. For other agents (Codex, Gemini CLI, etc.), point your tool at `CLAUDE.md` as a system prompt or context file.

## Why this exists

Existing IL price-compare tools (Zap, Ksp, Bug) are SKU-centric: you arrive knowing what you want and they show you who sells it cheapest. They don't help you decide, they don't think about energy costs over a 12-year fridge lifespan, and they don't track your whole project as one budget. This tool fills that gap.

## License

MIT — see [LICENSE](LICENSE).
