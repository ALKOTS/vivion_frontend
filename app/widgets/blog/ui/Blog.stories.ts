import type { Meta, StoryObj } from "@nuxtjs/storybook"

import type { Article } from "~/entities/content-item/model/types"

import Blog from "./Blog.vue"

const articles: Article[] = [
  {
    id: "how-to-choose-engagement-ring",
    img: "/images/articles/engagement-ring.jpg",
    tags: ["Помолвка и свадьба", "Гид"],
    title: "Как выбрать<br/>помолвочное кольцо",
  },
  {
    id: "diamond-origin",
    img: "/images/articles/diamond-origin.jpg",
    tags: ["Помолвка и свадьба"],
    title: "Происхождение бриллиантов LA VIVION",
  },
  {
    id: "four-c",
    img: "/images/articles/four-c.jpg",
    tags: ["Помолвка и свадьба"],
    title: "4C — карат, цвет и чистота",
  },
]

const meta = {
  args: {
    cards: articles,
    count: 22,
    title: "Блог",
    titleTag: "h2",
    to: "/blog",
  },
  argTypes: {
    cards: { control: "object", description: "Статьи для показа" },
    count: {
      control: "number",
      description:
        "Сколько ещё статей в блоге; показывается в плашке «+N» у ссылки «Все статьи»",
    },
    title: { control: "text", description: "Заголовок блока" },
    titleTag: {
      control: "inline-radio",
      description: "Тег заголовка",
      options: ["h2", "h3", "h4", "h5", "h6"],
    },
    to: {
      control: "text",
      description: "Адрес страницы блога для ссылки «Все статьи»",
    },
  },
  component: Blog,
  parameters: {
    docs: {
      description: {
        component: [
          "Блок блога: слева заголовок и ссылка «Все статьи» с плашкой-счётчиком,",
          "справа сетка карточек статей в три колонки.",
          "",
          "Ссылка «Все статьи» показывается, только если заданы и `to`, и `count`.",
          "Без заголовка и ссылки карточки занимают всю ширину в четыре колонки.",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { Blog },
    setup: () => ({ args }),
    template: `<div style="padding: 24px"><Blog v-bind="args" /></div>`,
  }),
  tags: ["autodocs"],
  title: "Widgets/Blog",
} satisfies Meta<typeof Blog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "С ссылкой «Все статьи»" }

export const WithoutMore: Story = {
  args: { count: undefined, to: undefined },
  name: "Только заголовок",
}

export const Few: Story = {
  args: { cards: articles.slice(0, 2) },
  name: "Мало статей",
}

export const CardsOnly: Story = {
  args: { count: undefined, title: undefined, to: undefined },
  name: "Без боковой колонки",
}

export const Empty: Story = { args: { cards: [] }, name: "Без статей" }
