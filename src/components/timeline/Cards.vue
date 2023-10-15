<template>
  <div class="flex flex-wrap justify-around items-start my-5">
    <div v-for="post in posts">
      <SingleCard :post="post" />
    </div>
  </div>
</template>
<script setup lang="ts">
import SingleCard from "./SingleCard.vue";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
const posts_Store = postsStore();
let { timelinePosts: posts } = storeToRefs(posts_Store);
</script>
<style></style>
