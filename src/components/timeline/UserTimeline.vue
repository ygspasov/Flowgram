<template>
  <div v-if="userLoggedIn"><Cards :userIDs="userIDs" /></div>
  <div v-else><h3 class="text-lg text-center">Log in to see posts.</h3></div>
</template>
<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import Cards from "./Cards.vue";
import { authStore } from "@/stores/auth";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
const auth_Store = authStore();
const { userLoggedIn, userUID } = storeToRefs(auth_Store);
const posts_Store = postsStore();
const { following } = storeToRefs(posts_Store);
let userIDs = ref(following.value);

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

onMounted(() => {
  console.log("userUID.value", userUID.value);
  posts_Store.fetchFollowing(userUID.value).then(() => {
    console.log("timeline following", following.value);
    posts_Store.setTimelinePosts(userIDs.value);
  });
});
</script>
<style></style>
