<template>
  <div class="">
    <userBar :username="username" :userInfo="userInfo" :key="$route.params.username" />
    <userGallery :images="images" />
  </div>
</template>
<script setup lang="ts">
import userBar from "./UserBar.vue";
import userGallery from "./UserGallery.vue";
import { ref, onMounted, watch } from "vue";
import { type userInfo } from "@/types/UserInfo";
import { type Image } from "@/types/Image";
// @ts-ignore
import { db } from "@/firebase/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";

const store = postsStore();
const { loadPosts }: any = storeToRefs(store);
watch(loadPosts, (newVal) => {
  if (newVal) {
    images.value = [];
    getPosts();
  }
});

const uid = localStorage.getItem("uid");
const username = ref<String>("John Smith");
const userInfo = ref<userInfo>({
  posts: 13212,
  followers: 300,
  following: 4120,
});
let images = ref<Image[]>([]);
const getPosts = async () => {
  const q = query(collection(db, "posts"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const el = doc.data();
    el.id = doc.id;
    // @ts-ignore
    images.value.push(el);
    store.setPostsLoading(false);
  });
};

onMounted(() => {
  getPosts();
});
</script>
<style></style>
