import type { Meta, StoryObj } from "@nuxtjs/storybook"

import type { Article } from "../model/types"

import ContentItem from "./ContentItem.vue"

const article = {
  id: "how-to-choose-engagement-ring",
  img: "/images/articles/engagement-ring.jpg",
  tags: ["Помолвка и свадьба", "Гид"],
  title: "Как выбрать<br/>помолвочное кольцо",
} satisfies Article

const placeholder = {
  id: "placeholder",
  tags: ["Placeholder"],
  title: "Placeholder",
} satisfies Article

const articles: Article[] = [
  article,
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
  placeholder,
]

const meta = {
  args: { ...article, component: "div" },
  argTypes: {
    component: {
      control: "inline-radio",
      description: "Тег обёртки: `li` — если карточка лежит в списке",
      options: ["div", "li"],
    },
    description: {
      control: "text",
      description: "Описание под заголовком; в макете по умолчанию скрыто",
    },
    id: { control: "text", description: "Идентификатор статьи для ссылки" },
    img: {
      control: "select",
      description: "Путь к обложке 3:4; без неё остаётся серая подложка",
      options: articles.map(({ img }) => img).filter(Boolean),
    },
    tags: { control: "object", description: "Рубрики для плашек" },
    title: { control: "text", description: "Заголовок статьи" },
  },
  component: ContentItem,
  parameters: {
    docs: {
      description: {
        component: [
          "Карточка контента (статьи блога): обложка 3:4 на серой подложке,",
          "плашки рубрик и заголовок. Карточка целиком — ссылка на статью.",
          "",
          "Ширину задаёт родитель: в макете это колонка сетки шириной 330px.",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  title: "Entities/ContentItem/ContentItem",
} satisfies Meta<typeof ContentItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { ...article },
  name: "Обычная карточка",
  render: (args) => ({
    components: { ContentItem },
    setup: () => ({ args }),
    template: `<div style="width: 330px"><ContentItem v-bind="args" /></div>`,
  }),
}

export const WithDescription: Story = {
  args: {
    ...article,
    description:
      "Разбираем формы огранки, металлы и размеры, чтобы кольцо подошло с первого раза.",
  },
  name: "С описанием",
  render: (args) => ({
    components: { ContentItem },
    setup: () => ({ args }),
    template: `<div style="width: 330px"><ContentItem v-bind="args" /></div>`,
  }),
}

export const InList: Story = {
  args: { ...article, component: "li" },
  name: "В списке",
  render: () => ({
    components: { ContentItem },
    setup: () => ({ articles }),
    template: `
      <ul style="display: grid; grid-template-columns: repeat(4, 330px); gap: 24px; margin: 0; padding: 0; list-style: none;">
        <ContentItem v-for="article in articles" :key="article.id" v-bind="article" component="li" />
      </ul>
    `,
  }),
}
