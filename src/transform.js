const ALL_CATEGORIES = "all";
const CATALOGUE_URL = "https://raw.githubusercontent.com/michaelkurath/Never-Built/main/data/trmnl.json";
const DISPLAY_FIELDS = [
  "id",
  "exhibit",
  "name",
  "proposal_period",
  "proposal_year",
  "stage",
  "caption",
  "category",
  "image_url",
  "image_url_standard",
  "image_url_wide",
  "image_alt",
  "why_unbuilt",
  "what_remains",
  "note"
];


function normalizeCategory(input) {
  const value = input?.trmnl?.plugin_settings?.custom_fields_values?.category;
  return String(value || ALL_CATEGORIES).trim().toLowerCase();
}

function getPool(items, category) {
  if (category === ALL_CATEGORIES) return items;

  const filtered = items.filter((item) => item.category_key === category);
  return filtered.length > 0 ? filtered : items;
}

function validHistory(history, poolIds) {
  if (!Array.isArray(history)) return [];

  const seen = new Set();
  return history.filter((id) => {
    if (typeof id !== "string" || !poolIds.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function selectEntry(input, randomValue = Math.random()) {
  const items = Array.isArray(input?.items) ? input.items : [];
  if (items.length === 0) {
    return { selectedEntry: null, category: ALL_CATEGORIES, histories: {} };
  }

  const category = normalizeCategory(input);
  const pool = getPool(items, category);
  const state = input?.trmnl?.state;
  const histories = state?.histories && typeof state.histories === "object"
    ? { ...state.histories }
    : {};
  const poolIds = new Set(pool.map((item) => item.id));
  let history = validHistory(histories[category], poolIds);
  let available = pool.filter((item) => !history.includes(item.id));

  if (available.length === 0) {
    history = [];
    available = pool;
  }

  const boundedRandom = Number.isFinite(randomValue)
    ? Math.min(Math.max(randomValue, 0), 0.9999999999999999)
    : 0;
  const selectedEntry = available[Math.floor(boundedRandom * available.length)];
  histories[category] = [...history, selectedEntry.id];

  return { selectedEntry, category, histories };
}

async function loadItems(input) {
  // Explicit items are supported by local test/render fixtures.
  if (Object.prototype.hasOwnProperty.call(input, "items")) {
    return Array.isArray(input.items) ? input.items : [];
  }

  // TRMNL polling retrieves only data/poll.json (small manifest).
  // Fetch the full catalogue inside Serverless, not through Polling.
  const response = await fetch(CATALOGUE_URL);
  if (!response.ok) throw new Error("Catalogue fetch failed: HTTP " + response.status);
  const payload = await response.json();
  if (!Array.isArray(payload?.items) || payload.items.length === 0) {
    throw new Error("Catalogue response contains no exhibits");
  }
  return payload.items;
}

function compactEntry(entry) {
  if (!entry) return null;
  return Object.fromEntries(
    DISPLAY_FIELDS.filter((key) => entry[key] !== undefined).map((key) => [key, entry[key]])
  );
}

async function run(input) {
  const safeInput = input && typeof input === "object" && !Array.isArray(input) ? input : {};
  const items = await loadItems(safeInput);
  const selection = selectEntry({ ...safeInput, items });

  // No entire catalogue, polling manifest or unnecessary editorial metadata.
  return {
    selected_entry: compactEntry(selection.selectedEntry),
    trmnl_state: { histories: selection.histories },
  };
}

if (typeof module !== "undefined") module.exports = { compactEntry, getPool, loadItems, normalizeCategory, run, selectEntry, validHistory };
