import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// @ts-ignore
import { db } from "@/firebase/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import router from "@/router";

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
          }).then(async () => {
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("username", user.displayName);
            this.setLoginState(user.displayName, user.uid);

            router.push(`/`);
            //Link the username to the id
            await setDoc(doc(db, "usernameToUID", this.username.toLowerCase()), {
              uid: this.userUID,
            });
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
          router.push(`/`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    setLoginState(username: string, uid: string) {
      this.username = username;
      this.userUID = uid;
      this.userLoggedIn = true;
    },
    setSignOut() {
      this.userLoggedIn = false;
      this.userUID = "";
      this.username = "";
      localStorage.removeItem("uid");
      localStorage.removeItem("username");
      localStorage.removeItem("ProfileUID");
    },
  },
});
