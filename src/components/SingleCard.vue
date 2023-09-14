<template>
  <div
    class="w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2"
  >
    <div class="flex justify-end px-4 pt-4"></div>
    <div class="flex flex-col items-center pb-10">
      <img
        class="w-24 h-24 mb-3 rounded-full shadow-lg"
        src="@/assets/profile-picture-3.jpg"
        alt="Bonnie image"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
</script>
<style></style>
