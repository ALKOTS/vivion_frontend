<script setup lang="ts">
import type { QuickFilter } from "~/entities/quick-filter/model/types"

/** Тег обёртки: `li` — если карточка лежит в списке. */
type QuickFiltersCardComponent = "div" | "li"

/**
 * Карточка быстрого фильтра: квадратная картинка на серой подложке и подпись.
 *
 * Фото ожидается на белом фоне — за счёт `mix-blend-mode: darken` белый
 * растворяется в подложке, как в макете.
 *
 * @example
 * <QuickFiltersCard v-bind="filter" component="li" />
 */
withDefaults(
  defineProps<
    {
      /**
       * Тег обёртки.
       *
       * @default div
       */
      component?: QuickFiltersCardComponent
    } & QuickFilter
  >(),
  { component: "div" },
)
</script>

<template>
  <component :is="component" class="quick-filters-card">
    <NuxtLink class="quick-filters-card__link" :to>
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
    </NuxtLink>
  </component>
</template>

<style lang="scss" scoped>
.quick-filters-card {
  $root: &;

  display: flex;
  flex-direction: column;

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-12);
    width: 100%;

    @include hover {
      #{$root}__pic {
        background: var(--additional-gray-200);
      }
    }
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
    }
  }

  &__img {
    position: relative;
    mix-blend-mode: darken;
    width: 100%;
    height: 100%;

    @include cover-pic;
  }

  &__name {
    color: var(--additional-gray-900);
    text-align: center;
    text-transform: uppercase;

    @include text-style("heading-12-medium");
  }
}
</style>
