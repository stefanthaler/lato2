# Lato 2.0 font

Node package for Lato 2.0 font.

## Installation

```sh
npm install @stefanthaler/lato2
```

## WOFF2-only imports

Use the CSS entries in `css/modern/` to include only WOFF2 font assets in your application:

```js
import '@stefanthaler/lato2/css/modern/default.css';
```

This recommended Latin set includes weights 400, 600, and 700 in normal style.
For the same set with a WOFF fallback, use:

```js
import '@stefanthaler/lato2/css/default.css';
```

Apply the font family in your stylesheet:

```css
body {
  font-family: 'Lato', sans-serif;
}
```

Every ordinary CSS entry under `css/` has a corresponding entry with the same
relative path inside `css/modern/`. Individual subset entries live in `css/all/`
and `css/latin/`, and in `css/modern/all/` and `css/modern/latin/`, without subset
prefixes in their filenames. Subset aggregates live alongside individual entries
as `index.css`; the recommended sets are `css/default.css` and `css/modern/default.css`.

| WOFF2 + WOFF entry | WOFF2-only entry | Font selection |
| --- | --- | --- |
| `css/default.css` | `css/modern/default.css` | Recommended Latin set, weights 400/600/700, normal |
| `css/latin/400.css` | `css/modern/latin/400.css` | Latin, selected weight, normal |
| `css/latin/400-italic.css` | `css/modern/latin/400-italic.css` | Latin, selected weight, italic |
| `css/all/400.css` | `css/modern/all/400.css` | Full character set, selected weight, normal |
| `css/all/400-italic.css` | `css/modern/all/400-italic.css` | Full character set, selected weight, italic |
| `css/latin/index.css` | `css/modern/latin/index.css` | Latin, all weights and styles |
| `css/all/index.css` | `css/modern/all/index.css` | Full character set, all weights and styles |

The per-weight entries support weights 100 through 900 in steps of 100. Replace
`400` in the examples with the required weight. Import individual weights and
styles when you only need a few variants.

Ordinary entries in `css/default.css`, `css/all/`, and `css/latin/` use WOFF2 first, with WOFF as a fallback
for browsers without WOFF2 support. Modern entries require a browser with WOFF2 support
and use only WOFF2 sources, without a WOFF fallback. They preserve the font
family, weight, style, `font-display: swap`, and character set of the original
entry. Only the recommended `css/default.css` and `css/modern/default.css` entries include
weights 400, 600, and 700 in normal style. Both subset aggregates include all weights and styles
for their respective character sets, in both the original and modern variants.

## Package structure

All generated CSS lives under `css/`. Both variants share the 72 font files in
`fonts/`: 36 WOFF and 36 WOFF2 assets, with no separate modern resource directory.

```text
css/
├── default.css
├── all/                 # index.css and individual weights/styles
├── latin/               # index.css and individual weights/styles
└── modern/
    ├── default.css
    ├── all/             # index.css and individual weights/styles
    └── latin/           # index.css and individual weights/styles
fonts/
├── lato-*.woff
└── lato-*.woff2
scripts/
└── generate-css.mjs
```

## Migrating imports

This reorganization changes public CSS imports and direct font paths. Move all
CSS imports under `css/`, preserving the existing relative hierarchy:

- `default.css` to `css/default.css` and `modern/default.css` to `css/modern/default.css`.
- `all/400.css` to `css/all/400.css` and `latin/index.css` to `css/latin/index.css`.
- `modern/all/400.css` to `css/modern/all/400.css` and `modern/latin/index.css` to `css/modern/latin/index.css`.
- Font resource paths from `files/` to `fonts/`; individual filenames are unchanged.

If upgrading from an older layout, migrate directly to the final paths:

- `all-400.css` to `css/all/400.css` and `modern/latin-400.css` to `css/modern/latin/400.css`.
- `400.css` to `css/latin/400.css` and `modern/400.css` to `css/modern/latin/400.css`.
- `400-italic.css` to `css/latin/400-italic.css` and `modern/400-italic.css` to `css/modern/latin/400-italic.css`.
- `all.css` to `css/all/index.css` and `latin.css` to `css/latin/index.css`.
- `modern/all.css` to `css/modern/all/index.css` and `modern/latin.css` to `css/modern/latin/index.css`.
- `index.css` to `css/default.css` and `modern/index.css` to `css/modern/default.css`.
- Former root-level `*-modern.css` entries now live under `css/modern/`, without the suffix:
  `400-modern.css` to `css/modern/latin/400.css` and `index-modern.css` to `css/modern/default.css`.

The same rules apply to every weight and italic variant. No compatibility copies
or redirects are provided.

## Maintaining the CSS entries

All CSS entries are generated from the font selections and the `@font-face`
template in `scripts/generate-css.mjs`. Edit the generator, then regenerate
both sets, including their subset directories:

```sh
npm run build:css
```

The generator creates 78 CSS entries under `css/`: 1 directly in `css/` and 1
directly in `css/modern/`, plus 19 in each of `css/all/`, `css/latin/`,
`css/modern/all/`, and `css/modern/latin/`: 39 ordinary and 39 modern entries in total.
Font asset links point to the shared `fonts/` directory and are relative to each
CSS file's directory.

Do not edit the generated CSS files directly.

The same generator runs automatically before `npm pack` and `npm publish`.

## Resources

* https://www.latofonts.com/
* Font License: [SIL Open Font License 1.1](http://scripts.sil.org/OFL)
