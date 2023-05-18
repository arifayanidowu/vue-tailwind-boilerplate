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
        Sign In to your account
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
        <app-btn
          :disabled="!emailField || !passwordField || loading"
          type="submit"
          :loading="loading"
        >
          Sign in
        </app-btn>
      </form>
      <div>
        <p class="text-gray-500 dark:text-gray-100">
          Don't have an account,
          <router-link to="/register" class="text-blue-400 font-bold leading-9 underline"
            >Sign up</router-link
          >
        </p>
      </div>
      <div
        class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-slate-400 dark:before:border-slate-500 dark:after:border-slate-500"
      >
        Or
      </div>
      <!-- Sign in with google -->
      <app-btn
        type="button"
        color="plain"
        @click.stop="signInWithGoogle"
        :disabled="loading"
      >
        <GoogleIcon class="h-5 w-5" />
        Sign In with Google
      </app-btn>
    </div>
    <app-snackbar
      :open="snackbar.open"
      :message="snackbar.message"
      :variant="snackbar.color"
      @close="snackbar.open = false"
    ></app-snackbar>
  </div>
</template>

<script setup lang="ts">
import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/solid";
import { useDark } from "@vueuse/core";
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useRouter } from "vue-router";
import * as zod from "zod";
import { useFirestore, useCurrentUser } from "vuefire";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import { auth } from "@/database";

useDark();

const passwordVisible = ref(false);
const emailField = ref("");
const passwordField = ref("");
const loading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const router = useRouter();
const db = useFirestore();
const user = useCurrentUser();

const snackbar = reactive<{
  open: boolean;
  message: string;
  color: "success" | "danger";
}>({
  open: false,
  message: "",
  color: "success",
});

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const resetForm = () => {
  formRef.value?.reset();
  emailField.value = "";
  passwordField.value = "";
};

const unwatch = watch(user, (isAuth) => {
  if (isAuth) {
    router.push("/dashboard");
  }
});

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

const signInWithGoogle = async () => {
  try {
    loading.value = true;
    const document = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = document.user;
    // check if user's email exists
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());

    snackbar.open = true;
    snackbar.message = "Login successful";
    snackbar.color = "success";

    // check if user exists
    const userExists = users.find((doc) => doc.email === user.email);
    if (userExists) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
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

    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  } catch (error) {
    const err = error as Error;
    snackbar.open = true;
    snackbar.message = err.message;
    snackbar.color = "danger";
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  loading.value = true;
  const data = {
    email: emailField.value,
    password: passwordField.value,
  };
  try {
    const result = await schema.parseAsync(data);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      result.email,
      result.password
    );
    snackbar.open = true;
    snackbar.message = "Login successful";
    snackbar.color = "success";

    // Signed in
    const user = userCredential.user;
    // ...
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    const userExists = users.find((doc) => doc.email === user.email);
    if (userExists) {
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
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  } catch (error) {
    const err = error as Error | zod.ZodError;
    if (err instanceof zod.ZodError) {
      snackbar.open = true;
      snackbar.message = err.issues[0].message;
      snackbar.color = "danger";
      return;
    }
    snackbar.open = true;
    snackbar.message = err?.message;
    snackbar.color = "danger";
  } finally {
    loading.value = false;
    resetForm();
  }
};

onMounted(() => {
  if (user.value) {
    router.push("/dashboard");
  }
});

onUnmounted(() => {
  unwatch();
});
</script>