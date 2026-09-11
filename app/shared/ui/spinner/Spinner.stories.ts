import type { Meta, StoryObj } from "@nuxtjs/storybook"

import Spinner from "./Spinner.vue"

const meta = {
  args: { size: 24 },
  argTypes: {
    color: {
      control: "color",
      description: "Цвет дуги; по умолчанию `--brand-marine-800`",
    },
    size: {
      control: { max: 96, min: 8, step: 4, type: "range" },
      description: "Размер спиннера в px",
    },
  },
  component: Spinner,
  tags: ["autodocs"],
  title: "Shared/UI/Spinner",
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { size: 24 }, name: "По умолчанию" }

export const Sizes: Story = {
  name: "Размеры",
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <Spinner :size="16" />
        <Spinner :size="24" />
        <Spinner :size="48" />
        <Spinner :size="96" />
      </div>
    `,
  }),
}

export const OnDark: Story = {
  name: "На тёмном фоне",
  render: () => ({
    components: { Spinner },
    template: `
      <div style="--spinner-track: rgb(255 255 255 / 30%); background: var(--brand-marine-800); padding: 24px; display: inline-flex;">
        <Spinner color="var(--additional-white-50)" :size="24" />
      </div>
    `,
  }),
}
