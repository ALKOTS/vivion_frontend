<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue"

import type { QuickFilter } from "~/entities/quick-filter/model/types"

/**
 * Карточка быстрого фильтра: квадратная картинка на серой подложке и подпись.
 * Карточка целиком — кнопка; принимает любые нативные атрибуты `<button>`.
 *
 * @example
 * <QuickFiltersCard v-bind="filter" @click="applyFilter(filter.id)" />
 * <QuickFiltersCard v-bind="filter" :active="filter.id === selected" />
 * <QuickFiltersCard v-bind="filter" loading />
 */
const { active, disabled, loading } = defineProps<
  {
    /** Выбранная карточка: подсвечена так же, как нажатая. */
    active?: boolean
    /** Выключенная карточка. */
    disabled?: boolean
    /** Состояние загрузки. */
    loading?: boolean
  } & /* @vue-ignore */ ButtonHTMLAttributes &
    QuickFilter
>()

defineOptions({ inheritAttrs: false })
</script>

<template>
  <button
    :class="[
      'quick-filters-card',
      getModifiers(
        loading ? 'loading' : undefined,
        active ? 'active' : undefined,
      ),
    ]"
    :disabled
    type="button"
    v-bind="$attrs"
  >
    <div class="quick-filters-card__content">
      <div class="quick-filters-card__pic">
        <NuxtImg
          v-if="img"
          :alt="name"
          class="quick-filters-card__img"
          format="webp"
          height="196px"
          loading="lazy"
          sizes="sm:196px"
          :src="img"
          width="196px"
        />
      </div>

      <div class="quick-filters-card__name">{{ name }}</div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.quick-filters-card {
  $root: &;

  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  text-align: center;

  @include hover {
    &:not(:disabled) {
      #{$root}__pic {
        background: var(--additional-gray-300);
      }

      #{$root}__name {
        color: var(--brand-marine-600);
      }
    }
  }

  &:active:not(:disabled),
  &._active:not(:disabled) {
    #{$root}__pic {
      background: var(--additional-gray-200);

      &::before {
        opacity: 0;
      }
    }

    #{$root}__name {
      color: var(--brand-marine-800);
    }
  }

  &:disabled {
    cursor: not-allowed;
  }

  &._loading {
    pointer-events: none;
  }

  &:disabled,
  &._loading {
    #{$root}__img {
      opacity: 0.2;
    }

    #{$root}__name {
      color: var(--additional-gray-400);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-12);
    width: 100%;
  }

  &__pic {
    position: relative;
    background: var(--additional-gray-100);
    padding: var(--spacing-8);
    aspect-ratio: 1/1;
    width: 100%;
    overflow: hidden;

    @include transition(background);

    &::before {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgb(255 255 255 / 0%) 0%,
        rgb(255 255 255 / 80%) 90%
      );
      pointer-events: none;
      content: "";

      @include transition(opacity);
    }
  }

  &__img {
    position: relative;
    width: 100%;
    height: 100%;

    @include transition(opacity);
    @include cover-pic;
  }

  &__name {
    color: var(--additional-gray-900);
    text-transform: uppercase;

    @include transition(color);
    @include text-style("heading-12-medium");
  }
}
</style>
