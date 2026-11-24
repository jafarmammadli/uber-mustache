// Bakes every image in photos/ into photos/photos.js so index.html can offer them,
// even when opened straight from disk (browsers won't hand WebGL a file:// image).
// usage: node add-photos.js
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, 'photos');
const TYPES = {'.jpg': 'jpeg', '.jpeg': 'jpeg', '.png': 'png', '.webp': 'webp', '.gif': 'gif', '.avif': 'avif', '.bmp': 'bmp'};
const list = fs.readdirSync(dir).sort()
  .filter(f => TYPES[path.extname(f).toLowerCase()])
  .map(f => ({
    name: path.parse(f).name,
    src: `data:image/${TYPES[path.extname(f).toLowerCase()]};base64,` + fs.readFileSync(path.join(dir, f)).toString('base64'),
  }));
fs.writeFileSync(path.join(dir, 'photos.js'), 'window.PHOTOS = ' + JSON.stringify(list) + ';\n');
console.log(`baked ${list.length} photo(s)${list.length ? ': ' + list.map(p => p.name).join(', ') : ''}`);
