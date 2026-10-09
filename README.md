# Lato 2.0 font

Node package for Lato 2.0 font.

## Installation

```sh
npm install @stefanthaler/lato2
```

## Default import

For bundlers and other tools that support CSS imports, the package root resolves
to `css/default.css`:

```js
import '@stefanthaler/lato2';
```

This recommended Latin set includes weights 400, 600, and 700 in normal style,
using only WOFF2 sources. It is not the full set of weights and
styles. The entry point is CSS, not a JavaScript module for execution in Node.js.
Use an explicit legacy import when you need a WOFF fallback for older browsers.

## WOFF2-only imports

The main CSS entries in `css/default.css`, `css/all/`, and `css/latin/` use only
WOFF2 sources. The explicit equivalent of the package root import is:

```js
import '@stefanthaler/lato2/css/default.css';
```

## Legacy imports (WOFF fallback)

For the same font selection with WOFF2 first and WOFF as a fallback, use this
alternative instead of the main import:

```js
import '@stefanthaler/lato2/css/legacy/default.css';
```

The `legacy/` name refers to support for older browsers without WOFF2 support,
not to a different character set or older fonts. Choose one variant per entry;
you do not need to import both.

## Choosing an entry

Apply the font family in your stylesheet:

```css
body {
  font-family: 'Lato', sans-serif;
}
```

Every main CSS entry has a corresponding entry with the same relative path
inside `css/legacy/`. Individual subset entries live in `css/all/`
and `css/latin/`, and in `css/legacy/all/` and `css/legacy/latin/`, without subset
prefixes in their filenames. Subset aggregates live alongside individual entries
as `index.css`; the recommended sets are `css/default.css` and `css/legacy/default.css`.

| WOFF2-only entry           | Legacy WOFF2 + WOFF entry         | Font selection                                     |
|----------------------------|-----------------------------------|----------------------------------------------------|
| `css/default.css`          | `css/legacy/default.css`          | Recommended Latin set, weights 400/600/700, normal |
| `css/latin/400.css`        | `css/legacy/latin/400.css`        | Latin, selected weight, normal                     |
| `css/latin/400-italic.css` | `css/legacy/latin/400-italic.css` | Latin, selected weight, italic                     |
| `css/all/400.css`          | `css/legacy/all/400.css`          | Full character set, selected weight, normal        |
| `css/all/400-italic.css`   | `css/legacy/all/400-italic.css`   | Full character set, selected weight, italic        |
| `css/latin/index.css`      | `css/legacy/latin/index.css`      | Latin, all weights and styles                      |
| `css/all/index.css`        | `css/legacy/all/index.css`        | Full character set, all weights and styles         |

The per-weight entries support weights 100 through 900 in steps of 100. Replace
`400` in the examples with the required weight. Import individual weights and
styles when you only need a few variants.

Main entries require a browser with WOFF2 support. Legacy entries add WOFF as a
fallback, in that order; listing both formats does not require a browser to load
both files. Both variants use the same font family, weight, style,
`font-display: swap`, and character set. Only the recommended `default.css`
entries include weights 400, 600, and 700 in normal style. Each subset aggregate
includes all 18 faces (weights 100 through 900, italic and normal) for its
character set, in both variants.

## Package structure

All generated CSS lives under `css/`. Both variants share the 72 font files in
`fonts/`: 36 WOFF and 36 WOFF2 assets, with no separate legacy resource directory.
The package still includes all 72 font files regardless of which CSS you import.

The npm package contains the ready-to-use `css/` and `fonts/` directories,
including `fonts/OFL.txt`, plus `package.json`, `README.md`, and `LICENSE`.
Development scripts and IDE files are not included. The following tree shows
the repository layout; `scripts/` is available only in the repository.

```text
css/
├── default.css          # WOFF2-only recommended Latin set
├── all/                 # index.css and individual weights/styles
├── latin/               # index.css and individual weights/styles
└── legacy/              # WOFF2 + WOFF
    ├── default.css
    ├── all/             # index.css and individual weights/styles
    └── latin/           # index.css and individual weights/styles
fonts/
├── lato-*.woff
├── lato-*.woff2
└── OFL.txt
scripts/
└── generate-css.mjs
```

## Migrating imports to 2.0.0

Version 2.0.0 is a major release with breaking changes to public CSS imports and
direct font paths compared with 1.x, and WOFF2-only is now the default.

### From the previous CSS layout

Former WOFF2-only paths move from `css/modern/<entry>` to `css/<entry>`:

- `css/modern/default.css` to `css/default.css`.
- `css/modern/all/400.css` to `css/all/400.css` and `css/modern/latin/index.css` to `css/latin/index.css`.

Former WOFF2 + WOFF paths move from `css/<entry>` to `css/legacy/<entry>` if you
need to preserve WOFF support:

- `css/default.css` to `css/legacy/default.css`.
- `css/all/400.css` to `css/legacy/all/400.css` and `css/latin/index.css` to `css/legacy/latin/index.css`.

**Existing main paths still exist, but no longer contain a WOFF fallback.** If
you do not need WOFF, you can keep those imports, accepting the changed behavior.
The package root import also intentionally loses its WOFF fallback; use
`css/legacy/default.css` explicitly to retain it. The `css/modern/` directory is
removed, without compatibility copies or redirects.

### From 1.x and earlier intermediate layouts

Migrate directly to the final paths. The ordinary examples below retain WOFF
fallback by selecting legacy entries; former modern entries select the main
WOFF2-only entries:

- `default.css` to `css/legacy/default.css` and `modern/default.css` to `css/default.css`.
- `all/400.css` to `css/legacy/all/400.css` and `latin/index.css` to `css/legacy/latin/index.css`.
- `modern/all/400.css` to `css/all/400.css` and `modern/latin/index.css` to `css/latin/index.css`.
- Font resource paths from `files/` to `fonts/`; individual filenames are unchanged.

- `all-400.css` to `css/legacy/all/400.css` and `modern/latin-400.css` to `css/latin/400.css`.
- `400.css` to `css/legacy/latin/400.css` and `modern/400.css` to `css/latin/400.css`.
- `400-italic.css` to `css/legacy/latin/400-italic.css` and `modern/400-italic.css` to `css/latin/400-italic.css`.
- `all.css` to `css/legacy/all/index.css` and `latin.css` to `css/legacy/latin/index.css`.
- `modern/all.css` to `css/all/index.css` and `modern/latin.css` to `css/latin/index.css`.
- `index.css` to `css/legacy/default.css` and `modern/index.css` to `css/default.css`.
- Former root-level `*-modern.css` entries now live under `css/`, without the suffix:
  `400-modern.css` to `css/latin/400.css` and `index-modern.css` to `css/default.css`.

The same rules apply to every weight and italic variant. No compatibility copies
or redirects are provided.

## Maintaining the CSS entries

Run these development commands from a repository checkout, not from the
installed npm package.

All CSS entries are generated from the font selections and the `@font-face`
template in `scripts/generate-css.mjs`. Edit the generator, then regenerate
both sets, including their subset directories:

```sh
npm run build:css
```

The generator creates 78 CSS entries under `css/`: 1 directly in `css/` and 1
directly in `css/legacy/`, plus 19 in each of `css/all/`, `css/latin/`,
`css/legacy/all/`, and `css/legacy/latin/`: 39 WOFF2-only and 39 legacy entries in total.
Font asset links point to the shared `fonts/` directory and are relative to each
CSS file's directory.

Do not edit the generated CSS files directly.

The same generator runs automatically before `npm pack` and `npm publish`.

## License

Package code and tooling are licensed under the [Apache License 2.0](LICENSE).
The font files are licensed under the [SIL Open Font License 1.1](fonts/OFL.txt),
with the original copyright 2011-2015 by tyPoland Lukasz Dziedzic and Reserved
Font Name "Lato". The full font license and original notices are included in
`fonts/OFL.txt`; the font binaries and their embedded notices are unchanged.

The package metadata uses `(Apache-2.0 AND OFL-1.1)` to describe these separately
licensed components. This is not a choice between licenses and does not mean
that every file is licensed under both.

## Resources

* https://www.latofonts.com/
* Font License: [SIL Open Font License 1.1](http://scripts.sil.org/OFL)
