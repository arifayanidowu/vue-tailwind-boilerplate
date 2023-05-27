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
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        :class="[
          {
            'border-red-500 text-red-400': color === 'danger',
            'border-green-500 text-green-300': color === 'success',
            'border-gray-500': color === 'plain',
            'border border-red-300 focus:border-red-200 dark:border-red-300 focus:ring-red-400 dark:focus:ring-red-400 text-red-400 dark:text-red-400':
              error.length,
            'border-slate-300 dark:border-slate-600 font-medium text-gray-500 bg-white shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:focus:ring-slate-500 transition-all text-md dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-300 dark:hover:text-gray-200 dark:focus:ring-offset-gray-900':
              color === 'primary',
          },
          'w-full py-4 px-3 block peer placeholder:text-gray-300 dark:placeholder:text-slate-200 gap-3 mb-8 rounded-md border',
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
    <p class="mt-3 absolute text-red-300 text-xs -bottom-4" v-if="error.length">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ref } from "vue";

defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
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
  type: {
    type: String,
    default: "text",
  },
});

const isVisible = ref(false);

defineEmits<{
  (event: "update:modelValue", value: string | number | boolean): void;
}>();
</script>
