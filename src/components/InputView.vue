<template>
  <div class="relative mb-4">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <label
        class="block absolute text-gray-400 text-sm dark:text-gray-300 -mt-6"
        v-if="isVisible && label"
        >{{ label }}</label
      >
    </transition>
    <div class="mt-2 relative">
      <input
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        :class="[
          'w-full py-4 px-2 block peer gap-3 mb-7 rounded-md border font-medium text-gray-500 bg-white shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:focus:ring-slate-500 transition-all text-md dark:bg-slate-600 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-300 dark:hover:text-gray-200 dark:focus:ring-offset-gray-900',
          {
            'border-red-500 text-red-400': color === 'danger',
            'border-green-500 text-green-300': color === 'success',
            'border-gray-500': color === 'plain',
            'border-red-300 dark:border-red-300 focus:ring-red-400 dark:focus:ring-red-400 text-red-400 dark:text-red-400':
              error.length,
          },
          $attrs.class,
        ]"
        @focus="isVisible = true"
        @blur="isVisible = false"
        autocomplete="off"
      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
        <slot name="prepend-icon"></slot>
      </div>
    </div>
    <p
      class="mt-1 absolute invisible peer-invalid:visible text-red-300 text-xs -bottom-4"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ref } from "vue";

defineProps({
  modelValue: String,
  modelModifiers: {
    default: () => ({}),
  },
  label: {
    type: String,
    default: "",
  },
  color: {
    type: String as PropType<
      "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "plain"
    >,
    default: "primary",
  },
  error: {
    type: String,
    default: "",
  },
});

const isVisible = ref(false);

defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>
