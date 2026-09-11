import type { Meta, StoryObj } from "@nuxtjs/storybook"

import Badge from "./Badge.vue"

const meta = {
  args: { showTm: true, text: "LaVivion" },
  argTypes: {
    showTm: {
      control: "boolean",
      description: "Показывать значок ™ после текста",
    },
    text: {
      control: "text",
      description: "Текст плашки; без него остаётся только значок",
    },
  },
  component: Badge,
  tags: ["autodocs"],
  title: "Shared/UI/Badge",
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { showTm: true, text: "LaVivion" },
  name: "Бренд со значком",
}

export const TextOnly: Story = {
  args: { showTm: false, text: "Placeholder" },
  name: "Только текст",
}

export const TmOnly: Story = {
  args: { showTm: true, text: undefined },
  name: "Только значок",
}
