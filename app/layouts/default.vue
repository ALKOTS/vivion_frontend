<template>
  <div class="layout">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<style lang="scss">
.layout {
  margin-inline: auto;
  padding-inline: var(--spacing-24);
  max-width: 1440px;
  // Карта отступов для генерации утилитарных модификаторов _pt-*, _py-*, _pb-*.
  // Значения привязаны к CSS-переменным, чтобы отступы адаптировались
  // под текущую тему (например, уменьшаются на мобильных через :root).
  $indents: (
    40: var(--spacing-40),
    80: var(--spacing-80),
  );

  & > .page {
    // ─── Утилитарные отступы ──────────────────────────────────────────────────
    // @each генерирует классы вида ._pt-80, ._py-56, ._pb-40 и т.д.
    // для управления вертикальными отступами секции без дополнительного CSS.
    @each $name, $indent in $indents {
      & > ._pt-#{$name} {
        padding-top: $indent;
      }

      & > ._py-#{$name} {
        padding: {
          top: $indent;
          bottom: $indent;
        }
      }

      & > ._pb-#{$name} {
        padding-bottom: $indent;
      }
    }

    & > ._border-top {
      border-top: 1px solid var(--additional-gray-200);
    }
  }
}
</style>
