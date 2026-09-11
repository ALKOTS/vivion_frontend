import type { Meta, StoryObj } from "@nuxtjs/storybook"

import AppHeader from "./AppHeader.vue"

const meta = {
  component: AppHeader,
  parameters: {
    docs: {
      description: {
        component: [
          "Шапка сайта: логотип, главное меню, сервисные иконки и кнопка «Связаться с нами».",
          "",
          "Ширину задаёт родитель — в приложении это `.layout`. Пункты меню лежат в",
          "`widgets/app-header/model/navigation.ts`.",
          "",
          "Главное меню показывается от `lg` (1280px), кнопка связи — от `md` (768px):",
          "мобильная навигация в макете пока не описана.",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Widgets/AppHeader",
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "В макете страницы",
  render: () => ({
    components: { AppHeader },
    template: `<div class="layout"><AppHeader /></div>`,
  }),
}

export const FullWidth: Story = { name: "На всю ширину" }
