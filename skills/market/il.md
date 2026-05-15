---
name: market-il
type: market
description: How to research and price products in the Israeli market.
applies_to: [israel, il]
---

# Israeli market research playbook

## Primary sources (in order of trust)

1. **Zap.co.il** — IL's biggest price comparison. Use as the price floor reference. Don't trust the listed retailers blindly — many are gray-importer fronts with poor service.
2. **Ksp.co.il** — large electronics retailer, typically official import, decent pricing, real service network.
3. **Bug.co.il** — similar to KSP, often competitive on Bosch / Siemens / Whirlpool.
4. **Ivory.co.il** — focused on appliances, aggressive sales, mostly official import.
5. **Machsanei Hashmal (machsanei-hashmal.co.il)** — chain stores, useful for in-person comparison.
6. **Yad2.co.il** — used market. Always check for couches, dining tables, sometimes near-new appliances (people unloading when moving).
7. **Facebook Marketplace** — secondary used market, less filtered than Yad2.
8. **Manufacturer's IL site** — for exact model number, official warranty terms, accessory catalog.

## Search workflow per item

1. Take the user's constraint set (from category skill discovery).
2. Search Zap with constraints applied. Get rough price floor and a list of candidate brands/models.
3. For each candidate model:
   - Search Ksp + Bug + Ivory for price (these are the trustworthy retailers).
   - Note tashlumim count offered (12, 24, or 36 interest-free).
   - Identify yevuan moy vs official import — usually noted in the listing; if not, the model number can give it away (German Bosch IL official typically appears with regional suffix).
   - Note haranha (installation) cost separately.
4. Cross-check Hebrew reviews:
   - Tapuz forums (older but still active for appliances).
   - YouTube Hebrew reviewers — search `[brand] [model] ביקורת`.
5. Cross-check international reviews:
   - Wirecutter (US-centric but useful for build quality).
   - RTINGS (excellent for AC, fridges).
   - Reddit r/BuyItForLife.
6. For used market: search Yad2 with the model number, check listing age and seller history.

## Price negotiation reality

- Online prices on Zap are usually NOT negotiable for stocked items.
- In-store visits at Machsanei Hashmal / Hatzi Hinam can yield 5-10% discount if you ask, especially during sales periods.
- End of fiscal quarter (March, June, September, December) often brings real promotions.
- Black Friday in IL is real but not US-level. חג שני (immediately post-holiday) often has clearance.
- Tashlumim is a real lever — more tashlumim means lower effective monthly cost; some users prefer +5% sticker for 36 tashlumim over base price for 12.

## What to record per option

In each item's `selected` or `options_considered`:

- `brand`, `model`
- `price_ils` (current at time of research)
- `vendor` (where to buy)
- `vendor_url`
- `warranty` (e.g., `official-import-3y` or `yevuan-moy-1y`)
- `tashlumim_available`
- Haranha cost separately if material

## Israeli pitfalls

- **Bosch/Siemens model number trap**: same external model number can have different feature sets between EU and IL versions. Verify the IL spec sheet.
- **Yevuan moy hidden cost**: 1-year warranty + paid service after = ~₪400/visit. Quantify over expected lifespan when comparing.
- **Sabbath mode (kosher)**: most IL-imported large appliances have it; yevuan moy versions sometimes don't. Worth checking if it matters to the household.
- **Plug type**: most IL appliances ship with the right plug; imports may need adapters. AC and dryers often need a dedicated 16A circuit — confirm with electrician before buying.
- **Delivery to upper floors without elevator**: many delivery services charge extra. Usually ₪50-150 per flight.
- **Energy class on yevuan moy**: sometimes the model is the EU version with EU energy label that doesn't perfectly align with IL labels. Check kWh/year directly when comparing.

## Compatibility with the agentskills.co.il Israeli price-comparator skill

If the `israeli-product-price-comparator` skill from agentskills.co.il is installed, prefer its scraping conventions for live price lookups. Treat it as an executor; this file remains the strategy/heuristics.
