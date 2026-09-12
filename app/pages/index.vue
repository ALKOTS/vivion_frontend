<script setup lang="ts">
import type { QuickFilter } from "~/entities/quick-filter/model/types"
import type { Blog } from "~/widgets/blog/model/types"
import type { ProductShelf } from "~/widgets/product-shelf/model/types"
import type { SelectionBudget } from "~/widgets/selection-budget/model/types"

interface MainPageContent {
  blog: Blog
  budget: SelectionBudget
  consultation: {
    buttonText: string
    description: string
    img: string
    imgAlt: string
    title: string
  }
  filters: QuickFilter[]
  hero: { img: string; text: string; title: string }
  shelves: ProductShelf[]
  sizeBanner: { img: string; text: string; title: string }
}

useHead({ title: "LaVivion" })

const { blog, budget, consultation, filters, hero, shelves, sizeBanner } =
  getPageContent<MainPageContent>("main-page")

const { disabledIds, select, selected, visibleShelves } = useCatalogFilter({
  filters,
  shelves,
})
</script>

<template>
  <div class="index-page page">
    <h1 class="visually-hidden">Главная страница</h1>
    <HeroBanner v-bind="hero" title-tag="h2" />

    <SectionNav class="_pt-40">
      <QuickFiltersGroup
        :disabled-ids
        :filters
        :model-value="selected"
        @update:model-value="select"
      />

      <WrapperFilters />
    </SectionNav>

    <!-- Полки разделены линией; у первой её нет, чтобы не дублировать границу навигации -->
    <ProductShelfSection
      v-for="(shelf, index) in visibleShelves"
      v-bind="shelf"
      :key="shelf.id"
      class="_py-40"
      :class="{ '_border-top': index > 0 }"
      title-tag="h3"
    />

    <SectionBanner v-bind="sizeBanner" class="_py-40">
      <template #actions>
        <SimpleButton text="Открыть измеритель" variant="secondary-outline" />

        <SimpleButton text="Связаться с экспертом" />
      </template>
    </SectionBanner>

    <SelectionBudgetSection v-bind="budget" class="_pb-40" />

    <MediaContent v-bind="consultation" class="_border-top _py-40" />

    <BlogSection v-bind="blog" class="_border-top _pt-40 _pb-80" />
  </div>
</template>
