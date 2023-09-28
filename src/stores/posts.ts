import { defineStore } from "pinia";
import { ref } from "vue";

// @ts-ignore
import { db } from "@/firebase/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

export const postsStore = defineStore("posts", {
  state: () => ({
    loadPosts: ref(false),
  }),
  getters: {},
  actions: {
    setPostsLoading(val: boolean) {
      this.loadPosts = val;
    },
  },
});
