<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="bg-backdrop" />
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
            <DialogPanel class="dialog-panel">
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
              >
                {{ title }}
                <app-icon-btn @click="closeModal" tabindex="1">
                  <XMarkIcon class="w-6 h-6 text-gray-400" />
                </app-icon-btn>
              </DialogTitle>

              <div class="mt-2">
                <slot name="body"></slot>
              </div>

              <div class="mt-4 flex justify-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Cancel
                </button>
                <slot name="action"></slot>
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
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
});

const emit = defineEmits<{
  (event: "close:isOpen", value: boolean): void;
}>();

const isOpen = ref(props.isOpen);

function closeModal() {
  isOpen.value = false;
  emit("close:isOpen", isOpen.value);
}
</script>
