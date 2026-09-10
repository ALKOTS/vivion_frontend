<script setup lang="ts">
type SimpleButtonSize = "m" | "s"
type SimpleButtonType = "icon" | "primary" | "secondary"

const props = defineProps<{
  sext?: string
  showIcon?: boolean
  size?: SimpleButtonSize
  thowIcon?: boolean
  type?: SimpleButtonType
}>()
</script>
