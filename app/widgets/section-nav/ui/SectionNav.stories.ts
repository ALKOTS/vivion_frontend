import type { Meta, StoryObj } from "@nuxtjs/storybook"

import type { QuickFilter } from "~/entities/quick-filter/model/types"

import QuickFiltersGroup from "~/features/filter-catalog/ui/QuickFiltersGroup.vue"
import WrapperFilters from "~/features/wrapper-filters/ui/WrapperFilters.vue"

import SectionNav from "./SectionNav.vue"

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
  { id: "all", img: "/images/quick-filters/all.png", name: "Смотреть всё" },
] satisfies QuickFilter[]

const meta = {
  component: SectionNav,
  parameters: {
    docs: {
      description: {
        component: [
          "Навигационный блок каталога: складывает переданные в слот секции",
          "вертикально с общим отступом. Сам по себе ничего не рендерит —",
          "содержимое полностью задаёт страница.",
          "",
          "На главной внутри лежат `QuickFiltersGroup` и `WrapperFilters`.",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  title: "Widgets/SectionNav",
} satisfies Meta<typeof SectionNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Как на главной",
  render: () => ({
    components: { QuickFiltersGroup, SectionNav, WrapperFilters },
    setup: () => ({ filters }),
    template: `
      <div class="layout">
        <SectionNav>
          <QuickFiltersGroup :filters model-value="classic" />
          <WrapperFilters />
        </SectionNav>
      </div>
    `,
  }),
}

export const OnlyFilters: Story = {
  name: "Только полоса фильтров",
  render: () => ({
    components: { SectionNav, WrapperFilters },
    template: `
      <div class="layout">
        <SectionNav>
          <WrapperFilters />
        </SectionNav>
      </div>
    `,
  }),
}
