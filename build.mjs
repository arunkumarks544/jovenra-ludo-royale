import fs from 'node:fs';

const html = fs.readFileSync('source.html', 'utf8');
const css = fs.readFileSync('src/style.css', 'utf8');
const engineSource = fs.readFileSync('src/engine.js', 'utf8');
const moduleSource = fs.readFileSync('src/main.js', 'utf8');

// The browser production bundle uses a classic script, so inline the imported engine.
const engine = engineSource.replaceAll('export ', '').replace('function location(', 'function tokenLocation(');
const main = moduleSource.replace(/^import[^\n]*\n/, '');
if (main === moduleSource || main.startsWith('import ')) {
  throw new Error('Unable to resolve the engine import in src/main.js');
}

const result = html
  .replace('<link rel="stylesheet" href="/src/style.css">', '<style>\n' + css + '\n</style>')
  .replace('<script type="module" src="/src/main.js"></script>', '<script>\n' + engine + '\n' + main + '\n</script>');

if (!result.includes('data:audio/mpeg;base64') ||
    !result.includes('ca-pub-9961854620891047') ||
    result.includes('src="/src/main.js"')) {
  throw new Error('The bundled game is missing audio, AdSense verification, or inline JavaScript');
}

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/index.html', result);
fs.writeFileSync('index.html', result);
console.log('Built standalone Jovenra Ludo:', Math.round(Buffer.byteLength(result) / 1024) + ' KiB');
