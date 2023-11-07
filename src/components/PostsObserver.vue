<template>
  <div ref="root"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const observer = ref<IntersectionObserver | null>(null);
const root = ref<HTMLElement | null>(null);
const emits = defineEmits(["intersect"]);

onMounted(() => {
  if (root.value) {
    observer.value = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        emits("intersect");
      }
    });

    observer.value.observe(root.value);
  }
});
</script>
<style scoped></style>
