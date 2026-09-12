<script setup lang="ts">
useHead({ title: "LaVivion" })

const blog: Blog = {
  cards: Array.from({ length: 3 }, (_, i) => ({ id: String(i), title: "ss" })),
  count: 22,
  title: "ss",
  to: "#",
}
</script>

<template>
  <div>
    <Blog v-bind="blog" />
  </div>
</template>
