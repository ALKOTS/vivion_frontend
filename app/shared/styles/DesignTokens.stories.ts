import type { Meta, StoryObj } from "@nuxtjs/storybook"

const COLORS = [
  "brand-marine",
  "additional-gray-900",
  "additional-gray-700",
  "additional-gray-500",
  "additional-gray-300",
  "additional-gray-200",
  "additional-gray-100",
  "additional-gray-50",
  "additional-white-50",
]

const SPACING = [0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 80]

const TEXT_STYLES = [
  "heading-30-medium",
  "heading-24-medium",
  "heading-20-medium",
  "heading-14-medium",
  "heading-12-medium",
  "body-14-regular",
  "body-14-medium",
  "body-14-light",
  "body-12-light",
  "body-10-light",
]

const meta = {
  parameters: { layout: "fullscreen" },
  title: "Дизайн-токены",
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Colors: Story = {
  name: "Цвета",
  render: () => ({
    setup: () => ({ names: COLORS }),
    template: `
      <div style="padding: 24px; display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));">
        <div v-for="name in names" :key="name" style="display: flex; align-items: center; gap: 12px;">
          <span
            :style="{ background: 'var(--' + name + ')' }"
            style="width: 40px; height: 40px; border: 1px solid var(--additional-gray-300); flex: none;"
          />
          <span style="font-size: 12px;">
            <code>--{{ name }}</code>
          </span>
        </div>
      </div>
    `,
  }),
}

export const Spacing: Story = {
  name: "Отступы",
  render: () => ({
    setup: () => ({ steps: SPACING }),
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 8px;">
        <div v-for="step in steps" :key="step" style="display: flex; align-items: center; gap: 12px;">
          <code style="width: 140px; font-size: 12px;">--spacing-{{ step }}</code>
          <span
            :style="{ width: 'var(--spacing-' + step + ')' }"
            style="height: 16px; background: var(--brand-marine); display: block;"
          />
          <span style="font-size: 12px; color: var(--additional-gray-700);">{{ step }}px</span>
        </div>
      </div>
    `,
  }),
}

export const Typography: Story = {
  name: "Типографика",
  render: () => ({
    setup: () => ({ styles: TEXT_STYLES }),
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
        <div v-for="name in styles" :key="name">
          <code style="font-size: 11px; color: var(--additional-gray-700);">--text-{{ name }}-*</code>
          <p
            :style="{
              fontFamily: 'var(--text-' + name + '-family)',
              fontSize: 'var(--text-' + name + '-size)',
              fontWeight: 'var(--text-' + name + '-weight)',
              lineHeight: 'var(--text-' + name + '-line-height)',
              letterSpacing: 'var(--text-' + name + '-letter-spacing)',
            }"
            style="margin: 4px 0 0;"
          >
            Съешь ещё этих мягких французских булок
          </p>
        </div>
      </div>
    `,
  }),
}
