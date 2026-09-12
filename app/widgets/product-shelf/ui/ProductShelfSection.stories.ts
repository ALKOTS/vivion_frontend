import type { Meta, StoryObj } from "@nuxtjs/storybook"

import type { Product } from "~/entities/product-item/model/types"

import ProductShelfSection from "./ProductShelfSection.vue"

const ring = {
  img: "/images/products/classic-item.jpg",
  materials: ["white", "yellow", "rose", "platinum"],
  name: "Lyre / Лира",
  price: "от 166 350 ₽",
  productType: "Помолвочное кольцо",
  trademark: "Placeholder",
} satisfies Omit<Product, "id">

/**
 * Генерирует товары для полки.
 *
 * @param count Сколько товаров.
 * @param withPrimary Сделать первый товар главным (`primary: true`).
 * @returns Массив товаров с уникальными `id`.
 */
const makeProducts = (count: number, withPrimary = false): Product[] =>
  Array.from({ length: count }, (_, index) => ({
    ...ring,
    id: String(index + 1),
    ...(withPrimary && index === 0
      ? { img: "/images/products/classic-main.jpg", primary: true }
      : {}),
  }))

const description =
  "Классические кольца с одним бриллиантом выбирают, когда хочется точной формы, которая легко считывается как помолвочная и хорошо выглядит каждый день."

const meta = {
  args: {
    description,
    id: "classic",
    products: makeProducts(4, true),
    title: "Классические",
    titleTag: "h2",
    total: 28,
  },
  argTypes: {
    description: { control: "text", description: "Подзаголовок под названием" },
    id: { control: "text", description: "Идентификатор полки" },
    products: { control: "object", description: "Товары для показа" },
    title: { control: "text", description: "Заголовок полки" },
    titleTag: {
      control: "inline-radio",
      description: "Тег заголовка",
      options: ["h2", "h3", "h4", "h5", "h6"],
    },
    total: {
      control: "number",
      description:
        "Сколько всего товаров в разделе; показывается счётчиком у заголовка и в плашке «Смотреть все»",
    },
  },
  component: ProductShelfSection,
  parameters: {
    docs: {
      description: {
        component: [
          "Полка товаров: заголовок со счётчиком, описание и сетка 4 × 2.",
          "",
          "Товар с `primary: true` занимает 2 × 2 слева, остальные заполняют сетку.",
          "Если товаров больше, чем помещается, последний слот занимает кнопка",
          "«Смотреть все» с плашкой — сколько ещё осталось.",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { ProductShelfSection },
    setup: () => ({ args }),
    template: `<div style="padding: 24px"><ProductShelfSection v-bind="args" /></div>`,
  }),
  tags: ["autodocs"],
  title: "Widgets/ProductShelfSection",
} satisfies Meta<typeof ProductShelfSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "С главным товаром" }

export const WithoutPrimary: Story = {
  args: { products: makeProducts(8), total: 8 },
  name: "Без главного товара",
}

export const HasMore: Story = {
  args: { products: makeProducts(12, true), total: 28 },
  name: "С кнопкой «Смотреть все»",
}

export const Few: Story = {
  args: { products: makeProducts(2, true), total: undefined },
  name: "Мало товаров",
}

export const TitleOnly: Story = {
  args: { description: undefined, products: makeProducts(4), total: 4 },
  name: "Только заголовок",
}

export const Empty: Story = {
  args: { products: [], total: undefined },
  name: "Без товаров",
}
