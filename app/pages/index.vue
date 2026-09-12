<script setup lang="ts">
import type { Article } from "~/entities/content-item/model/types"
import type { Product } from "~/entities/product-item/model/types"
import type { QuickFilter } from "~/entities/quick-filter/model/types"
import type { Blog } from "~/widgets/blog/model/types"
import type { ProductShelf } from "~/widgets/product-shelf/model/types"
import type { SelectionBudget } from "~/widgets/selection-budget/model/types"

useHead({ title: "LaVivion" })

const hero = {
  img: "/images/hero-rings.png",
  text: "Мы создаём помолвочные кольца с бриллиантами, достойные вашей истории любви. Каждое кольцо выполнено с непревзойдённым мастерством в соответствии с нашими строгими стандартами.",
  title: "Помолвочные кольца с бриллиантами",
  titleTag: "h2" as const,
}

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
  materials: ["white", "yellow", "rose", "platinum"],
  name: "Lyre / Лира",
  price: "от 166 350 ₽",
  trademark: "Placeholder",
} satisfies Omit<Product, "id">

/**
 * Собирает товары полки: первый — главный, крупный, остальные — обычные.
 *
 * @param shelfId Идентификатор полки; входит в `id` товаров и в имена картинок.
 * @param count Сколько обычных товаров помимо главного.
 * @returns Массив товаров.
 */
const makeProducts = (shelfId: string, count: number): Product[] => [
  {
    ...ring,
    id: `${shelfId}-main`,
    img: `/images/products/${shelfId}-main.jpg`,
    primary: true,
    productType: "Помолвочное кольцо огранка круг",
  },
  ...Array.from({ length: count }, (_, index) => ({
    ...ring,
    id: `${shelfId}-${index + 1}`,
    img: `/images/products/${shelfId}-item.${shelfId === "halo" ? "png" : "jpg"}`,
    productType: "Помолвочное кольцо",
  })),
]

const shelves: ProductShelf[] = [
  {
    description:
      "Классические кольца с одним бриллиантом выбирают, когда хочется точной формы, которая легко считывается как помолвочная и хорошо выглядит каждый день. Универсальный выбор, подходящий всем.",
    id: "classic",
    products: makeProducts("classic", 3),
    title: "Классические",
    total: 28,
  },
  {
    description:
      "Кольца с бриллиантовой дорожкой подойдут девушке, которая хочет более заметное сияние на руке. Маленькие бриллианты по бокам усиливают центральный камень и делают кольцо выразительнее, поэтому это хороший выбор, если ей нравятся изящные, но не слишком простые украшения.",
    id: "pave",
    products: makeProducts("pave", 3),
    title: "С бриллиантовой дорожкой",
    total: 28,
  },
  {
    description:
      "Кольца с тремя камнями подойдут девушке, которой хочется, чтобы кольцо выглядело крупнее и заметнее на руке. Боковые бриллианты добавляют ширину и сияние вокруг центрального камня, поэтому модель смотрится более объёмной и торжественной, чем классическое кольцо с одним бриллиантом.",
    id: "three-stone",
    products: makeProducts("three-stone", 3),
    title: "С тремя камнями",
    total: 28,
  },
  {
    description:
      "Мелкие бриллианты вокруг визуально увеличивают главный камень и делают кольцо намного более выразительным, поэтому это хороший выбор, если ей нравятся украшения, которые сразу видны на руке.",
    id: "halo",
    products: makeProducts("halo", 3),
    title: "С ободком halo",
    total: 28,
  },
  {
    description:
      "Мелкие бриллианты вокруг визуально увеличивают главный камень и делают кольцо намного более выразительным, поэтому это хороший выбор, если ей нравятся украшения, которые сразу видны на руке.",
    id: "exclusive",
    products: makeProducts("exclusive", 3),
    title: "Эксклюзивные помолвочные кольца",
    total: 28,
  },
]

const sizeBanner = {
  img: "/images/section-banner-rings.png",
  text: "Можно воспользоваться онлайн‑измерителем, обратиться к эксперту или прийти в бутик с её кольцом.",
  title: "Не знаете размер?",
}

// Порядок карточек — как в сетке макета: слева направо, сверху вниз; крупная — последняя.
const budget: SelectionBudget = {
  cards: [
    {
      img: "/images/nav-cards/budget-1.jpg",
      label: "до 150 000 ₽",
      to: "/catalog/engagement-rings?price=0-150000",
    },
    {
      img: "/images/nav-cards/budget-2.jpg",
      label: "до 300 000 ₽",
      to: "/catalog/engagement-rings?price=150000-300000",
    },
    {
      img: "/images/nav-cards/budget-3.jpg",
      label: "до 500 000 ₽",
      to: "/catalog/engagement-rings?price=300000-500000",
    },
    {
      img: "/images/nav-cards/budget-4.jpg",
      label: "до 1 000 000 ₽",
      to: "/catalog/engagement-rings?price=500000-1000000",
    },
    {
      img: "/images/nav-cards/budget-large.png",
      label: "от 1 000 000 ₽",
      title: "Помолвочные кольца с крупным бриллиантом",
      to: "/catalog/engagement-rings?price=1000000-",
    },
  ],
  title: "Подборки помолвочных колец в бюджет",
}

const consultation = {
  buttonText: "Записаться на просмотр",
  description:
    "В бутике LA VIVION в центре Москвы можно посмотреть кольца вживую, сравнить бриллианты и уточнить размер. Большинство моделей доступны к просмотру в день визита, а эксперты с геммологической подготовкой помогут выбрать кольцо под ваш сценарий.",
  img: "/images/boutique.png",
  imgAlt: "Эксперт LA VIVION с лупой и кольцом",
  title: "Посмотреть кольцо перед покупкой",
}

const articles: Article[] = [
  {
    id: "how-to-choose-engagement-ring",
    img: "/images/articles/how-to-choose-engagement-ring.png",
    tags: ["Помолвка и свадьба", "Гид"],
    title: "Как выбрать помолвочное кольцо",
  },
  {
    id: "diamond-origin",
    img: "/images/articles/diamond-origin.jpg",
    tags: ["Помолвка и свадьба"],
    title: "Происхождение бриллиантов LA VIVION",
  },
  {
    id: "four-c",
    img: "/images/articles/four-c.jpg",
    tags: ["Помолвка и свадьба"],
    title: "4C — карат, цвет и чистота",
  },
]

const blog: Blog = { cards: articles, count: 126, title: "Блог", to: "/blog" }

const { disabledIds, select, selected, visibleShelves } = useCatalogFilter({
  filters,
  shelves,
})
</script>

<template>
  <div class="index-page page">
    <h1 class="visually-hidden">Главная страница</h1>
    <HeroBanner v-bind="hero" />

    <SectionNav class="_pt-40">
      <QuickFiltersGroup
        :disabled-ids
        :filters
        :model-value="selected"
        @update:model-value="select"
      />

      <WrapperFilters />
    </SectionNav>

    <!-- Полки разделены линией; у первой её нет, чтобы не дублировать границу навигации -->
    <ProductShelf
      v-for="(shelf, index) in visibleShelves"
      v-bind="shelf"
      :key="shelf.id"
      class="_py-40"
      :class="{ '_border-top': index > 0 }"
      title-tag="h3"
    />

    <SectionBanner v-bind="sizeBanner" class="_py-40">
      <template #actions>
        <SimpleButton text="Открыть измеритель" variant="secondary-outline" />

        <SimpleButton text="Связаться с экспертом" />
      </template>
    </SectionBanner>

    <SelectionBudget v-bind="budget" class="_pb-40" />

    <MediaContent v-bind="consultation" class="_border-top _py-40" />

    <Blog v-bind="blog" class="_border-top _pt-40 _pb-80" />
  </div>
</template>
