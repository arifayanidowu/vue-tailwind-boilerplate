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
                'inline-flex items-center w-full text-sm font-semibold text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 h-6 py-6 px-1',
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
        class="fixed top-0 z-30 h-16 backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"
        :class="{
          'w-[calc(100%-276px)]': !mobile,
          'w-full': mobile,
        }"
      >
        <nav
          class="h-16 flex items-center justify-between px-6 border-b-[0.1px] border-b-slate-300 dark:border-b-slate-800"
        >
          <button
            @click="open = true"
            v-if="mobile"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6 text-slate-500" />
          </button>
          <div class="md:block hidden" />
          <div class="flex items-center gap-3">
            <!-- Toggle theme -->
            <div>
              <button
                @click.stop="toggleDark()"
                type="button"
                class="rounded-full bg-transparent p-1 border border-spacing-2 border-slate-300 dark:border-slate-800 text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  :class="[
                    'w-5 h-5 text-blue-400 opacity-0 transition-opacity',
                    {
                      'opacity-100': isDark,
                    },
                  ]"
                  v-if="isDark"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
                    clip-rule="evenodd"
                  />
                </svg>
                <SunIcon class="h-6 w-6 text-blue-500" v-else />
              </button>
            </div>
            <div class="flex items-center">
              <button
                class="rounded-full bg-transparent p-1 border border-spacing-2 border-slate-300 dark:border-slate-800 text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-400"
              >
                <BellIcon class="h-6 w-6 text-slate-500" />
              </button>
            </div>
            <Menu as="div">
              <MenuButton
                class="rounded-full bg-transparent p-1 border border-spacing-2 border-slate-300 dark:border-slate-800 text-gray-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-400"
              >
                <img
                  v-if="user?.photoURL"
                  class="h-7 w-7 rounded-full"
                  :src="user?.photoURL!"
                  :alt="user?.displayName!"
                />
                <UserCircleIcon
                  v-else
                  class="h-6 w-6 text-slate-500"
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
                    >
                      <button
                        :class="[
                          active ? 'bg-violet-500 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white',
                        ]"
                        @click="onClick"
                      >
                        <template v-if="IconComponent">
                          <component
                            :is="IconComponent"
                            class="mr-3 h-6 w-6 text-violet-400"
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
        class="h-screen overflow-y-auto px-8 py-24 dark:bg-slate-900 dark:text-white transition-colors"
      >
        <router-view v-slot="{ Component, route }">
          <transition
            mode="out-in"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from "vue";
import { MenuItems, MenuItem, Menu, MenuButton} from "@headlessui/vue";
import { breakpointsTailwind, useBreakpoints, useDark, useToggle } from "@vueuse/core";
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  SunIcon,
  HomeModernIcon,
  UserGroupIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
  UserCircleIcon
} from "@heroicons/vue/24/outline";
import { RouterLink, useRoute, type RouterView, useRouter } from "vue-router";
import { useCurrentUser, } from 'vuefire'
import {signOut} from 'firebase/auth';
import { auth } from "@/database";


const breakpoints = useBreakpoints(breakpointsTailwind);
const mobile = breakpoints.smaller("md");
const open = ref(false);
const route = useRoute();
const isDark = useDark();
const user = useCurrentUser();
const router = useRouter();

// Navigation
const navigation = ref([
  { name: "Dashboard", href: "/dashboard", current: false, icon: HomeModernIcon },
  { name: "Team", href: "/dashboard/team", current: false, icon: UserGroupIcon },
  { name: "Projects", href: "/dashboard/projects", current: false, icon: ArchiveBoxIcon },
  { name: "Calendar", href: "/dashboard/calendar", current: false, icon: CalendarDaysIcon },
]);

// Menu Items with Icons
const menuItems = ref([
  { name: "Your Profile", IconComponent: UserIcon, onClick: () => console.log("Your Profile") },
  { name: "Settings", IconComponent: CogIcon, onClick: () => console.log("Settings") },
  {
    name: "Sign out",
    IconComponent: ArrowLeftOnRectangleIcon,
    onClick: async () => {
      await signOut(auth).then(() => {
        setTimeout(() => {
          router.push('/')
        }, 3000)
      })
    },
  },
]);

const unwatch = watch(route, (to) => {
  if(to)
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
