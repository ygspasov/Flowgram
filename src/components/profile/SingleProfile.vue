<template>
  <div class="">
    <userBar :username="username" :userInfo="userInfo" />
    <userGallery :images="images" />
  </div>
</template>
<script setup lang="ts">
import userBar from "./UserBar.vue";
import userGallery from "./UserGallery.vue";
import { ref } from "vue";
import { type userInfo } from "@/types/UserInfo";
import { type Image } from "@/types/Image";
const username = ref<String>("John Smith");
const userInfo = ref<userInfo>({
  posts: 13212,
  followers: 300,
  following: 4120,
});
const images = ref<Image[]>([
  {
    id: 1,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK7FAD6iKBoksW1wZVqd6f7H4QDAAc1P_IPQ&usqp=CAU",
  },
  {
    id: 2,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeF2aLroCeA90WE8M9mm69XHW6lvvT5ZOiCg&usqp=CAU",
  },
  {
    id: 3,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAk7_PffPO-dlBo4BNL8Bt76N4dP0x01AAw&usqp=CAU",
  },
]);
</script>
<style></style>
@/types/UserInfo
