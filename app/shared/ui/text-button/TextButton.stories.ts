import type { Meta, StoryObj } from "@nuxtjs/storybook"

import TextButton from "./TextButton.vue"

const meta = {
  args: {
    component: "button",
    disabled: false,
    size: "m",
    text: "Доставка",
    variant: "secondary",
  },
  argTypes: {
    component: {
      control: "inline-radio",
      description:
        "Чем рендерить: `button` — нативная <button>, `link` — <NuxtLink> с адресом из `to`",
      options: ["button", "link"],
    },
    disabled: {
      control: "boolean",
      description:
        "Нативный `disabled` у <button>: без hover, курсор not-allowed",
    },
    icon: {
      control: "inline-radio",
      description: "Имя иконки для <Icon> после текста",
      options: [undefined, "icons:filter", "icons:cart"],
    },
    size: {
      control: "inline-radio",
      description:
        "Размер: `m` — body-14, `s` — body-12; на `primary` не влияет",
      options: ["m", "s"],
    },
    text: { control: "text", description: "Подпись кнопки" },
    to: {
      control: "text",
      description:
        'Адрес ссылки; уходит в <NuxtLink> через `$attrs`, только для `component="link"`',
    },
    variant: {
      control: "inline-radio",
      description:
        "Визуальный вариант: `secondary` — обычный текст, `primary` — капс heading-12",
      options: ["secondary", "primary"],
    },
  },
  component: TextButton,
  parameters: {
    docs: {
      description: {
        component: [
          "Текстовая кнопка без подчёркивания.",
          "",
          "`secondary` — обычный текст: пункты навигации подвала, служебные",
          "ссылки («Политика конфиденциальности»). `primary` — капс с иконкой:",
          "кнопка «Фильтры» над каталогом.",
          "",
          'По умолчанию рендерится как `<button>`; с `component="link"` — как',
          "`<NuxtLink>`, `to` и остальные его пропсы уходят через `$attrs`.",
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

export const Primary: Story = {
  args: { icon: "icons:filter", text: "Фильтры", variant: "primary" },
  name: "Primary с иконкой",
}

export const Link: Story = {
  args: { component: "link", text: "Доставка", to: "#" },
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
          <TextButton component="link" text="Доставка" to="#" />
          <TextButton text="Доставка" disabled />
        </div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <TextButton size="s" text="Политика конфиденциальности" />
          <TextButton component="link" size="s" text="Политика конфиденциальности" to="#" />
          <TextButton size="s" text="Политика конфиденциальности" disabled />
        </div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <TextButton text="Фильтры" variant="primary" />
          <TextButton icon="icons:filter" text="Фильтры" variant="primary" />
          <TextButton icon="icons:filter" text="Фильтры" variant="primary" disabled />
        </div>
      </div>
    `,
  }),
}
