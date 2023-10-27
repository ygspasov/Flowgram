<template>
  <div class="my-2">
    <div class="flex flex-wrap justify-between p-5">
      <h2 class="text-3xl flex items-center">{{ capitalizedUsername }}</h2>
      <div class="flex flex-col">
        <UploadModal v-if="userCheck" />
        <button
          @click="followUser"
          v-if="followCheck && !profileIsFollowedComputed"
          class="text-white bg-yellow-700 hover:bg-yellow-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1"
          type="button"
        >
          Follow
        </button>
        <button
          @click="unFollowUser"
          v-if="followCheck && profileIsFollowedComputed"
          class="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1"
          type="button"
        >
          Following
        </button>
      </div>
    </div>
    <div id="buttonGroup" class="flex flex-col sm:flex-row flex-wrap justify-between p-5">
      <!-- <span class="w-100 sm:w-1/3 text-lg text-center">{{ userInfo.posts }} posts</span> -->
      <span
        class="w-100 sm:w-32 mx-2 my-1 py-1 sm:m-0 text-lg text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        {{ userInfo.posts > 0 ? userInfo.posts : 0 }} posts
      </span>
      <span
        class="w-100 sm:w-32 mx-2 my-1 py-1 sm:m-0 text-lg text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        {{ userInfo.followers }} followers
      </span>
      <!-- <span class="w-100 sm:w-1/3 text-lg text-center">{{ userInfo.followers }} followers</span> -->

      <span
        class="w-100 sm:w-32 mx-2 my-1 py-1 sm:m-0 text-lg text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        {{ userInfo.following }} following
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { initFlowbite } from "flowbite";
import { type userInfo } from "@/types/UserInfo";
import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed, onMounted, watch } from "vue";
import UploadModal from "./UploadPhotoModal.vue";
import { postsStore } from "@/stores/posts";
const store = authStore();
const { userLoggedIn }: any = storeToRefs(store);
const posts_Store = postsStore();
const { profileUID, profileIsFollowed }: any = storeToRefs(posts_Store);
const props = defineProps<{
  username: String;
  userInfo: userInfo;
}>();
const route = useRoute();
let { username: profileUsername } = route.params;
let { username } = storeToRefs(store);
const authUsername: string = username.value.toLowerCase();
//Checking if the user profile belongs to the user in order to enable the upload
const userCheck = computed(() => userLoggedIn.value && profileUsername === authUsername);
const followCheck = computed(() => userLoggedIn.value && profileUsername !== authUsername);
const capitalizedUsername = computed(
  () => props.username.charAt(0).toUpperCase() + props.username.slice(1)
);
const followerUid: string | null = localStorage.getItem("uid");
const emit = defineEmits(["followAction"]);
const followUser = async () => {
  try {
    await posts_Store.setFollowUser(followerUid, true);
    await posts_Store.fetchFollowers(profileUID.value, followerUid);
    emit("followAction", true); // Signal success, increment count
    posts_Store.morePosts = [];
  } catch (error) {
    console.error("Failed to follow user:", error);
  }
};

const unFollowUser = async () => {
  try {
    await posts_Store.setFollowUser(followerUid, false);
    await posts_Store.fetchFollowers(profileUID.value, followerUid);
    emit("followAction", false); // Signal success, decrement count
    posts_Store.morePosts = [];
  } catch (error) {
    console.error("Failed to unfollow user:", error);
  }
};
const getFollowingState = () => {
  posts_Store.fetchFollowers(profileUID.value, followerUid);
};
const profileIsFollowedComputed = computed(() => profileIsFollowed.value);
watch(profileIsFollowedComputed, (newValue) => {
  console.log("Profile is followed:", newValue);
});
onMounted(() => {
  initFlowbite();
  setTimeout(() => {
    posts_Store.getFollowers(profileUID.value);
    getFollowingState();
    posts_Store.fetchFollowing(profileUID.value);
  }, 1500);
});
</script>
<style></style>
