<template>
  <div class="bg-slate-300 my-2">
    <div class="flex flex-wrap justify-between p-5">
      <h2 class="text-2xl flex items-center">{{ props.username }}</h2>
      <button
        v-if="userLoggedIn && userCheck"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        upload photo
      </button>
    </div>
    <div class="flex flex-col sm:flex-row pb-5">
      <span class="w-100 sm:w-1/3 text-lg text-center">{{ userInfo.posts }} posts</span>
      <span class="w-100 sm:w-1/3 text-lg text-center">{{ userInfo.followers }} followers</span>
      <span class="w-100 sm:w-1/3 text-lg text-center">{{ userInfo.following }} following</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type userInfo } from "@/types/UserInfo";
import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed } from "vue";
const store = authStore();
const { userLoggedIn }: any = storeToRefs(store);
const props = defineProps<{
  username: String;
  userInfo: userInfo;
}>();
const route = useRoute();
const { username: profileUsername } = route.params;
let { username } = storeToRefs(store);
const authUsername: string = username.value.toLowerCase();
//Checking if the user profile belongs to the user in order to enable the upload
const userCheck = computed(() => profileUsername === authUsername);
</script>
<style></style>
