import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const HOUSES_ROOT = path.resolve(process.cwd(), 'houses');

export interface ReviewSource {
  site: string;
  score: number;
  score_max?: number;
  count?: number;
  url?: string;
}

export interface ReviewQuote {
  quote: string;
  source: string;
  source_url?: string;
  sentiment?: 'positive' | 'negative' | 'mixed';
}

export interface Reviews {
  average_score?: number;
  score_max?: number;
  total_reviews?: number;
  sources?: ReviewSource[];
  quotes?: ReviewQuote[];
}

export interface Feature {
  name: string;
  detail?: string;
}

export interface Option {
  brand?: string;
  provider?: string;
  model?: string;          // IL retail catalog SKU — what users actually search/buy with
  model_global?: string;   // optional global/EU SKU for international review cross-reference
  price_ils?: number;
  monthly_ils?: number;
  vendor?: string;
  product_url?: string;
  vendor_url?: string;
  image_url?: string;
  warranty?: string;
  tashlumim_available?: number;
  reviews?: Reviews;
  features?: Feature[];
  link_verified_date?: string | Date;
  why_skipped?: string;
  contact?: string;
  start_date?: string;
  cancellation_terms?: string;
  notes?: string;
}

export interface House {
  slug: string;
  name: string;
  address?: string;
  sqm?: number;
  household_size?: number;
  move_in_date?: string;
  electrical?: { voltage_v?: number; main_breaker_a?: number };
  budget?: { hard_cap_ils?: number; soft_target_ils?: number };
  body: string;
}

export interface Item {
  house: string;
  slug: string;
  type: 'buy' | 'book' | 'subscribe';
  status: string;
  category?: string;
  service?: string;
  title: string;
  priority?: string;
  sequence?: string;
  required_by?: string;
  date_needed?: string;
  cadence?: string;
  constraints?: Record<string, unknown>;
  budget?: {
    hard_cap_ils?: number;
    soft_target_ils?: number;
    monthly_ils?: number;
    annual_ils?: number;
  };
  selected?: Option;
  decision_date?: string;
  energy?: { kwh_per_year?: number; est_annual_cost_ils?: number };
  expected_lifespan_years?: number;
  replacement_due?: string;
  alternatives_considered?: Option[];
  upsell_considered?: Option[];
  options_considered?: number;
  power_amps?: number;
  body: string;
}

export interface BudgetBreakdownEntry {
  cap_ils?: number;
  spent_ils?: number;
  committed_ils?: number;
  monthly_ils?: number;
}

export interface Budget {
  house: string;
  hard_cap_ils?: number;
  soft_target_ils?: number;
  breakdown?: Record<string, BudgetBreakdownEntry>;
  electrical_amperage_used?: number;
  kitchen_counter_cm_used?: number;
}

export function listHouses(): House[] {
  if (!fs.existsSync(HOUSES_ROOT)) return [];
  return fs
    .readdirSync(HOUSES_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => loadHouse(d.name))
    .filter((h): h is House => h !== null);
}

export function loadHouse(slug: string): House | null {
  const file = path.join(HOUSES_ROOT, slug, 'house.md');
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return {
    slug,
    name: (data.name as string) ?? slug,
    address: data.address,
    sqm: data.sqm,
    household_size: data.household_size,
    move_in_date: data.move_in_date,
    electrical: data.electrical,
    budget: data.budget,
    body: content,
  };
}

export function loadBudget(houseSlug: string): Budget | null {
  const file = path.join(HOUSES_ROOT, houseSlug, 'budget.md');
  if (!fs.existsSync(file)) return null;
  const { data } = matter(fs.readFileSync(file, 'utf8'));
  return {
    house: houseSlug,
    hard_cap_ils: data.hard_cap_ils,
    soft_target_ils: data.soft_target_ils,
    breakdown: data.breakdown,
    electrical_amperage_used: data.electrical_amperage_used,
    kitchen_counter_cm_used: data.kitchen_counter_cm_used,
  };
}

export function listItems(houseSlug: string): Item[] {
  const items: Item[] = [];
  const houseRoot = path.join(HOUSES_ROOT, houseSlug);

  const itemsDir = path.join(houseRoot, 'items');
  if (fs.existsSync(itemsDir)) {
    for (const f of fs.readdirSync(itemsDir)) {
      if (!f.endsWith('.md')) continue;
      const slug = f.replace(/\.md$/, '');
      const item = loadItemFromDir(houseSlug, slug, itemsDir);
      if (item) items.push(item);
    }
  }

  for (const sub of ['services/one-time', 'services/recurring']) {
    const dir = path.join(houseRoot, sub);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const slug = f.replace(/\.md$/, '');
      const item = loadItemFromDir(houseSlug, slug, dir);
      if (item) items.push(item);
    }
  }

  return items;
}

function loadItemFromDir(houseSlug: string, slug: string, dir: string): Item | null {
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return {
    house: houseSlug,
    slug,
    body: content,
    type: data.type ?? 'buy',
    status: data.status ?? 'drafting',
    title: data.title ?? slug,
    category: data.category,
    service: data.service,
    priority: data.priority,
    sequence: data.sequence,
    required_by: data.required_by,
    date_needed: data.date_needed,
    cadence: data.cadence,
    constraints: data.constraints,
    budget: data.budget,
    selected: data.selected,
    decision_date: data.decision_date,
    energy: data.energy,
    expected_lifespan_years: data.expected_lifespan_years,
    replacement_due: data.replacement_due,
    alternatives_considered: data.alternatives_considered,
    upsell_considered: data.upsell_considered,
    options_considered: data.options_considered,
    power_amps: data.power_amps,
  };
}

export function loadItemBySlug(houseSlug: string, itemSlug: string): Item | null {
  const houseRoot = path.join(HOUSES_ROOT, houseSlug);
  const candidates = [
    path.join(houseRoot, 'items'),
    path.join(houseRoot, 'services', 'one-time'),
    path.join(houseRoot, 'services', 'recurring'),
  ];
  for (const dir of candidates) {
    const item = loadItemFromDir(houseSlug, itemSlug, dir);
    if (item) return item;
  }
  return null;
}

// Render a star string out of 5 from any score, rounding to nearest whole star.
export function stars(score: number, max: number = 5): string {
  const normalized = max === 5 ? score : (score / max) * 5;
  const full = Math.max(0, Math.min(5, Math.round(normalized)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

// Format a YAML date (which gray-matter often parses as a JS Date) as YYYY-MM-DD.
export function formatDate(d: string | Date | undefined | null): string | undefined {
  if (d === undefined || d === null) return undefined;
  if (typeof d === 'string') return d;
  if (d instanceof Date) {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  return String(d);
}

// Days between a verification date and today. Used to flag stale links.
export function daysSince(d: string | Date | undefined | null, now: Date = new Date()): number | undefined {
  if (!d) return undefined;
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return undefined;
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}
