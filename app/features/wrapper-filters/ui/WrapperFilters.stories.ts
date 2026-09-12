import type { Meta, StoryObj } from "@nuxtjs/storybook"

import WrapperFilters from "./WrapperFilters.vue"

const meta = {
  component: WrapperFilters,
  parameters: {
    docs: {
      description: {
        component: [
          "Полоса с кнопкой «Фильтры» над каталогом: линии сверху и снизу,",
          "ширина — от родителя.",
          "",
          "Пока заглушка — кнопка ничего не открывает.",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  title: "Features/WrapperFilters/WrapperFilters",
} satisfies Meta<typeof WrapperFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "По умолчанию" }
