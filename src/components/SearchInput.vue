<template>
  <div class="py-3 px-4">
    <div class="relative max-w-xs">
      <div
        class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4 z-0"
      >
        <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" />
      </div>
      <label for="hs-table-search" class="sr-only">Search</label>
      <input
        type="text"
        name="table-search"
        id="table-search"
        class="p-3 pl-10 block w-full peer border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        autocomplete="off"
        ref="textInputRef"
      />

      <app-btn-icon
        @click="clearInput"
        class="absolute opacity-0 peer-focus:opacity-100 transition-all duration-300 ease-in-out inset-y-0 right-0 z-40 pr-3 flex items-center text-sm leading-5 cursor-pointer"
      >
        <XMarkIcon class="h-4 w-4 text-gray-400" />
      </app-btn-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

defineProps({
  modelValue: String,
  modelModifiers: {
    default: () => ({}),
  },
});

const textInputRef = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "clear"): void;
}>();

const clearInput = () => {
  if (textInputRef.value) {
    emit("clear");
    textInputRef.value.focus();
  }
};
</script>
