<script setup lang="ts">
import type { Article } from "~/entities/content-item/model/types"

/** Тег обёртки. */
type ContentItemComponent = "div" | "li"

/**
 * Карточка контента.
 * Карточка целиком.
 *
 * @example
 * <ContentItem v-bind="article" component="li" />
 */
withDefaults(
  defineProps<
    {
      /**
       * Тег обёртки.
       *
       * @default div
       */
      component?: ContentItemComponent
    } & Article
  >(),
  { component: "div" },
)
</script>

<template>
  <component :is="component" class="content-item">
    <NuxtLink class="content-item__link" :to="`/blog/${id}`">
      <div class="content-item__pic">
        <NuxtImg
          v-if="img"
          :alt="title"
          class="content-item__img"
          format="webp"
          height="440px"
          loading="lazy"
          sizes="sm:330px"
          :src="img"
          width="330px"
        />
      </div>

      <div
        v-if="tags?.length || title || description"
        class="content-item__content"
      >
        <div v-if="tags?.length" class="content-item__tags">
          <Badge v-for="tag in tags" :key="tag" :text="tag" />
        </div>

        <div v-if="title" class="content-item__title" v-html="title" />

        <p v-if="description" class="content-item__description">
          {{ description }}
        </p>
      </div>
    </NuxtLink>
  </component>
</template>

<style lang="scss" scoped>
.content-item {
  $root: &;

  @include hover {
    #{$root}__title {
      color: var(--brand-marine-600);
    }
  }

  &__link {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);
  }

  &__pic {
    background: var(--additional-gray-100);
    aspect-ratio: 3/4;
    width: 100%;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;

    @include cover-pic;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-12);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-8);
  }

  &__title {
    color: var(--additional-gray-900);
    overflow-wrap: break-word;

    @include transition(color);
    @include text-style("heading-20-medium");
  }

  &__description {
    color: var(--additional-gray-700);

    @include text-style("body-14-light");
  }
}
</style>
