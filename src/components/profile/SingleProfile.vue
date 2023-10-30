<template>
  <div class="" :key="componentKey">
    <userBar
      :username="$route.params.username"
      :userInfo="userInfo"
      :key="$route.params.username"
      @followAction="followAction"
    />
    <div class="flex items-center justify-center">
      <div
        v-if="loading"
        class="flex items-center justify-center w-56 h-16 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      >
        <div
          class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200"
        >
          Loading posts...
        </div>
      </div>
    </div>
    <userGallery v-if="store.profilePosts.length && !loading" :profilePosts="profilePosts" />
    <div v-else class="flex items-center justify-center">
      <p>The user hasn't uploaded any content yet.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import userBar from "./UserBar.vue";
import userGallery from "./UserGallery.vue";
import { ref, onMounted, watch } from "vue";
import { type userInfo } from "@/types/UserInfo";
// @ts-ignore
import { db } from "@/firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const route = useRoute();
const componentKey = ref(route.fullPath);
const store = postsStore();
const loading = ref(false);
watch(route, () => {
  //watching for changes in the router parameter(username) and updating the profile profilePosts
  componentKey.value = route.fullPath;
  store.setClearProfilePosts();
  getProfileUID();
});

const { loadPosts, numberOfFollowers, numberOfFollowing, profilePosts, numberOfPosts }: any =
  storeToRefs(store);
watch(loadPosts, (newVal) => {
  if (newVal) {
    store.setClearProfilePosts();
    getPosts();
  }
});

//Retrieving the UID associated with the name of the user

let docSnap: any;
let profileUID: any;

const getProfileUID = async () => {
  loading.value = true;
  store.setClearProfilePosts();
  const username = route.params.username;
  const profileUIDRef = doc(db, "usernameToUID", username);

  await getDoc(profileUIDRef)
    .then((snapshot) => {
      docSnap = snapshot;
      if (docSnap.exists()) {
        profileUID = docSnap.data().uid;
        store.setProfileUID(profileUID);
      } else {
        console.log("No such document!");
      }
    })
    .then(() => {
      getPosts();
    })
    .then(() => {
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
};

const userInfo = ref<userInfo>({
  posts: numberOfPosts,
  followers: numberOfFollowers,
  following: numberOfFollowing,
});

const getPosts = async () => {
  await store.setPosts(profileUID);
};

const followAction = (val: boolean) => {
  val ? (userInfo.value.followers += 1) : (userInfo.value.followers -= 1);
};

onMounted(() => {
  getProfileUID();
});
</script>
<style></style>
