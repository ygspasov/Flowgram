<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/NavBar.vue";
import { onMounted } from "vue";
import { getAuth } from "firebase/auth";
import { authStore } from "@/stores/auth";
const store = authStore();
const auth = getAuth();
onMounted(() => {
  console.log("on mounted");
  setTimeout(() => {
    if (auth.currentUser) {
      store.changeLoginState(auth.currentUser.displayName);
    }
  }, 1000);
});
</script>

<template>
  <header class="wrapper"><Navbar /></header>

  <main class="max-w-screen-xl mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
