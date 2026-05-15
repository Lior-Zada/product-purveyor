---
name: refrigerator
type: category
description: Specialized discovery and value model for refrigerators.
applies_to: [refrigerator, fridge]
---

# Refrigerator discovery

The fridge is usually the **largest single energy consumer in the home**. Energy class delta over a 12-year lifespan often swamps purchase price differences. Pay for efficiency.

## Discovery questions

1. **Configuration**:
   - **Top-freezer** (freezer on top) — most efficient per liter, cheapest. Tight kitchens.
   - **Bottom-freezer** — fridge at eye level, freezer drawer. Most ergonomic.
   - **Side-by-side** — fridge left, freezer right. Wider, narrow shelves; popular but less space-efficient.
   - **French door** (double fridge doors top, freezer drawer bottom) — modern premium configuration.
   - **American (4-door / Bespoke)** — large, expensive, premium.
   - For 2-person household: bottom-freezer 350-450L. Family of 4-5: French door 500-650L.
2. **Width**:
   - Standard: 60cm (top/bottom-freezer), 80-90cm (side-by-side, French door), 90-110cm (American)
   - Confirm cabinet/wall opening width
3. **Total volume L** (sum of fridge + freezer compartments):
   - 1-2 people: 280-380L
   - 3-4 people: 400-500L
   - 5+: 550L+
4. **Energy class**:
   - **A or A+** in modern IL labeling = best (post-2021 EU label rescaling)
   - B-D acceptable; E-G actively bad; avoid
   - Old-system A+++ corresponds roughly to new A/B
5. **Inverter compressor** — variable-speed; 30-50% energy savings vs traditional fixed-speed. Quieter. Should be the default for any modern purchase.
6. **No-frost (auto-defrost freezer)** — modern norm. Skip the "manual defrost" relics.
7. **Water dispenser / ice maker** — uncommon in IL because most homes lack a water line to the fridge spot. Adds installation cost (~₪500 for plumbing). Often nice-to-have, not essential.
8. **Sabbath mode** — assume yes if observant.
9. **Door alarms, child lock** — minor; usually included.
10. **Convertible / multi-zone freezer** — switches between fridge and freezer. Useful if needs change.
11. **Brand preferences / brands to avoid**.
12. **Warranty preference**: official import 3-5y vs yevuan moy 1-2y. **For fridges, prefer official import** &mdash; compressor failures in year 4-6 are catastrophic if out-of-warranty.
13. **Budget**: hard cap, soft target.

## Defaults to assume

- Voltage: 220V
- Circuit: 16A (often shared with kitchen)
- Standard depth: 60-65cm (counter-depth) or 70-75cm (standard depth)
- Height: 175-185cm typical bottom-freezer; 180-195cm side-by-side
- Operating noise: 35-40 dB acceptable; &lt;38 quieter for open-plan

## Features that matter (and why)

- **Inverter compressor** — quieter, more efficient, longer-lived. Don't buy without unless very budget-constrained.
- **Energy class A/B (new label)** — over 12 years, A vs C can be ₪1,500-3,000 in IL electricity. Worth +₪500-1,000 upfront.
- **No-frost** — non-negotiable for modern use.
- **Multi-zone fridge (humidity-controlled drawers)** — actually extends produce life if user buys fresh frequently.
- **Reversible doors** — useful for kitchens where fridge placement might shift.
- **Door-in-door (Samsung Bespoke, LG)** — quick-access compartment without opening main; great for daily snacks/drinks but add cost.
- **VarioStyle / panel-customizable** — Samsung Bespoke; aesthetic, expensive.
- **Wifi / app** — almost never useful. Skip.

## Common Israeli pitfalls

- **LG Side-by-side / French door**: popular IL choice; some series had water valve failures in hard-water areas (most of IL central + south). Worth checking model-year-specific reviews.
- **Samsung Bespoke yevuan moy**: lacks IL service network; very expensive out-of-warranty repairs. Buy official only.
- **Electra IL** — best service network, mid-tier engineering. Solid choice for risk-averse buyers.
- **Beko bottom-freezer** — value pick but compressor reliability mixed past year 6. OK on official import warranty; risky on yevuan.
- **Bosch / Siemens KGN-series** — well-engineered, good IL service via official. Expect 12-15y of trouble-free operation.
- **Liebherr** — premium German brand; very good but limited IL service network. Better as new-build choice.
- **Hard water**: ice makers and water dispensers fail faster in hard-water areas (Tel Aviv +). Filter required.
- **Loud at night**: anything &gt;42 dB will be noticeable in an open-plan kitchen at night. Check noise rating.
- **Tropical climate rating (T)**: IL summer apartments hit 35&deg;C+. Verify the fridge is rated SN-T (Subnormal to Tropical), not just SN (Subnormal).

## Value model overrides

- Default lifespan: **12y official import**, **9y yevuan moy** (compressor failures past year 6 are common on yevuan)
- Annual energy (IL rates @ ₪0.65/kWh):
  - Top-freezer 250L: ~250 kWh = ₪165
  - Bottom-freezer 400L: ~280 kWh = ₪180
  - Side-by-side 600L: ~400 kWh = ₪260
  - French door 650L: ~450 kWh = ₪290
- TCO over 12y is dominated by energy: a class-A model at +₪700 over class-C often saves ₪2,000+ in electricity over the life.

## Upsell triggers

- **Class C/D chosen for &lt;₪700 over class A/B equivalent**: suggest A/B. Frame: *"For ₪X more upfront, ₪Y less per year on electricity &mdash; pays back in 4 years and you keep paying back for 8 more."*
- **Yevuan moy chosen on a high-end model + young kids/large family**: suggest official import even at +20%. Frame: *"Compressor goes at year 5, repair cost on a 600L is ₪2,500-4,000. Official warranty covers it; yevuan doesn't."*
- **Standard-depth chosen but kitchen has a counter-depth nook**: flag the layout fit issue, not an upsell — but recommend counter-depth even at +₪500 if the kitchen is built for it.

## Output checklist

When writing the item file, ensure:

- `category: refrigerator`
- `constraints` includes `width_cm`, `volume_l_min`, `configuration` (top/bottom/side/french/american)
- `selected` has `brand`, `model`, `price_ils`, `vendor`, `product_url`, `image_url`, `warranty`, `tashlumim_available`, `link_verified_date`
- `selected.features` &mdash; 4&ndash;6 entries. For fridges always cover: configuration + volume, energy class, compressor type (inverter), no-frost, climate class (SN-T for IL), and any standout (multi-zone / door-in-door / convertible). Each `detail` explains the user-impact (energy ₪/yr saved, freshness extended, etc.).
- `selected.reviews` with sources (each with `url`) and 2&ndash;3 specific quotes (incl. compressor reliability if mentioned)
- `alternatives_considered` populated with 2&ndash;3 options, each with full structure plus *specific* `why_skipped` referencing energy class, reliability, noise, or layout
- `upsell_considered` populated &mdash; for fridges, the energy-class upsell is almost always live
- `energy.kwh_per_year` populated based on size/efficiency
- `energy.est_annual_cost_ils`: kWh &times; 0.65
- `expected_lifespan_years`: 12 official / 9 yevuan moy
- `replacement_due` calculated
- `power_amps: 16`
