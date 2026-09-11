<script setup lang="ts">
useHead({ title: "LaVivion" })

const classicShelf: ProductShelf = {
  description:
    "Классические кольца с одним бриллиантом выбирают, когда хочется точной формы, которая легко считывается как помолвочная и хорошо выглядит каждый день. Универсальный выбор, подходящий всем.",
  id: "classic",
  products: [
    {
      id: "1",
      img: "/images/ring2.png",
      materials: ["white", "yellow", "rose", "platinum"],
      name: "Lyre / Лира",
      price: "от 166 350 ₽",
      primary: true,
      productType: "Помолвочное кольцо огранка круг",
      trademark: "Placeholder",
    },
    {
      id: "2",
      img: "/images/ring1.png",
      materials: ["white", "yellow", "rose", "platinum"],
      name: "Lyre / ЛираLyre / ЛираLyre / ЛираLyre / ЛираLyre / ЛираLyre / Лира",
      price: "от 166 350 ₽",
      productType: "Помолвочное кольцо",
    },
    {
      id: "3",
      img: "/images/ring1.png",
      materials: ["white", "yellow", "rose", "platinum"],
      name: "Lyre / Лира",
      price: "от 166 350 ₽",
      productType: "Помолвочное кольцо",
      trademark: "Placeholder",
    },
    {
      id: "4",
      img: "/images/ring1.png",
      materials: ["white", "yellow", "rose", "platinum"],
      name: "Lyre / Лира",
      price: "от 166 350 ₽",
      productType: "Помолвочное кольцо",
    },
  ],
  title: "Классические",
  total: 28,
}
</script>

<template>
  <div>
    <ProductShelf v-bind="classicShelf" />
  </div>
</template>
