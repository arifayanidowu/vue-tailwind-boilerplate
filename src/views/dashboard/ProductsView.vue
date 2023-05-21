<template>
  <div>
    <h1 class="mb-3">Products</h1>
    <div class="flex justify-end">
      <app-btn class="w-max !py-2 h-max" :Icon="PlusIcon" @click="onOpenModal"
        >Create</app-btn
      >
    </div>
    <app-data-table
      :headers="headers"
      :rows="rows"
      isSelectable
      hasActions
      isPaginated
      isSearchable
      isSortable
      @onUpdate="onUpdate"
      class="bg-white dark:bg-gray-800"
    ></app-data-table>
    <app-modal :isOpen="isOpen" @closeModal="isOpen = false" title="Add Products">
      <form>
        <app-input id="name" name="name" required placeholder="name" label="Name" />
        <app-input id="price" name="name" required placeholder="price" label="Price" />
        <app-btn type="submit" class="mt-0"> Submit </app-btn>
      </form>
    </app-modal>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";
import { ref, reactive } from "vue";

const headers = ref(["name", "price"]);

const isOpen = ref(false);

const onOpenModal = () => {
  console.log("clicked");
  isOpen.value = true;
};

const rows = reactive([
  {
    name: "Cappuccino",
    price: "299",
    id: 1,
  },
  {
    name: "Americano",
    price: "399",
    id: 2,
  },
  {
    name: "Latte",
    price: "199",
    id: 3,
  },
  {
    name: "Caffè Mocha",
    price: "299",
    id: 4,
  },
  {
    name: "Chai Latte",
    price: "499",
    id: 5,
  },
  {
    name: "Espresso",
    price: "159",
    id: 6,
  },
  {
    name: "Macchiato",
    price: "209",
    id: 7,
  },
  {
    name: "Long Macchiato",
    price: "219",
    id: 8,
  },
  {
    name: "Cortado",
    price: "309",
    id: 9,
  },
]);

const onUpdate = (row: any) => {
  console.log(row);
};
</script>
