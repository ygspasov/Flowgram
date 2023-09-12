<template>
  <div class="about">
    <h1 class="text-3xl font-bold underline">Tailwind test!</h1>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>
<style></style>
