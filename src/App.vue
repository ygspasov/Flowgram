<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/NavBar.vue";
</script>

<template>
  <header class="">
    <div class="wrapper"><Navbar /></div>
  </header>
  <div class="max-w-screen-xl mx-auto">
    <RouterView />
  </div>
</template>

<style scoped></style>
