<template>
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
const { following, loadPosts, morePosts } = storeToRefs(posts_Store);
let userIDs = ref(following.value);
let delay = ref(false);
let firstCardIndex = ref(0);
let lastCardIndex = ref(6);
let loading = ref(false);

watch(userLoggedIn, (newVal) => {
  console.log("userUID.value", userUID.value);
  console.log("uid", userUID.value);
  if (newVal) {
    // posts_Store.fetchFollowing(userUID.value).then(() => {
    //   console.log("timeline following", following.value);
    // });
    getTimelinePosts();
  }
});

watch(following, (newVal) => {
  userIDs.value = newVal;
});

const getTimelinePosts = () => {
  console.log("getTimelinePosts running onmounted");
  console.log("getTimelinePosts userUID.value", userUID.value);
  posts_Store
    .fetchFollowing(userUID.value)
    .then(() => {
      console.log("timeline following", following.value);
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
  console.log("Fetching next set of posts");
  console.log("firstCardIndex.value", firstCardIndex.value);
  console.log("lastCardIndex.value", lastCardIndex.value);
  posts_Store.setMorePosts(firstCardIndex.value, lastCardIndex.value);
  // firstCardIndex.value = 0;
  lastCardIndex.value += 6;
};

onMounted(() => {
  getTimelinePosts();
});
</script>
<style>
a {
  cursor: pointer;
}
</style>
