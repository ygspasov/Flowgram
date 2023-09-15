<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/NavBar.vue";
</script>

<template>
  <header class="wrapper"><Navbar /></header>

  <main class="max-w-screen-xl mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
