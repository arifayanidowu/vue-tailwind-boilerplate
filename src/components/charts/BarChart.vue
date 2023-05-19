<template>
  <div>
    <div class="mb-3 flex justify-end items-center gap-1 text-gray-400" :v-if="title">
      <span class="sr-only">{{ title }}</span>
      <span class="shadow border-2 bg-blue-500 rounded-full w-3 h-3" />
      <p>{{ title }}</p>
    </div>
    <div class="relative overflow-auto mt-6" :style="{ height: containerHeight + 'px' }">
      <div
        class="h-full flex items-end justify-between p-5 relative z-10 -top-2.5 gap-1 ml-2"
      >
        <div
          v-for="(bar, index) in data"
          :key="index"
          class="flex-1 h-full hover:bg-slate-500/5 px-8 relative group/item"
        >
          <app-card
            tabindex="-1"
            role="dialog"
            :class="[
              {
                'right-4': index === data.length - 1,
              },
              'invisible group-hover/item:visible pointer-events-none absolute z-20 border shadow-sm bg-white dark:bg-slate-800 dark:border-slate-600 rounded-md md:w-[300px] w-[200px] -top-2',
            ]"
          >
            <div class="border-b border-gray-100 dark:border-gray-700 px-3 py-2">
              {{ bar.name }}
            </div>
            <div class="flex justify-between px-3 py-1 pb-2">
              <p class="flex items-center gap-2">
                <span class="shadow border-2 bg-blue-500 rounded-full w-3 h-3" />
                {{ dataFormatter(+bar.total) }}
              </p>
              <p class="text-gray-400">{{ title ?? "Total" }}</p>
            </div>
          </app-card>
          <div
            class="bg-blue-400 dark:bg-blue-800 absolute left-0 bottom-0 right-0 md:w-36 mx-auto break-words"
            :style="{ height: (bar.total / containerHeight) * 100 + '%' }"
          >
            <p
              class="absolute w-full -bottom-5 left-1/4 align-middle text-xs md:text-base text-gray-400"
            >
              {{ bar.name }}
            </p>
          </div>
        </div>
      </div>
      <!-- YAxis Label -->
      <div
        class="flex items-end flex-col-reverse h-full w-full -z-0 bg-transparent absolute top-0 left-0"
      >
        <div
          v-for="(label, index) in chartData.yAxisLabels"
          :key="index"
          class="flex-1 align-text-bottom flex gap-1 after:flex-[1_1_0%] w-full items-center justify-center after:border after:-z-1 after:border-dashed after:w-full"
        >
          {{ dataFormatter(+label) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dataFormatter } from "@/utils";
import { reactive, ref } from "vue";
import type { PropType } from "vue";

const containerHeight = ref(300);

defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const chartData = reactive({
  yAxisLabels: ["0", "50", "100", "150", "200"],
});
</script>
