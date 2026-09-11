<script setup lang="ts">
/**
 * Шапка сайта
 *
 * @example
 * <AppHeader />
 */
const hasNavigation = computed(() => appHeaderNavigation.length > 0)

const actions = [
  { icon: "icons:search", label: "Поиск" },
  { icon: "icons:user", label: "Личный кабинет" },
  { icon: "icons:heart", label: "Избранное" },
  { icon: "icons:cart", label: "Корзина" },
]
</script>

<template>
  <header class="app-header">
    <NuxtLink
      aria-label="La Vivion — на главную"
      class="app-header__logo"
      to="/"
    >
      <Icon class="app-header__logo__img" name="brand:logo" />
    </NuxtLink>

    <nav v-if="hasNavigation" aria-label="Главное меню" class="app-header__nav">
      <ul class="app-header__nav__list">
        <li v-for="item in appHeaderNavigation" :key="item.label">
          <NuxtLink class="app-header__nav__link" :to="item.to">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="app-header__secondary">
      <div class="app-header__actions">
        <SimpleButton
          v-for="action in actions"
          :key="action.icon"
          :aria-label="action.label"
          :icon="action.icon"
          :title="action.label"
          variant="icon"
        />
      </div>

      <SimpleButton
        class="app-header__contact"
        size="s"
        text="Связаться с нами"
      />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-24);
  border-bottom: 1px solid var(--additional-gray-200);
  background: var(--additional-white-50);
  min-height: 64px;

  &__logo {
    flex: none;
    color: var(--brand-marine-800);

    &__img {
      width: 180px;
      height: 36px;
    }
  }

  &__nav {
    &__list {
      display: flex;
      gap: var(--spacing-32);
    }

    &__link {
      text-transform: uppercase;

      @include text-style("heading-12-medium");
      @include transition(color);

      @include hover {
        color: var(--brand-marine-700);
      }
    }
  }

  &__secondary {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--spacing-24);
    height: 36px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-24);
  }

  &__contact {
    display: flex;
    height: 100%;
  }
}
</style>
