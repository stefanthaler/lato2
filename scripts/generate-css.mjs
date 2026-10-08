import { existsSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDirectory = join(dirname(fileURLToPath(import.meta.url)), '..')
const subsets = ['latin', 'all']
const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]
const styles = ['italic', 'normal']
const variants = [
  { suffix: '', formats: ['woff2', 'woff'] },
  { suffix: '-modern', formats: ['woff2'] },
]

let generatedFiles = 0

function fontFaceCss({ subset, weight, style }, formats) {
  const fontName = `lato-${subset}-${weight}-${style}`
  const sources = formats.map(format => {
    const file = `${fontName}.${format}`
    if (!existsSync(join(packageDirectory, 'files', file))) {
      throw new Error(`Missing font asset: files/${file}`)
    }
    return `url('./files/${file}') format('${format}')`
  })

  return `/* lato2-${subset}-${weight}-${style} */
@font-face {
  font-family: 'Lato';
  font-style: ${style};
  font-display: swap;
  font-weight: ${weight};
  src: ${sources.join(', ')};
}`
}

function writeCssEntries(name, faces) {
  for (const { suffix, formats } of variants) {
    const css = faces.map(face => fontFaceCss(face, formats)).join('\n\n') + '\n';
    writeFileSync(join(packageDirectory, `${name}${suffix}.css`), css)
    generatedFiles++
  }
}

for (const subset of subsets) {
  const faces = weights.flatMap(weight => styles.map(style => ({ subset, weight, style })))

  for (const face of faces) {
    const name = `${face.weight}${face.style === 'italic' ? '-italic' : ''}`
    writeCssEntries(`${subset}-${name}`, [face])
    if (subset === 'latin') {
      writeCssEntries(name, [face])
    }
  }

  writeCssEntries(subset, faces)
}

writeCssEntries('index', [{ subset: 'latin', weight: 400, style: 'normal' }])

console.log(`Generated ${generatedFiles} CSS files.`)
