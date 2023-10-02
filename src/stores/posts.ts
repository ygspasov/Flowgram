import { defineStore } from "pinia";
import { ref } from "vue";
import { doc, setDoc } from "firebase/firestore";
// @ts-ignore
import { db } from "@/firebase/firebase";

export const postsStore = defineStore("posts", {
  state: () => ({
    profileUID: ref(""),
    loadPosts: ref(false),
  }),
  getters: {},
  actions: {
    setPostsLoading(val: boolean) {
      this.loadPosts = val;
    },
    setProfileUID(val: string) {
      this.profileUID = val;
    },
    async SetFollowUser(followerUid: any) {
      const followeeUid = this.profileUID;
      const followsRef = doc(db, "followee_follower", followeeUid);

      try {
        await setDoc(followsRef, { [followerUid]: true }, { merge: true });
        console.log(`User with UID ${followerUid} is now following user with UID ${followeeUid}`);
      } catch (error) {
        console.error("Error following user:", error);
      }
    },
  },
});
