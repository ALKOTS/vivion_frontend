import type { Meta, StoryObj } from "@nuxtjs/storybook"

import FavouriteBtn from "./FavouriteBtn.vue"

const meta = {
  args: { id: "lyre" },
  argTypes: {
    id: {
      control: "text",
      description: "Идентификатор товара, который добавляем в избранное",
    },
  },
  component: FavouriteBtn,
  parameters: {
    docs: {
      description: {
        component:
          "Заглушка: на клик показывает спиннер одну секунду и пишет в консоль.",
      },
    },
  },
  tags: ["autodocs"],
  title: "Entities/ProductItem/FavouriteBtn",
} satisfies Meta<typeof FavouriteBtn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { id: "lyre" }, name: "По умолчанию" }
