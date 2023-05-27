<template>
  <div class="rounded">
    <label for="app-checkbox" class="sr-only rounded"> Checkbox </label>
    <input
      id="app-checkbox"
      type="checkbox"
      v-bind="$attrs"
      :class="[
        'rounded border-gray-200 cursor-pointer checked:ring-1 checked:ring-offset-2 text-blue-600 checked:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:checked:ring-offset-gray-800',
        $attrs.class,
      ]"
    />
  </div>
</template>
