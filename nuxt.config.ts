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

  image: {
    format: ["webp"],
    screens: { lg: 1280, md: 768, sm: 320, xl: 1536, xxl: 1920 },
  },

  // Локальные SVG доступны через <Icon>: иконки интерфейса — `icons:cart`,
  // брендовая графика (логотип) — `brand:logo`.
  icon: {
    customCollections: [
      { prefix: 'icons', dir: './app/assets/icons' },
      { prefix: 'brand', dir: './app/assets/brand' },
    ],
  },

  hooks: {
    // @storybook-vue/nuxt регистрирует подмену useRoute/useRouter по абсолютному пути
    // с обратными слэшами; на Windows они превращаются в escape-последовательности
    // внутри сгенерированного import и Storybook не собирается. Приводим к POSIX.
    'imports:sources': (presets) => {
      const push = presets.push.bind(presets)
      presets.push = (...items) =>
        push(
          ...items.map((preset) =>
            'from' in preset && typeof preset.from === 'string'
              ? { ...preset, from: preset.from.replaceAll('\\', '/') }
              : preset,
          ),
        )
    },
  },

  nitro: {
    devStorage: { cache: { driver: 'memory' } },
  },

  typescript: {
    typeCheck: false, // включить, когда `vue-tsc` появится в CI
    strict: true,
  },

  vite: {
    css: {
      preprocessorOptions: { scss: scssPreprocessorOptions },
    },

    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },


  fonts: {
    defaults: {
      weights: [300, 400, 500],
      styles: ['normal', 'italic'],
    },
    families: [{ name: 'Suisse Intl', provider: 'local', global: true }],
  },

  modules: ['@nuxt/icon', '@nuxt/fonts', '@nuxt/image'],

})