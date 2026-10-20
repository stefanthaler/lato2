import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDirectory = join(dirname(fileURLToPath(import.meta.url)), '..')
const cssDirectory = join(packageDirectory, 'css')
const fontsDirectory = join(packageDirectory, 'fonts')
const subsets = ['latin', 'all']
const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]
const styles = ['italic', 'normal']
const variants = [
  { directory: '', formats: ['woff2'] },
  { directory: 'legacy', formats: ['woff2', 'woff'] },
]
const defaultFaces = [400, 600, 700].map(weight => ({ subset: 'latin', weight, style: 'normal' }))

let generatedFiles = 0

function fontFaceCss({ subset, weight, style }, formats, assetPrefix) {
  const fontName = `lato-${subset}-${weight}-${style}`
  const sources = formats.map(format => {
    const file = `${fontName}.${format}`
    if (!existsSync(join(fontsDirectory, file))) {
      throw new Error(`Missing font asset: fonts/${file}`)
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
  for (const { directory, formats } of variants) {
    const outputFile = join(cssDirectory, directory, `${name}.css`)
    const outputDirectory = dirname(outputFile)
    mkdirSync(outputDirectory, { recursive: true })
    const assetPath = relative(outputDirectory, fontsDirectory).split(sep).join('/')
    const assetPrefix = `${assetPath.startsWith('.') ? '' : './'}${assetPath}/`
    const css = faces.map(face => fontFaceCss(face, formats, assetPrefix)).join('\n\n') + '\n';
    writeFileSync(outputFile, css)
    generatedFiles++
  }
}

for (const subset of subsets) {
  const faces = weights.flatMap(weight => styles.map(style => ({ subset, weight, style })))

  for (const face of faces) {
    const name = `${face.weight}${face.style === 'italic' ? '-italic' : ''}`
    writeCssEntries(`${subset}/${name}`, [face])
  }

  writeCssEntries(`${subset}/index`, faces)
}

writeCssEntries('default', defaultFaces)

console.log(`Generated ${generatedFiles} CSS files.`)
