<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/NavBar.vue";
import "./firebase/firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth();
</script>

<template>
  <header class="wrapper"><Navbar /></header>

  <main class="max-w-screen-xl mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
