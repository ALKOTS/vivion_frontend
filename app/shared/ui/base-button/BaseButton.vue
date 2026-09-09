<template>
  <button :class="['base-button', `base-button--${variant}`]" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'primary', type: 'button' },
)
</script>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-8);
  padding: var(--spacing-8) var(--spacing-16);
  font-weight: var(--font-body-weight-medium);
  transition: background-color 0.15s ease, color 0.15s ease;

  &--primary {
    color: var(--additional-white-50);
    background-color: var(--brand-marine);

    &:hover {
    }
  }

  &--ghost {
    color: var(--additional-gray-900);
    border: 1px solid var(--additional-gray-300);

    &:hover {
      background-color: var(--additional-gray-100);
    }
  }
}
</style>
