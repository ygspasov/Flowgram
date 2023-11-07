<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/NavBar.vue";
import { onMounted } from "vue";
import { authStore } from "@/stores/auth";
const store = authStore();
const username = localStorage.getItem("username") as string;
const uid = localStorage.getItem("uid") as string;
const userLoggedIn = localStorage.getItem("userLoggedIn");
onMounted(() => {
  userLoggedIn ? store.setSignIn() : null;
  username && uid ? store.setLoginState(username, uid) : null;
});
</script>

<template>
  <header class="wrapper"><Navbar /></header>

  <main class="max-w-screen-xl mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
