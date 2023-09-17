import { defineStore } from "pinia";
import { ref } from "vue";

export const authStore = defineStore("auth", {
  state: () => ({
    user: ref(null),
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(user: any) {
      this.user = user;
    },
  },
});
