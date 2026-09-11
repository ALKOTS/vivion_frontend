<script setup lang="ts">
/**
 * Индикатор загрузки: дуга в половину окружности поверх серого трека.
 *
 * @example
 * <Spinner />
 * <Spinner color="var(--additional-white-50)" :size="16" />
 */
withDefaults(
  defineProps<{
    /**
     * Цвет спиннера
     */
    color?: string
    /**
     * Размер спиннера в px
     */
    size?: number
  }>(),
  { size: 24 },
)
</script>

<template>
  <span
    aria-label="Загрузка"
    class="spinner"
    role="status"
    :style="{ '--spinner-size': `${size}px`, color }"
  />
</template>

<style lang="scss" scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  --spinner-thickness: max(1px, round(calc(var(--spinner-size) / 16), 1px));
  --spinner-ring: round(calc(var(--spinner-size) * 11 / 16), 2px);
  display: inline-block;

  position: relative;
  flex-shrink: 0;
  animation: spin 800ms linear infinite;
  width: var(--spinner-size);
  height: var(--spinner-size);
  color: var(--brand-marine-800);

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2400ms;
  }

  &::before,
  &::after {
    position: absolute;
    margin: auto;
    inset: 0;
    width: var(--spinner-ring);
    height: var(--spinner-ring);
    content: "";
  }

  &::before {
    mask: radial-gradient(
      farthest-side,
      transparent calc(100% - var(--spinner-thickness)),
      black calc(100% - var(--spinner-thickness))
    );
    border-radius: 100%;
    background: conic-gradient(
      currentColor 0 50%,
      var(--spinner-track, var(--additional-gray-300)) 50% 100%
    );
  }
  &::after {
    background:
      radial-gradient(
        circle at 50% calc(var(--spinner-thickness) / 2),
        currentColor calc(var(--spinner-thickness) / 2),
        transparent 0
      ),
      radial-gradient(
        circle at 50% calc(100% - var(--spinner-thickness) / 2),
        currentColor calc(var(--spinner-thickness) / 2),
        transparent 0
      );
  }
}
</style>
