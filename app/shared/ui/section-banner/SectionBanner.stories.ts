import type { Meta, StoryObj } from "@nuxtjs/storybook"

import SimpleButton from "../simple-button/SimpleButton.vue"
import SectionBanner from "./SectionBanner.vue"

const banner = {
  img: "/images/section-banner-rings.png",
  text: "Можно воспользоваться онлайн‑измерителем, обратиться к эксперту или прийти в бутик с её кольцом.",
  title: "Не знаете размер?",
}

const meta = {
  args: { ...banner, titleTag: "h2" },
  argTypes: {
    img: {
      control: "text",
      description: "Путь к картинке слева; без неё остаётся пустая подложка",
    },
    text: { control: "text", description: "Описание под заголовком" },
    title: { control: "text", description: "Заголовок баннера" },
    titleTag: {
      control: "inline-radio",
      description: "Тег заголовка",
      options: ["h2", "h3", "h4", "h5", "h6"],
    },
  },
  component: SectionBanner,
  parameters: {
    docs: {
      description: {
        component: [
          "Баннер-разделитель между секциями (в Figma — `DividerContent`):",
          "слева картинка, растворяющаяся в подложку, справа заголовок, описание",
          "и колонка кнопок.",
          "",
          "Ширину задаёт родитель — баннер растягивается на всю доступную,",
          "высоту задаёт содержимое правой части.",
          "",
          "Кнопки передаются в слот `actions` — обычно это `SimpleButton`.",
          "Каждая занимает всю ширину колонки.",
          "",
          "Корневой элемент — `<section>`.",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { SectionBanner, SimpleButton },
    setup: () => ({ args }),
    template: `
      <div style="padding: 24px">
        <SectionBanner v-bind="args">
          <template #actions>
            <SimpleButton text="Открыть измеритель" variant="secondary-outline" />
            <SimpleButton text="Связаться с экспертом" />
          </template>
        </SectionBanner>
      </div>
    `,
  }),
  tags: ["autodocs"],
  title: "Shared/UI/SectionBanner",
} satisfies Meta<typeof SectionBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "С картинкой и кнопками" }

export const NoImage: Story = { args: { img: undefined }, name: "Без картинки" }

export const SingleAction: Story = {
  name: "Одна кнопка",
  render: (args) => ({
    components: { SectionBanner, SimpleButton },
    setup: () => ({ args }),
    template: `
      <div style="padding: 24px">
        <SectionBanner v-bind="args">
          <template #actions>
            <SimpleButton text="Связаться с экспертом" />
          </template>
        </SectionBanner>
      </div>
    `,
  }),
}

export const NoActions: Story = {
  name: "Без кнопок",
  render: (args) => ({
    components: { SectionBanner },
    setup: () => ({ args }),
    template: `
      <div style="padding: 24px">
        <SectionBanner v-bind="args" />
      </div>
    `,
  }),
}

export const TitleOnly: Story = {
  args: { text: undefined },
  name: "Только заголовок",
}

export const LongText: Story = {
  args: {
    text: "Можно воспользоваться онлайн‑измерителем, обратиться к эксперту или прийти в бутик с её кольцом. Если сомневаетесь — мы бесплатно подгоним размер после покупки в любом из наших бутиков.",
    title: "Не знаете размер кольца и боитесь ошибиться?",
  },
  name: "Длинный текст",
}
