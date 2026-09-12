<script setup lang="ts">
/**
 * Промо-баннер в шапке раздела; рендерится как `<section>`.
 *
 * @example
 * <HeroBanner
 *   img="/images/hero-rings.png"
 *   text="Мы создаём помолвочные кольца с бриллиантами..."
 *   title="Помолвочные кольца с бриллиантами"
 *   title-tag="h2"
 * />
 */
type TitleTag = "div" | `h${2 | 3 | 4 | 5 | 6}`

const props = withDefaults(
  defineProps<{
    /** Путь к фоновой картинке; без неё остаётся серая подложка. */
    img?: string
    /** Описание под заголовком. */
    text?: string
    /** Заголовок баннера. */
    title?: string
    /**
     * Тег заголовка.
     *
     * @default div
     */
    titleTag?: TitleTag
  }>(),
  { titleTag: "div" },
)
const hasContent = computed(() => props.title || props.text)
</script>

<template>
  <section class="hero-banner">
    <NuxtImg
      v-if="img"
      alt=""
      class="hero-banner__img"
      format="webp"
      height="360"
      loading="eager"
      sizes="sm:1392px"
      :src="img"
      width="1392"
    />

    <div v-if="hasContent" class="hero-banner__content">
      <!-- eslint-disable vue/no-v-html, vue/no-v-text-v-html-on-component -->
      <component
        :is="titleTag"
        v-if="title"
        class="hero-banner__title"
        v-html="title"
      />
      <!-- eslint-enable vue/no-v-html, vue/no-v-text-v-html-on-component -->

      <p v-if="text" class="hero-banner__text">{{ text }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-banner {
  display: flex;
  position: relative;
  align-items: center;
  background: var(--additional-gray-100);
  padding: var(--spacing-24);
  min-height: 360px;
  overflow: hidden;

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    @include cover-pic;
  }

  &__content {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: var(--spacing-16);
    max-width: 432px;
    overflow-wrap: break-word;
  }

  &__title {
    color: var(--additional-gray-900);

    @include text-style("heading-30-medium");
  }

  &__text {
    color: var(--additional-gray-700);

    @include text-style("body-14-regular");
  }
}
</style>
