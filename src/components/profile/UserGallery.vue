<template>
  <div class="bg-slate-300 flex flex-col md:flex-row justify-between my-5 p-5">
    <div class="" v-for="image in props.images" :key="image.id">
      <img
        class="w-auto md:max-w-sm mx-auto mb-5 md:mb-0"
        :src="image.src"
        alt="image description"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Image } from "@/types/Image";
const props = defineProps<{
  images: Image[];
}>();
</script>
<style></style>
