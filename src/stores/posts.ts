import { defineStore } from "pinia";
import { ref } from "vue";

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
