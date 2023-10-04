import { defineStore } from "pinia";
import { ref } from "vue";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
// @ts-ignore
import { db } from "@/firebase/firebase";
const followeesFollowersCollection = "followeesFollowers";
export const postsStore = defineStore("posts", {
  state: () => ({
    profileUID: ref(""),
    numberOfFollowers: ref(0),
    loadPosts: ref(false),
    profileIsFollowed: ref(false),
  }),
  getters: {},
  actions: {
    setPostsLoading(val: boolean) {
      this.loadPosts = val;
    },
    setProfileUID(val: string) {
      this.profileUID = val;
    },
    async setFollowUser(followerUid: string, followOrUnfollow: boolean) {
      const followeeUid = this.profileUID;
      const followeesFollowersRef = doc(db, `${followeesFollowersCollection}/${followeeUid}`);
      const followersCollectionRef = collection(followeesFollowersRef, "followers");

      try {
        if (followOrUnfollow) {
          await setDoc(doc(followersCollectionRef, followerUid), { followed: true });
          console.log(`User with UID ${followerUid} is now following user with UID ${followeeUid}`);
        } else {
          await setDoc(doc(followersCollectionRef, followerUid), { followed: false });
          console.log(`User with UID ${followerUid} has unfollowed user with UID ${followeeUid}`);
        }
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
        const querySnapshot = await getDocs(
          query(followeesFollowersRef, where("followed", "==", true))
        );
        const followers = querySnapshot.docs.map((doc) => doc.id);

        console.log(`Followers of user with UID ${uid}:`, followers);
        this.numberOfFollowers = followers.length;
        console.log("number of followers", this.numberOfFollowers);
      } catch (error) {
        console.error("Error getting followers:", error);
      }
    },
    async fetchFollowing(followeeId: string, followerId: string) {
      const followersRef = collection(db, `followeesFollowers/${followeeId}/followers`);
      const followersQuery = query(followersRef, where("followed", "==", true));

      try {
        const querySnapshot = await getDocs(followersQuery);
        const followers = querySnapshot.docs.map((doc) => doc.id);
        const isFollowed = followers.includes(followerId);
        this.setProfileIsFollowed(isFollowed); // Update the state
      } catch (error) {
        console.error("Error getting followers:", error);
        throw error;
      }
    },

    setProfileIsFollowed(val: boolean) {
      this.profileIsFollowed = val;
    },
  },
});
