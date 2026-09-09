import type { Meta, StoryObj } from "@nuxtjs/storybook"

import BaseButton from "./BaseButton.vue"

const meta = {
  args: { default: "Кнопка", type: "button", variant: "primary" },
  argTypes: {
    default: {
      control: "text",
      description: "Содержимое кнопки (слот по умолчанию)",
    },
    type: {
      control: "inline-radio",
      description: "Нативный type у <button>",
      options: ["button", "submit", "reset"],
    },
    variant: {
      control: "inline-radio",
      description: "Визуальный вариант кнопки",
      options: ["primary", "ghost"],
    },
  },
  component: BaseButton,
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: '<BaseButton v-bind="args">{{ args.default }}</BaseButton>',
  }),
  tags: ["autodocs"],
  title: "Shared/UI/BaseButton",
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { default: "Основная", variant: "primary" },
}

export const Ghost: Story = {
  args: { default: "Прозрачная", variant: "ghost" },
}

export const AllVariants: Story = {
  name: "Все варианты",
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseButton variant="primary">Основная</BaseButton>
        <BaseButton variant="ghost">Прозрачная</BaseButton>
      </div>
    `,
  }),
}

export const LongLabel: Story = {
  args: { default: "Добавить в корзину и перейти к оформлению" },
  name: "Длинная подпись",
}
