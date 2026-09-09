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
  gap: var(--spacing-100);
  padding: var(--spacing-100) var(--spacing-200);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: background-color 0.15s ease, color 0.15s ease;

  &--primary {
    color: var(--color-neutral-0);
    background-color: var(--color-brand-primary);

    &:hover {
      background-color: var(--color-brand-primary-hover);
    }
  }

  &--ghost {
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-default);

    &:hover {
      background-color: var(--color-bg-muted);
    }
  }
}
</style>
