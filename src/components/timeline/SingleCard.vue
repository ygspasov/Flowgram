<template>
  <div
    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a :href="post.downloadURL" class="flex justify-center" target="_blank">
      <img class="rounded-t-lg" :src="post.downloadURL" alt="" />
    </a>
    <div class="p-5">
      <a href="#">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ post.description }}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Posted by {{ post.username }}</p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">On {{ timeFormat }}</p>
      <div class="flex justify-between text-white">
        <a href=""
          ><font-awesome-icon :icon="['fas', 'thumbs-up']" size="xl" class="text-gray-400"
        /></a>
        <span class="icons"
          ><a href=""
            ><font-awesome-icon class="mx-1" :icon="['fa', 'pen-to-square']" size="xl"
          /></a>
          <a @click="deletePost"
            ><font-awesome-icon class="mx-1" :icon="['fa', 'trash']" size="xl" /></a
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { postsStore } from "@/stores/posts";
import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const auth_Store = authStore();
const { userUID } = storeToRefs(auth_Store);
const posts_Store = postsStore();
const { following } = storeToRefs(posts_Store);
let userIDs = ref(following.value);
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
const deletePost = () => {
  const id = props.post.id;
  posts_Store.deletePost(id).then(() => {
    posts_Store.fetchFollowing(userUID.value).then(() => {
      console.log("userIDs.value deletePost", userIDs.value);
      // posts_Store.setTimelinePosts(userIDs.value);
      posts_Store.setPostsLoading(true);
    });
  });
};
const timeFormat = computed(() => new Date(props.post.uploadDate).toUTCString());
</script>
<style></style>
