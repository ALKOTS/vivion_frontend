import type { Meta, StoryObj } from "@nuxtjs/storybook"

import type { QuickFilter } from "../model/types"

import QuickFiltersCard from "./QuickFiltersCard.vue"

const filters = [
  {
    id: "classic",
    img: "/images/quick-filters/classic.png",
    name: "Классические",
  },
  {
    id: "pave",
    img: "/images/quick-filters/pave.png",
    name: "С бриллиантовой дорожкой",
  },
  {
    id: "three-stone",
    img: "/images/quick-filters/three-stone.png",
    name: "С тремя камнями",
  },
  { id: "halo", img: "/images/quick-filters/halo.png", name: "С ободком halo" },
  {
    id: "exclusive",
    img: "/images/quick-filters/exclusive.png",
    name: "Эксклюзивные помолвочные кольца",
  },
  { id: "all", img: "/images/quick-filters/all.png", name: "Смотреть всё" },
] satisfies QuickFilter[]

const [filter] = filters

const meta = {
  args: { ...filter, active: false, disabled: false, loading: false },
  argTypes: {
    active: {
      control: "boolean",
      description: "Выбранная карточка: подсвечена так же, как нажатая",
    },
    disabled: {
      control: "boolean",
      description:
        "Выключенная карточка: без ссылки и hover, курсор not-allowed",
    },
    id: { control: "text", description: "Идентификатор фильтра" },
    img: {
      control: "select",
      description: "Путь к картинке; фото ожидается с прозрачным фоном",
      options: filters.map(({ img }) => img),
    },
    loading: {
      control: "boolean",
      description:
        "Состояние загрузки: спиннер вместо картинки, клики не проходят",
    },
    name: { control: "text", description: "Подпись под картинкой" },
  },
  component: QuickFiltersCard,
  parameters: {
    docs: {
      description: {
        component: [
          "Карточка быстрого фильтра каталога: квадратная картинка на серой подложке",
          "и подпись капителью. Карточка целиком — кнопка: принимает любые",
          "нативные атрибуты <button>, обработчик вешают на `@click`.",
          "",
          "Фото ожидается с прозрачным фоном: подложка меняет цвет по состояниям,",
          "а осветляющий градиент к низу повторяет стиль `overlay/BottomLight`",
          "из макета.",
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

export const Active: Story = {
  args: { ...filter, active: true },
  name: "Выбранная",
  render: (args) => ({
    components: { QuickFiltersCard },
    setup: () => ({ args }),
    template: `<div style="width: 212px"><QuickFiltersCard v-bind="args" /></div>`,
  }),
}

export const Disabled: Story = {
  args: { ...filter, disabled: true },
  name: "Выключенная",
  render: (args) => ({
    components: { QuickFiltersCard },
    setup: () => ({ args }),
    template: `<div style="width: 212px"><QuickFiltersCard v-bind="args" /></div>`,
  }),
}

export const Loading: Story = {
  args: { ...filter, loading: true },
  name: "Загрузка",
  render: (args) => ({
    components: { QuickFiltersCard },
    setup: () => ({ args }),
    template: `<div style="width: 212px"><QuickFiltersCard v-bind="args" /></div>`,
  }),
}

export const AllStates: Story = {
  name: "Все состояния",
  parameters: {
    docs: {
      description: {
        story:
          "Hover видно только на живой карточке — наведите курсор. Нажатая карточка выглядит как выбранная.",
      },
    },
  },
  render: () => ({
    components: { QuickFiltersCard },
    setup: () => ({ filter }),
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 212px); gap: 24px;">
        <QuickFiltersCard v-bind="filter" name="Обычная" />
        <QuickFiltersCard v-bind="filter" name="Выбранная" active />
        <QuickFiltersCard v-bind="filter" name="Выключенная" disabled />
        <QuickFiltersCard v-bind="filter" name="Загрузка" loading />
      </div>
    `,
  }),
}

export const InList: Story = {
  name: "В списке",
  render: () => ({
    components: { QuickFiltersCard },
    setup: () => ({
      filters,
      onClick: (id: string) => console.log("filter", id),
    }),
    template: `
      <ul style="display: grid; grid-template-columns: repeat(6, 212px); gap: 24px; margin: 0; padding: 0; list-style: none;">
        <li v-for="filter in filters" :key="filter.id">
          <QuickFiltersCard v-bind="filter" @click="onClick(filter.id)" />
        </li>
      </ul>
    `,
  }),
}
