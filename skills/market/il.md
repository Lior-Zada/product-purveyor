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

## Search workflow per item — IL-first methodology

**Critical:** never search Zap or KSP by a global/EU model number. Global SKUs (e.g., `SPS6ZMI35E` for a Bosch slim dishwasher) usually do not exist in IL retail catalogs. The IL importer (BSH Israel for Bosch, etc.) re-catalogs products under different SKUs (e.g., `SMV`, `SMS`, `SPV`, `SMI` series). Searching by global model returns zero hits and produces broken links.

### Step 1: Browse the IL catalog by category

Get the full list of IL-stocked SKUs in the category from Zap's catalog:

| Category | URL |
|---|---|
| Dishwashers | https://www.zap.co.il/models.aspx?sog=e-dishwasher |
| Refrigerators | https://www.zap.co.il/models.aspx?sog=e-refrigerator |
| Washing machines | https://www.zap.co.il/models.aspx?sog=e-washingmachine |
| Ovens | https://www.zap.co.il/models.aspx?sog=e-oven |
| Air conditioners | https://www.zap.co.il/models.aspx?sog=e-airconditioner |
| Dryers | https://www.zap.co.il/models.aspx?sog=e-dryer |

These pages show what's actually for sale in Israel right now.

### Step 2: Filter by user constraints

Mentally filter (or use Zap's facets) by width, capacity, brand, energy class. Pick 3&ndash;5 top candidates with their IL SKUs.

### Step 3: Verify each candidate

For each candidate IL SKU, build the search URL:

```
https://www.zap.co.il/search.aspx?keyword=<Brand>+<IL-SKU>
```

Then **WebFetch the URL**. Check the response:

- **Has vendors and prices** &rarr; record the URL, set `link_verified_date: <today>`.
- **Returns "&#1500;&#1488; &#1504;&#1502;&#1510;&#1488;&#1493; &#1514;&#1493;&#1510;&#1488;&#1493;&#1514;" (no results)** &rarr; the SKU isn't IL-stocked. Drop or revise.
- **404 / 500** &rarr; URL pattern wrong; investigate.

Per-vendor detail pages (Ksp, Bug, Ivory) are usually behind their own search:

- Ksp: `https://ksp.co.il/web/cat/Search?Search=<IL-SKU>`
- Bug: `https://www.bug.co.il/?s=<IL-SKU>`
- Ivory: `https://www.ivory.co.il/catalog/index.php?keyword=<IL-SKU>`

These can also fail; verify before recording.

### Step 4: Cross-reference for global reviews

If the IL SKU has a known global equivalent (BSH Israel often imports the EU model under a slightly modified SKU), record both:

```yaml
model: SMV4HAX19E         # IL SKU — what the user buys
model_global: SMV4HAX01A  # EU SKU if you've confirmed equivalence — for RTINGS/Wirecutter
```

If you can't confirm a global equivalent, leave `model_global` unset. Don't guess.

### Step 5: Pull reviews

- Hebrew sources for the IL SKU: Zap product page reviews, Ksp reviews tab, Tapuz forums (search `<Brand> <IL-SKU> ביקורת`), YouTube Hebrew reviewers
- International sources for the global SKU (when known): RTINGS, Wirecutter, Reddit r/BuyItForLife
- Used-market sanity check on Yad2: `https://www.yad2.co.il/products/?keywords=<Brand>+<IL-SKU>` &mdash; recent listings tell you what people are unloading and at what price

### Common IL importer SKU patterns

| Brand | IL SKU prefixes (observed) | Notes |
|---|---|---|
| Bosch dishwasher | SMS (60cm freestanding), SMV (60cm integrated), SMI (60cm semi-integrated), SPS/SPV (45cm slim) | EU global codes (SPS6ZMI35E etc.) typically don't appear in IL retail |
| Bosch refrigerator | KGN, KGV, KAN, KAD | |
| Bosch washer | WAU, WAY, WGB, WAJ | |
| LG washer | F1V, F4V, FH4 (newer); WD (older) | |
| LG fridge | GR-, GT- (often with country suffix) | |
| Samsung washer | WW (front), WA (top) | |
| Electrolux/AEG dishwasher | ESM, ESI, EEC, EEG | |
| Tornado AC | TOP, WD, INV (Inspire line) | |
| Tadiran AC | TGL, TS, TC | |
| Electra AC | OREA, ELO | |

This table is from observed Zap catalog data; verify when researching since lines change.

### When the user wants something not in IL retail

If the user asks for a specific brand/configuration that the IL catalog doesn't currently stock (e.g., 45cm slim Bosch, certain Daikin models), tell them. Don't fabricate URLs. Then:

1. Suggest the closest IL-available alternative
2. Mention that they could parallel-import (yevuan moy) but flag the warranty + service trade-offs
3. Note availability in the item's prose body so future-them remembers why the choice was made

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
