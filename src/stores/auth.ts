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
    userUID: ref(""),
    username: ref(""),
    userLoggedIn: ref(false),
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(user: any) {
      this.user = user;
      this.userUID = user.uid;
      console.log("this.userUID", this.userUID);
    },
    async registerUser(userEmail: string, password: string, userName: string) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, userEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.username = user.displayName;
          console.log("user", user);
          this.setUser(user);
          this.userLoggedIn = true;
          // Update the user's profile to include the username
          updateProfile(user, {
            displayName: userName,
          }).then(() => {
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("username", user.displayName);
            this.setLoginState(user.displayName, user.uid);
          });
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    async signInUser(userEmail: string, password: string) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, userEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          this.setUser(user);
          this.userLoggedIn = true;
          this.username = user.displayName;
          localStorage.setItem("uid", user.uid);
          localStorage.setItem("username", user.displayName);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    setLoginState(username: string, uid: string) {
      this.username = username;
      this.uid = uid;
      this.userLoggedIn = true;
    },
    setSignOut() {
      this.userLoggedIn = false;
      localStorage.removeItem("uid");
      localStorage.removeItem("username");
    },
  },
});
