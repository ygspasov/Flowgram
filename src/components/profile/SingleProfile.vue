<template>
  <div class="">
    <userBar :username="username" :userInfo="userInfo" :key="$route.params.username" />
    <userGallery :images="images" />
  </div>
</template>
<script setup lang="ts">
import userBar from "./UserBar.vue";
import userGallery from "./UserGallery.vue";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { type userInfo } from "@/types/UserInfo";
import { type Image } from "@/types/Image";
import { db } from "@/firebase/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const auth = getAuth();
const uid = auth.currentUser.uid;
const username = ref<String>("John Smith");
const userInfo = ref<userInfo>({
  posts: 13212,
  followers: 300,
  following: 4120,
});
const images = ref<Image[]>([]);
const getPosts = async () => {
  const q = query(collection(db, "posts"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const el = doc.data();
    el.id = doc.id;
    images.value.push(el);
  });
};

onMounted(() => {
  getPosts();
});
</script>
<style></style>
