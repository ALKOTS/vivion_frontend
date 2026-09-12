<script setup lang="ts">
/**
 * Навигационный блок каталога.
 *
 * @example
 * <SectionNav>
 *   <QuickFiltersGroup v-model="selected" :filters />
 *   <WrapperFilters />
 * </SectionNav>
 */
</script>

<template>
  <section class="section-nav">
    <!-- @slot Секции навигации; складываются вертикально. -->
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.section-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-24);
}
</style>
