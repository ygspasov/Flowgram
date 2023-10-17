<template>
  <div id="user-profile">
    <div
      v-if="userCheck"
      class="flex flex-wrap flex-col md:flex-row justify-between bg-slate-300 my-5 p-5"
    >
      <div class="flex justify-center mb-5 w-full md:w-1/3" v-for="post in posts" :key="post.id">
        <SingleCard :post="post" />
      </div>
    </div>
    <div v-else>
      <p class="text-xl text-red-600 text-center">The user hasn't uploaded anything yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs, computed, watch, reactive } from "vue";
import { type Post } from "@/types/Post";
import { storeToRefs } from "pinia";
import { authStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import SingleCard from "@/components/timeline/SingleCard.vue";
const route = useRoute();
const store = authStore();
const { userLoggedIn }: any = storeToRefs(store);
let profileUsername = reactive({
  value: route.params.username,
});

//Checking if the user profile belongs to the user in order to show user content
const userCheck = computed(() => userLoggedIn);
const props = defineProps<{
  profilePosts: Post[];
}>();

watch(
  () => route.params.username,
  (newUsername) => {
    profileUsername.value = newUsername;
  }
);

const { profilePosts: posts } = toRefs(props);
</script>
