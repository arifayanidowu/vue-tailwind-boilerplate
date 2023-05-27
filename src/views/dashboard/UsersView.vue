<template>
  <div>
    <h1 class="mb-3">Users</h1>
    <app-data-table
      :headers="headers"
      :rows="users"
      isPaginated
      isSearchable
      isSortable
      class="bg-white dark:bg-gray-800"
    ></app-data-table>
  </div>
</template>

<script setup lang="ts">
import { db } from "@/database";
import { collection } from "firebase/firestore";
import { ref, computed } from "vue";
import { useCollection } from "vuefire";

const headers = ref(["displayName", "email", "isAdmin", "photoURL"]);
const users = useCollection(collection(db, "users"));
</script>
