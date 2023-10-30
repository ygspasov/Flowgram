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
    profileUID: ref(""), //the id of the user the currently viewed profile belongs to
    numberOfFollowers: ref(0),
    numberOfFollowing: ref(0),
    loadPosts: ref(false),
    profileIsFollowed: ref(false),
    profilePosts: ref<Post[]>([]),
    numberOfPosts: ref<Post[]>([]),
    following: ref([]),
    timelinePosts: ref<Post[]>([]),
    morePosts: ref<Post[]>([]),
    users: ref([]),
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
    setMorePosts(firstCardIndex: number, lastCardIndex: number) {
      this.morePosts = this.timelinePosts
        .sort((a, b) => {
          return b.uploadDate - a.uploadDate;
        })
        .slice(firstCardIndex, lastCardIndex);
    },
    setTimelinePosts(profileIDs: Array<string>) {
      this.setClearTimelinePosts();
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
        } else {
          await setDoc(doc(followersCollectionRef, followerUid), { followed: false });
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
        } else {
          await setDoc(doc(followingCollectionRef, followeeUid), { followed: false });
        }
      } catch (error) {
        console.error("Error following user:", error);
      }
    },
    async getFollowers(uid: string) {
      if (!uid) return;
      const followeesFollowersRef = collection(
        db,
        `${followeesFollowersCollection}/${uid}/followers`
      );

      try {
        const querySnapshot = await getDocs(
          query(followeesFollowersRef, where("followed", "==", true))
        );
        const followers = querySnapshot.docs.map((doc) => doc.id);

        this.numberOfFollowers = followers.length;
      } catch (error) {
        console.error("Error getting followers:", error);
      }
    },
    async fetchFollowers(followeeId: string, followerId: string) {
      if (!followeeId) return;
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
      if (!followeeId) return;
      const followingRef = collection(db, `following/${followeeId}/following`);
      const followingQuery = query(followingRef, where("followed", "==", true));
      const userUID = localStorage.getItem("uid");
      try {
        const querySnapshot = await getDocs(followingQuery);
        let following = querySnapshot.docs.map((doc) => doc.id);
        //Adding the logged in user to the people being followed on the user timeline
        following.push(userUID);
        this.following = following;
        //Removing yourself from the number of people being followed
        this.numberOfFollowing = following.length - 1;
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
        } else {
          console.log("No image associated with the post.");
        }

        // Deleting the post data
        await deleteDoc(postRef);
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

    async setUsers() {
      const usersRef = collection(db, `usernameToUID`);

      try {
        const querySnapshot = await getDocs(query(usersRef));
        const users = querySnapshot.docs.map((doc) => doc.id);
        this.users = users;
      } catch (error) {
        console.error("Error getting users:", error);
      }
    },

    setProfileIsFollowed(val: boolean) {
      this.profileIsFollowed = val;
    },

    setClearProfilePosts() {
      this.profilePosts = [];
    },

    setClearTimelinePosts() {
      this.timelinePosts = [];
      // this.morePosts = [];
      this.following = [];
    },

    deletePostId(id: string) {
      const objWithIdIndex = this.morePosts.findIndex((post) => post.id === id);
      if (objWithIdIndex > -1) {
        this.morePosts.splice(objWithIdIndex, 1);
      }
      this.deleteProfilePostId(id);
    },

    deleteProfilePostId(id: string) {
      const objWithIdIndex = this.profilePosts.findIndex((post) => post.id === id);
      if (objWithIdIndex > -1) {
        this.profilePosts.splice(objWithIdIndex, 1);
      }
    },
  },
});
