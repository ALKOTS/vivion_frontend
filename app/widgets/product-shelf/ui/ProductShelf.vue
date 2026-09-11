<script setup lang="ts">
import type { ProductShelf } from "~/widgets/product-shelf/model/types"

type ProductShelfTitleTag = `h${2 | 3 | 4 | 5 | 6}`

const props = withDefaults(
  defineProps<
    {
      /**
       * Тег заголовка.
       *
       * @default h2
       */
      titleTag?: ProductShelfTitleTag
    } & ProductShelf
  >(),
  { titleTag: "h2" },
)

const hasProducts = computed(
  () => Array.isArray(props.products) && props.products.length > 0,
)

const primaryProductIndex = computed(() => {
  // hasProducts предполагает, что продукты точно существуют, поэтому "!"
  for (const [index, product] of props.products!.entries()) {
    if (product.primary) {
      return index
    }
  }

  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined
})

const hasPrimaryProduct = computed(
  () => typeof primaryProductIndex.value === "number",
)

const primaryProduct = computed(() =>
  // hasProducts предполагает, что продукты точно существуют, поэтому "!"
  hasProducts.value && hasPrimaryProduct.value
    ? props.products![primaryProductIndex.value!]
    : undefined,
)

const nonPrimaryProducts = computed(() => {
  if (!hasProducts.value) return []

  // hasProducts предполагает, что продукты точно существуют, поэтому "!"
  return hasPrimaryProduct.value
    ? props.products!.toSpliced(primaryProductIndex.value!, 1)
    : props.products!
})

const productsCount = computed(() =>
  // hasProducts предполагает, что продукты точно существуют, поэтому "!"
  Math.max(props.total || 0, hasProducts.value ? props.products!.length : 0),
)

const nonPrimaryProductsFit = computed(() => (hasPrimaryProduct.value ? 4 : 8))

const hasMore = computed(
  () =>
    nonPrimaryProducts.value.length > nonPrimaryProductsFit.value ||
    productsCount.value > nonPrimaryProductsFit.value + 1,
)
</script>

<template>
  <div class="product-shelf">
    <div v-if="title || description" class="product-shelf__header">
      <div v-if="title" class="product-shelf__title-wrapper">
        <component :is="titleTag" class="product-shelf__title">
          {{ title }}
        </component>

        <div v-if="productsCount > 0" class="product-shelf__count">
          {{ productsCount }}
        </div>
      </div>

      <p v-if="description" class="product-shelf__description">
        {{ description }}
      </p>
    </div>

    <div v-if="hasProducts" class="product-shelf__listing">
      <!-- hasProducts предполагает, что продукты точно существуют, поэтому "!" -->
      <ListingProductItem
        v-if="primaryProduct"
        v-bind="primaryProduct"
        class="product-shelf__item _primary-product"
        size="l"
      >
        <template #action>
          <FavouriteBtn :id="primaryProduct.id" />
        </template>
      </ListingProductItem>

      <ListingProductItem
        v-for="(product, index) in hasMore
          ? nonPrimaryProducts.slice(0, nonPrimaryProductsFit)
          : nonPrimaryProducts"
        v-bind="product"
        :key="index"
        class="product-shelf__item"
      >
        <template #action>
          <FavouriteBtn :id="product.id" />
        </template>
      </ListingProductItem>

      <div v-if="hasMore" class="product-shelf__item product-shelf__has-more">
        {{ `Смотреть все +${productsCount - nonPrimaryProductsFit}` }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-shelf {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-24);

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);
  }

  &__title-wrapper {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-8);
  }

  &__title {
    @include text-style("heading-24-medium");
  }

  &__count {
    color: var(--brand-marine-800);

    @include text-style("body-10-light");
  }

  &__description {
    max-width: 683px;
    color: var(--additional-gray-700);

    @include text-style("body-14-regular");
  }

  &__listing {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-8);
  }

  &__item {
    &._primary-product {
      grid-row: 1/3;
      grid-column: 1/3;
    }
  }
}
</style>
