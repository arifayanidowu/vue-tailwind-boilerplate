<template>
  <div>
    <app-header-text class="divide-y divide-slate-200 !font-extrabold"
      >Profile</app-header-text
    >
    <div class="flex flex-wrap gap-2 justify-center">
      <div class="text-center grid place-items-center">
        <app-avatar
          :src="user?.photoURL ?? ''"
          :alt="user?.displayName ?? ''"
          :size="150"
          @click="openModal"
          class="cursor-pointer"
        />
        <app-btn class="!w-24 !py-2" color="plain" @click="openModal">
          Edit Profile
        </app-btn>
      </div>
      <div
        class="w-full md:flex-1 grid grid-cols-1 items-center divide-y divide-slate-200 dark:divide-slate-700 border rounded-md bg-white dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
      >
        <div class="flex justify-between items-center p-4">
          <p class="font-extrabold uppercase tracking-wider">Display Name:</p>
          <p class="font-thin text-gray-500">{{ user?.displayName }}</p>
        </div>
        <div class="flex justify-between items-center p-4">
          <p class="font-extrabold uppercase tracking-wider">Email Address:</p>
          <p class="font-thin text-gray-500">{{ user?.email }}</p>
        </div>
        <div class="flex justify-between items-center p-4">
          <p class="font-extrabold uppercase tracking-wider">Products Created:</p>
          <p class="font-thin text-gray-500">{{ productsCount }}</p>
        </div>
      </div>
    </div>
    <app-modal :isOpen="isOpen" title="Edit Profile" @close-modal="closeModal">
      <form @submit.prevent="updateProfile">
        <label for="avatar" class="w-max block h-max mx-auto cursor-pointer rounded-full">
          <app-avatar
            :src="user?.photoURL ?? ''"
            :alt="user?.displayName ?? ''"
            :size="150"
          />
        </label>
        <input id="avatar" type="file" capture hidden @change="onFileChanged" />
        <app-input
          placeholder="Display Name"
          v-model="displayName"
          label="DisplayName"
        ></app-input>
        <app-btn type="submit" :Icon="CheckCircleIcon" :loading="isLoading">
          Update Profile
        </app-btn>
      </form>
    </app-modal>
    <app-snackbar
      :open="open"
      :message="message"
      :variant="color"
      @close="closeSnackbar"
    ></app-snackbar>
    <app-backdrop-loader :isOpen="isFetching" />
  </div>
</template>

<script setup lang="ts">
import { updateCurrentUserProfile, useCollection, useCurrentUser } from "vuefire";
import { ref, computed, watch } from "vue";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { useToast } from "@/composables";
import { collection } from "firebase/firestore";
import { db } from "@/database";

const user = useCurrentUser();
const products = useCollection(collection(db, "products"));

const isOpen = ref(false);
const isLoading = ref(false);
const file = ref<File | null>(null);
const isFetching = ref(true);
const downloadUrl = ref("");

const displayName = ref(user.value?.displayName ?? "");

const { open, message, color, closeSnackbar, openSnackbar } = useToast();

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const productsCount = computed(() => {
  const findByUserId = products.value?.filter(
    (product) => product.createdBy === user.value?.uid
  );
  return findByUserId?.length;
});

watch(products, (val) => {
  if (val.length >= 0) {
    isFetching.value = false;
  }
});

function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    file.value = target.files[0];
  }
}

const updateProfile = async () => {
  try {
    isLoading.value = true;
    await updateCurrentUserProfile({
      displayName: displayName.value,
    });
    openSnackbar("Profile Updated", "success");
    closeModal();
  } catch (error) {
    const err = error as Error;
    openSnackbar(err.message, "danger");
  } finally {
    isLoading.value = false;
  }
};
</script>
