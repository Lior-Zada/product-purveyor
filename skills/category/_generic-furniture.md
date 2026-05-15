---
name: generic-furniture
type: category
description: Fallback skill for any piece of furniture (couch, bed, dining table, dresser, etc.).
applies_to: [_default_furniture, couch, sofa, bed, mattress, dining-table, table, chair, dresser, wardrobe, desk, bookshelf]
---

# Generic furniture discovery

Furniture is a different category than appliances:

- **Energy use is zero.** TCO = purchase + replacement frequency.
- **Comfort and longevity dominate value.** A couch you sit in daily for 12 years justifies more than one you sit in occasionally for 4.
- **Materials matter more than brands.** A "good" couch from an unknown maker can outlast a famous brand if the construction is right.
- **Try in-person before buying** &mdash; especially couches and beds. Online-only purchases of large furniture are higher risk.

## Discovery questions

1. **Type / use case**:
   - Couch: how many people sit at once? Daily TV / occasional? Pet-friendly fabric needed? Pull-out for guests?
   - Bed: who sleeps on it? Side-sleeper, back-sleeper? Allergies? Partner-disturbance issues?
   - Dining: number of seats, daily use, kid-friendly?
   - Storage: how much, what kind of items?
2. **Dimensions** &mdash; measure the room and the doorway/staircase the piece will arrive through. **Critical for couches and beds** &mdash; many "won't fit" disasters happen at the door.
3. **Materials**:
   - **Couch frame**: solid hardwood (oak, beech) lasts 20+ yrs; engineered wood/MDF lasts 8-12.
   - **Couch upholstery**: leather (durable, ages well, expensive) vs fabric (more options, replaceable covers if removable).
   - **Couch cushions**: foam density (high &gt; medium &gt; soft); down-wrap for premium feel.
   - **Mattress**: pocket spring + memory foam hybrid is the modern norm; pure latex / pure foam are alternatives.
   - **Wood furniture**: solid wood vs veneer vs laminate &mdash; price tracks construction.
4. **Style / aesthetic** &mdash; user preference; don't optimize over.
5. **Color preferences and constraints** (e.g., needs to match existing pieces).
6. **Budget**: hard cap, soft target.
7. **Required by date**: many pieces have 4-12 week lead times for IL custom orders.
8. **Used market acceptable?** &mdash; especially for couches, dining tables, dressers; Yad2 has ~50% near-new at 30-50% the price.

## Defaults to assume

- IL doorway minimum: 80cm. Couches &gt;80cm wide need disassembly or balcony lift (extra cost).
- Standard couch depth: 90-100cm; deep-seat 105-115cm.
- Standard bed sizes (IL): single 90×190, narrow double 120×190, double 140×190, queen 160×200, king 180×200, super-king 200×200.
- Dining table seating: 60cm linear width per person; 30-40cm depth per person if 2-sided.

## Features that matter (and why)

### Couches
- **Hardwood frame** &mdash; the difference between 20y and 8y. Verify with the seller; reputable sellers state it.
- **Removable + replaceable covers** &mdash; massively extends life. Easy to refresh after kids/pets/spills.
- **Pocket springs in seat base** &mdash; firmer support, longer life than serpentine springs.
- **Modular configuration** &mdash; reconfigurable for moves; resalable.

### Beds / mattresses
- **Pocket spring + memory foam hybrid** &mdash; current sweet spot for most sleepers.
- **Edge support** &mdash; firmer rail; matters for sit-on-edge use and partner roll.
- **Cooling tech** &mdash; in IL summers, gel-infused or breathable construction matters.
- **Adjustable base** &mdash; for back issues, snoring, reading; nice but pricey.
- **Trial period** &mdash; reputable IL mattress sellers offer 60-100 night returns.

### Dining tables
- **Solid wood top vs veneer** &mdash; longevity. Solid hardwood scratches but refinishes.
- **Extension capability** &mdash; for hosting; check the leaf storage and mechanism.
- **Stable base for kids** &mdash; pedestal vs four-leg; pedestal often more stable for daily family use.

### Storage (dressers, wardrobes, bookshelves)
- **Drawer slides**: full-extension soft-close &gt;&gt; metal undermount &gt;&gt; basic.
- **Solid wood vs MDF** &mdash; MDF is fine for non-load-bearing pieces; solid wood for anything heavily used.

## Common Israeli pitfalls

- **IKEA Hemnes / similar lines** &mdash; great value for short-term setup; longevity 5-8y for daily-use pieces. Consider as transitional, not lifetime.
- **Custom IL workshops** &mdash; often great quality, often slow (8-16 weeks). Get references and see prior work in person.
- **"Italian designer" couches** at mall stores &mdash; sometimes ARE Italian; sometimes are local-with-Italian-fabric. Verify.
- **Mattress in a box** &mdash; growing IL category; quality varies wildly. Read full IL reviews specifically (international rankings don't translate due to climate differences).
- **Delivery & assembly costs** &mdash; many IL furniture sellers quote excluding both. Always confirm. Big-piece delivery + assembly is ₪200-800 typically.
- **Yad2 used couches** &mdash; viable but verify pet/smoking history (smell-impossible-to-remove); inspect frame for wobble.
- **Holiday shipping delays** &mdash; חג, Pesach, Sukkot all delay deliveries; plan accordingly.

## Value model overrides

- **Lifespan estimates**:
  - Couch (mid-tier): 10-15y; (high-tier hardwood): 20+y; (IKEA-tier): 5-8y
  - Mattress: 8-10y (after that, hygiene + support degrade)
  - Bed frame: 15-25y (solid wood); 8-12y (engineered)
  - Dining table: 10-20y (solid); 5-10y (engineered)
  - Dressers / wardrobes: 10-25y depending on construction
- **TCO**: purchase / lifespan_years. Energy is zero; repair cost is occasional reupholstery (couches: ₪2-4k mid-life if removable covers don't exist).

## Upsell triggers

- **Engineered-wood couch frame chosen for daily-use household + &lt;₪1,500 delta vs hardwood**: suggest hardwood. Frame: *"₪1,500 more, 15+ years instead of 8."*
- **Non-removable-cover fabric couch + young kids/pets**: suggest removable-cover or leather. Frame: *"You'll thank yourself the first time the cushions go in the wash."*
- **Pure foam mattress chosen by side-sleeper**: suggest pocket-spring hybrid. Frame: *"Foam alone doesn't support the shoulder/hip joints; you'll wake stiffer."*
- **MDF dresser chosen for daily-use bedroom**: suggest at least solid hardwood frame even if drawer faces are MDF. *"Drawer slides on MDF case fail by year 5."*

## Output checklist

When writing the item file, ensure:

- `category` matches the item type (couch, bed, dining-table, etc.)
- `constraints` includes dimensions and any seating/sleeping capacity needs
- `selected` has `brand` (or `provider` for custom maker), `model` (or item name), `price_ils`, `vendor`, `product_url`, `image_url`, `warranty` (if any), `tashlumim_available`, `link_verified_date`
- `selected.features` &mdash; 4&ndash;6 entries. For furniture cover: frame material + construction, upholstery / surface material, key joints / mechanisms, distinctive comfort or use feature, and any standout (removable covers, full-extension slides, etc.). Each `detail` ties the feature to longevity or daily use.
- `selected.reviews` &mdash; aggregate where possible from Zap, IL design blogs, Yad2 (used market signals). Don't fabricate; if minimal reviews exist, note that.
- `alternatives_considered` &mdash; include at least one used-market option (Yad2) when applicable and one different style/material direction
- `upsell_considered` if applicable
- **No `energy` block** (furniture is zero-energy)
- `expected_lifespan_years` populated based on construction
- `replacement_due` calculated
- **Skip `power_amps`** (no electricity)
