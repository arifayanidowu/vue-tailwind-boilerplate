<template>
  <div class="h-[100vh] text-center">
    <div class="py-14">
      <img
        class="mx-auto"
        :width="300"
        :height="300"
        aspect-ratio="16/9"
        contain
        src="/assets/images/404-error.png"
      />
      <h1 class="tw-text-3xl tw-flex-1">404 - Not Found</h1>
      <button
        @click="goBack"
        class="mt-3 p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      >
        <ArrowLeftIcon
          class="h-3 w-3 text-gray-400 dark:text-gray-900"
          aria-hidden="true"
        />
        Go Back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
