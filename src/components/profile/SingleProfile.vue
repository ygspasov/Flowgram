<template>
  <div class="" :key="componentKey">
    <userBar
      :username="$route.params.username"
      :userInfo="userInfo"
      :key="$route.params.username"
    />
    <userGallery :images="images" />
  </div>
</template>
<script setup lang="ts">
import userBar from "./UserBar.vue";
import userGallery from "./UserGallery.vue";
import { ref, onMounted, watch } from "vue";
import { type userInfo } from "@/types/UserInfo";
import { type Image } from "@/types/Image";
// @ts-ignore
import { db } from "@/firebase/firebase.js";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { postsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
let images = ref<Image[]>([]);
const route = useRoute();
const componentKey = ref(route.fullPath);
watch(route, () => {
  //watching for changes in the router parameter(username) and updating the profile images
  componentKey.value = route.fullPath;
  images = ref<Image[]>([]);
  getProfileUID();
});

const store = postsStore();
const { loadPosts, numberOfFollowers }: any = storeToRefs(store);
watch(loadPosts, (newVal) => {
  if (newVal) {
    images.value = [];
    getPosts();
  }
});

//Retrieving the UID associated with the name of the user

let docSnap: any;
let profileUID: any;

const getProfileUID = async () => {
  const username = route.params.username;
  console.log("username", username);
  const profileUIDRef = doc(db, "usernameToUID", username);

  await getDoc(profileUIDRef)
    .then((snapshot) => {
      docSnap = snapshot;
      if (docSnap.exists()) {
        profileUID = docSnap.data().uid;
        console.log("profileUID:", profileUID);
        store.setProfileUID(profileUID);
      } else {
        console.log("No such document!");
      }
    })
    .then(() => {
      getPosts();
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
};

const userInfo = ref<userInfo>({
  posts: 13212,
  followers: numberOfFollowers,
  following: 4120,
});

const getPosts = async () => {
  const q = query(collection(db, "posts"), where("uid", "==", profileUID));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const el = doc.data();
    el.id = doc.id;
    // @ts-ignore
    images.value.push(el);
    store.setPostsLoading(false);
  });
};

onMounted(() => {
  getProfileUID();
});
</script>
<style></style>
