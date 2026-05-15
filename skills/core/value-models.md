---
name: value-models
type: core
description: TCO formulas and category defaults for valuing a purchase over its lifespan
---

# Total cost of ownership (TCO)

The base TCO formula for any purchase:

```
TCO = purchase_price
    + (lifespan_years × annual_energy_cost)
    + expected_repair_cost
    - resale_value
```

Annualized cost (for ranking comparable items at different price points and lifespans):

```
annual_TCO = TCO / lifespan_years
```

Use the **annual TCO** to compare across price tiers. The cheaper item often loses on energy or longevity.

## Category defaults

Use these as starting points; category skills may override.

| Category | Typical lifespan (official / yevuan moy) | Annual energy (kWh) | IL energy cost @ ₪0.65/kWh | Notes |
|---|---|---|---|---|
| Dishwasher | 10y / 7y | 200-280 | ₪130-180 | Energy class A-C significant |
| Refrigerator | 12y / 9y | 250-450 | ₪160-290 | Often the largest energy consumer |
| Oven (electric) | 12y / 9y | 90-150 | ₪60-100 | Pyrolytic clean = +30% on clean cycle |
| Washer | 10y / 7y | 130-220 | ₪85-145 | Front-loaders use less water/energy |
| Dryer (heat-pump) | 12y / 9y | 170-260 | ₪110-170 | 2-3× more efficient than condenser |
| Dryer (condenser) | 10y / 7y | 380-550 | ₪250-360 | Avoid in IL — electricity is expensive |
| AC (split, inverter) | 12y / 9y | 800-1500/unit | ₪520-980 | COP rating matters most |
| Kettle | 5y | 30-50 | ₪20-32 | Energy delta tiny — durability dominates |
| Microwave | 8y | 40-60 | ₪26-40 | Cheap to own; ignore TCO |
| Coffee machine (auto) | 6-8y | 60-90 | ₪40-60 | Descaling + repair cost matters |
| Couch | 10-15y | 0 | 0 | TCO = purchase + reupholster cost |
| Bed (mattress) | 8-10y | 0 | 0 | Quality affects sleep — bias up on quality |

## Value lens by category type

- **High-energy appliances** (fridge, AC, dryer): TCO dominated by energy. Pay more for higher efficiency class. A → A+++ delta over 12y often justifies +30% upfront.
- **Mid-energy appliances** (oven, washer, dishwasher): Energy matters but durability + features split the decision. Use full TCO.
- **Low-energy / use-rarely** (kettle, microwave, toaster): Durability and convenience dominate. Buy quality once.
- **Furniture**: TCO is purchase + replacement frequency. Comfort and longevity matter more than energy.
- **Services (recurring)**: Annualize. ₪800/mo cleaning = ₪9,600/year. Compare against the value of your time.

## Upsell heuristic

Recommend an upgrade above the user's soft target only when ALL of these hold:

1. Less than 30% over the soft target.
2. The annualized TCO is lower OR within 10% of the in-budget pick.
3. There's a concrete benefit beyond features (e.g., 50% longer lifespan, half the noise, half the energy, materially better warranty).

Frame the upsell as one line: *"For ₪X more (₪Y/year over its life), you get [benefit]."*

If the upgrade is over budget but the user's situation makes it dominant (e.g., open-plan kitchen + loud dishwasher), state that explicitly. Never just push price.

## Repair-risk adjustment

For yevuan moy items past the warranty period, add a `repair_buffer` to TCO:

| Category | Repair buffer per year past warranty |
|---|---|
| Dishwasher | ₪80 |
| Washer | ₪100 |
| Fridge | ₪120 |
| AC | ₪150/unit |
| Oven | ₪70 |

This is rough. Adjust if the user has a known reliable repair contact.
