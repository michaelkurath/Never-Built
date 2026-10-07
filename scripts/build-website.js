const fs = require('node:fs');
const path = require('node:path');
const out = path.join(process.cwd(), '_site');
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js']) fs.copyFileSync(path.join('website', file), path.join(out, file));
fs.copyFileSync('data/trmnl.json', path.join(out, 'catalogue.json'));
fs.copyFileSync('assets/icon/never-built-icon.svg', path.join(out, 'assets/never-built-icon.svg'));
const data = JSON.parse(fs.readFileSync('data/trmnl.json', 'utf8'));
for (const item of data.items) {
  const file = new URL(item.image_url_standard).pathname.split('/').pop();
  fs.copyFileSync(path.join('assets/exhibits/responsive-v2', file), path.join(out, 'assets', file));
}
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`Built website with ${data.items.length} live exhibits.`);
