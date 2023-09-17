import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state: () => ({
    user: null,
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
