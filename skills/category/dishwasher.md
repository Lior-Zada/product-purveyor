---
name: dishwasher
type: category
description: Specialized discovery and value model for dishwashers.
applies_to: [dishwasher]
---

# Dishwasher discovery

## Discovery questions

1. **Width**:
   - Default: **60cm** (standard built-in slot)
   - Slim: **45cm** — flag this; user usually has a tight kitchen. Limits to ~9-10 place settings.
   - Compact (countertop): rare; ask only if user mentions limited space.
2. **Built-in vs freestanding**:
   - Built-in (אינטגרלי / Integrated): needs a kitchen panel
   - Semi-integrated: panel on top, controls visible
   - Freestanding: full panel, sits anywhere with water + drain access
3. **Place settings**:
   - 1-2 people: 9 place settings is enough
   - 3-4 people: 13 (60cm) or 10 (45cm)
   - 5+: 14+ (60cm)
4. **Noise tolerance**:
   - Open-plan kitchen / studio: aim for ≤44dB. Above 48dB will be noticed during dinner.
   - Closed kitchen: ≤48dB acceptable.
5. **Critical features** — ask which matter:
   - **Third tray** (top cutlery drawer) — significantly more capacity, almost always worth it
   - **Half-load** option — saves water/energy when running partial
   - **Quick wash** (~30 min) — useful for daily cycles
   - **Auto / sensor wash** — adapts to load soil level
   - **Crystal/glass cycle** — gentle for delicate glassware
   - **Wifi** — usually skip unless user wants it
6. **Deal-breakers**:
   - Plastic interior (steel lasts 2-3× longer)
   - No third tray (if user wants one)
7. **Warranty**: official import 3y vs yevuan moy 1y — material price delta. Default: ask preference.
8. **Budget**: hard cap, soft target.

## Defaults to assume

- Depth: 60cm
- Height: 82-85cm (adjustable feet)
- Electrical: 220V, 10A
- Water inlet: standard 3/4" cold (some support hot inlet for energy savings)
- Water consumption: 9-12L per cycle (modern)

## Features that matter (and why)

- **Noise (dB)**: Each 3dB drop is roughly half the perceived loudness. 48 → 42dB is a meaningful upgrade in open-plan layouts. Quietest current models reach 39-41dB.
- **Energy class**: A vs C over 10 years can be ₪500-1500 in IL energy costs. Worth +₪300-500 upfront for high-use households.
- **Third tray**: Adds ~30% utensil capacity; replaces the cutlery basket on lower rack.
- **Steel interior**: Lasts 15-20y vs ~7-10y for plastic. Almost always worth the upgrade.
- **Adjustable upper rack**: Critical if you wash large pots or tall wine glasses.

## Common Israeli pitfalls

- **Bosch SMS/SMI/SMV**: SMS = freestanding, SMI = semi-integrated, SMV = fully integrated. Make sure the model matches the kitchen plan.
- **Beko 4xx series**: known for pump failures around year 5-6. Avoid for long-term TCO.
- **Yevuan moy on Bosch/Siemens**: usually 1-2y warranty vs official 3y. Quantify: ₪400-700 in additional repair-risk-adjusted cost over 10y.
- **Sabbath mode**: standard on most IL-imported. Confirm if household observant.
- **45cm slimline models**: mostly Bosch SPS/SPV, Beko DSS, Siemens SR. Smaller pool of options; expect to pay 10-20% more per liter of capacity vs 60cm.

## Value model overrides

- Default lifespan: **10y official import**, **7y yevuan moy** (warranty often = practical longevity proxy due to repair cost economics).
- Annual energy cost (IL rates @ ₪0.65/kWh): **₪130-180** depending on energy class and use frequency.
- Annual water cost: small (~₪50-100); not worth modeling separately unless dramatic differences.

Annual TCO formula:

```
annual_TCO = (price + (lifespan × 145) + repair_buffer) / lifespan
```

where `repair_buffer` is 0 for official import in warranty period, ₪400-800 for yevuan moy beyond year 1.

## Upsell triggers (specific to dishwashers)

- **Open-plan kitchen + sub-45dB model exists in budget+25%**: suggest. Frame: *"For ₪X more, you go from clearly audible during dinner to background hum."*
- **5+ household + only 9-place chosen**: suggest 13-place even at +30% if width allows. Frame: *"Otherwise you'll run it twice a day."*
- **Plastic interior chosen over steel for <₪400 delta**: suggest steel. Frame: *"Steel is 2-3× the lifespan; pays for itself by year 6."*

## Output checklist

When writing the item file, ensure:

- `category: dishwasher`
- `constraints` includes `width_cm` and `place_settings_min`
- `selected` has `brand`, `model`, `price_ils`, `vendor`, `product_url`, `image_url`, `warranty`, `tashlumim_available`
- `selected.reviews` with `average_score`, `total_reviews`, ≥2 `sources`, 2&ndash;3 `quotes` (mix sentiment — at least one negative if any exists)
- `alternatives_considered` populated with 2&ndash;3 options, each with the same review/image structure plus `why_skipped` (one specific sentence — not generic)
- `upsell_considered` populated if a candidate exists, with same structure
- `energy.kwh_per_year` and `energy.est_annual_cost_ils` populated
- `expected_lifespan_years` populated (use defaults above unless evidence suggests otherwise)
- `replacement_due` calculated as `decision_date + lifespan_years`
- `power_amps: 10`
