import { defineStore } from "pinia";
import { ref } from "vue";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref as storageRef, deleteObject, getStorage } from "firebase/storage";
// @ts-ignore
import { db } from "@/firebase/firebase";
import { type Post } from "@/types/Post";

const followeesFollowersCollection = "followeesFollowers";
export const postsStore = defineStore("posts", {
  state: () => ({
    profileUID: ref(""),
    numberOfFollowers: ref(0),
    numberOfFollowing: ref(0),
    loadPosts: ref(false),
    profileIsFollowed: ref(false),
    profilePosts: ref<Post[]>([]),
    numberOfPosts: ref(0),
    following: ref([]),
    timelinePosts: ref([]),
    morePosts: ref([]),
  }),
  getters: {},
  actions: {
    async setPosts(profileUID: string) {
      const q = query(
        collection(db, "posts"),
        orderBy("uploadDate", "desc"),
        where("uid", "==", profileUID)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const el = doc.data();
        el.id = doc.id;
        this.profilePosts.push(el);
        this.numberOfPosts = this.profilePosts.length;
        this.setPostsLoading(false);
      });
    },
    setMorePosts(firstCardIndex, lastCardIndex) {
      console.log("firstCardIndex,lastCardIndex", firstCardIndex, lastCardIndex);
      this.morePosts = this.timelinePosts.slice(firstCardIndex, lastCardIndex);
      console.log("this.morePosts", this.morePosts);
    },
    setTimelinePosts(profileIDs: Array<string>) {
      this.setClearTimelinePosts();
      console.log("profileIDs in setTimelinePosts", profileIDs);
      profileIDs.forEach(async (id) => {
        const q = query(
          collection(db, "posts"),
          orderBy("uploadDate", "desc"),
          where("uid", "==", id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const el = doc.data();
          el.id = doc.id;
          this.timelinePosts.push(el);
        });
        console.log("this.timelinePosts", this.timelinePosts);
      });
    },
    setPostsLoading(val: boolean) {
      this.loadPosts = val;
    },
    setProfileUID(val: string) {
      this.profileUID = val;
      localStorage.setItem("profileUID", this.profileUID);
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

      const followingCollection = "following";
      const followingRef = doc(db, `${followingCollection}/${followerUid}`);
      const followingCollectionRef = collection(followingRef, "following");

      try {
        if (followOrUnfollow) {
          await setDoc(doc(followingCollectionRef, followeeUid), { followed: true });
          console.log(
            `User with UID ${followeeUid} is being followed by user with UID ${followerUid}`
          );
        } else {
          await setDoc(doc(followingCollectionRef, followeeUid), { followed: false });
          console.log(
            `User with UID ${followeeUid} is no longer being followed by user with UID ${followerUid}`
          );
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

        // console.log(`Followers of user with UID ${uid}:`, followers);
        this.numberOfFollowers = followers.length;
        // console.log("number of followers", this.numberOfFollowers);
      } catch (error) {
        console.error("Error getting followers:", error);
      }
    },
    async fetchFollowers(followeeId: string, followerId: string) {
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
    async fetchFollowing(followeeId: string) {
      const followingRef = collection(db, `following/${followeeId}/following`);
      const followingQuery = query(followingRef, where("followed", "==", true));
      const userUID = localStorage.getItem("uid");
      console.log("fetchFollowing userUID", userUID);
      try {
        const querySnapshot = await getDocs(followingQuery);
        let following = querySnapshot.docs.map((doc) => doc.id);
        //Adding the logged in user to the people being followed on the user timeline
        following.push(userUID);
        this.following = following;
        console.log("this.following", this.following);
        this.numberOfFollowing = following.length;
        // console.log("number of people following", this.numberOfFollowing);
      } catch (error) {
        console.error("Error getting number of people following:", error);
        throw error;
      }
    },
    async deletePost(id: string) {
      const postRef = doc(db, "posts", id);
      const storage = getStorage(); // Initialize storage

      try {
        const postSnapshot = await getDoc(postRef);
        if (!postSnapshot.exists()) {
          console.log("Post not found.");
          return;
        }

        const imageData = postSnapshot.data();
        const imageURL = imageData.downloadURL;

        // If imageURL exists and is not empty, delete the image
        if (imageURL) {
          const imageRef = storageRef(storage, imageURL);
          // Deleting the image
          await deleteObject(imageRef);
          console.log("Image associated with the post deleted successfully.");
        } else {
          console.log("No image associated with the post.");
        }

        // Deleting the post data
        await deleteDoc(postRef);
        console.log("Post deleted successfully.");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },

    async editPost(id: string, newDescription: string) {
      const postRef = doc(db, "posts", id);
      try {
        await updateDoc(postRef, {
          description: newDescription,
        });

        console.log("Post description updated successfully.");
      } catch (error) {
        console.error("Error updating post description:", error);
      }
    },

    async toggleLike(postId: string, userId: string) {
      const postRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(postRef);
      const post = postSnapshot.data();
      const liked = post.likes && post.likes[userId];
      let newLikes;
      if (liked) {
        // User has already liked the post, remove the like (dislike)
        newLikes = { ...post.likes };
        delete newLikes[userId];
      } else {
        // User hasn't liked the post, add the like
        newLikes = { ...post.likes, [userId]: true };
      }
      // Update the likes field in the database
      await updateDoc(postRef, { likes: newLikes });
    },

    setProfileIsFollowed(val: boolean) {
      this.profileIsFollowed = val;
    },

    setClearProfilePosts() {
      this.profilePosts = [];
    },

    setClearTimelinePosts() {
      this.timelinePosts = [];
      this.morePosts = [];
      this.following = [];
    },
  },
});
