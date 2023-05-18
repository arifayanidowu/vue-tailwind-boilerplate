<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    :class="[
      'w-full py-3 px-2 block gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:focus:ring-slate-500 transition-all text-sm dark:bg-slate-200 dark:hover:bg-slate-300 dark:border-gray-700 dark:text-gray-900 dark:hover:text-gray-950 dark:focus:ring-offset-gray-900',
      {
        'border-red-500': color === 'danger',
        'border-green-500': color === 'success',
        'border-gray-500': color === 'plain',
      },
    ]"
  />
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  modelValue: String,
  modelModifiers: {
    default: () => ({}),
  },
  color: {
    type: String as PropType<
      "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "plain"
    >,
    default: "primary",
  },
});

defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>
