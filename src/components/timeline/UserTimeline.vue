<template>
  <div id="timeline">
    <div v-if="userLoggedIn">
      <div class="flex items-center justify-center mt-3">
        <div
          v-if="loading"
          class="flex items-center justify-center w-56 h-16 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        >
          <div
            class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200"
          >
            Loading posts...
          </div>
        </div>
      </div>
      <Cards :userIDs="userIDs" />
    </div>
    <div v-else><h3 class="text-lg text-center">Log in to see posts.</h3></div>
    <PostsObserver v-if="delay" @intersect="fetchMorePosts" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import Cards from "./Cards.vue";
import { authStore } from "@/stores/auth";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
import PostsObserver from "@/components/PostsObserver.vue";
const auth_Store = authStore();
const { userLoggedIn, userUID } = storeToRefs(auth_Store);
const posts_Store = postsStore();
const { following, loadPosts } = storeToRefs(posts_Store);
let userIDs = ref(following.value);
let delay = ref(false);
let firstCardIndex = 0;
let lastCardIndex = 6;
let loading = ref(false);

watch(userLoggedIn, (newVal) => {
  if (newVal) {
    getTimelinePosts();
  }
});

watch(following, (newVal) => {
  userIDs.value = newVal;
});

const getTimelinePosts = async () => {
  await posts_Store
    .fetchFollowing(userUID.value)
    .then(() => {
      posts_Store.setTimelinePosts(userIDs.value);
      loading.value = true;
    })
    .then(() => {
      //Introduces a delay so that fetchMorePosts doesn't run when the component is loaded
      setTimeout(() => {
        delay.value = true;
      }, 1000);
    })
    .then(() => {
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    });
};

watch(loadPosts, (newVal) => {
  if (newVal) {
    getTimelinePosts();
  }
});

const fetchMorePosts = () => {
  posts_Store.setMorePosts(firstCardIndex, lastCardIndex);
  // firstCardIndex.value = 0;
  lastCardIndex += 6;
};

onMounted(() => {
  posts_Store.morePosts = [];
  getTimelinePosts();
});
</script>
<style>
a {
  cursor: pointer;
}
</style>
