<script setup lang="ts">
/**
 * Плашка с подписью поверх карточки: бренд, коллекция, пометка.
 *
 * @example
 * <Badge show-tm text="LaVivion" />
 */
defineProps<{
  /** Показывать значок ™ после текста. */
  showTm?: boolean
  /** Текст плашки; без него остаётся только значок. */
  text?: string
}>()
</script>

<template>
  <div class="badge">
    <div v-if="text" class="badge__text">{{ text }}</div>
    <Icon v-if="showTm" class="badge__icon" name="icons:tm" />
  </div>
</template>

<style lang="scss" scoped>
.badge {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-4);
  background: var(--additional-gray-200);
  padding: var(--spacing-2) var(--spacing-4) var(--spacing-2) var(--spacing-6);

  &__text {
    @include text-style("body-12-light");
  }

  &__icon {
    width: 8px;
    height: 8px;
  }
}
</style>
