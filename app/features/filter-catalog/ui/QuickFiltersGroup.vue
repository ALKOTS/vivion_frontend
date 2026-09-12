<script setup lang="ts">
import type { QuickFilter } from "~/entities/quick-filter/model/types"

/**
 * Ряд быстрых фильтров каталога.
 *
 * @example
 * <QuickFiltersGroup
 *   v-model="selected"
 *   :disabled-ids="disabledIds"
 *   :filters
 * />
 */
const { disabledIds = [] } = defineProps<{
  /** Идентификаторы выключенных фильтров. */
  disabledIds?: string[]
  /** Быстрые фильтры в порядке показа. */
  filters?: QuickFilter[]
}>()

/** Идентификатор выбранного фильтра. */
const selected = defineModel<string>({ required: true })

/**
 * Подсвечена ли карточка.
 *
 * @param id Идентификатор фильтра.
 * @returns `true` для выбранного фильтра, кроме «Смотреть всё».
 */
const isActive = (id: string) => id !== ALL_FILTER_ID && id === selected.value
</script>

<template>
  <ul v-if="filters?.length" class="quick-filters-group" role="radiogroup">
    <li v-for="filter in filters" :key="filter.id">
      <QuickFiltersCard
        v-bind="filter"
        :active="isActive(filter.id)"
        :aria-checked="isActive(filter.id)"
        :disabled="disabledIds.includes(filter.id)"
        role="radio"
        @click="selected = filter.id"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.quick-filters-group {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--spacing-24);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
