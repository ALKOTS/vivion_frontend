import type { Meta, StoryObj } from "@nuxtjs/storybook"

import AppFooter from "./AppFooter.vue"

const meta = {
  component: AppFooter,
  parameters: {
    docs: {
      description: {
        component: [
          "Подвал сайта: карта сайта в четыре колонки, иконки соцсетей, крупный",
          "логотип-водяной знак и строка с копирайтом и юридическими ссылками.",
          "",
          "Ширину задаёт родитель — в приложении это `.layout`. Колонки навигации",
          "и юридические ссылки лежат в `widgets/app-footer/model/navigation.ts`.",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Widgets/AppFooter",
} satisfies Meta<typeof AppFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "В макете страницы",
  render: () => ({
    components: { AppFooter },
    template: `<div class="layout"><AppFooter /></div>`,
  }),
}

export const FullWidth: Story = { name: "На всю ширину" }
