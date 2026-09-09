import vue from '@vitejs/plugin-vue'
import type { StorybookConfig } from '@storybook/vue3-vite'

import { fsdAliases, scssPreprocessorOptions } from '../config/scss'

const config: StorybookConfig = {
  // Истории лежат рядом с компонентами, внутри своих слайсов FSD.
  stories: ['../app/**/*.stories.@(ts|js)'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  viteFinal: (config) => {
    // `@storybook/vue3-vite` не подключает Vue-плагин сам, поэтому добавляем плагин здесь.
    config.plugins ??= []
    config.plugins.push(vue())

    // Storybook собирает не через Nuxt, поэтому алиасы слоёв и настройки Sass
    // нужно передать ему явно — из того же модуля, что читает nuxt.config.ts.
    config.resolve ??= {}
    config.resolve.alias = { ...config.resolve.alias, ...fsdAliases }

    config.css ??= {}
    config.css.preprocessorOptions = {
      ...config.css.preprocessorOptions,
      scss: scssPreprocessorOptions,
    }

    return config
  },
}

export default config
