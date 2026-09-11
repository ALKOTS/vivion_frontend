<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue"

type TextButtonSize = "m" | "s"

/**
 * Текстовая кнопка.
 *
 * @example
 * <TextButton text="Доставка" to="/delivery" />
 * <TextButton size="s" text="Политика конфиденциальности" to="/privacy" />
 * <TextButton text="Показать ещё" @click="loadMore" />
 */
const { size = "m" } = defineProps<
  {
    /**
     * Размер.
     *
     * @default m
     */
    size?: TextButtonSize
    /** Подпись кнопки. */
    text?: string
    /** Адрес ссылки; если задан, кнопка становится `<NuxtLink>`. */
    to?: string
  } & /* @vue-ignore */ ButtonHTMLAttributes
>()

defineOptions({ inheritAttrs: false })
</script>

<template>
  <NuxtLink
    v-if="to"
    :class="['text-button', getModifiers(size)]"
    :to
    v-bind="$attrs"
  >
    {{ text }}
  </NuxtLink>

  <button
    v-else
    :class="['text-button', getModifiers(size)]"
    type="button"
    v-bind="$attrs"
  >
    {{ text }}
  </button>
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
