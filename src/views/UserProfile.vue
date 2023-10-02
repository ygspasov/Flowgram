<template>
  <div class="my-5 text-lg">
    <SingleProfile v-if="userExists" />

    <div v-else>
      <p class="text-xl text-red-600 text-center">The user doesn't exist.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.js";
import SingleProfile from "@/components/profile/SingleProfile.vue";
import { useRoute } from "vue-router";
const route = useRoute();
let username = route.params.username;
const userExists = ref(true);
watch(route, () => {
  //watching for changes in the router parameter(username) and updating the profile images
  username = route.params.username;
  checkUsernameExists(username);
});

const checkUsernameExists = async (usernameToCheck) => {
  // Convert the username to lowercase (or uppercase) to ignore case
  const lowerUsername = usernameToCheck.toLowerCase();

  // Get the document reference for the provided username
  const profileUIDRef = doc(db, "usernameToUID", lowerUsername);

  try {
    // Get the document data
    const docSnap = await getDoc(profileUIDRef);
    userExists.value = docSnap.exists();
  } catch (error) {
    console.error("Error checking username:", error);
    throw error;
  }
};
</script>
