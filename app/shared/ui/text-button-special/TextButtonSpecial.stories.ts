import type { Meta, StoryObj } from "@nuxtjs/storybook"

import TextButtonSpecial from "./TextButtonSpecial.vue"

const meta = {
  args: {
    component: "button",
    disabled: false,
    loading: false,
    text: "Смотреть все",
    variant: "primary",
  },
  argTypes: {
    badge: {
      control: "text",
      description: 'Текст плашки; только для `variant="badge"`',
    },
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
      description: "Имя иконки для <Icon>; только для `startIcon` / `endIcon`",
      options: ["icons:cart", "icons:heart"],
    },
    loading: {
      control: "boolean",
      description: "Состояние загрузки: вместо содержимого спиннер",
    },
    text: { control: "text", description: "Подпись кнопки" },
    to: {
      control: "text",
      description: 'Адрес ссылки; только для `component="link"`',
    },
    variant: {
      control: "inline-radio",
      description: "Визуальный вариант; от него зависит набор пропсов",
      options: ["primary", "badge", "startIcon", "endIcon"],
    },
  },
  component: TextButtonSpecial,
  parameters: {
    docs: {
      description: {
        component: [
          "Текстовая кнопка с подчёркиванием: «Смотреть все», переходы к разделам.",
          "",
          "Пропсы — дискриминированный union по `variant`: `badge` принимает",
          "`badge`, `startIcon` / `endIcon` — `icon`, `primary` — только текст.",
          "В контролах ниже все поля показаны сразу; лишние для выбранного",
          "варианта игнорируются.",
          "",
          'По умолчанию рендерится как `<button>`; с `component="link"` — как',
          "`<NuxtLink>` с адресом из `to`.",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  title: "Shared/UI/TextButtonSpecial",
} satisfies Meta<typeof TextButtonSpecial>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { text: "Смотреть все", variant: "primary" },
}

export const WithBadge: Story = {
  args: { badge: "+12", text: "Смотреть все", variant: "badge" },
  name: "С плашкой",
}

export const StartIcon: Story = {
  args: { icon: "icons:cart", text: "В корзину", variant: "startIcon" },
  name: "Иконка слева",
}

export const EndIcon: Story = {
  args: { icon: "icons:cart", text: "В корзину", variant: "endIcon" },
  name: "Иконка справа",
}

export const Loading: Story = {
  args: { loading: true, text: "Смотреть все" },
  name: "Загрузка",
}

export const Disabled: Story = {
  args: { disabled: true, text: "Смотреть все", variant: "badge" },
  name: "Выключенная",
}

export const AsLink: Story = {
  args: {
    badge: "+22",
    component: "link",
    text: "Все статьи",
    to: "/blog",
    variant: "badge",
  },
  name: "Как ссылка",
}

export const AllVariants: Story = {
  name: "Все варианты",
  render: () => ({
    components: { TextButtonSpecial },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <TextButtonSpecial text="Смотреть все" />
          <TextButtonSpecial badge="+12" text="Смотреть все" variant="badge" />
          <TextButtonSpecial icon="icons:cart" text="В корзину" variant="startIcon" />
          <TextButtonSpecial icon="icons:cart" text="В корзину" variant="endIcon" />
          <TextButtonSpecial loading text="Смотреть все" />
        </div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <TextButtonSpecial text="Смотреть все" disabled />
          <TextButtonSpecial badge="+12" text="Смотреть все" variant="badge" disabled />
          <TextButtonSpecial icon="icons:cart" text="В корзину" variant="startIcon" disabled />
          <TextButtonSpecial icon="icons:cart" text="В корзину" variant="endIcon" disabled />
        </div>
      </div>
    `,
  }),
}
