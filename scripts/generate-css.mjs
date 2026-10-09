import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDirectory = join(dirname(fileURLToPath(import.meta.url)), '..')
const subsets = ['latin', 'all']
const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]
const styles = ['italic', 'normal']
const variants = [
  { directory: '', assetPrefix: './files/', formats: ['woff2'] },
  { directory: 'modern', assetPrefix: '../files/', formats: ['woff2'] },
]
const defaultFaces = [400, 600, 700].map(weight => ({ subset: 'latin', weight, style: 'normal' }))

let generatedFiles = 0

function fontFaceCss({ subset, weight, style }, formats, assetPrefix) {
  const fontName = `lato-${subset}-${weight}-${style}`
  const sources = formats.map(format => {
    const file = `${fontName}.${format}`
    if (!existsSync(join(packageDirectory, 'files', file))) {
      throw new Error(`Missing font asset: files/${file}`)
    }
    return `url('${assetPrefix}${file}') format('${format}')`
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
  for (const { directory, assetPrefix, formats } of variants) {
    const outputDirectory = join(packageDirectory, directory)
    mkdirSync(outputDirectory, { recursive: true })
    const css = faces.map(face => fontFaceCss(face, formats, assetPrefix)).join('\n\n') + '\n';
    writeFileSync(join(outputDirectory, `${name}.css`), css)
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

  writeCssEntries(subset, subset === 'latin' ? defaultFaces : faces)
}

writeCssEntries('index', defaultFaces)

console.log(`Generated ${generatedFiles} CSS files.`)
