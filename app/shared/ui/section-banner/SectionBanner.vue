<script setup lang="ts">
type SectionBannerTitleTag = `h${2 | 3 | 4 | 5 | 6}`

/**
 * Баннер-разделитель между секциями (в Figma — `DividerContent`): картинка слева
 * с плавным переходом в подложку, справа заголовок, описание и кнопки.
 *
 * Кнопки передаются через слот `actions` — сам баннер о действиях ничего не знает.
 *
 * @example
 * <SectionBanner
 *   img="/images/section-banner-rings.png"
 *   text="Можно воспользоваться онлайн-измерителем или обратиться к эксперту."
 *   title="Не знаете размер?"
 * >
 *   <template #actions>
 *     <SimpleButton text="Открыть измеритель" variant="secondary-outline" />
 *     <SimpleButton text="Связаться с экспертом" />
 *   </template>
 * </SectionBanner>
 */
const { titleTag = "h2" } = defineProps<{
  /** Путь к картинке слева; без неё остаётся пустая подложка. */
  img?: string
  /** Описание под заголовком. */
  text?: string
  /** Заголовок баннера. */
  title?: string
  /**
   * Тег заголовка.
   *
   * @default h2
   */
  titleTag?: SectionBannerTitleTag
}>()

const slots = defineSlots<{
  /** Кнопки действий; выстраиваются в колонку на всю ширину. */
  actions?: () => unknown
}>()

const hasActions = computed(() => !!slots.actions)
</script>

<template>
  <div class="section-banner">
    <div class="section-banner__img-wrapper">
      <NuxtImg
        v-if="img"
        alt=""
        class="section-banner__img"
        format="webp"
        height="168"
        loading="lazy"
        sizes="sm:684px"
        :src="img"
        width="684"
      />
    </div>

    <div class="section-banner__container">
      <div v-if="title || text" class="section-banner__content">
        <component :is="titleTag" v-if="title" class="section-banner__title">
          {{ title }}
        </component>

        <p v-if="text" class="section-banner__text">{{ text }}</p>
      </div>

      <div v-if="hasActions" class="section-banner__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-24);
  background: var(--additional-gray-50);

  &__img-wrapper {
    position: relative;
    flex: 1;
    align-self: stretch;
    min-width: 0;
    overflow: hidden;

    &::after {
      position: absolute;
      inset: 0 0 0 50%;
      background: linear-gradient(
        to right,
        rgb(250 250 250 / 0%) 0%,
        var(--additional-gray-50) 100%
      );
      pointer-events: none;
      content: "";
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    pointer-events: none;

    @include cover-pic;
  }

  &__container {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-24);
    padding: var(--spacing-32) var(--spacing-24) var(--spacing-32) 0;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-16);
    overflow-wrap: break-word;
  }

  &__title {
    color: var(--additional-gray-900);

    @include text-style("heading-20-medium");
  }

  &__text {
    color: var(--additional-gray-700);

    @include text-style("body-14-regular");
  }

  &__actions {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    gap: var(--spacing-8);
    min-width: 0;
    & > * {
      height: 52px;
    }
  }
}
</style>
