<template>
  <button
    v-bind="$attrs"
    :class="[
      {
        'bg-transparent': color === 'plain',
        'bg-indigo-600 disabled:bg-slate-400 hover:bg-indigo-500 active:bg-indigo-600 text-slate-100 dark:bg-indigo-800 dark:hover:bg-indigo-900  dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800':
          color === 'primary',
        'bg-orange-800/95 disabled:bg-orange-200 hover:bg-orange-700 active:bg-orange-800 text-slate-100 dark:bg-orange-800 dark:hover:bg-orange-900 dark:border-orange-700 focus:ring-orange-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-offset-orange-800':
          color === 'secondary',
        'bg-red-600 disabled:bg-red-400 hover:bg-red-500 active:bg-red-700 text-slate-100 dark:bg-red-800 dark:hover:bg-red-900 dark:border-red-700 focus:ring-red-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-offset-red-800':
          color === 'danger',
        'bg-green-600 disabled:bg-green-400 hover:bg-green-500 active:bg-green-700 text-slate-100 dark:bg-green-800 dark:hover:bg-green-900 dark:border-green-700 focus:ring-green-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-offset-green-800':
          color === 'success',
        'bg-yellow-600 disabled:bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-700 text-slate-100 dark:bg-yellow-800 dark:hover:bg-yellow-900 dark:border-yellow-700 focus:ring-yellow-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-offset-yellow-800':
          color === 'warning',
        'bg-blue-600 disabled:bg-blue-400 hover:bg-blue-500 active:bg-blue-700 text-slate-100 dark:bg-blue-800 dark:hover:bg-blue-900 dark:border-blue-700 focus:ring-blue-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:ring-offset-blue-800':
          color === 'info',
      },
      'w-full py-4 my-3 px-4 inline-flex justify-center focus-visible:outline disabled:cursor-not-allowed items-center gap-2 rounded-md border font-medium text-gray-700 text-md shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all duration-300 text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800',
    ]"
  >
    <span class="sr-only">Call to action button</span>
    <template v-if="loading">
      <span class="sr-only"> Loading... </span>
      <SpinnerIcon class="w-5 h-5 animate-spin" else />
    </template>
    <component :is="Icon" v-if="Icon && !loading" class="h-5 w-5" />
    <slot name="loading" v-if="loading">Loading...</slot>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import SpinnerIcon from "./icons/SpinnerIcon.vue";

defineProps({
  color: {
    type: String as PropType<
      "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "plain"
    >,
    default: "primary",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  Icon: {
    type: Object as PropType<any>,
  },
});
</script>
