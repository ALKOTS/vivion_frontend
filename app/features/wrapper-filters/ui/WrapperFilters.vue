<script setup lang="ts">
/**
 * Полоса с кнопкой «Фильтры» над каталогом.
 *
 * @example
 * <WrapperFilters />
 */
</script>

<template>
  <div class="wrapper-filters">
    <TextButton icon="icons:filter" text="Фильтры" variant="primary" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper-filters {
  border-block: 1px solid var(--additional-gray-200);
  padding-block: var(--spacing-24);
  width: 100%;
}
</style>
