<template>
  <!-- Modal toggle -->
  <button
    data-modal-target="staticModal"
    data-modal-toggle="staticModal"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    type="button"
  >
    upload photo
  </button>

  <!-- Main modal -->
  <div
    id="staticModal"
    data-modal-backdrop="static"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
            >Upload photo</label
          >
          <input
            @change="handleUpload($event)"
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept=".jpeg,.png,.jpg"
          />
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="uploadPhoto(file)"
            data-modal-hide="staticModal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Upload
          </button>
          <button
            data-modal-hide="staticModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Success/Error messages -->
  <div
    v-if="loading"
    class="flex items-center justify-center w-full h-10 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
  >
    <div
      class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200"
    >
      {{ uploadText }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
// @ts-ignore
import { db } from "@/firebase/firebase.js";
import { getAuth } from "firebase/auth";
import { getStorage, getDownloadURL, ref as storageReference, uploadBytes } from "firebase/storage";
import { postsStore } from "@/stores/posts";
const store = postsStore();

const storage = getStorage();
let loading = ref<Boolean>(false);
let uploadText = ref<String>("");

const auth = getAuth();
const uid = localStorage.getItem("uid");
let file = ref("");

const handleUpload = (e: any) => {
  if (!e.target.files[0]) return;
  file = e.target.files[0];
};

const uploadPhoto = async (file: any) => {
  loading.value = true;
  uploadText.value = "Uploading the image";
  // Create a storage reference to the file
  const imageRef = storageReference(storage, `images/${file.name}`);

  // Upload the file
  await uploadBytes(imageRef, file).catch(() => {
    uploadText.value = "Upload failed";
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  });

  // Get the download URL
  const downloadURL = await getDownloadURL(imageRef);

  // Add the document info with downloadURL
  const picturesCollection = collection(db, "posts");
  await addDoc(picturesCollection, {
    uid,
    name: file.name,
    size: file.size,
    lastModified: file.lastModified,
    type: file.type,
    downloadURL,
  })
    .then(() => {
      uploadText.value = "Image added successfully";
      store.setPostsLoading(true);
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    })
    .catch(() => {
      uploadText.value = "Upload failed";
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    });
};
</script>
<style></style>
