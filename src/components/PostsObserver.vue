<template>
  <div ref="root"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const observer = ref(null);
const root = ref(null);
const emits = defineEmits(["intersect"]);

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      //run some logic or emit an event to run logic
      emits("intersect");
    }
  });
  observer.value.observe(root.value);
});
</script>
<style scoped></style>
