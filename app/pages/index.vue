<script setup lang="ts">
import type { Product } from "~/entities/product-item/model/types"
import type { QuickFilter } from "~/entities/quick-filter/model/types"
import type { ProductShelf } from "~/widgets/product-shelf/model/types"

useHead({ title: "LaVivion" })

const filters: QuickFilter[] = [
  {
    id: "classic",
    img: "/images/quick-filters/classic.png",
    name: "Классические",
  },
  {
    id: "pave",
    img: "/images/quick-filters/pave.png",
    name: "С бриллиантовой дорожкой",
  },
  {
    id: "three-stone",
    img: "/images/quick-filters/three-stone.png",
    name: "С тремя камнями",
  },
  { id: "halo", img: "/images/quick-filters/halo.png", name: "С ободком halo" },
  {
    id: "exclusive",
    img: "/images/quick-filters/exclusive.png",
    name: "Эксклюзивные помолвочные кольца",
  },
  { id: "all", img: "/images/quick-filters/all.png", name: "Смотреть всё" },
]

const ring = {
  img: "/images/ring1.png",
  materials: ["white", "yellow", "rose", "platinum"],
  name: "Lyre / Лира",
  price: "от 166 350 ₽",
  productType: "Помолвочное кольцо",
  trademark: "Placeholder",
} satisfies Omit<Product, "id">

/**
 * Генерирует товары для полки; первый — главный.
 *
 * @param shelfId Идентификатор полки, чтобы `id` товаров не повторялись между полками.
 * @param count Сколько товаров.
 * @returns Массив товаров.
 */
const makeProducts = (shelfId: string, count: number): Product[] =>
  Array.from({ length: count }, (_, index) => ({
    ...ring,
    id: `${shelfId}-${index + 1}`,
    ...(index === 0 ? { img: "/images/ring2.png", primary: true } : {}),
  }))

const shelves: ProductShelf[] = [
  {
    description:
      "Классические кольца с одним бриллиантом выбирают, когда хочется точной формы, которая легко считывается как помолвочная и хорошо выглядит каждый день.",
    id: "classic",
    products: makeProducts("classic", 5),
    title: "Классические",
    total: 28,
  },
  {
    description:
      "Дорожка из бриллиантов по шинке добавляет кольцу света, не отвлекая от центрального камня.",
    id: "pave",
    products: makeProducts("pave", 5),
    title: "С бриллиантовой дорожкой",
    total: 16,
  },
  {
    description:
      "Центральный камень в обрамлении двух боковых: символ прошлого, настоящего и будущего.",
    id: "three-stone",
    products: makeProducts("three-stone", 4),
    title: "С тремя камнями",
    total: 9,
  },
  { id: "halo", products: [], title: "С ободком halo" },
  { id: "exclusive", products: [], title: "Эксклюзивные помолвочные кольца" },
]

const { disabledIds, select, selected, visibleShelves } = useCatalogFilter({
  filters,
  shelves,
})
</script>

<template>
  <div class="index-page page">
    <SectionNav class="_pt-40">
      <QuickFiltersGroup
        :disabled-ids
        :filters
        :model-value="selected"
        @update:model-value="select"
      />

      <WrapperFilters />
    </SectionNav>

    <ProductShelf
      v-for="shelf in visibleShelves"
      v-bind="shelf"
      :key="shelf.id"
      class="index-page__shelf"
    />
  </div>
</template>
