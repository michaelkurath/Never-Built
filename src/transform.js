const ALL_CATEGORIES = "all";

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

function run(input) {
  const safeInput = input && typeof input === "object" ? input : {};
  const selection = selectEntry(safeInput);

  return {
    ...safeInput,
    selected_entry: selection.selectedEntry,
    trmnl_state: { histories: selection.histories },
  };
}

if (typeof module !== "undefined") {
  module.exports = { getPool, normalizeCategory, run, selectEntry, validHistory };
}

