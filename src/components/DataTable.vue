<template>
  <div :class="['border dark:border-slate-700 rounded-lg overflow-x-auto', $attrs.class]">
    <div
      class="divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700 min-w-[600px]"
    >
      <app-search-input v-if="isSearchable" v-model="searchQuery"></app-search-input>
      <div class="overflow-hidden">
        <table
          class="min-w-full max-h-[200px] divide-y divide-gray-200 dark:divide-gray-700"
        >
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr role="checkbox">
              <th scope="col" class="py-3 px-4 pr-0" v-if="selection">
                <div class="flex items-center h-5">
                  <input
                    id="hs-table-search-checkbox-all"
                    type="checkbox"
                    :checked="selectAll"
                    @change="handleSelectAllCheckboxChange"
                    class="border-gray-200 rounded cursor-pointer text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                  <label for="hs-table-search-checkbox-all" class="sr-only"
                    >Checkbox</label
                  >
                </div>
              </th>
              <th
                v-for="(head, idx) in headers"
                :key="idx"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
              >
                {{ head }}
              </th>
              <th
                v-if="hasActions"
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <template v-if="currentRows.length">
              <tr
                v-for="(data, idx) in currentRows"
                :key="idx"
                :class="[
                  'hover:bg-slate-100 dark:hover:bg-slate-800',
                  {
                    'bg-slate-100 dark:bg-slate-800': selectedRows.includes(data),
                  },
                ]"
                role="checkbox"
              >
                <td class="py-3 pl-4" v-if="selection">
                  <div class="flex items-center h-5">
                    <input
                      id="hs-table-search-checkbox-1"
                      type="checkbox"
                      :checked="selectedRows.includes(data)"
                      @change="($event) => handleRowCheckBoxChange($event, data)"
                      class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    />
                    <label for="hs-table-search-checkbox-1" class="sr-only"
                      >Checkbox</label
                    >
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center dark:text-gray-200"
                  v-for="(head, idx) in headers"
                  :key="idx"
                >
                  {{ data[head] }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  v-if="hasActions"
                >
                  <button
                    class="rounded-full border dark:border-slate-700 p-2"
                    @click="onDeleteRow(data)"
                  >
                    <TrashIcon
                      class="w-5 h-5 text-red-500 hover:text-red-800 transition-colors"
                    />
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td
                  class="px-6 py-6 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
                  :colspan="headers.length + 2"
                >
                  No data found
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!-- Pagination Starts -->
      <div>
        <nav
          aria-label="Page navigation example"
          class="my-6 mx-4 flex justify-between items-center"
          v-if="pagination"
        >
          <p v-if="selectedRows.length > 0">
            {{ selectedRows.length }}
            <span class="font-thin"
              >Row{{ selectedRows.length > 1 ? "s" : "" }} Selected</span
            >
          </p>
          <div v-if="!selectedRows.length" />
          <ul class="inline-flex items-center">
            <li class="w-max mx-3 inline-flex items-center gap-3">
              Rows Per Page
              <select
                class="block py-2 px-3 border dark:border-slate-700 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-offset-2 focus:ring-offset-slate-400 sm:text-sm dark:bg-transparent"
                v-model="rowsPerPage"
              >
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              {{ page }} &mdash; {{ totalPages }} of {{ rows.length }}
            </li>
            <li>
              <button
                :disabled="page === 1"
                @click="prevPage"
                class="block px-3 py-2 ml-0 leading-tight disabled:cursor-not-allowed text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Prev
              </button>
            </li>
            <li v-for="(page, idx) in totalPages" :key="idx">
              <button
                @click="paginate(idx + 1)"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button
                :disabled="page === totalPages"
                @click="nextPage"
                class="block px-3 py-2 leading-tight disabled:cursor-not-allowed text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <!-- Pagination ends -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon } from "@heroicons/vue/24/outline";
import type { PropType } from "vue";
import { ref, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Table",
  },
  rows: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true,
  },
  headers: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  isSearchable: {
    type: Boolean,
    default: false,
  },
  hasActions: {
    type: Boolean,
    default: false,
  },
  selection: {
    type: Boolean,
    default: false,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  pageCount: {
    type: Number,
    default: 5,
    required: false,
  },
});

const emit = defineEmits<{
  (event: "onDelete", row: any): void;
}>();

const rowsPerPage = ref(5);
const page = ref(1);
const rows = ref<typeof props.rows>(props.rows);
const selectedRows = ref<any[]>([]);
const selectAll = ref(false);
const searchQuery = ref("");

const indexOfLastItem = computed(() => page.value * rowsPerPage.value);
const indexOfFirstItem = computed(() => indexOfLastItem.value - rowsPerPage.value);

const currentRows = computed(() =>
  rows.value.slice(indexOfFirstItem.value, indexOfLastItem.value).filter((row) =>
    Object.values(row).some((value) => {
      return value?.toString().toLowerCase().includes(searchQuery.value.toLowerCase());
    })
  )
);

const handleRowCheckBoxChange = (e: Event, item: any) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    selectedRows.value = [...selectedRows.value, item];
  } else {
    selectedRows.value = selectedRows.value.filter((row) => row !== item);
  }
};

const handleSelectAllCheckboxChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  selectAll.value = target.checked;
  if (target.checked) {
    selectedRows.value = rows.value;
  } else {
    selectedRows.value = [];
  }
};

const totalPages = computed(() => Math.ceil(props.rows.length / rowsPerPage.value));

const prevPage = () => {
  if (page.value > 0) {
    page.value--;
  }
};

const nextPage = () => {
  if (page.value < props.pageCount - 1) {
    page.value++;
  }
};

const paginate = (val: number) => {
  page.value = val;
};

const onDeleteRow = (val: any) => {
  console.log(val?.id);
  emit("onDelete", val);
};
</script>
