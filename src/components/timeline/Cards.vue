<template>
  <p>timelinePosts: {{ timelinePosts }}</p>
  <div class="flex flex-wrap justify-center items-center">
    <SingleCard v-for="card in 3" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import SingleCard from "./SingleCard.vue";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
const posts_Store = postsStore();
const { timelinePosts } = storeToRefs(posts_Store);

let props = defineProps(["userIDs"]);
onMounted(() => {
  posts_Store.setTimelinePosts(props.userIDs);
});
</script>
<style></style>
