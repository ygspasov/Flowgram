<template>
  <div class="w-full flex flex-col">
    <SingleCard v-for="card in 3" />
  </div>
</template>
<script setup lang="ts">
import SingleCard from "./SingleCard.vue";
</script>
<style></style>
