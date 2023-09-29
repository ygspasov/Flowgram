<template>
  <div id="user-profile">
    <div
      v-if="userCheck"
      class="flex flex-wrap flex-col md:flex-row justify-between bg-slate-300 my-5 p-5"
    >
      <div class="mb-5 w-full md:w-1/3" v-for="image in images" :key="image.id">
        <!-- <span>Name {{ image.name }}</span> -->
        <img class="w-full max-w-sm" :src="image.downloadURL" alt="image description" />
      </div>
    </div>
    <div v-else>
      <p class="text-xl text-red-600 text-center">The user hasn't upoloaded anything yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs, computed, watch, reactive } from "vue";
import { type Image } from "@/types/Image";
import { storeToRefs } from "pinia";
import { authStore } from "@/stores/auth";
import { useRoute } from "vue-router";
const route = useRoute();
const store = authStore();
const { userLoggedIn }: any = storeToRefs(store);
let profileUsername = reactive({
  value: route.params.username,
});

let { username } = storeToRefs(store);
const authUsername: string = username.value.toLowerCase();
//Checking if the user profile belongs to the user in order to show user content
const userCheck = computed(() => userLoggedIn && profileUsername.value === authUsername);
const props = defineProps<{
  images: Image[];
}>();

watch(
  () => route.params.username,
  (newUsername) => {
    profileUsername.value = newUsername;
  }
);

const { images } = toRefs(props);

onMounted(() => {
  console.log("images", images.value);
});
</script>
