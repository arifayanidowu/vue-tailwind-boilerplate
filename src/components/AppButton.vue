<template>
  <button
    v-bind="$attrs"
    :class="[
      {
        'bg-transparent': color === 'plain',
        'btn-primary': color === 'primary',
        'btn-secondary': color === 'secondary',
        'btn-danger': color === 'danger',
        'btn-success': color === 'success',
        'btn-warning': color === 'warning',
        'btn-info': color === 'info',
      },
      'btn',
    ]"
  >
    <span class="sr-only">Call to action button</span>
    <template v-if="loading">
      <span class="sr-only"> Loading... </span>
      <SpinnerIcon class="w-5 h-5 animate-spin" else />
    </template>
    <component :is="Icon" v-if="Icon && !loading" class="h-4 w-4" />
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
    required: false,
  },
});
</script>
