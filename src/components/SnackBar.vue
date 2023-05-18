<template>
  <Teleport to="body">
    <!-- Animated toast content -->
    <transition
      mode="out-in"
      leave-active-class="transition-all duration-500 delay-300 ease-out"
      leave-from-class="opacity-100 translate-y-0 duration-500 delay-300 ease-out"
      leave-to-class="opacity-0 translate-y-4"
      :key="open"
    >
      <div
        v-if="open"
        :class="[
          'fixed right-4 top-2 z-[1000] w-[400px] p-2 rounded-md',
          {
            'bg-green-400': variant === 'success',
            'bg-red-400': variant === 'danger',
            'bg-orange-400': variant === 'warning',
            'bg-white': variant === 'plain',
            'text-white': variant === 'danger',
          },
        ]"
      >
        <button @click="onClose" class="absolute top-2 right-2 rounded-full">
          <XMarkIcon
            :class="[
              'w-6 h-6',
              {
                'text-white': variant === 'danger',
                'text-slate-600': variant === 'success' || variant === 'warning',
              },
            ]"
          />
        </button>
        <div class="flex w-3/4 gap-3">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="w-6 h-6" v-if="variant === 'success'" />
            <ExclamationCircleIcon class="w-6 h-6" v-else-if="variant === 'danger'" />
            <ExclamationTriangleIcon
              class="w-6 h-6 text-slate-600"
              v-else-if="variant === 'warning'"
            />
          </div>
          <p class="text-sm">
            {{ message }}
          </p>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/solid";
import { watch } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  variant: {
    type: String as PropType<"danger" | "success" | "warning" | "plain">,
    default: "success",
  },
  position: {
    type: String as PropType<"top" | "bottom">,
    default: "top",
  },
});

const emit = defineEmits<{
  (event: "close"): void;
}>();

const onClose = () => {
  emit("close");
};

watch(
  () => props.open,
  (open) => {
    if (open) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }
);
</script>

<style scoped></style>
