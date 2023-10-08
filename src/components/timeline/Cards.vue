<template>
  <p>userIDs:{{ userIDs }}</p>
  <div class="flex flex-wrap justify-center items-center">
    <SingleCard v-for="card in 3" />
  </div>
</template>
<script setup lang="ts">
import SingleCard from "./SingleCard.vue";
const props = defineProps(["userIDs"]);
</script>
<style></style>
