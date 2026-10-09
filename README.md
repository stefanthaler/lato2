# Lato 2.0 font

Node package for Lato 2.0 font.

## Installation

```sh
npm install @stefanthaler/lato2
```

## WOFF2-only imports

Use the CSS entries in `modern/` to include only WOFF2 font assets in your application:

```js
import '@stefanthaler/lato2/modern/latin/400.css';
import '@stefanthaler/lato2/modern/latin/600.css';
import '@stefanthaler/lato2/modern/latin/700.css';
```

Apply the font family in your stylesheet:

```css
body {
  font-family: 'Lato', sans-serif;
}
```

Every original CSS entry has a corresponding entry with the same relative path
inside `modern/`. Individual subset entries live in `all/` and `latin/`, and in
`modern/all/` and `modern/latin/`, without subset prefixes in their filenames.
For example, `all-400.css` is now `all/400.css`, and `modern/latin-400.css` is now
`modern/latin/400.css`. These paths replace the former prefixed paths and the
root-level `*-modern.css` paths; no compatibility copies are provided.

Individual Latin entries exist only in `latin/` and `modern/latin/`. Migrate
`400.css` to `latin/400.css` and `modern/400.css` to `modern/latin/400.css`.
The same applies to every weight and italic variant: `400-italic.css` becomes
`latin/400-italic.css`, and `modern/400-italic.css` becomes
`modern/latin/400-italic.css`. No compatibility copies or redirects are provided.
Subset aggregates live alongside individual entries as `index.css`. Migrate
`all.css` to `all/index.css` and `latin.css` to `latin/index.css`;
`modern/all.css` to `modern/all/index.css` and `modern/latin.css` to `modern/latin/index.css`.
No compatibility copies or redirects are provided. Only the default `index.css`
remains directly in the package root and in `modern/`.

| Original entry | WOFF2-only entry | Font selection |
| --- | --- | --- |
| `index.css` | `modern/index.css` | Latin, weights 400/600/700, normal |
| `latin/400.css` | `modern/latin/400.css` | Latin, selected weight, normal |
| `latin/400-italic.css` | `modern/latin/400-italic.css` | Latin, selected weight, italic |
| `all/400.css` | `modern/all/400.css` | Full character set, selected weight, normal |
| `all/400-italic.css` | `modern/all/400-italic.css` | Full character set, selected weight, italic |
| `latin/index.css` | `modern/latin/index.css` | Latin, all weights and styles |
| `all/index.css` | `modern/all/index.css` | Full character set, all weights and styles |

The per-weight entries support weights 100 through 900 in steps of 100. Replace
`400` in the examples with the required weight. Import individual weights and
styles when you only need a few variants.

Original entries in the package root, `all/`, and `latin/` use WOFF2 first, with WOFF as a fallback
for browsers without WOFF2 support. Modern entries require a browser with WOFF2 support
and use only WOFF2 sources, without a WOFF fallback. They preserve the font
family, weight, style, `font-display: swap`, and character set of the original
entry. Only the default `index.css` and `modern/index.css` entries include
weights 400, 600, and 700 in normal style. Both subset aggregates include all weights and styles
for their respective character sets, in both the original and modern variants.

## Maintaining the CSS entries

All CSS entries are generated from the font selections and the `@font-face`
template in `scripts/generate-css.mjs`. Edit the generator, then regenerate
both sets, including their subset directories:

```sh
npm run build:css
```

The generator creates 78 CSS entries: 1 directly in the package root and 1
directly in `modern/`, plus 19 in each of `all/`, `latin/`, `modern/all/`, and
`modern/latin/`: 39 original and 39 modern entries in total. Font asset links
are relative to each CSS file's directory.

Do not edit the generated CSS files directly.

The same generator runs automatically before `npm pack` and `npm publish`.

## Resources

* https://www.latofonts.com/
* Font License: [SIL Open Font License 1.1](http://scripts.sil.org/OFL)
