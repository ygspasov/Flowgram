<template>
  <div class="flex flex-wrap justify-around items-start my-5">
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
let { morePosts, timelinePosts } = storeToRefs(posts_Store);
const deletePostId = (id: string) => {
  const objWithIdIndex = morePosts.value.findIndex((post) => post.id === id);
  if (objWithIdIndex > -1) {
    // console.log("post to be deleted", morePosts.value[objWithIdIndex]);
    // console.log("morePosts.value", morePosts.value);
    morePosts.value.splice(objWithIdIndex, 1);
    timelinePosts.value.splice(objWithIdIndex, 1);
  }
};
</script>
