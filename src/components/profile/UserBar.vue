<template>
  <div class="bg-slate-300 my-2">
    <div class="flex flex-wrap justify-between p-5">
      <h2 class="text-2xl flex items-center">
        {{ capitalizedUsername }}
      </h2>
      <!-- <button
        v-if="userCheck"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        upload photo
      </button> -->
      <div id="buttonGroup" class="flex flex-col">
        <UploadModal v-if="userCheck" />
        <button
          @click="followUser"
          v-if="followCheck && !profileIsFollowedComputed"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
        >
          Follow
        </button>
        <button
          @click="unFollowUser"
          v-if="followCheck && profileIsFollowedComputed"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
        >
          Following
        </button>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row pb-5">
      <span class="w-100 sm:w-1/3 text-lg text-center">{{ userInfo.posts }} posts</span>
      <span class="w-100 sm:w-1/3 text-lg text-center">{{ userInfo.followers }} followers</span>
      <span class="w-100 sm:w-1/3 text-lg text-center">{{ userInfo.following }} following</span>
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
    await posts_Store.fetchFollowing(profileUID.value, followerUid);
    emit("followAction", true); // Signal success, increment count
  } catch (error) {
    console.error("Failed to follow user:", error);
  }
};

const unFollowUser = async () => {
  try {
    await posts_Store.setFollowUser(followerUid, false);
    await posts_Store.fetchFollowing(profileUID.value, followerUid);
    emit("followAction", false); // Signal success, decrement count
  } catch (error) {
    console.error("Failed to unfollow user:", error);
  }
};
const getFollowingState = () => {
  posts_Store.fetchFollowing(profileUID.value, followerUid);
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
  }, 1500);
});
</script>
<style></style>
