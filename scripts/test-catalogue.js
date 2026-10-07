const fs = require('node:fs');
const assert = require('node:assert/strict');
const { selectEntry } = require('../src/transform');
const items = JSON.parse(fs.readFileSync('data/trmnl.json', 'utf8')).items;
const candidates = JSON.parse(fs.readFileSync('data/candidates.json', 'utf8')).candidates;
const candidateIds = new Set(candidates.map(x => x.id));
for (const category of ['all', ...new Set(items.map(x => x.category_key)), 'infrastructure', 'unknown']) {
  let histories = {};
  const pool = items.filter(x => category === 'all' || x.category_key === category);
  const expected = pool.length ? pool : items;
  const seen = new Set();
  for (let i = 0; i < expected.length; i++) {
    const result = selectEntry({items, trmnl: {state: {histories}, plugin_settings: {custom_fields_values: {category}}}}, 0);
    assert.ok(!seen.has(result.selectedEntry.id));
    assert.ok(!candidateIds.has(result.selectedEntry.id));
    seen.add(result.selectedEntry.id);
    histories = result.histories;
  }
  assert.deepEqual([...seen].sort(), expected.map(x => x.id).sort());
}
const settings = fs.readFileSync('src/settings.yml', 'utf8');
assert.match(settings, /^id: 498879$/m, 'Preserve NEVER BUILT installation identity');
assert.ok(!/^id: 467205$/m.test(settings), 'Never bind to GOODBYE');
assert.match(settings, /^serverless_language: node$/m);
assert.match(settings, /^custom_fields:$/m);
assert.ok(settings.includes('Never-Built/main/data/trmnl.json'));
console.log('Live rotation, category fallback, candidate isolation, and installation identity passed.');
