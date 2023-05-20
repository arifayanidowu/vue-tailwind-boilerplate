<template>
  <div class="py-3 px-4">
    <div class="relative max-w-xs">
      <label for="hs-table-search" class="sr-only">Search</label>
      <input
        type="text"
        name="table-search"
        id="table-search"
        class="p-3 pl-10 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        placeholder="Search for items"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      />
      <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
        <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

defineProps({
  modelValue: String,
  modelModifiers: {
    default: () => ({}),
  },
});

defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>
