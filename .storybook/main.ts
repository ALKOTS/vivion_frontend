import type { StorybookConfig } from "@storybook-vue/nuxt"

const config: StorybookConfig = {
  framework: "@storybook-vue/nuxt",

  // Чтобы картинки из public/ (например, фото товара) открывались и в статической сборке.
  staticDirs: ["../public"],

  stories: ["../app/**/*.stories.@(ts|js)"],
}

export default config
