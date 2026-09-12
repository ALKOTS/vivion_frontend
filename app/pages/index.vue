<script setup lang="ts">
import type { SelectionBudget } from "~/widgets/selection-budget/model/types"

useHead({ title: "LaVivion" })

const budget: SelectionBudget = {
  cards: [
    ...Array.from({ length: 4 }, () => ({ label: "ss", title: "ss", to: "#" })),
    { label: "ss", title: "ss", to: "#" },
  ],
  title: "ss",
}
</script>

<template>
  <div>
    <SelectionBudget v-bind="budget" />
  </div>
</template>
