<template>
  <div id="user-profile">
    <div
      v-if="userCheck"
      class="flex flex-wrap flex-col md:flex-row justify-between bg-slate-300 my-5 p-5"
    >
      <div class="mb-5 w-full md:w-1/3" v-for="post in posts" :key="post.id">
        <div
          class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <!-- <img class="w-full max-w-sm" :src="post.downloadURL" alt="image description" /> -->
          <a :href="post.downloadURL" class="flex justify-center" target="_blank">
            <img class="rounded-t-lg" :src="post.downloadURL" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {{ post.description }}
              </h5>
            </a>
            <!-- <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ timeFormat }}
      </p> -->
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-xl text-red-600 text-center">The user hasn't uploaded anything yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs, computed, watch, reactive } from "vue";
import { type Post } from "@/types/Post";
import { storeToRefs } from "pinia";
import { authStore } from "@/stores/auth";
import { useRoute } from "vue-router";
const route = useRoute();
const store = authStore();
const { userLoggedIn }: any = storeToRefs(store);
let profileUsername = reactive({
  value: route.params.username,
});

let { username } = storeToRefs(store);
const authUsername: string = username.value.toLowerCase();
//Checking if the user profile belongs to the user in order to show user content
const userCheck = computed(() => userLoggedIn);
const props = defineProps<{
  profilePosts: Post[];
}>();

watch(
  () => route.params.username,
  (newUsername) => {
    profileUsername.value = newUsername;
  }
);

const { profilePosts: posts } = toRefs(props);

onMounted(() => {
  console.log("posts", posts);
});
</script>
