<template>
  <header class="app-header">
    <div class="app-header__inner">
      <NuxtLink to="/" class="app-header__brand">LaVivion</NuxtLink>

      <nav class="app-header__nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/demo">Demo</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  border-bottom: 1px solid var(--color-border-default);
  background-color: var(--color-bg-canvas);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-300);
    height: var(--layout-header-height);
    max-width: var(--layout-container-max);
    margin-inline: auto;
    padding-inline: var(--spacing-200);
  }

  &__brand {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  &__nav {
    display: flex;
    gap: var(--spacing-200);

    @include down(sm) {
      gap: var(--spacing-100);
      font-size: var(--font-size-sm);
    }
    color: var(--color-text-muted);

    a.router-link-exact-active {
      color: var(--color-brand-primary);
    }
  }
}
</style>
