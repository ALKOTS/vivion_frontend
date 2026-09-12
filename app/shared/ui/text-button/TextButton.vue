<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue"

import type { NuxtLinkProps } from "#app"

import { NuxtLink } from "#components"

/** Чем рендерить: нативной `<button>` или `<NuxtLink>`. */
type ButtonComponent = "button" | "link"

type TextButtonSize = "m" | "s"

/** `primary` — капс heading-12, `secondary` — обычный текст body-14 / body-12. */
type TextButtonVariant = "primary" | "secondary"

/**
 * Текстовая кнопка.
 *
 * @example
 * <TextButton component="link" text="Доставка" to="/delivery" />
 * <TextButton component="link" size="s" text="Политика конфиденциальности" to="/privacy" />
 * <TextButton text="Показать ещё" @click="loadMore" />
 * <TextButton icon="icons:filter" text="Фильтры" variant="primary" />
 */
const {
  component = "button",
  size = "m",
  variant = "secondary",
} = defineProps<
  {
    /**
     * Чем рендерить: `button` — нативная `<button type="button">`,
     * `link` — `<NuxtLink>`.
     *
     * @default button
     */
    component?: ButtonComponent
    /** Имя иконки для `<Icon>` после текста. */
    icon?: string
    /**
     * Размер.
     *
     * @default m
     */
    size?: TextButtonSize
    /** Подпись кнопки. */
    text?: string
    /**
     * Визуальный вариант.
     *
     * @default secondary
     */
    variant?: TextButtonVariant
  } & /* @vue-ignore */ ButtonHTMLAttributes &
    /* @vue-ignore */ Pick<NuxtLinkProps, "to">
>()

defineOptions({ inheritAttrs: false })

const isLink = computed(() => component === "link")

const Component = computed(() => (isLink.value ? NuxtLink : "button"))

/** Нативной кнопке нужен `type="button"`; ссылке — ничего, `to` приходит из `$attrs`. */
const componentAttrs = computed(() => (isLink.value ? {} : { type: "button" }))
</script>

<template>
  <component
    :is="Component"
    :class="['text-button', getModifiers(size, variant)]"
    v-bind="{ ...componentAttrs, ...$attrs }"
  >
    {{ text }}

    <Icon v-if="icon" class="text-button__icon" :name="icon" size="16" />
  </component>
</template>

<style lang="scss" scoped>
.text-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: 0;
  color: var(--brand-marine-800);
  text-align: left;

  @include transition(color);

  &,
  &._m {
    @include text-style("body-14-light");
  }

  &._s {
    @include text-style("body-12-light");
  }

  &._primary {
    text-transform: uppercase;

    @include text-style("heading-12-medium");
  }

  @include hover {
    &:not(:disabled) {
      color: var(--brand-marine-700);
    }
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--additional-gray-400);
  }
}
</style>
