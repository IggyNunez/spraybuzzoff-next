const fs = require('fs');
const path = require('path');

const EXT = /\.(ts|tsx|js|jsx|css|md)$/;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walk(full, out);
    } else if (EXT.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const files = walk('src');
let totalReplaced = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  let after = before;
  let count = 0;
  // Literal em dash
  const m1 = after.match(/\u2014/g);
  if (m1) { count += m1.length; after = after.replace(/\u2014/g, '-'); }
  // \u2014 escape sequence (6 chars: backslash, u, 2, 0, 1, 4)
  const m2 = after.match(/\\u2014/g);
  if (m2) { count += m2.length; after = after.replace(/\\u2014/g, '-'); }
  // &mdash; and &#8212; and &#x2014;
  const m3 = after.match(/&mdash;|&#8212;|&#x2014;/g);
  if (m3) { count += m3.length; after = after.replace(/&mdash;|&#8212;|&#x2014;/g, '-'); }
  if (before !== after) {
    fs.writeFileSync(f, after, 'utf8');
    totalReplaced += count;
    console.log(f + ': ' + count + ' replaced');
  }
}
console.log('Total: ' + totalReplaced);
