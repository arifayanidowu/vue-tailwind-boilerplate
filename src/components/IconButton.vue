<template>
  <button
    :class="[
      {
        'rounded-full': variants === 'rounded',
        'rounded-md': variants === 'square',
        'rounded-none bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent border-0':
          variants === 'flat',
      },
      'bg-transparent active:bg-slate-50 dark:active:bg-slate-800 p-2 border border-spacing-2 border-slate-100 dark:border-slate-800 text-gray-400 hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-transparent focus:dark:ring-slate-600 focus:ring-offset-1 focus:ring-offset-gray-200 focus:dark:ring-offset-slate-600 transition-all duration-300',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  variants: {
    type: String as PropType<"square" | "rounded" | "flat">,
    default: "rounded",
  },
});
</script>
