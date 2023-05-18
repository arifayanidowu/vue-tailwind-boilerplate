<template>
  <div
    class="h-screen w-screen flex justify-center items-center md:p-24 p-10 bg-slate-50 dark:bg-slate-950/95"
  >
    <div class="bg-white dark:bg-slate-600/90 w-full md:w-[600px] rounded-md p-8">
      <!-- Logo starts here -->
      <app-logo class="w-24 h-24"></app-logo>
      <!-- Logo ends here -->
      <p
        class="text-center text-2xl tracking-tight leading-9 text-gray-600 dark:text-slate-50"
      >
        Sign Up for an account
      </p>
      <form @submit.prevent="handleSubmit" ref="formRef">
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
              v-model:model-value="emailField"
              autocomplete="email"
              required
              placeholder="youremail@example.com"
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
              v-model:model-value="passwordField"
              :type="passwordVisible ? 'text' : 'password'"
              required
              placeholder="••••••••••"
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
        <button
          :disabled="!emailField || !passwordField"
          type="submit"
          class="flex w-full mt-6 disabled:bg-slate-400 justify-center rounded-md disabled:cursor-not-allowed bg-indigo-600 px-3 py-3.5 text-md font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
        >
          Sign Up
        </button>
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
  </div>
</template>

<script setup lang="ts">
import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/solid";
import { useDark } from "@vueuse/core";
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import * as zod from "zod";
import { useRouter } from "vue-router";
import { auth, db } from "@/database";

useDark();

const passwordVisible = ref(false);
const emailField = ref("");
const passwordField = ref("");
const loading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);

const router = useRouter();

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const resetForm = () => {
  formRef.value?.reset();
  emailField.value = "";
  passwordField.value = "";
};

const schema = zod.object({
  email: zod
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Email must be valid" }),
  password: zod
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20),
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    const data = await schema.parseAsync({
      email: emailField.value,
      password: passwordField.value,
    });
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;

    // ...
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    const userExists = users.find((doc) => doc.email === user.email);
    if (userExists) {
      router.push("/");
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
    router.push("/");
  } catch (error) {
    const err = error as Error | zod.ZodError;
    if (err instanceof zod.ZodError) {
      return;
    }
  } finally {
    emailField.value = "";
    passwordField.value = "";
    loading.value = false;
    resetForm();
  }
};
</script>

<style scoped></style>
