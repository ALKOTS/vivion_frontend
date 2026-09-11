<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue"

/** Размер кнопки: `m` — обычный, `s` — компактный. */
type SimpleButtonSize = "m" | "s"
/** Визуальный вариант кнопки. */
type SimpleButtonType = "icon" | "primary" | "secondary-outline"

/**
 * Базовая кнопка дизайн-системы: текст и/или иконка.
 *
 * Принимает любые нативные атрибуты `<button>`через `v-bind="$attrs"`.
 *
 * @example
 * <SimpleButton icon="icons:cart" show-icon text="Связаться с нами" />
 * <SimpleButton icon="icons:cart" variant="icon" size="s" />
 */
const {
  icon,
  showIcon,
  size = "m",
  text,
  variant = "primary",
} = defineProps<
  {
    /**
     * Имя иконки для `<Icon>`.
     *
     * @example `icons:cart`
     */
    icon?: string
    /**
     * Состояние загрузки: вместо текста и иконки показывает спиннер.
     */
    loading?: boolean
    /** Показывать иконку рядом с текстом; для `variant="icon"` не требуется. */
    showIcon?: boolean
    /**
     * Размер кнопки.
     *
     * @default m
     */
    size?: SimpleButtonSize
    /** Подпись кнопки; игнорируется при `variant="icon"`. */
    text?: string
    /**
     * Визуальный вариант.
     *
     * @default primary
     */
    variant?: SimpleButtonType
  } & /* @vue-ignore */ ButtonHTMLAttributes
>()

defineOptions({ inheritAttrs: false })

const hasText = computed(() => variant !== "icon" && text)
const hasIcon = computed(() => (showIcon || variant === "icon") && icon)
</script>

<template>
  <button
    :class="[
      'simple-button',
      getModifiers(size, variant, loading ? 'loading' : ''),
    ]"
    type="button"
    v-bind="$attrs"
  >
    <Spinner v-if="loading" :size="24" />

    <template v-else>
      <div v-if="hasText" class="simple-button__text">{{ text }}</div>
      <!-- hasIcon подразумевает наличие иконки, но ts замечает только явную проверку на месте, поэтому "!" -->
      <Icon v-if="hasIcon" class="simple-button__icon" :name="icon!" />
    </template>
  </button>
</template>

<style lang="scss" scoped>
@mixin primary-colors() {
  background: var(--brand-marine-800);
  color: var(--additional-white-50);
}

.simple-button {
  $root: &;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  @include transition((background, outline, color));

  &,
  &._m {
    gap: var(--spacing-12);
    padding: var(--spacing-12) var(--spacing-32);
  }

  &._s {
    gap: var(--spacing-4);
    padding: var(--spacing-8) var(--spacing-16);
  }

  &._primary {
    @include primary-colors();

    @include hover {
      &:not(:disabled) {
        background: var(--brand-marine-700);
      }
    }
  }

  &._secondary-outline {
    outline: 1px solid var(--additional-gray-300);
    outline-offset: -1px;
    color: var(--brand-marine-800);

    @include hover {
      &:not(:disabled) {
        outline-color: transparent;

        @include primary-colors();
      }
    }
  }

  &:disabled {
    cursor: not-allowed;
    outline-color: transparent;
  }

  &._icon {
    padding: 0;
    color: var(--brand-marine-800);

    &:disabled {
      color: var(--additional-gray-400);
    }

    @include hover {
      &:not(:disabled) {
        color: var(--brand-marine-600);
      }
    }
  }

  &._loading {
    pointer-events: none;
  }

  &__text {
    text-align: center;
    text-transform: uppercase;

    @include text-style("heading-12-medium");
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
