<template>
  <div class="absolute z-50 text-center" v-if="isOpen">
    <div class="fixed inset-0 bg-black bg-opacity-25" />

    <div class="mt-4 fixed flex justify-center items-center inset-0 overflow-y-auto">
      <div class="flex flex-col items-center">
        <span class="sr-only">Loading...</span>
        <SpinnerIcon class="w-10 h-10 animate-spin" />
        <slot name="title">
          <span class="flex items-center justify-center gap-1">
            Processing <LoaderIcon class="w-4 h-4" />
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoaderIcon from "./icons/LoaderIcon.vue";
import SpinnerIcon from "./icons/SpinnerIcon.vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
</script>
