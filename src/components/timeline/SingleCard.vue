<template>
  <div
    class="max-w-sm mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a :href="post.downloadURL" class="flex justify-center" target="_blank">
      <img class="rounded-t-lg" :src="post.downloadURL" alt="" />
    </a>
    <div class="p-5">
      <a>
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ post.description }}
        </h5>
      </a>
      <div class="my-3" v-if="showEdit">
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Edit description</label
        >
        <input
          type="text"
          v-model="post.description"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <button
          @click="editPost"
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          :disabled="post.description.length < 1"
          :class="{ disabled: post.description.length < 1 }"
        >
          Edit
        </button>
      </div>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Posted by {{ post.username }}</p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">On {{ timeFormat }}</p>
      <div class="flex justify-between text-white">
        <div id="likes">
          <a @click="toggleLike"
            ><font-awesome-icon :icon="['fas', 'thumbs-up']" size="xl" :class="{ likedByUID }"
          /></a>
          <div
            v-if="numberOfLikes"
            class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-base font-semibold mx-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center"
          >
            Likes: {{ numberOfLikes }}
          </div>
        </div>
        <span class="icons" v-if="isUserPost"
          ><a @click="showEdit = !showEdit"
            ><font-awesome-icon class="mx-1" :icon="['fa', 'pen-to-square']" size="xl"
          /></a>
          <a @click.stop="deletePost"
            ><font-awesome-icon class="mx-1" :icon="['fa', 'trash']" size="xl" /></a
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { postsStore } from "@/stores/posts";
import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const auth_Store = authStore();
const { userUID } = storeToRefs(auth_Store);
const posts_Store = postsStore();
const { following } = storeToRefs(posts_Store);
let userIDs = ref(following.value);
let showEdit = ref(false);
const emit = defineEmits(["deletePostId"]);

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
let post = props.post;
const deletePost = () => {
  const id = props.post.id;
  posts_Store.deletePost(id).then(() => {
    // posts_Store.fetchFollowing(userUID.value).then(() => {
    //   console.log("userIDs.value deletePost", userIDs.value);
    //   // posts_Store.setTimelinePosts(userIDs.value);
    //   posts_Store.setPostsLoading(true);
    // });
    emit("deletePostId", id);
  });
};
const editPost = () => {
  posts_Store.editPost(post.id, post.description).then(() => {
    showEdit.value = false;
    console.log("showEdit", showEdit.value);
  });
};
const timeFormat = computed(() => new Date(props.post.uploadDate).toUTCString());

const toggleLike = () => {
  posts_Store.toggleLike(post.id, userUID.value).then(() => {
    if (post.likes) {
      post.likes[userUID.value] = !post.likes[userUID.value];
    } else {
      post.likes = { ...post.likes, [userUID.value]: true };
    }
    console.log("post.likes", post.likes);
  });
};
const numberOfLikes = computed(() => {
  if (!post.likes) return;
  let likesCount = 0;
  Object.keys(post.likes).forEach((userId) => {
    if (post.likes[userId] === true) {
      likesCount++;
    }
  });
  return likesCount;
});
const likedByUID = computed(() => {
  if (post.likes) {
    //returns if the logged in user likes the post
    return post.likes[userUID.value];
  }
});
const isUserPost = computed(() => {
  return userUID.value == post.uid;
});
onMounted(() => {
  // console.log("post", post);
  // console.log("userUID", userUID.value);
  // console.log("post.uid", post.uid);
});
</script>
<style scoped>
.disabled {
  @apply bg-gray-500;
}
.likedByUID {
  @apply text-green-400;
}
a {
  cursor: pointer;
}
</style>
