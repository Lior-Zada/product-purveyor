---
name: house-setup
type: core
description: Bootstraps a new house in the workspace
---

# House setup flow

When the user says "set up a new house" / "create a house" / similar:

## 1. Discovery

Ask in this order (compress where you can):

- **Name & slug**. Friendly name (e.g., "Tel Aviv apartment") and a URL-safe slug (e.g., `tel-aviv` or `parents-haifa`). Default the slug from the name; confirm.
- **Address** (city is enough if user doesn't want full address).
- **Size** in sqm.
- **Household size** (adults + kids).
- **Move-in date** (or "already moved in" / "renovation start").
- **Electrical**: main breaker amps. Typical IL apt: 25A; new builds often 40-63A. Default 25A and flag for confirmation if user doesn't know.
- **Hard budget cap** (will not exceed under any circumstance).
- **Soft budget target** (aim for this; can flex up to ~10% on individual items).
- **Initial budget breakdown** — propose this default and let the user adjust:
  - Appliances 40%
  - Furniture 30%
  - Services (one-time) 8%
  - Buffer 22% (held back for surprises)
  - Services (recurring) — separate; ask in ILS/month, not as % of cap.

## 2. Scaffolding

Create:

- `houses/<slug>/house.md` — the metadata file (template below)
- `houses/<slug>/budget.md` — the budget file with breakdown (template below)
- `houses/<slug>/items/.gitkeep` — empty placeholder so the directory persists in git
- `houses/<slug>/services/one-time/.gitkeep`
- `houses/<slug>/services/recurring/.gitkeep`

## 3. Quick orientation

After scaffolding, tell the user:

- The viewer URL: `http://localhost:4321/<slug>/`
- Suggested first items to research, prioritized by sequence:
  - **Pre-move (must-have)**: bed, fridge, washer, oven, AC if needed, water heater
  - **First 30 days**: couch, dining, kitchen small appliances, blinds
  - **Later**: nice-to-haves
- Remind them: items can be marked `skipped` and tracked in the project.

## File templates

### house.md

```yaml
---
name: <Friendly name>
slug: <slug>
address: <address or city>
sqm: <number>
household_size: <number>
move_in_date: <YYYY-MM-DD>
electrical:
  voltage_v: 220
  main_breaker_a: <amps>
budget:
  hard_cap_ils: <cap>
  soft_target_ils: <target>
---

Notes about this house — anything that affects future research (e.g., "open-plan kitchen", "south-facing — heavy AC use", "ground floor — security relevant").
```

### budget.md

```yaml
---
hard_cap_ils: <cap>
soft_target_ils: <target>
breakdown:
  appliances:
    cap_ils: <40% of soft_target>
    spent_ils: 0
    committed_ils: 0
  furniture:
    cap_ils: <30% of soft_target>
    spent_ils: 0
    committed_ils: 0
  services_one_time:
    cap_ils: <8% of soft_target>
    spent_ils: 0
    committed_ils: 0
  services_recurring_monthly:
    cap_ils: <user-specified ILS/mo>
    committed_ils: 0
electrical_amperage_used: 0
kitchen_counter_cm_used: 0
---
```
