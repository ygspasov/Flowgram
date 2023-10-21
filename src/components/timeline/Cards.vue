<template>
  <div class="flex flex-wrap justify-around items-start my-5">
    <div v-for="post in morePosts" :key="post.id">
      <SingleCard :post="post" @deletePostId="deletePostId" />
    </div>
  </div>
</template>
<script setup lang="ts">
import SingleCard from "./SingleCard.vue";
import { type Post } from "@/types/Post";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
const posts_Store = postsStore();
let { morePosts, profilePosts } = storeToRefs(posts_Store);

const deletePostId = (id: string, post: Post) => {
  posts_Store.deletePostId(id, post);
  deleteProfilePostId(id, post);
};
const deleteProfilePostId = (id: string, post: Post) => {
  posts_Store.deletePostId(id, post);
};
</script>
