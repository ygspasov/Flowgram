<template>
  <div v-if="userLoggedIn"><Cards :userIDs="userIDs" /></div>
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

watch(userLoggedIn, (newVal) => {
  console.log("userUID.value", userUID.value);
  console.log("uid", userUID.value);
  if (newVal) {
    posts_Store.fetchFollowing(userUID.value).then(() => {
      console.log("timeline following", following.value);
    });
  }
});

watch(following, (newVal) => {
  userIDs.value = newVal;
});

const getTimelinePosts = () => {
  posts_Store
    .fetchFollowing(userUID.value)
    .then(() => {
      console.log("timeline following", following.value);
      posts_Store.setTimelinePosts(userIDs.value);
    })
    .then(() => {
      //Introduces a delay so that fetchMorePosts doesn't run when the component is loaded
      setTimeout(() => {
        delay.value = true;
      }, 1000);
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
