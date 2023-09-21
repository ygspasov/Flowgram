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
    username: ref(""),
    userLoggedIn: ref(false),
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
          this.userLoggedIn = true;
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
          this.userLoggedIn = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    changeLoginState(username) {
      this.userLoggedIn = true;
      this.username = username;
    },
  },
});
