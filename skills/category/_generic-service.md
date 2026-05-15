---
name: generic-service
type: category
description: Fallback skill for services — both one-time (move-in cleaning, electrician, inspection) and recurring (cleaning, lawn care, pool service).
applies_to: [_default_service, cleaning, electrician, plumber, inspection, painter, mover, lawn-care, pool-service, security-monitoring]
---

# Generic service discovery

Services are categorically different from goods:

- **Trust + reliability matter more than features.** A great cleaner who shows up beats a famous service that flakes.
- **References &gt; reviews.** For most services, a personal recommendation outweighs a 4.5-star Google rating. Ask the user if they have any.
- **Pricing is often negotiable**, especially for recurring services.
- **Contracts and cancellation terms matter.** Read before booking.
- **Insurance and licensing matter** &mdash; especially for electricians, plumbers, movers (anything with damage potential).

## Discovery questions

### For one-time services (move-in cleaning, electrician install, inspection, painter, etc.)

1. **What exactly is the scope?** Specific tasks, square meters, hours expected?
2. **Date needed** &mdash; many services book out 1-4 weeks; movers and cleaners much further.
3. **Insurance / licensing required?** &mdash; electrical, plumbing, gas, structural always need licensed pros.
4. **Materials included or separate?** (e.g., painter providing paint vs user supplying)
5. **Brand preference?** &mdash; sometimes: e.g., Bosch service vs an independent for a Bosch appliance.
6. **Hard budget cap, soft target.**

### For recurring services (cleaning, lawn, pool, security)

1. **Cadence**: weekly, bi-weekly, monthly?
2. **Contract length** vs month-to-month? Cancellation terms?
3. **Backup / cover policy** when the regular person is sick / on vacation?
4. **Communication preferred** (WhatsApp, app, phone)?
5. **What's included vs extra**? (e.g., cleaning: do they provide products?)
6. **Monthly budget cap.**

## How to research providers in Israel

Different rules than goods:

1. **Ask the user for recommendations first** &mdash; from neighbors, building WhatsApp group, friends with the same need. A trusted recommendation usually beats every search result.
2. **Vaad bayit (building committee) directory** &mdash; many buildings have a list of vetted maintenance contacts. Worth asking.
3. **Facebook groups for the user's neighborhood** &mdash; very active for service recommendations and warnings.
4. **Yad2 services section** &mdash; large but quality varies; verify references.
5. **Google reviews** &mdash; useful but inflated; weight negative reviews higher than positive.
6. **For licensed trades** (electrician, plumber, gas, structural):
   - Verify license/insurance is current
   - Get the company name and check for prior complaint records
   - Get a written quote, not verbal
7. **For cleaning services**:
   - Trial cleaning first (one session, paid) before committing to recurring
   - Confirm whether the worker is the company's employee or subcontracted
8. **For movers**:
   - In-home estimate, not phone-quote
   - Insurance for the goods value
   - Confirm whether the price is "to-the-door" or includes carrying upstairs (no elevator surcharges)

## Pricing benchmarks (IL, 2026)

Use as reference; vary by city and quality tier.

| Service | Typical IL price |
|---|---|
| Move-in deep cleaning (3-bedroom) | ₪600-1,500 (4-6 hrs, 2 people) |
| Recurring cleaning (every 2 weeks, 4 hrs) | ₪700-1,000/month |
| Pre-purchase home inspection (apartment) | ₪900-2,000 |
| Electrician (hourly + materials) | ₪200-400/hr + materials |
| Plumber (hourly + materials) | ₪200-400/hr + materials |
| Painter (per sqm, 2 coats, walls + ceiling) | ₪40-90/sqm |
| Movers (3-bedroom apartment, local move) | ₪2,000-5,000 |
| Movers + packing service | +50-100% |
| AC installation (per indoor unit) | ₪800-1,500 |
| Pool maintenance (weekly) | ₪400-800/month |

## Common Israeli pitfalls

- **Verbal quotes** &mdash; always get written. *"It'll be around X"* often becomes 1.5-2× X by completion.
- **Cleaning scope creep** &mdash; *"Also do the windows? Also the oven?"* &mdash; add-ons should be quoted separately, not assumed included.
- **Mover damage** &mdash; document everything before move with photos. Insurance often only covers explicit listed items.
- **No-shows and reschedules** &mdash; common in IL service industry. Build buffer time into your project plan; never schedule the next dependent task on the day of a service.
- **חג / Sukkot / Pesach** &mdash; service availability drops to near-zero during major holidays. Plan around them.
- **Cash-only operators** &mdash; often the cheapest but no recourse if work is bad. Higher-tier services accept credit card and provide invoices.
- **VAT (ma'am)** &mdash; verify whether the quoted price includes 17% VAT or not. *"+ ma'am"* means it doesn't.
- **Subcontracting** &mdash; the company you hired may send a subcontractor. The quality of execution depends on who actually shows up.

## Value model

- **Recurring services** &mdash; annualize. ₪800/mo cleaning = ₪9,600/year. Compare to: the value of those 8 hours/month of your time, hourly rate equivalence.
- **One-time services** &mdash; opportunity cost of doing it yourself + risk of doing it badly + your hourly rate.
- **Licensed trades for unlicensed work** is false economy &mdash; bad electrical work can burn the apartment down; bad plumbing causes water damage. Pay for licensed.

## Upsell triggers

Services don't have classic "upsells" in the appliance sense, but watch for:

- **User chose the cheapest cleaning service on quote alone** &mdash; flag if the cheapest has notably worse references. *"₪200/month more for the highly-recommended one is worth it for someone in your home weekly."*
- **User about to hire unlicensed for licensed work** &mdash; reject. *"Electrical / plumbing / gas needs licensed; insurance won't cover damage from unlicensed work."*
- **User hiring movers for entire house but no insurance** &mdash; flag. *"For ₪200-400 more, insure the goods value &mdash; one broken TV pays it back."*

## Output checklist

### For Book (one-time)

- `type: book`
- `service` field (e.g., `move-in-cleaning`, `electrician-install`)
- `title`
- `date_needed` (when the service must be done by)
- `budget.hard_cap_ils`
- `selected.provider` (company or person name)
- `selected.price_ils`
- `selected.contact` (phone or email)
- `selected.product_url` &mdash; if the provider has a website
- `selected.warranty` &mdash; for tradework, the workmanship guarantee
- `selected.notes` &mdash; what's included / scope
- `selected.reviews` if found (Google, Yad2, neighborhood Facebook)
- `selected.link_verified_date` if `product_url` is set
- `alternatives_considered` &mdash; usually 2-3 quotes from competitors with `why_skipped`

### For Subscribe (recurring)

- `type: subscribe`
- `service`, `cadence` (e.g., `every-2-weeks`, `weekly`, `monthly`)
- `budget.monthly_ils`
- `budget.annual_ils` (computed)
- `selected.provider`, `monthly_ils`, `start_date`, `cancellation_terms`
- `selected.product_url`, `link_verified_date` if applicable
- `selected.reviews` if found
- `alternatives_considered` &mdash; competing providers

### Always

- **Don't fabricate reviews** &mdash; service review data is sparse; honestly note when you couldn't find reviews.
- **Cite where the recommendation came from** in the prose body (e.g., "Recommended by neighbor in building Whatsapp group").
