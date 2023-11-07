<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-col sm:flex-row items-center justify-between mx-auto p-4">
      <div class="flex flex-col sm:flex-row items-center">
        <RouterLink to="/" class="flex items-center mr-0 sm:mr-3 mb-3 sm:mb-0">
          <img src="@/assets/instagram.png" class="h-8 mr-3" alt="Flowgram Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Flowgram</span
          >
        </RouterLink>
        <form>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              @keydown.enter="onSearch(searchTerm)"
              v-model="searchTerm"
              type="search"
              id="default-search"
              class="block w-80 p-3 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search people"
              required
            />
            <ul
              v-if="searchUsers"
              class="absolute top-16 left-0 block w-80 p-3 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <li class="text-base mb-2">
                <p>
                  Showing {{ searchUsers.length }}
                  {{ searchUsers.length == 1 ? "result" : "results" }} from a total of
                  {{ users.length }} users:
                </p>
              </li>
              <li v-for="user in searchUsers" :key="user">
                <button
                  @click="onSearch(user)"
                  class="block text-white px-5 py-2.5 text-centerbg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  {{ userUppercase(user) }}
                </button>
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div class="mt-3 sm:mt-0 text-center">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li v-show="!userLoggedIn" class="my-2 md:my-0 mx-auto md:mx-0">
              <AuthModal :isLogin="false" />
            </li>
            <li v-show="!userLoggedIn" class="my-2 md:my-0 mx-auto md:mx-0">
              <AuthModal :isLogin="true" />
            </li>
            <li v-show="userLoggedIn" class="my-2 md:my-0 mx-auto md:mx-0">
              <button
                @click="goToProfile"
                class="block text-white px-5 py-2.5 text-centerbg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Profile
              </button>
            </li>
            <li v-show="userLoggedIn" class="my-2 md:my-0 mx-auto md:mx-0">
              <button
                @click="signout"
                class="block text-white px-5 py-2.5 text-centerbg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Sign out
              </button>
            </li>
            <li
              v-if="userLoggedIn"
              class="block text-white rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {{ store.username }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
import AuthModal from "./auth/AuthModal.vue";
import { ref, computed, onMounted } from "vue";
import router from "@/router";
import { getAuth, signOut } from "firebase/auth";
import { storeToRefs } from "pinia";
import { authStore } from "@/stores/auth";
import { postsStore } from "@/stores/posts";

const store = authStore();
const posts_Store = postsStore();
const { userLoggedIn, user, username }: any = storeToRefs(store);
const { users }: any = storeToRefs(posts_Store);
const auth = getAuth();
const signout = async () => {
  await signOut(auth)
    .then(() => {
      store.setSignOut();
    })
    .catch((error) => {});
};
let searchTerm = ref("");
const onSearch = (user: string) => {
  if (!searchTerm.value) {
    return;
  }
  selectedUser.value = user;
  router.push(`/profile/${selectedUser.value.toLowerCase()}`);
  searchTerm.value = "";
};
const searchUsers = computed(() => {
  if (searchTerm.value === "") return;
  if (!searchTerm.value) {
    router.push(`/profile/${searchTerm.value.toLowerCase()}`);
  }
  let matches = 0;

  return users.value.filter((user: string) => {
    if (user.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10) {
      matches++;
      return user;
    }
  });
});
const userUppercase = (user: string) => user.charAt(0).toUpperCase() + user.slice(1);
let selectedUser = ref("");
const goToProfile = () => {
  if (user) {
    router.push(`/profile/${username.value.toLowerCase()}`);
  }
};
onMounted(() => {
  posts_Store.setUsers();
});
</script>
