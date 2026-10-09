import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDirectory = join(dirname(fileURLToPath(import.meta.url)), '..');
const cssFiles = readdirSync(packageDirectory)
  .filter(file => file.endsWith('.css') && !file.endsWith('-modern.css'))
  .sort();

for (const file of cssFiles) {
  const css = readFileSync(join(packageDirectory, file), 'utf8');
  const modernCss = css
    .replace(/,\s*url\([^)]*\)\s*format\(\s*['"]woff['"]\s*\)/g, '')
    .replace(/^[ \t]+$/gm, '');

  if (modernCss === css || /format\(\s*['"]woff['"]\s*\)/.test(modernCss)) {
    throw new Error(`Cannot generate a WOFF2-only variant of ${file}`);
  }

  const modernFile = file.replace(/\.css$/, '-modern.css');
  writeFileSync(join(packageDirectory, modernFile), modernCss);
}

console.log(`Generated ${cssFiles.length} WOFF2-only CSS files.`);
