// Render the newest exhibit from this checkout, including unpublished artwork.
// Run only in a disposable checkout: this replaces its local preview config.
const fs = require('node:fs');
const path = require('node:path');
const { items } = JSON.parse(fs.readFileSync('data/trmnl.json', 'utf8'));
const selected = { ...items.at(-1) };
for (const key of ['image_url', 'image_url_standard', 'image_url_wide']) {
  const file = path.basename(new URL(selected[key]).pathname);
  selected[key] = `data:image/jpeg;base64,${fs.readFileSync(path.join('assets/exhibits/responsive-v2', file)).toString('base64')}`;
}
fs.writeFileSync('.trmnlp.yml', JSON.stringify({
  watch: false,
  custom_fields: { category: 'all' },
  time_zone: 'UTC',
  transform_runtime: 'disabled',
  variables: { selected_entry: selected, items, trmnl: {} },
}, null, 2));
console.log(`Pinned render fixture: ${selected.id} (local artwork).`);
