---
name: washer
type: category
description: Specialized discovery and value model for washing machines.
applies_to: [washer, washing-machine]
---

# Washer discovery (front-load)

In IL, **front-load is the default** &mdash; top-loaders are rare and inferior on water+energy. Default to front-load unless the user has a specific reason.

## Discovery questions

1. **Capacity (kg)**:
   - 1-2 people: 6-7kg
   - 3-4 people: 8-9kg
   - 5+ or family with linens/towels often: 10-12kg
2. **Spin speed (RPM)**:
   - 1000 rpm minimum acceptable
   - 1200-1400 rpm sweet spot &mdash; laundry comes out drier, less drying time/cost
   - 1600 rpm only meaningful if line-drying; over-spin hurts delicates
3. **Energy class**:
   - A or B (new label) = best
   - C-D = acceptable budget pick
   - E+ = avoid
4. **Inverter motor**:
   - **Direct-drive / inverter** &mdash; quieter, more efficient, much longer-lived (no belt to fail).
   - **Belted / brushed** &mdash; cheaper but louder and shorter-lived. Avoid in mid-tier+.
5. **Programs that matter**:
   - Standard cotton, synthetics, delicates
   - Wool / hand-wash
   - Quick wash (~30 min)
   - Allergy / anti-bacterial (high-temp rinse)
   - Sport / outdoor (technical fabrics)
   - Steam (sanitization, wrinkle reduction) &mdash; nice if budget allows
6. **AutoDose** (auto detergent) &mdash; convenience feature; pricey to fix when broken.
7. **WiFi** &mdash; usually skip; not as useful as on AC.
8. **Door hinge side** (most are left-hinged, some convertible). Confirm against the laundry room layout.
9. **Drain placement**: standard P-trap behind machine. Confirm with the existing plumbing.
10. **Stacking / under-counter**: confirm height (most are 85cm; some "compact" are 82cm to slide under low counters).
11. **Brand preferences / brands to avoid**.
12. **Warranty preference**: official import 3-5y vs yevuan moy 1-2y.
13. **Budget**: hard cap, soft target.

## Defaults to assume

- Voltage: 220V
- Circuit: 16A (most washers; high-end with steam may need 20A)
- Width: 60cm, depth 55-65cm, height 85cm
- Drum opening: standard ~30cm diameter
- Water inlet: 3/4" cold (some accept hot for energy savings)

## Features that matter (and why)

- **Inverter motor (direct-drive)** &mdash; quieter, lasts 12-15y vs belted 7-10y, ~10% more efficient. Almost always worth +₪500.
- **Steam** &mdash; useful for sanitization (especially with allergies, baby items) and wrinkle reduction; not essential.
- **1400 rpm spin** &mdash; meaningful difference in residual moisture (so dryer time drops); 1600 only if heavy line-drying.
- **9 kg+ drum** &mdash; underrated; means fewer loads per week, less wear on the machine.
- **AutoDose** &mdash; nice when working; expensive to repair when not.
- **AddWash / pause-to-add** (Samsung) &mdash; small door to add forgotten socks mid-cycle. Real quality-of-life.
- **Anti-vibration design** &mdash; matters in apartments with noise-sensitive neighbors.

## Common Israeli pitfalls

- **LG IL service** &mdash; solid; LG washers (especially direct-drive WD series) are the most popular IL pick for a reason. 10-year motor warranty.
- **Samsung WW series** &mdash; good engineering; AddWash is genuinely useful. IL service mixed; prefer official.
- **Beko (and AEG-Beko) bearings** &mdash; sometimes fail at year 5-7 on cheaper models. OK on warranty; risky on yevuan moy.
- **Electra (IL official)** &mdash; best IL service network, mid-tier engineering. Safe choice for risk-averse buyers.
- **Bosch / Siemens** &mdash; quiet and reliable; expensive up-front but typically last 12-15 years.
- **Top-loaders in IL** &mdash; almost extinct; don't recommend unless plumbing forces it.
- **Stacking dryer**: if user plans to stack a heat-pump dryer on top, verify both units are stackable (matching brand recommended) and stand kit is available.
- **Hard water + scale**: in central/south IL, descaling cycles are useful. AutoCalc / calc-clean programs are real.

## Value model overrides

- Default lifespan: **10y official import, 7y yevuan moy** (warranty roughly = repair-economic life)
- LG direct-drive often outlives the warranty by years &mdash; conservative estimate, can extend to 12y for those models.
- Annual energy (IL rates @ ₪0.65/kWh): **₪85-145** depending on use frequency and class
- Annual water cost: ~₪50-100 for typical 4-person household; not a major factor

## Upsell triggers

- **Belted motor chosen for &lt;₪500 delta vs direct-drive**: suggest direct-drive. Frame: *"₪500 more, but you avoid the year-7 belt failure (₪800 to repair) and gain ~3 years of life."*
- **7kg chosen for 4+ household**: suggest 9kg. Frame: *"Otherwise you'll run 6 loads/week instead of 4 — the machine wears out faster, you pay more in electricity."*
- **Class D chosen for &lt;₪400 over class A/B**: suggest the upgrade. Annual savings ₪40-60 over 10 years dominates.
- **Cheap model w/o steam for allergy household**: suggest steam capability. Frame: *"Anti-allergen steam cycle is the actual reason allergists recommend hot wash."*

## Output checklist

When writing the item file, ensure:

- `category: washer`
- `constraints` includes `capacity_kg_min`, `spin_rpm_min`, `width_cm`
- `selected` has `brand`, `model`, `price_ils`, `vendor`, `product_url`, `image_url`, `warranty`, `tashlumim_available`, `link_verified_date`
- `selected.features` &mdash; 4&ndash;6 entries. For washers always cover: motor type (inverter / direct-drive), capacity, spin speed, energy class, steam (if present), and 1 standout (AutoDose / AddWash / anti-vibration). Each `detail` explains why it matters.
- `selected.reviews` with sources (each with `url`) and 2&ndash;3 specific quotes (incl. bearing or motor reliability if mentioned)
- `alternatives_considered` populated with 2&ndash;3 options, each with full structure plus specific `why_skipped` (e.g., *"Belted motor &mdash; 3y shorter expected life"*, *"7kg insufficient for 4-person family"*)
- `upsell_considered` populated if applicable
- `energy.kwh_per_year` populated
- `energy.est_annual_cost_ils`: kWh &times; 0.65
- `expected_lifespan_years`: 10 official / 7 yevuan moy (longer for premium direct-drive)
- `replacement_due` calculated
- `power_amps: 16`
