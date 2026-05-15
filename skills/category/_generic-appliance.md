---
name: generic-appliance
type: category
description: Fallback skill for any appliance not covered by a specialized skill.
applies_to: [_default_appliance]
---

# Generic appliance discovery

Use this when no specialized category skill exists for the item. The user expects you to think like a specialist anyway — so be thorough.

## Discovery questions

Ask in this order; compress when answers are obvious:

1. **Dimensions**:
   - Width / depth / height constraints?
   - Where will it sit? (built-in vs freestanding affects spec)
2. **Power**:
   - Standard 220V / 16A circuit OK, or does the spot have a dedicated higher-amp circuit?
   - Energy class preference (A, A+, A+++)?
3. **Usage**:
   - How often (daily? weekly?)
   - Household size
4. **Must-have features** — let the user list, then prompt for category-typical features they didn't mention.
5. **Deal-breakers** — anything that disqualifies a model regardless of price?
6. **Brand preference / brand to avoid** (often based on prior bad experience).
7. **Warranty preference**: official import (longer, pricier) or yevuan moy OK?
8. **Budget**:
   - Hard cap (₪)
   - Soft target (₪)
9. **Required by**?

## Defaults to assume (don't re-ask)

- Voltage: 220V
- Standard circuit: 16A unless category dictates otherwise
- Sabbath mode: assume yes if observant household; ask once at house setup
- Color: stainless steel / black for kitchen, white for laundry — confirm if other

## Apply value model

- Look up category in `skills/core/value-models.md`. If absent, estimate lifespan and energy use from category type.
- Compute annual TCO for each option.
- Energy class delta over expected lifespan often makes the higher-priced unit cheaper.

## Output

Write the item file. In `## Why we picked this`, give 2-3 short bullets focused on what beats the alternatives. In `## Alternatives considered`, list 2-3 with brief reasons.

If applicable, populate `upsell_considered` with one upgrade option that meets the upsell heuristic (see `skills/core/value-models.md`).

## When to escalate to specialized skill

If you find yourself making category-specific judgments (e.g., "this fridge needs a frost-free freezer because…"), consider whether a specialized skill should be created. Suggest to the user: "Want me to drop a `skills/category/<name>.md` with what I learned, so future research is faster?"
