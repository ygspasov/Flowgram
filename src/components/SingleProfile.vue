<template>
  <div class="">
    <div class="bg-slate-300 my-2">
      <div class="flex flex-wrap justify-between p-5">
        <h2 class="text-2xl flex items-center">User name</h2>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          upload photo
        </button>
      </div>
      <div class="flex flex-col sm:flex-row pb-5">
        <span class="w-100 sm:w-1/3 text-lg text-center">13212 posts</span>
        <span class="w-100 sm:w-1/3 text-lg text-center">300 followers</span>
        <span class="w-100 sm:w-1/3 text-lg text-center">4120 following</span>
      </div>
    </div>
    <div class="flex flex-wrap justify-center bg-slate-300 my-5 p-5">
      <img
        class="h-auto w-auto md:max-w-sm m-2"
        src="@/assets/image-1.jpg"
        alt="image description"
      />
      <img
        class="h-auto w-auto md:max-w-sm m-2"
        src="@/assets/image-1.jpg"
        alt="image description"
      />
      <img
        class="h-auto w-auto md:max-w-sm m-2"
        src="@/assets/image-1.jpg"
        alt="image description"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
</script>
<style></style>
