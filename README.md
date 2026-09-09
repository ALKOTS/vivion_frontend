# LaVivion

Nuxt 4 + TypeScript + SCSS, organised with [Feature-Sliced Design](https://feature-sliced.design/).

## Getting started

```bash
bun install
bun run dev      # http://localhost:3000
```

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `bun run dev`       | Dev server with HMR                                       |
| `bun run build`     | Production build into `.output/`                          |
| `bun run preview`   | Serve the production build                                |
| `bun run generate`  | Static prerender                                          |
| `bun run tokens`    | Regenerate SCSS from the Figma exports in `tokens/`        |
| `bun run typecheck` | `vue-tsc` over the whole project                          |

## Structure

Nuxt's `app/` directory is the source root, and the FSD layers live inside it. The FSD
**app** layer is Nuxt's own convention set (`app.vue`, `layouts/`, `styles/`, `nuxt.config.ts`).

```
app/
├── app.vue              # root component: <NuxtLayout><NuxtPage /></NuxtLayout>
├── layouts/             # app layer -- default.vue and friends
├── styles/              # app layer -- global CSS (reset, base, fonts)
├── pages/               # pages layer -- also Nuxt's file-based router
├── widgets/             # composite page sections (header, sidebar, ...)
├── features/            # user actions that carry business value
├── entities/            # business entities (user, product, ...)
└── shared/              # reusable, business-agnostic code
    ├── ui/              #   design-system primitives
    ├── lib/  api/  config/  types/
    └── styles/          #   SCSS abstracts + generated design tokens

tokens/                  # drop Figma token exports here (see tokens/README.md)
scripts/build-tokens.mjs # tokens/*.json -> app/shared/styles/tokens/*.scss
```

Each layer has a `README.md` spelling out what belongs in it. The import rule is
one-directional: a layer may only import from layers **below** it.

```
app -> pages -> widgets -> features -> entities -> shared
```

### Imports

Path aliases exist for every layer (`@shared`, `@entities`, `@features`, `@widgets`,
`@pages`, `@app`), alongside Nuxt's usual `~/`:

## Styles

`app/shared/styles/_abstracts.scss` is injected into every stylesheet and every
`<style lang="scss">` block, so the breakpoint mixins and helpers are always in scope
without an `@use` line. Design tokens are used as plain CSS custom properties:

```vue
<style scoped lang="scss">
.card {
  padding: var(--spacing-200);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);

  @include up(md) {
    padding: var(--spacing-400);
  }
}
</style>
```

### Breakpoints

```scss
$breakpoints: (sm: 0, md: 768px, lg: 1280px, xl: 1536px, xxl: 1920px);
```

`sm` is the mobile-first base at `0`, so `up(sm)` emits its content with no media query.
`down()` stops 0.02px short of the next breakpoint, so `up(md)` and `down(sm)` never both
match the same width.

| Mixin              | Result                  |
| ------------------ | ----------------------- |
| `up(md)`           | `min-width: 768px`      |
| `down(md)`         | `max-width: 1279.98px`  |

The scale is defined once in `app/shared/styles/_breakpoints.scss`; the token generator
parses that same map rather than keeping its own copy.

## Design tokens

`tokens/` is the drop point for Figma exports (W3C DTCG or Tokens Studio format).
`bun run tokens` compiles them into two generated, committed files:

- `app/shared/styles/tokens/_css-vars.scss` — the custom properties, loaded once
- `app/shared/styles/tokens/_variables.scss` — base values as Sass literals, for the rare
  case that needs compile-time maths