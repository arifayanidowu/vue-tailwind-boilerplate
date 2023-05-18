<template>
  <TransitionRoot as="template" :show="open" v-if="mobile">
    <Dialog as="div" class="relative z-40" @close="onClose">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-950 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pl-0">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel class="pointer-events-auto relative w-[276px] max-w-md">
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div
                    class="absolute -right-14 top-0 ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4"
                  >
                    <button
                      type="button"
                      class="rounded-md text-gray-300 hover:text-white ring-2 ring-slate-300 focus:outline-none focus:ring-2 focus:ring-white"
                      @click="onClose"
                    >
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-slate-950/95 shadow-xl"
                >
                  <div
                    class="h-16 border-b-[0.5px] border-b-slate-300 dark:border-b-slate-800 px-4 sm:px-6 py-6 flex gap-2"
                  >
                    <DialogTitle
                      class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                      >Panel title</DialogTitle
                    >
                  </div>
                  <div class="relative flex-1">
                    <!-- Your content -->
                    <nav class="flex-1 min-h-0 overflow-y-auto" aria-label="Sidebar">
                      <ul class="py-6 space-y-1">
                        <li
                          class="relative px-4"
                          v-for="(nav, idx) in navigation"
                          :key="idx"
                        >
                          <router-link
                            v-slot="{ isExactActive }"
                            :to="nav.href"
                            class="inline-flex items-center w-full text-sm font-semibold text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 h-6 py-6 px-1"
                          >
                            <span
                              class="absolute inset-y-0 left-0 w-1 bg-slate-500 rounded-tr-lg rounded-br-lg"
                              :class="{
                                'bg-slate-500': nav.current || isExactActive,
                                'bg-transparent': !nav.current && !isExactActive,
                              }"
                              aria-hidden="true"
                            ></span>
                            <template v-if="nav.icon">
                              <component
                                :is="nav.icon"
                                class="h-6 w-6"
                                aria-hidden="true"
                              />
                            </template>
                            <span class="ml-4">{{ nav.name }}</span>
                          </router-link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import type { VNodeProps } from "vue";
import type { HTMLAttributes } from "vue";
import type { FunctionalComponent } from "vue";

defineProps({
  open: Boolean,
  mobile: Boolean,
  navigation: Array<{
    name: string
    href: string
    current: boolean
    icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}, any>
  }>,
})

const emits = defineEmits<{
  (event: 'close'): void
}>()

const onClose = () => {
  emits('close')
}
</script>
