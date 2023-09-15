<template>
  <div class="">
    <userBar :username="username" :userInfo="userInfo" />
    <div class="flex flex-wrap justify-between bg-slate-300 my-5 p-5">
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
import userBar from "./UserBar.vue";
import { ref } from "vue";
import { type Book } from "@/types/Book";
const username = ref<String>("John Smith");
const userInfo = ref<Book>({
  posts: 13212,
  followers: 300,
  following: 4120,
});
</script>
<style></style>
