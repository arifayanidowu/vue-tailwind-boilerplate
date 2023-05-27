<template>
  <div class="relative w-fit h-fit">
    <div
      :class="[
        {
          'bg-blue-500': color === 'primary',
          'bg-yellow-500': color === 'secondary',
          'bg-green-500': color === 'success',
          'bg-red-500': color === 'danger',
          'bg-lime-500': color === 'warning',
          'bg-orange-500': color === 'info',
        },
        'absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center text-white justify-center text-[0.8rem] font-bold p-3',
      ]"
      v-if="badgeCount && badgeCount > 0"
    >
      {{ computedBadgeCount }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";

const props = defineProps({
  badgeCount: {
    type: Number,
    required: false,
  },
  color: {
    type: String as PropType<
      "primary" | "secondary" | "success" | "danger" | "warning" | "info"
    >,
    default: "primary",
    required: false,
  },
});

// If badgeContent is more than 99, add 99+ to the badge
const computedBadgeCount = computed(() => {
  if (props.badgeCount && +props.badgeCount > 99) {
    return "99+";
  }
  return props.badgeCount;
});
</script>
