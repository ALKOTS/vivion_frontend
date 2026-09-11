<script setup lang="ts">
/**
 * Подвал сайта
 *
 * @example
 * <AppFooter />
 */
const copyrightYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <nav aria-label="Карта сайта" class="app-footer__nav">
      <div
        v-for="(column, columnIndex) in appFooterNavigation"
        :key="columnIndex"
        class="app-footer__column"
      >
        <section
          v-for="group in column"
          :key="group.title"
          class="app-footer__group"
        >
          <h2 class="app-footer__group__title">{{ group.title }}</h2>

          <ul v-if="'socials' in group" class="app-footer__socials">
            <li v-for="social in group.socials" :key="social.icon">
              <NuxtLink
                :aria-label="social.label"
                class="app-footer__socials__link"
                :title="social.label"
                :to="social.href"
              >
                <Icon class="app-footer__socials__icon" :name="social.icon" />
              </NuxtLink>
            </li>
          </ul>

          <ul v-else class="app-footer__group__list">
            <li v-for="link in group.links" :key="link.label">
              <TextButton :text="link.label" :to="link.to" />
            </li>
          </ul>
        </section>
      </div>
    </nav>

    <div class="app-footer__wordmark">
      <Icon class="app-footer__wordmark__img" name="brand:wordmark" />
    </div>

    <div class="app-footer__disclaimer">
      <p class="app-footer__copyright">
        © {{ copyrightYear }} LA VIVION. Все права защищены
      </p>

      <p class="app-footer__legal">
        <TextButton
          size="s"
          :text="appFooterLegalLinks.privacyPolicy.label"
          :to="appFooterLegalLinks.privacyPolicy.to"
        />
        <span class="app-footer__legal__separator">и</span>
        <TextButton
          size="s"
          :text="appFooterLegalLinks.termsOfUse.label"
          :to="appFooterLegalLinks.termsOfUse.to"
        />
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  flex-direction: column;
  background: var(--additional-white-50);

  &__nav {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--spacing-24);
    border-top: 1px solid var(--additional-gray-200);
    padding-block: var(--spacing-32);
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 44px;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-12);

    &__title {
      display: flex;
      align-items: center;
      min-height: 20px;
      color: var(--additional-gray-900);
      text-transform: uppercase;

      @include text-style("heading-14-medium");
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-12);
    }
  }

  &__socials {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);

    &__link {
      display: block;
      color: var(--additional-gray-300);

      @include transition(color);

      @include hover {
        color: var(--brand-marine-800);
      }
    }

    &__icon {
      width: 40px;
      height: 40px;
    }
  }

  &__wordmark {
    border-top: 1px solid var(--additional-gray-200);
    padding-block: var(--spacing-8);
    color: var(--additional-gray-200);

    &__img {
      aspect-ratio: 1392 / 220;
      width: 100%;
      height: auto;
    }
  }

  &__disclaimer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-8) var(--spacing-24);
    border-top: 1px solid var(--additional-gray-200);
    padding-block: var(--spacing-24);
  }

  &__copyright {
    flex: 1;
    color: var(--additional-gray-900);

    @include text-style("body-12-light");
  }

  &__legal {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-2);

    &__separator {
      color: var(--additional-gray-900);
      white-space: nowrap;

      @include text-style("body-12-light");
    }
  }
}
</style>
