<template>
  <div class="bg-white dark:bg-slate-600/90 w-full md:w-[600px] rounded-md p-8">
    <!-- Logo starts here -->
    <app-logo class="w-24 h-24"></app-logo>
    <!-- Logo ends here -->
    <p
      class="text-center text-2xl tracking-tight leading-9 text-gray-600 dark:text-slate-50"
    >
      Sign Up for an account
    </p>
    <form @submit.prevent="onSubmit" ref="formRef">
      <div class="my-2">
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
          >Email address</label
        >
        <div class="mt-2 relative">
          <app-input
            id="email"
            name="email"
            type="email"
            v-model:model-value="email"
            autocomplete="email"
            required
            placeholder="youremail@example.com"
            :error="errors.email"
          />
        </div>
      </div>
      <div class="my-2">
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
          >Password</label
        >
        <div class="mt-2 relative">
          <app-input
            id="password"
            name="password"
            v-model:model-value="password"
            :type="passwordVisible ? 'text' : 'password'"
            required
            placeholder="••••••••••"
            :error="errors.password"
          />
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            <button type="button" @click.stop="togglePasswordVisibility">
              <EyeSlashIcon
                class="h-5 w-5 text-gray-400 dark:text-gray-900"
                aria-hidden="true"
                v-if="!passwordVisible"
              />
              <EyeIcon
                class="h-5 w-5 text-gray-400 dark:text-gray-900"
                aria-hidden="true"
                v-else
              />
            </button>
          </div>
        </div>
      </div>
      <app-btn
        :disabled="!email || !password || loading"
        :loading="loading"
        type="submit"
      >
        Sign Up
      </app-btn>
    </form>
    <div>
      <p class="text-gray-500 text-base dark:text-gray-100">
        Already have an account?
        <router-link to="/" class="text-blue-400 font-bold leading-9 underline"
          >Sign In</router-link
        >
      </p>
    </div>
  </div>
  <app-snackbar
    :open="snackbar.open"
    :message="snackbar.message"
    :variant="snackbar.color"
    @close="snackbar.open = false"
  ></app-snackbar>
</template>

<script setup lang="ts">
import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/solid";
import { ref, reactive } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import * as zod from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useRouter } from "vue-router";
import { auth, db } from "@/database";

const passwordVisible = ref(false);
const loading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const snackbar = reactive<{
  open: boolean;
  message: string;
  color: "success" | "danger";
}>({
  open: false,
  message: "",
  color: "success",
});

const router = useRouter();

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const schema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .nonempty({ message: "Email cannot be empty" })
      .email({ message: "Email must be valid" }),
    password: zod
      .string()
      .nonempty({ message: "Password cannot be empty" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(20),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const resetForm = () => {
  formRef.value?.reset();
  email.value = "";
  password.value = "";
};

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    snackbar.open = true;
    snackbar.message = "Login successful";
    snackbar.color = "success";

    const user = userCredential.user;
    // ...
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    const userExists = users.find((doc) => doc.email === user.email);
    if (userExists) {
      router.push("/dashboard");
      return;
    }
    // add user to database
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAdmin: false,
    });
    router.push("/dashboard");
  } catch (error) {
    const err = error as Error | zod.ZodError;
    if (err instanceof zod.ZodError) {
      snackbar.open = true;
      snackbar.message = err.message;
      snackbar.color = "danger";
      return;
    }
    snackbar.open = true;
    snackbar.message = err.message;
    snackbar.color = "danger";
  } finally {
    loading.value = false;
    resetForm();
  }
});
</script>
