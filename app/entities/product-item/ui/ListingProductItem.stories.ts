import type { Meta, StoryObj } from "@nuxtjs/storybook"

import SimpleButton from "~/shared/ui/simple-button/SimpleButton.vue"

import type { Product } from "../model/types"

import ListingProductItem from "./ListingProductItem.vue"

const product = {
  id: "lyre",
  img: "/images/ring1.png",
  materials: ["white", "yellow", "rose", "platinum"],
  name: "Lyre / Лира",
  price: "от 166 350 ₽",
  productType: "Помолвочное кольцо",
  trademark: "Placeholder",
} satisfies Product

const meta = {
  args: { ...product, component: "div", size: "s" },
  argTypes: {
    component: {
      control: "inline-radio",
      description: "Тег обёртки: `li` — если карточка лежит в списке",
      options: ["div", "li"],
    },
    id: { control: "text", description: "Идентификатор товара для ссылки" },
    img: {
      control: "inline-radio",
      description: "Путь к фото товара",
      options: ["/images/ring1.png", "/images/ring2.png"],
    },
    materials: {
      control: "check",
      description:
        "Металлы: `white` — белое золото, `yellow` — жёлтое, `rose` — розовое, `platinum` — платина",
      options: ["white", "yellow", "rose", "platinum"],
    },
    name: { control: "text", description: "Название товара" },
    price: { control: "text", description: "Отформатированная цена" },
    productType: { control: "text", description: "Тип изделия" },
    size: {
      control: "inline-radio",
      description: "Размер карточки; задаёт размер запрашиваемой картинки",
      options: ["s", "l"],
    },
    trademark: {
      control: "text",
      description: "Бренд для плашки в углу; без него плашки нет",
    },
  },
  component: ListingProductItem,
  parameters: {
    docs: {
      description: {
        component: [
          "Карточка товара в листинге: фото, название, тип, цена и доступные металлы.",
          "",
          "Карточка целиком — ссылка на товар, поэтому кнопки кладут в слот `action`:",
          "он лежит поверх фото и вне `<a>`.",
          "",
          "При наведении над названием разъезжается полоска-индикатор — её видно",
          "только на живой карточке, наведите курсор.",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  title: "Entities/ProductItem/ListingProductItem",
} satisfies Meta<typeof ListingProductItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { ...product, size: "s" },
  name: "Обычная карточка",
  render: (args) => ({
    components: { ListingProductItem },
    setup: () => ({ args }),
    template: `<div style="width: 342px"><ListingProductItem v-bind="args" /></div>`,
  }),
}

export const Large: Story = {
  args: { ...product, img: "/images/ring2.png", size: "l" },
  name: "Крупная карточка",
  render: (args) => ({
    components: { ListingProductItem },
    setup: () => ({ args }),
    template: `<div style="width: 692px"><ListingProductItem v-bind="args" /></div>`,
  }),
}

export const WithAction: Story = {
  args: { ...product },
  name: "Со слотом действия",
  render: (args) => ({
    components: { ListingProductItem, SimpleButton },
    setup: () => ({ args }),
    template: `
      <div style="width: 342px">
        <ListingProductItem v-bind="args">
          <template #action>
            <SimpleButton icon="icons:heart" variant="icon" />
          </template>
        </ListingProductItem>
      </div>
    `,
  }),
}

export const Materials: Story = {
  name: "Металлы",
  render: () => ({
    components: { ListingProductItem },
    setup: () => ({ product }),
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <div v-for="material in ['white', 'yellow', 'rose', 'platinum']" :key="material" style="width: 342px">
          <ListingProductItem v-bind="product" :materials="[material]" :product-type="material" trademark="" />
        </div>
      </div>
    `,
  }),
}

export const Minimal: Story = {
  args: {
    ...product,
    materials: undefined,
    productType: undefined,
    trademark: undefined,
  },
  name: "Без плашки и металлов",
  render: (args) => ({
    components: { ListingProductItem },
    setup: () => ({ args }),
    template: `<div style="width: 342px"><ListingProductItem v-bind="args" /></div>`,
  }),
}

export const InList: Story = {
  args: { ...product, component: "li" },
  name: "В списке",
  render: (args) => ({
    components: { ListingProductItem },
    setup: () => ({ args }),
    template: `
      <ul style="display: grid; grid-template-columns: repeat(3, 342px); gap: 24px; margin: 0; padding: 0; list-style: none;">
        <ListingProductItem v-bind="args" />
        <ListingProductItem v-bind="args" />
        <ListingProductItem v-bind="args" />
      </ul>
    `,
  }),
}
