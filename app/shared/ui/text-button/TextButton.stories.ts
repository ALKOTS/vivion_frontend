import type { Meta, StoryObj } from "@nuxtjs/storybook"

import TextButton from "./TextButton.vue"

const meta = {
  args: { disabled: false, size: "m", text: "Доставка" },
  argTypes: {
    disabled: {
      control: "boolean",
      description:
        "Нативный `disabled` у <button>: без hover, курсор not-allowed",
    },
    size: {
      control: "inline-radio",
      description: "Размер: `m` — body-14, `s` — body-12",
      options: ["m", "s"],
    },
    text: { control: "text", description: "Подпись кнопки" },
    to: {
      control: "text",
      description: "Адрес ссылки; если задан, рендерится <NuxtLink>",
    },
  },
  component: TextButton,
  parameters: {
    docs: {
      description: {
        component: [
          "Текстовая кнопка без подчёркивания: пункты навигации подвала,",
          "служебные ссылки («Политика конфиденциальности»).",
          "",
          "С `to` рендерится как `<NuxtLink>`, без него — как `<button>`.",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  title: "Shared/UI/TextButton",
} satisfies Meta<typeof TextButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: { size: "s", text: "Политика конфиденциальности" },
  name: "Мелкая",
}

export const Link: Story = {
  args: { text: "Доставка", to: "#" },
  name: "Ссылка",
}

export const Disabled: Story = { args: { disabled: true }, name: "Выключенная" }

export const AllVariants: Story = {
  name: "Все варианты",
  render: () => ({
    components: { TextButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <TextButton text="Доставка" />
          <TextButton text="Доставка" to="#" />
          <TextButton text="Доставка" disabled />
        </div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <TextButton size="s" text="Политика конфиденциальности" />
          <TextButton size="s" text="Политика конфиденциальности" to="#" />
          <TextButton size="s" text="Политика конфиденциальности" disabled />
        </div>
      </div>
    `,
  }),
}
