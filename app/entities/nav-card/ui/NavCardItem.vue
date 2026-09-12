<script setup lang="ts">
import type { NavCard } from "~/entities/nav-card/model/types"

type NavCardComponent = "div" | "li"

/**
 * Навигационная карточка.
 *
 * @example
 * <NavCardItem v-bind="card" component="li" />
 */
const props = withDefaults(
  defineProps<
    {
      /**
       * Тег обёртки.
       *
       * @default div
       */
      component?: NavCardComponent
    } & NavCard
  >(),
  { component: "div", size: "s", to: "#" },
)

const imgAttrs = computed(() =>
  props.size === "s"
    ? { height: "330px", sizes: "sm:330px", width: "330px" }
    : { height: "648px", sizes: "sm:648px", width: "648px" },
)
</script>

<template>
  <component :is="component" class="nav-card-item">
    <NuxtLink class="nav-card-item__link" :to>
      <NuxtImg
        v-if="img"
        :alt="title || label"
        class="nav-card-item__img"
        format="webp"
        loading="lazy"
        :src="img"
        v-bind="imgAttrs"
      />

      <div v-if="title && size === 'l'" class="nav-card-item__title">
        {{ title }}
      </div>

      <div v-if="label" class="nav-card-item__label">{{ label }}</div>
    </NuxtLink>
  </component>
</template>

<style lang="scss" scoped>
.nav-card-item {
  $root: &;

  @include hover {
    #{$root}__title,
    #{$root}__label {
      color: var(--brand-marine-600);
    }
  }

  &__link {
    display: block;
    position: relative;
    background: var(--additional-gray-100);
    aspect-ratio: 1/1;
    width: 100%;
    overflow: hidden;
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    @include cover-pic;
  }

  &__title,
  &__label {
    position: absolute;
    right: 0;
    left: 0;
    padding: var(--spacing-24);
    overflow-wrap: break-word;

    @include transition(color);
  }

  &__title {
    top: 0;
    color: var(--additional-gray-900);

    @include text-style("heading-20-medium");
  }

  &__label {
    bottom: 0;
    color: var(--brand-marine-800);
    text-transform: uppercase;

    @include text-style("heading-12-medium");
  }
}
</style>
