<script setup lang="ts">
import type { SelectionBudget } from "~/widgets/selection-budget/model/types"

type SelectionBudgetTitleTag = `h${2 | 3 | 4 | 5 | 6}`

/**
 * Подборка «По бюджету».
 *
 * @example
 * <SelectionBudgetSection v-bind="budget" title-tag="h3" />
 */
const props = withDefaults(
  defineProps<
    {
      /**
       * Тег заголовка.
       *
       * @default h2
       */
      titleTag?: SelectionBudgetTitleTag
    } & SelectionBudget
  >(),
  { titleTag: "h2" },
)

const hasCards = computed(
  () => Array.isArray(props.cards) && props.cards.length > 0,
)

/** Сколько карточек помещается в сетку. */
const CARDS_FIT = 5

const visibleCards = computed(() =>
  hasCards.value ? props.cards!.slice(0, CARDS_FIT) : [],
)

/**
 * Крупной становится последняя карточка, если она не единственная.
 *
 * @param index Позиция карточки в `visibleCards`.
 * @returns Занимает ли карточка крупный слот 2 × 2.
 */
const isLargeCard = (index: number) =>
  visibleCards.value.length > 1 && index === visibleCards.value.length - 1
</script>

<template>
  <section class="selection-budget-section">
    <component
      :is="titleTag"
      v-if="title"
      class="selection-budget-section__title"
    >
      {{ title }}
    </component>

    <ul v-if="visibleCards.length > 0" class="selection-budget-section__list">
      <NavCardItem
        v-for="(card, index) in visibleCards"
        v-bind="card"
        :key="index"
        class="selection-budget-section__card"
        component="li"
        :size="isLargeCard(index) ? 'l' : 's'"
      />
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.selection-budget-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-24);

  &__title {
    @include text-style("heading-30-medium");
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-24);

    & > :last-child:not(:first-child) {
      grid-row: 1 / span 2;
      grid-column: 3 / span 2;
    }
  }
}
</style>
