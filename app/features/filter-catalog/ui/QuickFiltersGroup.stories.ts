import type { Meta, StoryObj } from "@nuxtjs/storybook"

import { ref } from "vue"

import type { QuickFilter } from "~/entities/quick-filter/model/types"

import QuickFiltersGroup from "./QuickFiltersGroup.vue"

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

const meta = {
  args: {
    disabledIds: ["halo", "exclusive"],
    filters,
    modelValue: "three-stone",
  },
  argTypes: {
    disabledIds: {
      control: "check",
      description: "Идентификаторы выключенных фильтров",
      options: filters.map(({ id }) => id),
    },
    filters: { control: "object", description: "Быстрые фильтры" },
    modelValue: {
      control: "select",
      description: "Идентификатор выбранного фильтра (`v-model`)",
      options: filters.map(({ id }) => id),
    },
  },
  component: QuickFiltersGroup,
  parameters: {
    docs: {
      description: {
        component: [
          "Ряд быстрых фильтров каталога, сетка 6 × 1. Управляемый компонент:",
          "выбранный фильтр приходит через `v-model`, а сам выбор в адресе",
          "страницы держит композабл `useCatalogFilter`.",
          "",
          "Карточка «Смотреть всё» — сброс, она никогда не подсвечивается.",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { QuickFiltersGroup },
    setup: () => {
      const selected = ref(args.modelValue)

      return { args, selected }
    },
    template: `
      <div style="padding: 24px">
        <QuickFiltersGroup v-bind="args" v-model="selected" />
        <p style="margin-top: 24px">Выбрано: <code>{{ selected }}</code></p>
      </div>
    `,
  }),
  tags: ["autodocs"],
  title: "Features/FilterCatalog/QuickFiltersGroup",
} satisfies Meta<typeof QuickFiltersGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "С выбранным фильтром" }

export const NothingSelected: Story = {
  args: { modelValue: "all" },
  name: "Ничего не выбрано",
}

export const Few: Story = {
  args: { disabledIds: [], filters: filters.slice(0, 3) },
  name: "Мало фильтров",
}

export const Empty: Story = { args: { filters: [] }, name: "Без фильтров" }
