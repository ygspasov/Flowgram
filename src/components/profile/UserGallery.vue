<template>
  <div class="bg-slate-300 flex flex-col md:flex-row justify-between my-5 p-5">
    <div class="" v-for="image in images" :key="image.id">
      <span>Name {{ image.name }}</span>
      <img
        class="w-auto md:max-w-sm mx-auto mb-5 md:mb-0"
        :src="image.downloadURL"
        alt="image description"
      />
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
