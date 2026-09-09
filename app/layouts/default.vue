<template>
  <div class="layout">
    <AppHeader />

    <main class="layout__main">
      <slot />
    </main>

    <footer class="layout__footer">
      <small>&copy; {{ year }} LaVivion</small>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  &__main {
    flex: 1;
    width: 100%;
    max-width: var(--layout-container-max);
    margin-inline: auto;
    padding: var(--spacing-300) var(--spacing-200);

    @include up(md) {
      padding: var(--spacing-600) var(--spacing-400);
    }
  }

  &__footer {
    padding: var(--spacing-300) var(--spacing-200);
    color: var(--color-text-muted);
    text-align: center;
    border-top: 1px solid var(--color-border-default);
  }
}
</style>
