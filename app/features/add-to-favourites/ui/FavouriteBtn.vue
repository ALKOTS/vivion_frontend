<script setup lang="ts">
/**
 * Кнопка «в избранное» для карточки товара.
 *
 * @example
 * <FavouriteBtn :id="product.id" />
 */
defineProps<{
  /** Идентификатор товара, который добавляем в избранное. */
  id: string
}>()

const loading = ref(false)

const addToFavourite = () => {
  loading.value = true

  setTimeout(() => (loading.value = false), 1000)
  console.log("Item added to favourite")
}
</script>

<template>
  <SimpleButton
    class="favourite-btn"
    icon="icons:heart"
    :loading
    variant="icon"
    @click="addToFavourite"
  />
</template>
