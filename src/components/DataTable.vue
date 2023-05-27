<template>
  <div
    :class="[
      'border dark:border-slate-700 rounded-lg overflow-hidden w-full',
      $attrs.class,
    ]"
  >
    <div
      class="divide-y relative divide-gray-200 dark:border-gray-700 dark:divide-gray-700 md:min-w-[600px] w-full"
    >
      <app-search-input
        v-if="isSearchable"
        v-model="searchQuery"
        placeholder="Search for items"
        @clear="clearSearchInput"
      ></app-search-input>
      <div class="overflow-x-auto w-full">
        <table class="max-h-[200px] w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr role="checkbox">
              <th scope="col" class="py-3 px-4 pr-0" v-if="isSelectable">
                <div class="flex items-center h-5">
                  <app-checkbox
                    :checked="selectAll"
                    :disabled="!currentRows.length"
                    @change="handleSelectAllCheckboxChange"
                  />
                </div>
              </th>
              <th
                v-for="(head, idx) in headers"
                :key="idx"
                class="px-6 py-3 text-center text-sm font-bold tracking-wider text-gray-500 dark:text-gray-300 uppercase"
              >
                <span class="inline-flex gap-1 ml-8 items-center group/head">
                  {{ head }}
                  <template v-if="isSortable">
                    <app-icon-btn
                      class="inline-flex focus:outline-none invisible group-hover/head:visible transition-all duration-300"
                      @click="sortBy(head)"
                      variants="flat"
                    >
                      <ArrowUpIcon
                        class="w-3 h-3 text-gray-500 dark:text-gray-300"
                        v-if="sortDirection === 'asc'"
                      />
                      <ArrowDownIcon
                        class="w-3 h-3 text-gray-500 dark:text-gray-300"
                        v-else
                      />
                    </app-icon-btn>
                  </template>
                </span>
              </th>
              <th
                v-if="hasActions"
                scope="col"
                class="px-6 py-3 text-right text-sm font-bold text-gray-500 dark:text-gray-300 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <template v-if="sortedTableData.length">
              <tr
                v-for="(data, idx) in sortedTableData"
                :key="idx"
                :class="[
                  'hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700',
                  {
                    'bg-slate-100 dark:bg-slate-800': selectedRows.includes(data),
                  },
                ]"
                role="checkbox"
                @click="($ev) => (isSelectable ? handleTableRowClick($ev) : null)"
              >
                <td class="py-3 pl-4" v-if="isSelectable">
                  <app-checkbox
                    :checked="selectedRows.includes(data)"
                    @change.stop="($event) => handleRowCheckBoxChange($event, data)"
                  />
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center dark:text-gray-200"
                  :class="{
                    'text-left': !isSelectable,
                  }"
                  v-for="(head, idx) in headers"
                  :key="idx"
                >
                  <app-avatar
                    :src="data[head]"
                    variants="square"
                    class="text-right mx-auto"
                    v-if="isURL(data[head])"
                  />
                  <template v-else>
                    {{ addCurrencyIfNumber(data[head]) }}
                  </template>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap space-x-1 text-right text-sm font-medium"
                  v-if="hasActions"
                >
                  <app-icon-btn
                    @click.stop="onUpdateRow(data)"
                    class="hover:!bg-blue-100 dark:hover:!bg-blue-800/20 !transition-colors"
                  >
                    <PencilSquareIcon class="w-5 h-5 text-blue-500" />
                  </app-icon-btn>
                  <app-icon-btn
                    @click.stop="onDeleteRow(data)"
                    class="hover:!bg-red-100 dark:hover:!bg-red-800/20 !transition-colors disabled:cursor-not-allowed"
                    :disabled="data.isDisabled"
                  >
                    <TrashIcon class="w-5 h-5 text-red-500" />
                  </app-icon-btn>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td
                  class="px-6 py-6 whitespace-nowrap text-center text-xl font-medium text-gray-800 dark:text-gray-200"
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
      <div class="w-full h-full overflow-x-auto">
        <nav
          aria-label="Page navigation example"
          class="my-6 mx-4 flex justify-between items-center"
          v-if="isPaginated"
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
                class="inline-flex items-center gap-3 group/item px-3 py-2 ml-0 leading-tight disabled:cursor-not-allowed text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <ChevronLeftIcon
                  class="w-5 h-5 group-hover/item:-translate-x-1 transition-transform duration-300"
                />
                Prev
              </button>
            </li>
            <li v-for="(page, idx) in totalPages" :key="idx">
              <button
                @click="paginate(idx + 1)"
                :class="[
                  'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                  {
                    'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-white':
                      page === currentPage,
                  },
                ]"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button
                :disabled="page === totalPages"
                @click="nextPage"
                class="px-3 py-2 leading-tight group/right inline-flex gap-3 items-center disabled:cursor-not-allowed text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
                <ChevronRightIcon
                  class="w-5 h-5 group-hover/right:translate-x-1 transition-transform duration-300"
                />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <!-- Pagination ends -->
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { TrashIcon } from "@heroicons/vue/24/outline";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/solid";
import type { PropType } from "vue";
import { ref, computed } from "vue";

import { formatCurrency, isURL } from "@/utils";
import { toRefs } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Table",
  },
  rows: {
    type: Array as PropType<T[]>,
    default: () => [],
  },
  headers: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true,
  },
  isSearchable: {
    type: Boolean,
    default: false,
  },
  hasActions: {
    type: Boolean,
    default: false,
  },
  isSelectable: {
    type: Boolean,
    default: false,
  },
  isPaginated: {
    type: Boolean,
    default: false,
  },
  pageCount: {
    type: Number,
    default: 5,
    required: false,
  },
  isSortable: {
    type: Boolean,
    default: false,
  },
});

const propsRefs = toRefs(props);

const emit = defineEmits<{
  (event: "onDelete", row: T): void;
  (event: "onSelect", row: T[]): void;
  (event: "onEdit", row: T): void;
}>();

const rowsPerPage = ref(5);
const page = ref(1);
const rows = ref(props.rows);
const selectedRows = ref<any[]>([]);
const selectAll = ref(false);
const searchQuery = ref("");
const sortKey = ref("");
const sortDirection = ref("asc");

const currentPage = computed(() => page.value);

const indexOfLastItem = computed(() => page.value * rowsPerPage.value);
const indexOfFirstItem = computed(() => indexOfLastItem.value - rowsPerPage.value);

const clearSearchInput = () => {
  searchQuery.value = "";
};

const currentRows = computed(() =>
  propsRefs.rows.value
    .slice(indexOfFirstItem.value, indexOfLastItem.value)
    .filter((row) =>
      Object.values(row)
        .map((value) => {
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        })
        .find((value) => value === true)
    )
);

const addCurrencyIfNumber = (value: any) => {
  if (typeof value === "number") {
    return formatCurrency("USD", value);
  }
  return value ?? "null";
};

const sortedTableData = computed(() => {
  const sortedData = [...currentRows.value];
  sortedData.sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];
    if (aValue < bValue) {
      return sortDirection.value === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection.value === "asc" ? 1 : -1;
    }
    return 0;
  });
  return sortedData;
});

const sortBy = (key: string) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDirection.value = "asc";
  }
};

const handleTableRowClick = (e: Event) => {
  const target = e.target as HTMLInputElement;
  // trigger checkbox on tableRow click
  if (target.type !== "checkbox") {
    const checkbox = target
      ?.closest("tr")
      ?.querySelector("input[type=checkbox]") as HTMLElement;
    checkbox.click();
  }
};

const handleRowCheckBoxChange = (e: Event, item: any) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    selectedRows.value = [...selectedRows.value, item];
    emit("onSelect", selectedRows.value);
  } else {
    selectedRows.value = selectedRows.value.filter((row) => row !== item);
    emit("onSelect", selectedRows.value);
  }
};

const handleSelectAllCheckboxChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  selectAll.value = target.checked;
  if (target.checked) {
    selectedRows.value = props.rows;
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
  emit("onDelete", val);
};

const onUpdateRow = (val: any) => {
  emit("onEdit", val);
};
</script>
