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
</template>
<script setup lang="ts">
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.js";
import { getAuth } from "firebase/auth";
import { getStorage, ref as storageRefference, uploadBytes } from "firebase/storage";
const storage = getStorage();

const auth = getAuth();
console.log("uid", auth.currentUser.uid);
let file = ref("");

const handleUpload = (e: any) => {
  if (!e.target.files[0]) return;
  file = e.target.files[0];

  try {
    uploadPhotoData(file);
    uploadPhoto(file);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const picturesCollection = collection(db, "pictures");

const uploadPhotoData = async (file: any) => {
  await addDoc(picturesCollection, {
    uid: auth.currentUser.uid,
    name: file.name,
    size: file.size,
    lastModified: file.lastModified,
    type: file.type,
  });
};
const uploadPhoto = async (file: any) => {
  const imageRef = storageRefference(storage, `images/${file.name}`);
  await uploadBytes(imageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};
</script>
<style></style>
