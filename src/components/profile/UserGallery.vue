<template>
  <div id="user-profile">
    <div
      id="profileCards"
      v-if="userCheck"
      class="flex flex-wrap flex-col md:flex-row justify-between my-5"
    >
      <div
        class="flex justify-center mb-5 w-full md:w-1/3"
        v-for="post in profilePosts"
        :key="post.id"
      >
        <SingleCard :post="post" @deletePostId="deleteProfilePostId" />
      </div>
    </div>
    <div v-else>
      <p class="text-xl text-red-600 text-center">The user hasn't uploaded anything yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed, watch, reactive } from "vue";
import { type Post } from "@/types/Post";
import { storeToRefs } from "pinia";
import { authStore } from "@/stores/auth";
import { postsStore } from "@/stores/posts";
import { useRoute } from "vue-router";
import SingleCard from "@/components/timeline/SingleCard.vue";
const route = useRoute();
const store = authStore();
const posts_Store = postsStore();
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

const deleteProfilePostId = (id: string) => {
  posts_Store.deletePostId(id);
};
const { profilePosts } = toRefs(props);
</script>
