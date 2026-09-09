<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Нативный `type` у элемента `<button>`. */
    type?: "button" | "reset" | "submit"
    /** Визуальный вариант кнопки. */
    variant?: "ghost" | "primary"
  }>(),
  { type: "button", variant: "primary" },
)
</script>

<template>
  <button :class="['base-button', `base-button--${variant}`]" :type>
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-8);
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
  padding: var(--spacing-8) var(--spacing-16);
  font-weight: var(--font-body-weight-medium);

  &--primary {
    background-color: var(--brand-marine);
    color: var(--additional-white-50);

    &:hover {
    }
  }

  &--ghost {
    border: 1px solid var(--additional-gray-300);
    color: var(--additional-gray-900);

    &:hover {
      background-color: var(--additional-gray-100);
    }
  }
}
</style>
