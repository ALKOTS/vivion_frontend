<script setup lang="ts">
type MediaContentTitleTag = `h${2 | 3 | 4 | 5 | 6}`

/**
 * Медиа-блок: заголовок, описание и кнопка слева, большая картинка справа.
 * Клик по кнопке — событие `action`; кнопку можно заменить через слот `action`.
 *
 * На десктопе — 12-колоночная сетка: 3 колонки под текст, 9 под картинку.
 * До `lg` колонки складываются в столбик, текст сверху.
 *
 * @example
 * <MediaContent
 *   button-text="Записаться на просмотр"
 *   description="В бутике LA VIVION в центре Москвы можно посмотреть кольца вживую..."
 *   img="/images/boutique.png"
 *   title="Посмотреть кольцо перед покупкой"
 * />
 */
const props = withDefaults(
  defineProps<{
    /** Подпись кнопки под описанием; без неё кнопки нет. */
    buttonText?: string
    /** Подпись под картинкой. */
    caption?: string
    /** Описание под заголовком. */
    description?: string
    /** Путь к картинке для `<NuxtImg>`; без неё остаётся серая подложка. */
    img?: string
    /** Альтернативный текст картинки. */
    imgAlt?: string
    /** Заголовок блока. */
    title?: string
    /**
     * Тег заголовка.
     *
     * @default h2
     */
    titleTag?: MediaContentTitleTag
  }>(),
  { imgAlt: "", titleTag: "h2" },
)

const emit = defineEmits<{
  /** Клик по кнопке. */
  action: []
}>()

const slots = useSlots()

const hasText = computed(
  () =>
    Boolean(props.title || props.description || props.buttonText) ||
    Boolean(slots.action || slots.default),
)
</script>

<template>
  <section class="media-content">
    <div v-if="hasText" class="media-content__text">
      <component :is="titleTag" v-if="title" class="media-content__title">
        {{ title }}
      </component>

      <p v-if="description" class="media-content__description">
        {{ description }}
      </p>

      <slot name="action">
        <TextButtonSpecial
          v-if="buttonText"
          class="media-content__button"
          :text="buttonText"
          @click="emit('action')"
        />
      </slot>

      <slot />
    </div>

    <figure class="media-content__media">
      <div class="media-content__pic">
        <NuxtImg
          v-if="img"
          :alt="imgAlt"
          class="media-content__img"
          format="webp"
          height="520"
          loading="lazy"
          sizes="sm:1038px"
          :src="img"
          width="1038"
        />
      </div>

      <figcaption v-if="caption" class="media-content__caption">
        {{ caption }}
      </figcaption>
    </figure>
  </section>
</template>

<style lang="scss" scoped>
.media-content {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: start;
  gap: var(--spacing-24);

  &__text {
    display: flex;
    grid-column: span 3;
    flex-direction: column;
    gap: var(--spacing-16);
  }

  &__title {
    color: var(--additional-gray-900);
    overflow-wrap: break-word;

    @include text-style("heading-24-medium");
  }

  &__description {
    color: var(--additional-gray-700);

    @include text-style("body-14-regular");
  }

  &__button {
    align-self: flex-start;
  }

  &__media {
    display: flex;
    grid-column: span 9;
    flex-direction: column;
    gap: var(--spacing-12);
    margin: 0;
  }

  &__pic {
    background: var(--additional-gray-100);
    aspect-ratio: 1038/520;
    overflow: hidden;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;

    @include cover-pic;
  }

  &__caption {
    color: var(--additional-gray-500);
    text-align: center;

    @include text-style("body-12-light");
  }
}
</style>
