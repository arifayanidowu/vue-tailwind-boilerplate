<template>
  <button
    :class="[
      {
        'rounded-full': variants === 'rounded',
        'rounded-md': variants === 'square',
        'rounded-none border-0': variants === 'flat',
      },
      colorObject[colors].bg,
      'icon-btn',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { reactive } from "vue";

defineProps({
  variants: {
    type: String as PropType<"square" | "rounded" | "flat">,
    default: "rounded",
  },
  colors: {
    type: String as PropType<
      | "primary"
      | "secondary"
      | "success"
      | "danger"
      | "warning"
      | "info"
      | "light"
      | "dark"
      | "plain"
    >,
    default: "plain",
  },
});

const colorObject = reactive({
  primary: {
    bg:
      "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:dark:ring-offset-blue-600",
  },
  secondary: {
    bg:
      "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200 focus:dark:ring-offset-orange-600",
  },
  success: {
    bg:
      "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 focus:dark:ring-offset-green-600",
  },
  danger: {
    bg:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:dark:ring-offset-red-600",
  },
  warning: {
    bg:
      "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200 focus:dark:ring-offset-yellow-600",
  },
  info: {
    bg:
      "bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 focus:dark:ring-offset-cyan-600",
  },
  light: {
    bg:
      "bg-white text-gray-800 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500 focus:ring-offset-gray-200 focus:dark:ring-offset-gray-600",
  },
  dark: {
    bg:
      "bg-gray-800 text-white hover:bg-slate-700 active:bg-slate-600 focus:ring-slate-500 focus:ring-offset-slate-200 focus:dark:ring-offset-slate-600",
  },
  plain: {
    bg:
      "bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500 focus:ring-offset-gray-200 focus:dark:ring-offset-gray-600",
  },
});
</script>
