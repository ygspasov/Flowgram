<template>
  <div v-if="userLoggedIn"><Cards :userIDs="userIDs" /></div>
  <div v-else><h3 class="text-lg text-center">Log in to see posts.</h3></div>
</template>
<script setup lang="ts">
import { onMounted, watch } from "vue";
import Cards from "./Cards.vue";
import { authStore } from "@/stores/auth";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
const auth_Store = authStore();
const { userLoggedIn } = storeToRefs(auth_Store);
const posts_Store = postsStore();
const { following } = storeToRefs(posts_Store);
const profileUID: any = localStorage.getItem("uid");
const userIDs = following.value;

watch(userLoggedIn, () => {
  posts_Store.fetchFollowing(profileUID).then(() => {
    console.log("timeline following", following.value);
  });
});

onMounted(() => {
  console.log("profileUID", profileUID);
  posts_Store.fetchFollowing(profileUID).then(() => {
    console.log("timeline following", following.value);
  });
});
</script>
<style></style>
