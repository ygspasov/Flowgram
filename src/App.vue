<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/NavBar.vue";
</script>

<template>
  <header class="">
    <div class="wrapper"><Navbar /></div>
  </header>

  <RouterView />
</template>

<style scoped></style>
