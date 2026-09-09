<template>
  <div class="demo">
    <h1>Demo</h1>
    <p class="demo__lead">
      Placeholder page. It exists to prove the layout, the SCSS abstracts and the design
      tokens are wired up end to end.
    </p>

    <section class="demo__section">
      <h2>Shared UI</h2>
      <div class="demo__row">
        <BaseButton>Primary</BaseButton>
        <BaseButton variant="ghost">Ghost</BaseButton>
      </div>
    </section>

    <section class="demo__section">
      <h2>Breakpoints</h2>
      <p class="demo__bp">Current breakpoint: <strong /></p>
    </section>

    <section class="demo__section">
      <h2>Tokens</h2>
      <ul class="demo__swatches" role="list">
        <li v-for="name in swatches" :key="name" class="demo__swatch">
          <span class="demo__chip" :style="{ backgroundColor: `var(--${name})` }" />
          <code>--{{ name }}</code>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Demo — LaVivion' })

const swatches = [
  'color-brand-primary',
  'color-brand-primary-hover',
  'color-bg-muted',
  'color-text-primary',
  'color-text-muted',
  'color-border-default',
]
</script>

<style scoped lang="scss">
.demo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);

  &__lead {
    max-width: 60ch;
    color: var(--color-text-muted);
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-200);
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-100);
  }

  &__swatches {
    display: grid;
    gap: var(--spacing-100);
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  &__swatch {
    display: flex;
    align-items: center;
    gap: var(--spacing-100);
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }

  &__chip {
    width: 28px;
    height: 28px;
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-sm);
  }

  // Resize the window to watch `up()` take over: sm is the base, with no media query.
  &__bp strong {
    color: var(--color-brand-primary);

    &::after {
      content: 'sm';
    }

    @include up(md) {
      &::after {
        content: 'md';
      }
    }

    @include up(lg) {
      &::after {
        content: 'lg';
      }
    }

    @include up(xl) {
      &::after {
        content: 'xl';
      }
    }

    @include up(xxl) {
      &::after {
        content: 'xxl';
      }
    }
  }
}
</style>
