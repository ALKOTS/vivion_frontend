<script setup lang="ts">
import type { Product } from "~/entities/product-item/model/types"

/** Тег обёртки: `li` — если карточка лежит в списке. */
type ProductItemComponent = "div" | "li"
/** Размер карточки: `s` — обычная ячейка сетки, `l` — крупная. */
type ProductItemSize = "l" | "s"

/**
 * Карточка товара в листинге.
 *
 * @example
 * <ListingProductItem v-bind="product" component="li" size="l">
 *   <template #action>
 *     <FavouriteBtn :id="product.id" />
 *   </template>
 * </ListingProductItem>
 */
const props = withDefaults(
  defineProps<
    {
      /**
       * Тег обёртки.
       *
       * @default div
       */
      component?: ProductItemComponent
      /**
       * Размер карточки; задаёт размер запрашиваемой картинки.
       *
       * @default s
       */
      size?: ProductItemSize
    } & Product
  >(),
  { component: "div", size: "s" },
)

const slots = useSlots()

const imgProps = computed(() =>
  props.size === "s"
    ? { height: "342px", sizes: "sm:342px", width: "342px" }
    : { height: "692px", sizes: "sm:692px", width: "692px" },
)

const hasMaterials = computed(
  () => Array.isArray(props.materials) && props.materials.length > 0,
)
</script>

<template>
  <component
    :is="component"
    :class="['listing-product-item', getModifiers(`size-${size}`)]"
  >
    <Badge
      v-if="trademark"
      class="listing-product-item__badge"
      show-tm
      :text="trademark"
    />
    <div v-if="slots.action" class="listing-product-item__action">
      <slot name="action" />
    </div>
    <NuxtLink class="listing-product-item__link" :to="`/products/${id}`">
      <NuxtImg
        v-if="img"
        :alt="name"
        class="listing-product-item__img"
        format="webp"
        loading="lazy"
        :src="img"
        v-bind="imgProps"
      />

      <div class="listing-product-item__content">
        <div class="listing-product-item__hover-indicator" />

        <div v-if="name" class="listing-product-item__name">{{ name }}</div>

        <div v-if="productType" class="listing-product-item__type">
          {{ productType }}
        </div>

        <div v-if="hasMaterials || price" class="listing-product-item__bottom">
          <div v-if="price" class="listing-product-item__price">
            {{ price }}
          </div>

          <div v-if="hasMaterials" class="listing-product-item__materials">
            <div
              v-for="(material, index) in materials"
              :key="index"
              :class="[
                'listing-product-item__material',
                getModifiers(material),
              ]"
            />
          </div>
        </div>
      </div>
    </NuxtLink>
  </component>
</template>

<style lang="scss" scoped>
.listing-product-item {
  $root: &;

  --hover-indicator-height: var(--spacing-8);
  --hover-indicator-width: 0;

  position: relative;
  background: var(--additional-gray-50);

  &__badge {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  &__action {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  &._size-l {
    #{$root}__badge {
      top: 8px;
      left: 8px;
    }
  }

  &__link {
    display: flex;
    flex-direction: column;
  }

  &__img {
    aspect-ratio: 1/1;
    width: 100%;
    height: auto;

    @include cover-pic;
  }

  &__content {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: var(--spacing-4);
    margin: var(--hover-indicator-height) var(--spacing-12) var(--spacing-12);
  }

  &__hover-indicator {
    display: flex;
    position: absolute;
    top: calc(-1 * var(--hover-indicator-height));
    flex-direction: row;
    align-items: center;
    width: var(--hover-indicator-width);
    height: var(--hover-indicator-height);

    @include transition(width);

    &::before {
      background: var(--brand-marine-800);
      width: 34%;
      height: 1px;
      content: "";
    }
    &::after {
      background: var(--additional-gray-400);
      width: 66%;
      height: 1px;
      content: "";
    }
  }

  &__name {
    @include text-style("body-14-light");
  }

  &__type {
    color: var(--additional-gray-500);

    @include text-style("body-12-light");
  }

  &__price {
    flex: 1;

    @include text-style("body-14-medium");
  }

  &__bottom {
    display: flex;
    flex-direction: row;
  }

  &__materials {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-4);
    margin-left: auto;
  }

  @include hover {
    --hover-indicator-width: 100%;
  }

  &__material {
    border-radius: 100%;
    aspect-ratio: 1/1;
    width: 8px;
    height: auto;

    &._white {
      background: linear-gradient(
        #cac8b9 0%,
        #cac8b9 50%,
        #c6c1b3 70%,
        #acaaa5 90%,
        #bab9b5 100%
      );
    }

    &._yellow {
      background: linear-gradient(
        #edc95e 0%,
        #edc95e 50%,
        #e7c684 70%,
        #cdae84 90%,
        #d4ba96 100%
      );
    }

    &._rose {
      background: linear-gradient(
        #eba56f 0%,
        #eba56f 50%,
        #e3a482 70%,
        #c59277 90%,
        #cea48d 100%
      );
    }

    &._platinum {
      background: linear-gradient(
        #b9bec1 0%,
        #b9bec1 50%,
        #abb4ba 70%,
        #9a9fa2 90%,
        #aaaeb1 100%
      );
    }
  }
}
</style>
