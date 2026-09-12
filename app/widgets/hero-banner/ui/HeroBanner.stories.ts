import type { Meta, StoryObj } from "@nuxtjs/storybook"

import HeroBanner from "./HeroBanner.vue"

const banner = {
  img: "/images/hero-rings.png",
  text: "Мы создаём помолвочные кольца с бриллиантами, достойные вашей истории любви. Каждое кольцо выполнено с непревзойдённым мастерством в соответствии с нашими строгими стандартами.",
  title: "Помолвочные кольца с бриллиантами",
}

const meta = {
  args: { ...banner, titleTag: "div" },
  argTypes: {
    img: {
      control: "text",
      description: "Путь к фоновой картинке; без неё остаётся серая подложка",
    },
    text: { control: "text", description: "Описание под заголовком" },
    title: {
      control: "text",
      description:
        "Заголовок баннера; вставляется как HTML, поэтому можно переносить строки через `<br>`",
    },
    titleTag: {
      control: "inline-radio",
      description:
        "Тег заголовка: `div` — если заголовок не должен попадать в структуру страницы",
      options: ["div", "h2", "h3", "h4", "h5", "h6"],
    },
  },
  component: HeroBanner,
  parameters: {
    docs: {
      description: {
        component: [
          "Промо-баннер в шапке раздела: фон-картинка на всю ширину, заголовок",
          "и описание в левой части по вертикальному центру.",
          "",
          "Ширину задаёт родитель — баннер растягивается на всю доступную.",
          "",
          "Заголовок вставляется через `v-html`, так что перенос строки из макета",
          "задаётся прямо в тексте: `Помолвочные кольца<br>с бриллиантами`.",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  title: "Widgets/HeroBanner",
} satisfies Meta<typeof HeroBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { ...banner }, name: "С картинкой" }

export const TitleWithBreak: Story = {
  args: { ...banner, title: "Помолвочные кольца<br>с бриллиантами" },
  name: "Перенос в заголовке",
}

export const AsHeading: Story = {
  args: { ...banner, titleTag: "h2" },
  name: "Заголовок как h2",
}

export const NoImage: Story = {
  args: { ...banner, img: undefined },
  name: "Без картинки",
}

export const TitleOnly: Story = {
  args: { ...banner, text: undefined },
  name: "Только заголовок",
}
