<script setup lang="ts">
import type { Blog } from "~/widgets/blog/model/types"

type BlogTitleTag = `h${2 | 3 | 4 | 5 | 6}`

/**
 * Блок блога: .
 *
 * @example
 * <Blog :cards="articles" :count="22" title="Блог" to="/blog" />
 * <Blog :cards="articles" title="Читайте также" title-tag="h3" />
 */
const props = withDefaults(
  defineProps<
    {
      /**
       * Тег заголовка.
       *
       * @default h2
       */
      titleTag?: BlogTitleTag
    } & Blog
  >(),
  { titleTag: "h2" },
)

const hasContent = computed(
  () => Array.isArray(props.cards) && props.cards.length > 0,
)

const hasMore = computed(() => Boolean(props.to && props.count))

const hasSide = computed(() => Boolean(props.title) || hasMore.value)
</script>

<template>
  <section class="blog">
    <div v-if="hasSide" class="blog__side">
      <component :is="titleTag" v-if="title" class="blog__title">
        {{ title }}
      </component>

      <TextButtonSpecial
        v-if="hasMore"
        :badge="`+${count}`"
        component="link"
        text="Все статьи"
        :to
        variant="badge"
      />
    </div>

    <ul v-if="hasContent" class="blog__content">
      <!-- hasContent предполагает, что карточки точно существуют, поэтому "!" -->
      <ContentItem
        v-for="(card, index) in cards!"
        :key="index"
        v-bind="card"
        class="blog__item"
        component="li"
      />
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.blog {
  --spacing: var(--spacing-24);

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing);

  &__side {
    display: flex;
    grid-row: 1/-1;
    flex-direction: column;
    gap: var(--spacing-16);
    border-right: 1px solid var(--additional-gray-200);
    padding-right: var(--spacing);
  }

  &__content {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3, 1fr);
    grid-column: 2 / span 3;
    gap: var(--spacing);

    // Без боковой колонки карточки занимают всю ширину
    &:only-child {
      grid-template-columns: repeat(4, 1fr);
      grid-column: 1 / -1;
    }
  }

  &__title {
    @include text-style("heading-30-medium");
  }
}
</style>
