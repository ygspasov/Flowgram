<template>
  <div v-if="userLoggedIn"><Cards /></div>
  <div v-else><h3 class="text-lg text-center">Log in to see posts.</h3></div>
</template>
<script setup lang="ts">
import Cards from "./Cards.vue";

import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const auth_Store = authStore();
const { userLoggedIn } = storeToRefs(auth_Store);
</script>
<style></style>
