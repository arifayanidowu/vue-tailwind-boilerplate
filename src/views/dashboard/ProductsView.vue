<template>
  <div>
    <app-header-text class="mb-3">Products</app-header-text>
    <div class="flex justify-end">
      <app-btn class="w-max !py-2 h-max" :Icon="PlusIcon" @click="onOpenModal"
        >Create</app-btn
      >
    </div>
    <app-data-table
      :headers="headers"
      :rows="products"
      isSelectable
      hasActions
      isPaginated
      isSearchable
      isSortable
      @on-disable-action="onDisableAction"
      @on-edit="onOpenModalEdit"
      @on-delete="onOpenModalDelete"
      class="bg-white dark:bg-gray-800"
    ></app-data-table>

    <app-modal :isOpen="isOpen" @closeModal="onCloseModal" title="Add Products">
      <form @submit="onAddProduct">
        <app-input
          id="name"
          name="productName"
          v-model="productName"
          placeholder="Coffee Name"
          label="Coffee Name"
          :error="errors.name"
        />
        <app-input
          id="price"
          name="price"
          v-model.number="price"
          type="number"
          placeholder="price"
          label="Price"
          step="0.01"
          :error="errors.price"
        />
        <app-btn type="submit" class="mt-0" :disabled="isLoading" :loading="isLoading">
          Submit
        </app-btn>
      </form>
    </app-modal>

    <app-modal :isOpen="isOpenEdit" @closeModal="onCloseModalEdit" title="Edit Products">
      <app-input v-model="productEditName" placeholder="name" label="Name" />
      <app-input v-model.number="productEditPrice" placeholder="price" label="Price" />
      <app-btn
        type="button"
        @click="onUpdate"
        class="mt-0"
        :disabled="isLoading"
        :loading="isLoading"
      >
        Update
      </app-btn>
    </app-modal>
    <app-modal
      :isOpen="isDelete"
      @closeModal="onCloseModalDelete"
      title="Delete Products"
    >
      <div class="text-center">
        <h2 class="text-xl mb-5 dark:text-white">
          Are you sure you want to delete this product?
        </h2>
        <div class="flex flex-wrap">
          <app-btn
            type="button"
            @click="onCloseModalDelete"
            class="mt-0 md:w-[300px] w-full md:mx-auto"
            color="plain"
          >
            Cancel
          </app-btn>
          <app-btn
            type="button"
            @click="onDelete"
            class="mt-0 md:w-[300px] w-full md:mx-auto"
            :disabled="isLoading"
            :loading="isLoading"
            color="danger"
          >
            Delete
          </app-btn>
        </div>
      </div>
    </app-modal>
    <app-backdrop-loader :isOpen="isFetching" />
    <app-snackbar
      :open="open"
      :message="message"
      :variant="color"
      @close="closeSnackbar"
    ></app-snackbar>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, watch } from "vue";
import * as zod from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useCollection, useCurrentUser } from "vuefire";

import { useToast } from "@/composables";
import { db } from "@/database";

const { open, message, color, closeSnackbar, openSnackbar } = useToast();
const user = useCurrentUser();

const headers = ref(["name", "price"]);

const isOpen = ref(false);
const isOpenEdit = ref(false);
const isLoading = ref(false);
const products = ref<any[]>([]);
const isFetching = ref(true);
const getId = ref("");
const productEditName = ref("");
const productEditPrice = ref(0);

const isEdit = ref(false);
const isDelete = ref(false);

const onOpenModal = () => {
  isOpen.value = true;
};

const data = useCollection(collection(db, "products"));

const onOpenModalDelete = (val: any) => {
  isDelete.value = true;
  getId.value = val.id;
};

const onCloseModalEdit = () => {
  isOpenEdit.value = false;
};

const onCloseModalDelete = () => {
  isDelete.value = false;
};

const onDelete = async () => {
  isLoading.value = true;
  try {
    await deleteDoc(doc(db, "products", getId.value));
    openSnackbar("Product deleted successfully", "success");
  } catch (error) {
    const err = error as Error;
    openSnackbar(err.message, "danger");
  } finally {
    isLoading.value = false;
    isDelete.value = false;
  }
};

watch(
  data,
  (newData) => {
    products.value = newData.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        isDisabled: item.createdBy !== user.value?.uid,
      };
    });
    if (newData.length >= 0) {
      isFetching.value = false;
    }
  },
  { immediate: true, deep: true }
);

const schema = toTypedSchema(
  zod.object({
    name: zod.string().nonempty({ message: "Name cannot be empty" }).min(3),
    price: zod
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .nonnegative({ message: "Price must be a positive number" })
      .min(1),
  })
);

const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: productName } = useField<string>("name");
const { value: price } = useField<number>("price");

const onOpenModalEdit = (row: any) => {
  isOpenEdit.value = true;
  productEditName.value = row.name;
  productEditPrice.value = row.price;
  getId.value = row.id;
};

const onCloseModal = () => {
  isOpen.value = false;
  isEdit.value = false;
  resetForm();
};

const onUpdate = async () => {
  isLoading.value = true;
  try {
    const productRef = doc(db, "products", getId.value);
    await updateDoc(productRef, {
      name: productEditName.value,
      price: productEditPrice.value,
      updatedBy: user.value?.uid,
      updatedAt: serverTimestamp(),
    });
    openSnackbar(`Product with ID: ${getId.value} updated successfully`, "success");
  } catch (error) {
    const err = error as Error;
    openSnackbar(err.message, "danger");
  } finally {
    isLoading.value = false;
    onCloseModalEdit();
  }
};

const onAddProduct = handleSubmit(async (values) => {
  isLoading.value = true;
  isFetching.value = true;
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name: values.name,
      price: values.price,
      createdBy: user.value?.uid,
      createdAt: serverTimestamp(),
    });
    openSnackbar(`Product with ID: ${docRef.id} added successfully`, "success");
  } catch (error) {
    const err = error as Error | zod.ZodError;
    if (err instanceof zod.ZodError) {
      openSnackbar(err.issues[0].message, "danger");
      return;
    }
    openSnackbar(err.message, "danger");
  } finally {
    isLoading.value = false;
    isFetching.value = false;
    onCloseModal();
    resetForm();
  }
});

const onDisableAction = (row: any) => {
  console.log(row);
};
</script>
