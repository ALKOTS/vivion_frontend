import type { Meta, StoryObj } from "@nuxtjs/storybook"

import type { SelectionBudget as SelectionBudgetProps } from "../model/types"

import SelectionBudgetSection from "./SelectionBudgetSection.vue"

type Card = NonNullable<SelectionBudgetProps["cards"]>[number]

const img = "/images/nav-cards/budget-1.jpg"

const cards: Card[] = [
  {
    img,
    label: "до 150 000 ₽",
    to: "/catalog/engagement-rings?price=0-150000",
  },
  {
    img,
    label: "до 300 000 ₽",
    to: "/catalog/engagement-rings?price=150000-300000",
  },
  {
    img,
    label: "до 500 000 ₽",
    to: "/catalog/engagement-rings?price=300000-500000",
  },
  {
    img,
    label: "до 1 000 000 ₽",
    to: "/catalog/engagement-rings?price=500000-1000000",
  },
  {
    img,
    label: "от 1 000 000 ₽",
    title: "Помолвочные кольца с крупным бриллиантом",
    to: "/catalog/engagement-rings?price=1000000-",
  },
]

const meta = {
  args: { cards, title: "Подбор по бюджету", titleTag: "h2" },
  argTypes: {
    cards: {
      control: "object",
      description:
        "Карточки ценовых диапазонов; показываются первые пять, последняя — крупная",
    },
    title: { control: "text", description: "Заголовок подборки" },
    titleTag: {
      control: "inline-radio",
      description: "Тег заголовка",
      options: ["h2", "h3", "h4", "h5", "h6"],
    },
  },
  component: SelectionBudgetSection,
  parameters: {
    docs: {
      description: {
        component: [
          "Подборка «По бюджету»: заголовок и сетка навигационных карточек 4 × 2.",
          "",
          "Первые четыре карточки — мелкие, занимают левую половину сетки;",
          "пятая — крупная, с заголовком, занимает правую половину целиком.",
          "Размер карточкам проставляет сам виджет, в данных `size` не нужен.",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { SelectionBudgetSection },
    setup: () => ({ args }),
    template: `<div style="padding: 24px"><SelectionBudgetSection v-bind="args" /></div>`,
  }),
  tags: ["autodocs"],
  title: "Widgets/SelectionBudgetSection",
} satisfies Meta<typeof SelectionBudgetSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: "Пять карточек" }

export const Few: Story = {
  args: { cards: cards.slice(0, 3) },
  name: "Мало карточек",
}

export const Single: Story = {
  args: { cards: cards.slice(0, 1) },
  name: "Одна карточка",
}

export const Overflow: Story = {
  args: { cards: [...cards, ...cards] },
  name: "Больше пяти карточек",
}

export const WithoutTitle: Story = {
  args: { title: undefined },
  name: "Без заголовка",
}

export const Empty: Story = { args: { cards: [] }, name: "Без карточек" }
