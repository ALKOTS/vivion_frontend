// https://nuxt.com/docs/api/configuration/nuxt-config
import { fsdAliases, scssPreprocessorOptions } from './config/scss'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
    },
  },

  css: ['~/styles/main.scss'],

  // Слои Feature-Sliced Design. `app` (этот конфиг, app.vue, layouts, styles) и
  // `pages` — это соглашения самого Nuxt; остальное — обычный FSD.
  alias: fsdAliases,

  // Автоимпорт компонентов из сегмента `ui` каждого слоя, без префикса пути:
  // `entities/product/ui/ProductCard.vue` -> <ProductCard />
  components: [
    { path: '~/shared/ui', pattern: '**/*.vue', pathPrefix: false },
    { path: '~/entities', pattern: '*/ui/**/*.vue', pathPrefix: false },
    { path: '~/features', pattern: '*/ui/**/*.vue', pathPrefix: false },
    { path: '~/widgets', pattern: '*/ui/**/*.vue', pathPrefix: false },
  ],

  // Автоимпорт композаблов и хелперов из сегментов `model` / `lib` / `config`.
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
    typeCheck: false, // включить, когда `vue-tsc` появится в CI
    strict: true,
  },

  vite: {
    css: {
      preprocessorOptions: { scss: scssPreprocessorOptions },
    },
  },


  fonts: {
    defaults: {
      weights: [300, 500],
      styles: ['normal', 'italic'],
    },
    families: [{ name: 'Suisse Intl', provider: 'local', global: true }],
  },

  modules: ['nuxt-icons', '@nuxt/icon', '@nuxt/fonts'],

})