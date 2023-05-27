<template>
  <div
    :class="[
      parentClass[variants],
      'group bg-transparent flex justify-center items-center active:bg-slate-50 dark:active:bg-slate-800 p-2 border border-spacing-2 border-slate-100 dark:border-slate-800 text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-white focus:dark:ring-slate-600 focus:ring-offset-1 focus:ring-offset-gray-400 focus:dark:ring-offset-slate-600 transition-all duration-300',
    ]"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  >
    <img
      :src="src"
      :alt="alt"
      :width="size"
      :height="size"
      class="rounded-full h-full w-full group-hover:bg-slate-200 object-cover object-center"
      :class="[
        parentClass[variants],
        'h-full w-full group-hover:bg-slate-200 object-cover object-center',
      ]"
      v-if="src"
    />
    <UserCircleIcon
      class="h-full w-full"
      v-else
      :style="{
        width: size + 'px',
        height: size + 'px',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon } from "@heroicons/vue/24/solid";
import type { PropType } from "vue";
import { reactive } from "vue";

defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    default: 40,
    required: false,
  },
  variants: {
    type: String as PropType<"rounded" | "square">,
    default: "rounded",
  },
});

const parentClass = reactive({
  rounded: "rounded-full",
  square: "rounded-md",
});
</script>
