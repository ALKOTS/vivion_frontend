import type { Meta, StoryObj } from "@nuxtjs/storybook"

import SimpleButton from "./SimpleButton.vue"

const meta = {
  args: {
    disabled: false,
    icon: "icons:cart",
    showIcon: false,
    size: "m",
    text: "Связаться с нами",
    variant: "primary",
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description:
        "Нативный `disabled` у <button>: без hover, курсор not-allowed",
    },
    icon: {
      control: "inline-radio",
      description: "Имя иконки для <Icon>",
      options: ["icons:cart"],
    },
    showIcon: {
      control: "boolean",
      description: "Показывать иконку рядом с текстом",
    },
    size: {
      control: "inline-radio",
      description: "Размер кнопки",
      options: ["m", "s"],
    },
    text: {
      control: "text",
      description: "Подпись кнопки (не используется в варианте icon)",
    },
    variant: {
      control: "inline-radio",
      description: "Визуальный вариант кнопки",
      options: ["primary", "secondary-outline", "icon"],
    },
  },
  component: SimpleButton,
  tags: ["autodocs"],
  title: "Shared/UI/SimpleButton",
} satisfies Meta<typeof SimpleButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: "Связаться с нами", variant: "primary" },
}

export const SecondaryOutline: Story = {
  args: { text: "В каталог", variant: "secondary-outline" },
  name: "Secondary outline",
}

export const WithIcon: Story = {
  args: { showIcon: true, text: "В корзину", variant: "primary" },
  name: "С иконкой",
}

export const IconOnly: Story = {
  args: { icon: "icons:cart", variant: "icon" },
  name: "Только иконка",
}

export const Small: Story = {
  args: { showIcon: true, size: "s", text: "В корзину" },
  name: "Компактный размер",
}

export const Disabled: Story = {
  args: { disabled: true, showIcon: true, text: "В корзину" },
  name: "Выключенная",
}

export const AllVariants: Story = {
  name: "Все варианты",
  render: () => ({
    components: { SimpleButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <SimpleButton text="Основная" variant="primary" />
          <SimpleButton text="В корзину" variant="primary" icon="icons:cart" show-icon />
          <SimpleButton text="В каталог" variant="secondary-outline" />
          <SimpleButton text="В каталог" variant="secondary-outline" size="s" />
          <SimpleButton icon="icons:cart" variant="icon" />
        </div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <SimpleButton text="Основная" variant="primary" disabled />
          <SimpleButton text="В корзину" variant="primary" icon="icons:cart" show-icon disabled />
          <SimpleButton text="В каталог" variant="secondary-outline" disabled />
          <SimpleButton text="В каталог" variant="secondary-outline" size="s" disabled />
          <SimpleButton icon="icons:cart" variant="icon" disabled />
        </div>
      </div>
    `,
  }),
}

export const LongLabel: Story = {
  args: { text: "Добавить в корзину и перейти к оформлению" },
  name: "Длинная подпись",
}
