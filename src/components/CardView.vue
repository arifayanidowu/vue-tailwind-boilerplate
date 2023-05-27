<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  variants: {
    type: String as PropType<"sm" | "md" | "lg" | "xl">,
    default: "md",
  },
});
</script>
