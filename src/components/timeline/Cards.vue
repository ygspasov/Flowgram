<template>
  <div id="cards" class="flex flex-wrap justify-around items-start my-5">
    <div v-for="post in morePosts" :key="post.id">
      <SingleCard :post="post" @deletePostId="deletePostId" />
    </div>
  </div>
</template>
<script setup lang="ts">
import SingleCard from "./SingleCard.vue";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
const posts_Store = postsStore();
let { morePosts } = storeToRefs(posts_Store);

const deletePostId = (id: string) => {
  posts_Store.deletePostId(id);
  deleteProfilePostId(id);
};
const deleteProfilePostId = (id: string) => {
  posts_Store.deletePostId(id);
};
</script>
