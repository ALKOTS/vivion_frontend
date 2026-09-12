<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue"

import { NuxtLink } from "#components"

/** Чем рендерить: нативной `<button>` или `<NuxtLink>`. */
type ButtonComponent = "button" | "link"

/** Общие пропсы всех вариантов; плюс нативные атрибуты `<button>` (`disabled` и т.д.). */
// `@vue-ignore` должен стоять перед ButtonHTMLAttributes, порядок пересечения фиксирован
// eslint-disable-next-line perfectionist/sort-intersection-types
type TextButtonSpecialBaseProps = /* @vue-ignore */ ButtonHTMLAttributes & {
  /**
   * Чем рендерить: `button` — нативная `<button type="button">`,
   * `link` — `<NuxtLink>` с адресом из `to`.
   *
   * @default button
   */
  component?: ButtonComponent
  /** Состояние загрузки: вместо содержимого показывает спиннер. */
  loading?: boolean
  /** Подпись кнопки. */
  text?: string
  /** Адрес ссылки; используется только при `component="link"`. */
  to?: string
}

/**
 * Пропсы зависят от `variant` — дискриминированный union.
 * Записан явно: `@vue/compiler-sfc` не разворачивает mapped types в рантайм-пропсы.
 */
type TextButtonSpecialProps =
  | ({
      /**
       * Только текст.
       *
       * @default primary
       */
      variant?: "primary"
    } & TextButtonSpecialBaseProps)
  | ({
      /** Имя иконки для `<Icon>`, например `icons:cart`. */
      icon?: string
      /** Иконка перед текстом. */
      variant: "startIcon"
    } & TextButtonSpecialBaseProps)
  | ({
      /** Имя иконки для `<Icon>`, например `icons:cart`. */
      icon?: string
      /** Иконка после текста. */
      variant: "endIcon"
    } & TextButtonSpecialBaseProps)
  | ({
      /** Текст плашки справа от подписи, например `+12`. */
      badge?: string
      /** Текст и плашка-счётчик. */
      variant: "badge"
    } & TextButtonSpecialBaseProps)

/**
 * Текстовая кнопка-ссылка с подчёркиванием: для «Смотреть все», переходов и т.п.
 *
 * Варианты: `primary` — только текст, `badge` — текст и плашка-счётчик,
 * `startIcon` / `endIcon` — иконка до или после текста.
 *
 * @example
 * <TextButtonSpecial text="Смотреть все" />
 * <TextButtonSpecial badge="+12" text="Смотреть все" variant="badge" />
 * <TextButtonSpecial icon="icons:cart" text="В корзину" variant="endIcon" />
 * <TextButtonSpecial component="link" text="Все статьи" to="/blog" />
 */
const props = defineProps<TextButtonSpecialProps>()

/** `variant` по умолчанию `primary`; `withDefaults` с union-типом ломает типизацию пропсов. */
const variant = computed(() => props.variant ?? "primary")

/** `component` по умолчанию `button` — по той же причине, что и `variant`. */
const isLink = computed(() => props.component === "link")

defineOptions({ inheritAttrs: false })

const Component = computed(() => (isLink.value ? NuxtLink : "button"))

/** Атрибуты, зависящие от `component`: `to` для ссылки, `type` для кнопки. */
const componentAttrs = computed(() =>
  isLink.value ? { to: props.to } : { type: "button" },
)
</script>

<template>
  <component
    :is="Component"
    :class="[
      'text-button-special',
      getModifiers(variant, loading ? 'loading' : ''),
    ]"
    v-bind="{ ...componentAttrs, ...$attrs }"
  >
    <Spinner v-if="loading" :size="16" />

    <template v-else>
      <div v-if="text" class="text-button-special__text">{{ text }}</div>

      <div
        v-if="props.variant === 'badge' && props.badge"
        class="text-button-special__badge"
      >
        {{ props.badge }}
      </div>

      <Icon
        v-if="
          (props.variant === 'endIcon' || props.variant === 'startIcon') &&
          props.icon
        "
        class="text-button-special__icon"
        :name="props.icon"
        size="13"
      />
    </template>
  </component>
</template>

<style lang="scss" scoped>
.text-button-special {
  --accent-color: var(--brand-marine-800);

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: var(--spacing-4);
  box-shadow: inset 0 -1px 0 var(--accent-color);
  padding: var(--spacing-6) var(--spacing-4);
  width: fit-content;
  color: var(--accent-color);

  @include transition((background, box-shadow, color));

  &__text {
    text-transform: uppercase;

    @include text-style("heading-12-medium");
  }

  &__badge {
    @include text-style("body-10-light");
  }

  &:not(:disabled, ._loading) {
    @include hover {
      background: var(--accent-color);
      color: var(--additional-white-50);
    }
  }

  &:disabled {
    --accent-color: var(--additional-gray-400);

    cursor: not-allowed;
  }

  &._loading {
    align-items: center;
    pointer-events: none;
  }

  &._startIcon {
    flex-direction: row-reverse;
  }

  &._startIcon,
  &._endIcon {
    align-items: center;
  }
}
</style>
