<template>
  <div class="flex flex-wrap justify-around items-start my-5">
    <div v-for="post in posts">
      <SingleCard :post="post" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import SingleCard from "./SingleCard.vue";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
const posts_Store = postsStore();
const { timelinePosts: posts } = storeToRefs(posts_Store);

let props = defineProps(["userIDs"]);
onMounted(() => {
  if (props.userIDs) {
    posts_Store.setTimelinePosts(props.userIDs);
  }
});
</script>
<style></style>
