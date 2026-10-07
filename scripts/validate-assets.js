const fs = require('node:fs');
const assert = require('node:assert/strict');
const data = JSON.parse(fs.readFileSync('data/trmnl.json', 'utf8'));
function dimensions(file) {
  const b = fs.readFileSync(file);
  assert.equal(b.readUInt16BE(0), 0xffd8, `${file}: not JPEG`);
  let i = 2;
  while (i < b.length) {
    assert.equal(b[i], 0xff);
    const marker = b[i + 1];
    const length = b.readUInt16BE(i + 2);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5), b[i + 9]];
    i += 2 + length;
  }
  throw new Error(`${file}: JPEG dimensions missing`);
}
for (const item of data.items) {
  for (const [field, expected] of [['image_url_standard', [1200, 900, 1]], ['image_url_wide', [1600, 800, 1]]]) {
    const url = new URL(item[field]);
    assert.equal(url.hostname, 'raw.githubusercontent.com');
    assert.ok(url.pathname.startsWith('/michaelkurath/Never-Built/main/assets/'));
    const file = url.pathname.replace('/michaelkurath/Never-Built/main/', '');
    assert.deepEqual(dimensions(file), expected, `${item.id}: ${field} dimensions/grayscale`);
  }
  assert.equal(item.image_kind, 'ai_artistic_reconstruction');
}
console.log(`Validated ${data.items.length * 2} responsive grayscale images.`);
