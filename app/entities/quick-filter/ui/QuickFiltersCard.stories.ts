import type { Meta, StoryObj } from "@nuxtjs/storybook"

import type { QuickFilter } from "../model/types"

import QuickFiltersCard from "./QuickFiltersCard.vue"

const filters = [
  {
    id: "classic",
    img: "/images/quick-filters/classic.png",
    name: "Классические",
    to: "/catalog?style=classic",
  },
  {
    id: "pave",
    img: "/images/quick-filters/pave.png",
    name: "С бриллиантовой дорожкой",
    to: "/catalog?style=pave",
  },
  {
    id: "three-stone",
    img: "/images/quick-filters/three-stone.png",
    name: "С тремя камнями",
    to: "/catalog?style=three-stone",
  },
  {
    id: "halo",
    img: "/images/quick-filters/halo.png",
    name: "С ободком halo",
    to: "/catalog?style=halo",
  },
  {
    id: "exclusive",
    img: "/images/quick-filters/exclusive.png",
    name: "Эксклюзивные помолвочные кольца",
    to: "/catalog?style=exclusive",
  },
  {
    id: "all",
    img: "/images/quick-filters/all.png",
    name: "Смотреть всё",
    to: "/catalog",
  },
] satisfies QuickFilter[]

const [filter] = filters

const meta = {
  args: { ...filter, component: "div" },
  argTypes: {
    component: {
      control: "inline-radio",
      description: "Тег обёртки: `li` — если карточка лежит в списке",
      options: ["div", "li"],
    },
    id: { control: "text", description: "Идентификатор фильтра" },
    img: {
      control: "select",
      description: "Путь к картинке; фото ожидается на белом фоне",
      options: filters.map(({ img }) => img),
    },
    name: { control: "text", description: "Подпись под картинкой" },
    to: { control: "text", description: "Куда ведёт карточка" },
  },
  component: QuickFiltersCard,
  parameters: {
    docs: {
      description: {
        component: [
          "Карточка быстрого фильтра каталога: квадратная картинка на серой подложке",
          "и подпись капителью. Карточка целиком — ссылка.",
          "",
          "Фото ожидается на белом фоне: за счёт `mix-blend-mode: darken` белый",
          "растворяется в подложке, а осветляющий градиент к низу повторяет",
          "стиль `overlay/BottomLight` из макета.",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  title: "Entities/QuickFilter/QuickFiltersCard",
} satisfies Meta<typeof QuickFiltersCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Обычная карточка",
  render: (args) => ({
    components: { QuickFiltersCard },
    setup: () => ({ args }),
    template: `<div style="width: 212px"><QuickFiltersCard v-bind="args" /></div>`,
  }),
}

export const LongName: Story = {
  args: { ...filters[4] },
  name: "Длинная подпись",
  render: (args) => ({
    components: { QuickFiltersCard },
    setup: () => ({ args }),
    template: `<div style="width: 212px"><QuickFiltersCard v-bind="args" /></div>`,
  }),
}

export const WithoutImage: Story = {
  args: { ...filter, img: undefined },
  name: "Без картинки",
  render: (args) => ({
    components: { QuickFiltersCard },
    setup: () => ({ args }),
    template: `<div style="width: 212px"><QuickFiltersCard v-bind="args" /></div>`,
  }),
}

export const InList: Story = {
  name: "В списке",
  render: () => ({
    components: { QuickFiltersCard },
    setup: () => ({ filters }),
    template: `
      <ul style="display: grid; grid-template-columns: repeat(6, 212px); gap: 24px; margin: 0; padding: 0; list-style: none;">
        <QuickFiltersCard v-for="filter in filters" :key="filter.id" v-bind="filter" component="li" />
      </ul>
    `,
  }),
}
