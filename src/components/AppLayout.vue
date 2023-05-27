<template>
  <app-drawer
    :navigation="navigation"
    :mobile="mobile"
    :open="open"
    @close="open = false"
  ></app-drawer>
  <div class="relative h-screen overflow-hidden">
    <!-- Sidebar navigation -->
    <nav
      class="w-[276px] h-full border-r-[0.5px] dark:bg-slate-950/95 fixed z-40 left-0 border-r-slate-300 dark:border-r-slate-800"
      v-if="!mobile"
    >
      <div
        class="h-16 border-b-[0.1px] border-b-slate-300 dark:border-b-slate-800 px-4 sm:px-6 py-6"
      >
        <div class="w-max flex gap-1">
          <app-logo class="w-6 h-6 rounded-full" />
          <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            CoffeeHut
          </p>
        </div>
      </div>
      <!-- Sidebar navigation list -->
      <div class="flex-1 min-h-0 overflow-y-auto" aria-label="Sidebar">
        <ul class="py-6 space-y-1">
          <li class="relative px-4" v-for="(nav, idx) in navigation" :key="idx">
            <router-link
              v-slot="{ isExactActive }"
              :to="nav.href"
              :class="[
                {
                  'bg-gray-50 dark:bg-slate-700': nav.current,
                  'bg-transparent': !nav.current,
                },
                'inline-flex items-center w-full text-sm font-semibold text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 active:bg-gray-200 dark:active:bg-slate-700 dark:hover:bg-slate-600 h-6 py-6 px-1',
              ]"
            >
              <span
                :class="[
                  {
                    'bg-slate-500': nav.current || isExactActive,
                    'bg-transparent': !nav.current && !isExactActive,
                  },
                  'absolute inset-y-0 left-0 w-1 bg-slate-500 rounded-tr-lg rounded-br-lg',
                ]"
                aria-hidden="true"
              ></span>
              <template v-if="nav.icon">
                <span class="sr-only">{{ nav.name }} Icon</span>
                <component :is="nav.icon" class="h-6 w-6" aria-hidden="true" />
              </template>
              <span class="ml-4">{{ nav.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- Sidebar navigation list ends -->
    </nav>
    <!-- Sidebar navigation ends -->
    <main
      class="flex-auto overflow-hidden right-0 h-full top-0"
      :class="{
        'w-screen': mobile,
        relative: mobile,
        'w-[calc(100%-276px)]': !mobile,
        absolute: !mobile,
      }"
    >
      <!-- Top navigation -->
      <div
        class="fixed top-0 z-30 h-16 backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/75 supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"
        :class="{
          'w-[calc(100%-276px)]': !mobile,
          'w-full': mobile,
        }"
      >
        <nav
          class="h-16 flex items-center justify-between px-6 border-b-[0.1px] border-b-slate-300 dark:border-b-slate-800"
        >
          <app-icon-btn
            @click="open = true"
            v-if="mobile"
            type="button"
            variants="square"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6 text-slate-500" />
          </app-icon-btn>
          <div class="md:block hidden" />
          <div class="flex items-center gap-3">
            <!-- Toggle theme -->
            <div>
              <app-icon-btn @click.stop="toggleDark()" type="button">
                <MoonIcon
                  v-if="isDark"
                  :class="[
                    'w-5 h-5 text-blue-400 opacity-0 transition-opacity',
                    {
                      'opacity-100': isDark,
                    },
                  ]"
                />
                <AnimatedSunIcon class="h-6 w-6 text-blue-500" v-else />
              </app-icon-btn>
            </div>
            <div class="flex items-center">
              <app-badge :badgeCount="100" color="primary">
                <app-icon-btn>
                  <BellIcon class="h-6 w-6 text-slate-500" />
                </app-icon-btn>
              </app-badge>
            </div>
            <Menu as="div">
              <MenuButton
                class="rounded-full bg-transparent active:bg-slate-50 dark:active:bg-slate-800 p-2 border border-spacing-2 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-white focus:dark:ring-slate-600 focus:ring-offset-1 focus:ring-offset-gray-400 focus:dark:ring-offset-slate-600 transition-all duration-300"
              >
                <img
                  v-if="user?.photoURL"
                  class="h-7 w-7 rounded-full"
                  :src="user?.photoURL!"
                  :alt="user?.displayName!"
                />
                <UserCircleIcon
                  v-else
                  class="h-7 w-7 text-slate-500"
                  aria-hidden="true"
                />
              </MenuButton>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="px-1 py-1">
                    <MenuItem
                      v-slot="{ active }"
                      v-for="({ name, IconComponent, onClick }, idx) in menuItems"
                      :key="idx"
                      class="dark:hover:bg-slate-700 hover:bg-slate-50 hover:text-gray-600"
                    >
                      <button
                        :class="[
                          {
                            'bg-violet-500 text-white': active,
                          },
                          'group flex w-full items-center rounded-md px-2 py-2 text-gray-900 text-sm dark:text-white',
                        ]"
                        @click="onClick"
                      >
                        <span class="sr-only">
                          {{ name }} {{ active ? "active" : "" }}
                        </span>
                        <template v-if="IconComponent">
                          <component
                            :is="IconComponent"
                            class="mr-3 h-6 w-6 text-slate-400"
                          />
                        </template>
                        {{ name }}
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </nav>
      </div>
      <!-- Top navigation ends here -->
      <!-- Main content -->
      <div
        class="h-screen overflow-y-auto px-8 py-24 bg-slate-50 dark:bg-slate-900 dark:text-white transition-colors"
      >
        <router-view v-slot="{ Component, route }">
          <transition
            mode="out-in"
            leave-active-class="transition duration-200 delay-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </div>
    </main>
    <app-snackbar
      :open="snackbar.open"
      :message="snackbar.message"
      :variant="snackbar.color"
      @close="snackbar.open = false"
    ></app-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, reactive } from "vue";
import { MenuItems, MenuItem, Menu, MenuButton } from "@headlessui/vue";
import { breakpointsTailwind, useBreakpoints, useDark, useToggle } from "@vueuse/core";
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  HomeModernIcon,
  UserGroupIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ShoppingBagIcon
} from "@heroicons/vue/24/outline";
import { RouterLink, useRoute, type RouterView, useRouter } from "vue-router";
import { useCurrentUser, } from 'vuefire'
import { signOut } from 'firebase/auth';
import { auth } from "@/database";
import MoonIcon from "./icons/MoonIcon.vue";
import AnimatedSunIcon from "./icons/AnimatedSunIcon.vue";


const breakpoints = useBreakpoints(breakpointsTailwind);
const mobile = breakpoints.smaller("md");
const open = ref(false);
const route = useRoute();
const isDark = useDark();
const user = useCurrentUser();
const router = useRouter();

const snackbar = reactive<{
  open: boolean;
  message: string;
  color: "success" | "danger";
}>({
  open: false,
  message: "",
  color: "success",
});

// Navigation
const navigation = ref([
  { name: "Dashboard", href: "/dashboard", current: false, icon: HomeModernIcon },
  { name: "Users", href: "/dashboard/users", current: false, icon: UserGroupIcon },
  { name: "Orders", href: "/dashboard/orders", current: false, icon: ArchiveBoxIcon },
  { name: "Products", href: "/dashboard/products", current: false, icon: ShoppingBagIcon },
  { name: "Calendar", href: "/dashboard/calendar", current: false, icon: CalendarDaysIcon },
]);

// Menu Items with Icons
const menuItems = ref([
  { name: "Your Profile", IconComponent: UserIcon, onClick: () => router.push({ name: 'Profile'}) },
  { name: "Settings", IconComponent: CogIcon, onClick: () => console.log("Settings") },
  {
    name: "Sign out",
    IconComponent: ArrowLeftOnRectangleIcon,
    onClick: async () => {
      await signOut(auth).then(() => {
        snackbar.open = true;
        snackbar.message = "Signed out successfully";
        snackbar.color = "success";
        setTimeout(() => {
          router.push('/')
        }, 1500)
      })
    },
  },
]);

const unwatch = watch(route, (to) => {
  if (to)
    navigation.value.forEach((item) => {
      item.current = item.href === to?.path;
    });
});

// Toggle dark mode
const toggleDark = useToggle(isDark);

onMounted(() => {
  navigation.value.forEach((item) => {
    item.current = item.href === route?.path;
  });
});

onUnmounted(() => {
  // cleanup
  unwatch();
});
</script>
