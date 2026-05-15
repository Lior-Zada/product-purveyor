---
name: oven
type: category
description: Specialized discovery and value model for built-in electric ovens.
applies_to: [oven, built-in-oven, electric-oven]
---

# Oven discovery (built-in electric)

## Discovery questions

1. **Built-in vs freestanding**:
   - Built-in (אינטגרלי) — fits a 60cm cabinet cutout. Almost universal in IL kitchens.
   - Freestanding/standalone — paired with stovetop, less common in modern kitchens.
2. **Width**:
   - Default: **60cm** (standard cabinet width)
   - Compact 45cm — only if the cabinet is undersized; sacrifices internal volume
   - 90cm range — only for "professional" kitchens; rare and expensive
3. **Volume L (internal)**:
   - 65-75L is the modern norm
   - <60L feels cramped for a turkey or 2 baking trays
4. **Cleaning method** — single biggest differentiator:
   - **Pyrolytic** (פירוליטי) — heats interior to ~500&deg;C, burns residue to ash. Best clean, but +25-40% energy on a clean cycle (~3 kWh) and adds ~20% to oven cost.
   - **Catalytic** — coated panels self-clean during normal cooking; partial.
   - **Steam-assist** — softens residue with steam, then wipe.
   - **Manual** — what it says. Skip if user cooks much.
5. **Convection / fan**:
   - **True/3D convection** with rear heating element — even cooking, faster, multi-rack baking.
   - **Fan-only** — circulates heat from top/bottom elements. Acceptable.
   - **No fan** — only on bottom-tier ovens; slower and uneven.
6. **Steam function**:
   - **Built-in steam (water tank)** — best for bread baking, reheating without drying.
   - **Steam-assist (small water injection)** — partial benefit.
   - **None** — fine if user doesn't bake bread/sourdough.
7. **Sabbath mode (kosher)** — assume yes if observant household.
8. **Telescopic rails** — pull racks fully out without burning your knuckles. Comes on most mid+ models.
9. **Soft-close door** — quality-of-life. Cheap to add, premium feel.
10. **Wi-Fi / Home Connect** — usually skip unless user explicitly wants remote preheating.
11. **Warranty preference**: official import 3-5y vs yevuan moy 1-2y.
12. **Budget**: hard cap, soft target.

## Defaults to assume

- Width: 60cm
- Depth: 55-57cm (standard cabinet depth)
- Height: 59-60cm
- Electrical: 220V, **16A dedicated circuit** (oven typically draws 2.5-3.5 kW peak)
- Door: drop-down (vs side-opening — uncommon)

## Features that matter (and why)

- **Pyrolytic cleaning** — saves user from scrubbing 4-6× per year. Worth +₪500-1500 if user cooks regularly. Skip for light cooks.
- **True convection (rear element + fan)** — multi-rack baking actually works; bakes 20% faster. Almost always worth it.
- **Steam (water tank)** — game-changer for bread baking. Worth +₪1000 only if user bakes regularly; otherwise no.
- **Telescopic rails on at least 1-2 levels** — quality of life. Universal in mid-tier+.
- **Quality of door seal** — affects energy efficiency and long-term door alignment. Hard to assess from specs; check reviews for "door sag" complaints.
- **Triple-glazed door** — exterior stays cool; safer with kids.
- **WiFi / Home Connect** — almost never useful in practice. Skip.

## Common Israeli pitfalls

- **Bosch HBA series** — solid mid-tier, good IL service via official import. HBG higher-end.
- **Sauter** — cheap, but door hinges/seals known to fail in year 5-7 on the lower models.
- **Siemens HB** — same chassis as Bosch (parent company); often near-identical at small price delta.
- **Electra** — official IL warranty advantage, decent service network, mid-tier engineering.
- **Yevuan moy on Bosch/Siemens** — sometimes ships without IL Sabbath mode firmware. Verify before buying if observant.
- **Pyrolytic + cabinetry**: pyrolytic cycles get the oven exterior very hot. Cabinetry must be heat-rated (most modern kitchens are; verify with kitchen designer).
- **Telescopic rails** — bottom level often skipped. Check if user wants all 3 levels.
- **Cheap "extra" features** — many sub-₪3000 ovens ship with "30+ programs." Most are gimmicks built on top of basic temp+time.

## Value model overrides

- Default lifespan: **12y official import**, **9y yevuan moy**
- Annual energy cost (IL rates @ ₪0.65/kWh): **₪60-100** for normal use
  - Pyrolytic clean cycle: ~3 kWh. Run 4-6×/yr = ~₪10-15/yr extra
- Typical model spread:
  - Entry: ₪1,500-2,500 (catalytic or manual, basic features)
  - Mid: ₪2,500-4,500 (pyrolytic, true convection, telescopic rails)
  - Premium: ₪5,000-9,000 (pyrolytic, steam, premium door, Bosch HBG / Siemens HB / Miele H-series entry)

## Upsell triggers

- **User cooks 4+ times/week + chose non-pyrolytic for &lt;₪700 delta**: suggest pyrolytic. Frame: *"You'll never scrub the oven; pays back in time saved by year 2."*
- **User bakes bread + chose non-steam**: suggest steam-assist or full steam. Frame: *"Steam-injected baking is the difference between bakery and home crust."*
- **User chose entry-tier for daily-cook household**: suggest mid-tier with true convection. Frame: *"Multi-rack baking actually works; entry models pretend with fan-only."*

## Output checklist

When writing the item file, ensure:

- `category: oven`
- `constraints` includes `width_cm`, `volume_l`, `cleaning_method`, `convection_type`
- `selected` has `brand`, `model`, `price_ils`, `vendor`, `product_url`, `image_url`, `warranty`, `tashlumim_available`, `link_verified_date`
- `selected.features` &mdash; 4&ndash;6 entries. For ovens always cover: cleaning method (pyrolytic / catalytic / steam-assist), convection type, steam capability, telescopic rails, sabbath mode, door type. Each `detail` explains why it matters in cooking outcomes.
- `selected.reviews` with sources (each with `url`) and 2&ndash;3 specific quotes (incl. door durability if mentioned)
- `alternatives_considered` populated with 2&ndash;3 options, each with full review/image structure plus specific `why_skipped` (e.g., *"Catalytic only, requires manual scrubbing"*, *"No true convection &mdash; fan-only"*)
- `upsell_considered` if applicable
- `energy.kwh_per_year`: 90&ndash;150 for normal use; bump if pyrolytic + frequent
- `energy.est_annual_cost_ils`: kWh &times; 0.65
- `expected_lifespan_years`: 12 official / 9 yevuan moy
- `replacement_due` calculated
- `power_amps: 16`
