import type { StorybookConfig } from "@storybook-vue/nuxt"

const config: StorybookConfig = {
  framework: "@storybook-vue/nuxt",

  stories: ["../app/**/*.stories.@(ts|js)"],
}

export default config
