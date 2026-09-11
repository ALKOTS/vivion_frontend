<script setup lang="ts">
/**
 * Промо-баннер.
 *
 * @example
 * <HeroBanner
 *   img="/images/hero-rings.png"
 *   text="Мы создаём помолвочные кольца с бриллиантами..."
 *   title="Помолвочные кольца с бриллиантами"
 *   title-tag="h1"
 * />
 */
const props = defineProps<{
  /** Путь к фоновой картинке; без неё остаётся серая подложка. */
  img?: string
  /** Описание под заголовком. */
  text?: string
  /** Заголовок баннера. */
  title?: string
}>()
const hasContent = computed(() => props.title || props.text)
</script>

<template>
  <div class="hero-banner">
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
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="title" class="hero-banner__title" v-html="title" />

      <p v-if="text" class="hero-banner__text">{{ text }}</p>
    </div>
  </div>
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
