<template>
  <div class="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
    <div
      class="flex flex-col justify-center overflow-hidden bg-blue-500 text-xs text-white text-center"
      role="progressbar"
      :style="{ width: value + '%' }"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="100"
    >
      {{ value }}%
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    required: true,
  },
});
</script>
