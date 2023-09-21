import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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
    async registerUser(userEmail, password, userName) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, userEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          this.setUser(user);
          // Update the user's profile to include the username
          updateProfile(user, {
            displayName: userName,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    async signInUser(userEmail, password) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, userEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          this.setUser(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
  },
});
