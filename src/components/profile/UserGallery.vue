<template>
  <div
    id="user-profile"
    class="flex flex-wrap flex-col md:flex-row justify-between bg-slate-300 my-5 p-5"
  >
    <div class="mb-5 w-full md:w-1/3" v-for="image in images" :key="image.id">
      <!-- <span>Name {{ image.name }}</span> -->
      <img class="w-full max-w-sm" :src="image.downloadURL" alt="image description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import { type Image } from "@/types/Image";

const props = defineProps<{
  images: Image[];
}>();

const { images } = toRefs(props);

onMounted(() => {
  console.log("images", images.value);
});
</script>
