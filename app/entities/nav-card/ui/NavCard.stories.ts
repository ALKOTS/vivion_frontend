import type { Meta, StoryObj } from "@nuxtjs/storybook"

import type { NavCard as NavCardProps } from "../model/types"

import NavCard from "./NavCard.vue"

const card = {
  img: "/images/nav-cards/budget-1.jpg",
  label: "до 150 000 ₽",
  to: "/catalog/engagement-rings?price=0-150000",
} satisfies NavCardProps

const cards: NavCardProps[] = [
  card,
  {
    img: "/images/nav-cards/budget-1.jpg",
    label: "до 300 000 ₽",
    to: "/catalog/engagement-rings?price=150000-300000",
  },
  {
    img: "/images/nav-cards/budget-1.jpg",
    label: "до 500 000 ₽",
    to: "/catalog/engagement-rings?price=300000-500000",
  },
  {
    img: "/images/nav-cards/budget-1.jpg",
    label: "от 1 000 000 ₽",
    to: "/catalog/engagement-rings?price=1000000-",
  },
]

const meta = {
  args: { ...card, component: "div", size: "s" },
  argTypes: {
    component: {
      control: "inline-radio",
      description: "Тег обёртки: `li` — если карточка лежит в списке",
      options: ["div", "li"],
    },
    img: {
      control: "select",
      description:
        "Путь к квадратной картинке; без неё остаётся серая подложка",
      options: cards.map(({ img }) => img).filter(Boolean),
    },
    label: { control: "text", description: "Подпись капителью в нижнем углу" },
    size: {
      control: "inline-radio",
      description:
        "Размер карточки, l - дает заголовок и увеличенные размеры картинки",
      options: ["s", "l"],
    },
    title: {
      control: "text",
      description: "Заголовок в верхнем углу; в макете есть у крупной карточки",
    },
    to: { control: "text", description: "Адрес ссылки" },
  },
  component: NavCard,
  parameters: {
    docs: {
      description: {
        component: [
          "Навигационная карточка каталога: квадратное фото и подпись капителью",
          "в нижнем углу. Карточка целиком — ссылка.",
          "",
          "Пропорции 1:1 держит сама карточка, ширину задаёт родитель:",
          "в макете это колонка сетки шириной 330px.",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  title: "Entities/NavCard/NavCard",
} satisfies Meta<typeof NavCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Обычная карточка",
  render: (args) => ({
    components: { NavCard },
    setup: () => ({ args }),
    template: `<div style="width: 330px"><NavCard v-bind="args" /></div>`,
  }),
}

export const WithTitle: Story = {
  args: {
    ...card,
    size: "l",
    title: "Помолвочные кольца с крупным бриллиантом",
  },
  name: "С заголовком",
  render: (args) => ({
    components: { NavCard },
    setup: () => ({ args }),
    template: `<div style="width: 330px"><NavCard v-bind="args" /></div>`,
  }),
}

export const WithoutImage: Story = {
  args: { ...card, img: undefined },
  name: "Без картинки",
  render: (args) => ({
    components: { NavCard },
    setup: () => ({ args }),
    template: `<div style="width: 330px"><NavCard v-bind="args" /></div>`,
  }),
}

export const InList: Story = {
  args: { ...card, component: "li" },
  name: "В списке",
  render: () => ({
    components: { NavCard },
    setup: () => ({ cards }),
    template: `
      <ul style="display: grid; grid-template-columns: repeat(4, 330px); gap: 24px; margin: 0; padding: 0; list-style: none;">
        <NavCard v-for="card in cards" :key="card.to" v-bind="card" component="li" />
      </ul>
    `,
  }),
}
