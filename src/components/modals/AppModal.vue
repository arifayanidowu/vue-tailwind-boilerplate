<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="[
                {
                  'sm:max-w-sm': variants === 'sm',
                  'md:w-2/5': variants === 'md',
                  'max-w-lg': variants === 'lg',
                  'max-w-xl': variants === 'xl',
                },
                'w-full transform overflow-hidden divide-y dark:divide-slate-700 rounded-md bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-all',
              ]"
            >
              <DialogTitle
                class="text-lg font-medium text-gray-900 dark:text-gray-300 p-6 flex justify-between items-center"
              >
                {{ title }}
                <app-icon-btn @click="closeModal">
                  <XMarkIcon class="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </app-icon-btn>
              </DialogTitle>
              <div class="p-6">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  variants: {
    type: String as PropType<"sm" | "md" | "lg" | "xl">,
    default: "md",
  },
});

const emit = defineEmits<{
  (event: "closeModal", val: boolean): void;
}>();

const open = ref(props.isOpen);

function closeModal() {
  open.value = false;
  emit("closeModal", open.value);
}
</script>
