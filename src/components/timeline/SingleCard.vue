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
        <font-awesome-icon :icon="['fas', 'thumbs-up']" size="xl" class="text-gray-400" />
        <span class="icons"
          ><font-awesome-icon class="mx-1" :icon="['fa', 'pen-to-square']" size="xl" />
          <font-awesome-icon class="mx-1" :icon="['fa', 'trash']" size="xl"
        /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
const timeFormat = computed(() => new Date(props.post.uploadDate).toUTCString());
</script>
<style></style>
