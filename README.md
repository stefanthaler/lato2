# Lato 2.0 font

Node package for Lato 2.0 font.

## Installation

```sh
npm install @stefanthaler/lato2
```

## WOFF2-only imports

Use the CSS entries in `modern/` to include only WOFF2 font assets in your application:

```js
import '@stefanthaler/lato2/modern/400.css';
import '@stefanthaler/lato2/modern/600.css';
import '@stefanthaler/lato2/modern/700.css';
```

Apply the font family in your stylesheet:

```css
body {
  font-family: 'Lato', sans-serif;
}
```

Every existing CSS entry has a corresponding entry with the same filename in
`modern/`. These paths replace the former root-level `*-modern.css` paths;
no compatibility copies are provided.

| Original entry | WOFF2-only entry | Font selection |
| --- | --- | --- |
| `index.css` | `modern/index.css` | Latin, weights 400/600/700, normal |
| `400.css` | `modern/400.css` | Latin, selected weight, normal |
| `400-italic.css` | `modern/400-italic.css` | Latin, selected weight, italic |
| `latin-400.css` | `modern/latin-400.css` | Latin, selected weight, normal |
| `latin-400-italic.css` | `modern/latin-400-italic.css` | Latin, selected weight, italic |
| `all-400.css` | `modern/all-400.css` | Full character set, selected weight, normal |
| `all-400-italic.css` | `modern/all-400-italic.css` | Full character set, selected weight, italic |
| `latin.css` | `modern/latin.css` | Latin, weights 400/600/700, normal |
| `all.css` | `modern/all.css` | Full character set, all weights and styles |

The per-weight entries support weights 100 through 900 in steps of 100. Replace
`400` in the examples with the required weight. Import individual weights and
styles when you only need a few variants.

Both original and modern entries require a browser with WOFF2 support and use
only WOFF2 sources, without a WOFF fallback. Modern entries preserve the font
family, weight, style, `font-display: swap`, and character set of the original
entry. The default `index.css` and `latin.css` entries and their modern variants
include only weights 400, 600, and 700 in normal style.

## Maintaining the CSS entries

All CSS entries are generated from the font selections and the `@font-face`
template in `scripts/generate-css.mjs`. Edit the generator, then regenerate
both the original entries in the package root and the entries in `modern/`:

```sh
npm run build:css
```

Do not edit the generated CSS files directly.

The same generator runs automatically before `npm pack` and `npm publish`.

## Resources

* https://www.latofonts.com/
* Font License: [SIL Open Font License 1.1](http://scripts.sil.org/OFL)
