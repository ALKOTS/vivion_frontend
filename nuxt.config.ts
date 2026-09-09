// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

const srcDir = fileURLToPath(new URL('./app', import.meta.url))

/**
 * Prepend the SCSS abstracts (tokens, mixins) to every stylesheet and
 * every `<style lang="scss">` block, so nothing has to `@use` them by hand.
 *
 * Files inside `shared/styles` are skipped -- they *are* the abstracts, and
 * injecting the entrypoint into itself would be a circular `@use`.
 */
const injectAbstracts = (source: string, filename: string) => {
  const normalized = filename.replaceAll('\\', '/')
  if (normalized.includes('/shared/styles/')) return source

  return `@use "shared/styles/abstracts" as *;\n${source}`
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/styles/main.scss'],

  // Feature-Sliced Design layers. `app` (this config, app.vue, layouts, styles) and
  // `pages` are Nuxt's own conventions; the rest are plain FSD.
  alias: {
    '@app': `${srcDir}`,
    '@pages': `${srcDir}/pages`,
    '@widgets': `${srcDir}/widgets`,
    '@features': `${srcDir}/features`,
    '@entities': `${srcDir}/entities`,
    '@shared': `${srcDir}/shared`,
  },

  // Auto-import components from each layer's `ui` segment, without a path prefix:
  // `entities/product/ui/ProductCard.vue` -> <ProductCard />
  components: [
    { path: '~/shared/ui', pattern: '**/*.vue', pathPrefix: false },
    { path: '~/entities', pattern: '*/ui/**/*.vue', pathPrefix: false },
    { path: '~/features', pattern: '*/ui/**/*.vue', pathPrefix: false },
    { path: '~/widgets', pattern: '*/ui/**/*.vue', pathPrefix: false },
  ],

  // Auto-import composables and helpers from the `model` / `lib` / `config` segments.
  imports: {
    dirs: [
      'shared/config',
      'shared/lib',
      'shared/lib/**',
      'entities/*/model',
      'entities/*/lib',
      'features/*/model',
      'features/*/lib',
      'widgets/*/model',
    ],
  },

  typescript: {
    typeCheck: false, // flip on once `vue-tsc` is added to CI
    strict: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Lets stylesheets `@use "shared/styles/..."` from anywhere.
          loadPaths: [srcDir],
          additionalData: injectAbstracts,
        },
      },
    },
  },
})
