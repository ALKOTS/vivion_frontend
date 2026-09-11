import type { Meta, StoryObj } from "@nuxtjs/storybook"

import MediaContent from "./MediaContent.vue"

const content = {
  buttonText: "Записаться на просмотр",
  description:
    "В бутике LA VIVION в центре Москвы можно посмотреть кольца вживую, сравнить бриллианты и уточнить размер. Большинство моделей доступны к просмотру в день визита, а эксперты с геммологической подготовкой помогут выбрать кольцо под ваш сценарий.",
  img: "/images/boutique.png",
  imgAlt: "Эксперт LA VIVION с лупой и кольцом",
  title: "Посмотреть кольцо перед покупкой",
}

const meta = {
  args: { ...content, titleTag: "h2" },
  argTypes: {
    buttonText: {
      control: "text",
      description: "Подпись кнопки под описанием; без неё кнопки нет",
    },
    caption: { control: "text", description: "Подпись под картинкой" },
    description: { control: "text", description: "Описание под заголовком" },
    img: {
      control: "text",
      description: "Путь к картинке; без неё остаётся серая подложка",
    },
    imgAlt: { control: "text", description: "Альтернативный текст картинки" },
    title: { control: "text", description: "Заголовок блока" },
    titleTag: {
      control: "inline-radio",
      description: "Тег заголовка",
      options: ["h2", "h3", "h4", "h5", "h6"],
    },
  },
  component: MediaContent,
  parameters: {
    docs: {
      description: {
        component: [
          "Медиа-блок: заголовок, описание и кнопка слева, большая картинка справа.",
          "",
          "На десктопе — 12-колоночная сетка с отступом 24px: 3 колонки под текст,",
          "9 под картинку. До `lg` колонки складываются в столбик, текст сверху.",
          "",
          "Кнопку можно заменить через слот `action`; слот по умолчанию — под ней.",
          "Клик по кнопке — событие `action`.",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { MediaContent },
    setup: () => ({ args }),
    template: `<div style="padding: 24px"><MediaContent v-bind="args" /></div>`,
  }),
  tags: ["autodocs"],
  title: "Widgets/MediaContent",
} satisfies Meta<typeof MediaContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "С картинкой" }

export const WithCaption: Story = {
  args: { caption: "Бутик LA VIVION, Москва" },
  name: "С подписью под картинкой",
}

export const NoButton: Story = {
  args: { buttonText: undefined },
  name: "Без кнопки",
}

export const NoImage: Story = { args: { img: undefined }, name: "Без картинки" }
