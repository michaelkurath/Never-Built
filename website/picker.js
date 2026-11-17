const recipes = new Map([
  ["Never-Built", "NEVER BUILT"],
  ["TRMNL-Goodbye", "GOODBYE"],
  ["TRMNL-Still-Here", "STILL HERE"],
  ["TRMNL-BUILT", "BUILT"],
]);
const params = new URLSearchParams(location.search);
const recipe = params.get("recipe") ?? "Never-Built";
const frame = params.get("edition") === "frame";
const assetRoot = "https://raw.githubusercontent.com/michaelkurath/" + recipe + "/main/";
const selected = new Set();
const get = (id) => document.getElementById(id);
const search = get("search");
const status = get("status");
const choices = get("choices");
const copy = get("copy");
const copyStatus = get("copy-status");
const selectionValue = get("selection-value");

function frameReady(item) {
  return Boolean(
    (item.image_url_frame_landscape && item.image_url_frame_portrait) ||
    (item.artwork?.landscape && item.artwork?.portrait)
  );
}

function updateSelection() {
  selectionValue.value = [...selected].join(", ");
  copy.disabled = !selected.size;
  copyStatus.textContent = selected.size ? selected.size + " selected" : "";
}

function render(items) {
  const query = search.value.trim().toLowerCase();
  const visible = items.filter((item) => item.name.toLowerCase().includes(query));
  choices.replaceChildren();
  status.textContent = visible.length ? visible.length + " exhibits" : "No matching exhibits.";
  for (const item of visible) {
    const label = document.createElement("label");
    label.className = "choice";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = selected.has(item.id);
    input.addEventListener("change", () => {
      if (input.checked) selected.add(item.id);
      else selected.delete(item.id);
      updateSelection();
    });
    label.append(input);
    if (frame) {
      const image = document.createElement("img");
      image.src = item.image_url_frame_landscape ?? assetRoot + item.artwork.landscape;
      image.alt = "";
      image.loading = "lazy";
      label.append(image);
    }
    label.append(item.name);
    if (!frame && frameReady(item)) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Frame";
      label.append(badge);
    }
    choices.append(label);
  }
}

copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(selectionValue.value);
    copyStatus.textContent = "Copied.";
  } catch {
    selectionValue.select();
    copyStatus.textContent = "Copy the highlighted selection.";
  }
});

async function init() {
  if (!recipes.has(recipe)) throw new Error("Unknown recipe.");
  const title = "Choose " + recipes.get(recipe) + (frame ? " Frame artwork" : " exhibits");
  document.title = title;
  get("title").textContent = title;
  if (frame) get("field-name").textContent = "My Frame exhibits";

  const response = await fetch(assetRoot + "data/trmnl.json");
  if (!response.ok) throw new Error("The live catalogue could not be loaded.");
  const { items } = await response.json();
  const pool = items.filter((item) => !frame || frameReady(item));
  pool.sort((a, b) => a.name.localeCompare(b.name, "en"));
  search.disabled = false;
  get("selection").hidden = false;
  search.addEventListener("input", () => render(pool));
  render(pool);
}

init().catch((error) => {
  status.textContent = error.message;
});
