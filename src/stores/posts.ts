import { defineStore } from "pinia";
import { ref } from "vue";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
// @ts-ignore
import { db } from "@/firebase/firebase";
const followeesFollowersCollection = "followeesFollowers";
export const postsStore = defineStore("posts", {
  state: () => ({
    profileUID: ref(""),
    numberOfFollowers: ref(0),
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
    async setFollowUser(followerUid: string) {
      const followeeUid = this.profileUID;
      const followeesFollowersRef = doc(db, `${followeesFollowersCollection}/${followeeUid}`);
      const followersCollectionRef = collection(followeesFollowersRef, "followers");

      try {
        await setDoc(doc(followersCollectionRef, followerUid), { followed: true });
        console.log(`User with UID ${followerUid} is now following user with UID ${followeeUid}`);
      } catch (error) {
        console.error("Error following user:", error);
      }
    },
    async getFollowers(uid: string) {
      console.log("getFollowers uid", uid);
      const followeesFollowersRef = collection(
        db,
        `${followeesFollowersCollection}/${uid}/followers`
      );

      try {
        const querySnapshot = await getDocs(followeesFollowersRef);
        const followers = querySnapshot.docs.map((doc) => doc.id);
        console.log(`Followers of user with UID ${uid}:`, followers);
        this.numberOfFollowers = followers.length;
        console.log("number of followers", this.numberOfFollowers);
      } catch (error) {
        console.error("Error getting followers:", error);
      }
    },
  },
});
