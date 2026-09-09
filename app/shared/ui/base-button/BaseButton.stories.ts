import type { Meta, StoryObj } from '@storybook/vue3-vite'

import BaseButton from './BaseButton.vue'

const meta = {
  title: 'Shared/UI/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'ghost'],
      description: 'Визуальный вариант кнопки',
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
      description: 'Нативный type у <button>',
    },
    default: {
      control: 'text',
      description: 'Содержимое кнопки (слот по умолчанию)',
    },
  },
  args: {
    variant: 'primary',
    type: 'button',
    default: 'Кнопка',
  },
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: '<BaseButton v-bind="args">{{ args.default }}</BaseButton>',
  }),
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary', default: 'Основная' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', default: 'Прозрачная' },
}

/** Оба варианта рядом — удобно сравнивать отступы и высоту. */
export const AllVariants: Story = {
  name: 'Все варианты',
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseButton variant="primary">Основная</BaseButton>
        <BaseButton variant="ghost">Прозрачная</BaseButton>
      </div>
    `,
  }),
}

/** Длинный текст — проверка, что кнопка не ломается по ширине. */
export const LongLabel: Story = {
  name: 'Длинная подпись',
  args: { default: 'Добавить в корзину и перейти к оформлению' },
}
