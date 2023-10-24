<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/NavBar.vue";
import { onMounted } from "vue";
import { authStore } from "@/stores/auth";
const store = authStore();
const username = localStorage.getItem("username");
const uid = localStorage.getItem("uid");
onMounted(() => {
  if (username && uid) {
    store.setLoginState(username, uid);
  }
});
</script>

<template>
  <header class="wrapper"><Navbar /></header>

  <main class="max-w-screen-xl mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
