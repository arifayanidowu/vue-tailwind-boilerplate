<template>
  <main>
    <h1 class="mb-3 inline-flex items-center justify-center gap-1">
      Dashboard <ChartBarSquareIcon class="w-6 h-6" />
    </h1>

    <div class="flex flex-wrap gap-2 w-full">
      <app-card class="flex-1 p-4" v-for="(data, idx) in collectiveData" :key="idx">
        <div class="flex justify-between items-center">
          <p class="text-slate-400">{{ data.name }}</p>
          <app-capsule
            :class="[
              {
                'bg-green-100 text-green-600 dark:bg-green-600 dark:text-green-100':
                  data.total > data.oldTotal,
                'bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100':
                  data.total < data.oldTotal,
              },
            ]"
          >
            <ArrowUpRightIcon
              v-if="data.total > data.oldTotal"
              class="w-3 h-3 space-x-2"
            />
            <ArrowDownRightIcon v-else />
            <span class="font-bold">
              {{ percentageIncrease(data.oldTotal, data.total).toFixed(2) + "%" }}
            </span>
          </app-capsule>
        </div>
        <div class="mt-4">
          <p class="text-4xl font-bold leading-4 tracking-wide">
            {{ currencyToNumber(data.name, dataFormatter(data.total)) }}
            <span class="text-sm space-x-3 text-gray-400"
              >from {{ currencyToNumber(data.name, dataFormatter(data.oldTotal)) }}</span
            >
          </p>
        </div>
      </app-card>
    </div>

    <div>
      <div class="flex flex-col mt-10">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
          <h2
            class="text-lg leading-6 font-medium text-gray-900 dark:text-white inline-flex gap-1"
          >
            Bar Chart <ChartBarIcon class="w-5 h-5" />
          </h2>
          <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-1 gap-1">
            <div class="relative">
              <select
                class="border border-gray-300 dark:bg-slate-700 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                aria-label="Selected tab"
              >
                <option selected>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-card class="px-3 py-3">
      <app-bar-chart :data="data" title="Number of Orders"></app-bar-chart>
    </app-card>
  </main>
</template>

<script setup lang="ts">
import { dataFormatter } from "@/utils";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
} from "@heroicons/vue/24/solid";
import { reactive } from "vue";

const collectiveData = reactive([
  {
    name: "Sales",
    total: 15699,
    oldTotal: 18699,
    percentage: 0.5,
  },
  {
    name: "Profits",
    total: 15800,
    oldTotal: 13800,
    percentage: 0.5,
  },
  {
    name: "Customers",
    total: 12000,
    oldTotal: 10000,
    percentage: 0.5,
  },
]);

const data = reactive([
  { total: 300, name: "Cappuccino" },
  { total: 150, name: "Americano" },
  { total: 75, name: "Latte" },
  { total: 85, name: "Caffè Mocha" },
  { total: 15, name: "Espresso" },
]);

const percentageIncrease = (oldValue: number, newValue: number) => {
  return ((newValue - oldValue) / oldValue) * 100;
};

const currencyToNumber = (name: string, number: string) => {
  if (name?.toLowerCase() === "customers") {
    return number;
  } else {
    return "$" + number;
  }
};
</script>
