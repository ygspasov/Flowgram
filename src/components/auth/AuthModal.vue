<template>
  <div id="modal">
    <!-- Modal toggle -->
    <button
      :data-modal-target="dataModal"
      :data-modal-toggle="dataModal"
      class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
    >
      {{ title }}
    </button>

    <!-- Main modal -->

    <div
      :id="dataModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-md max-h-full mt-5">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            :data-modal-hide="dataModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {{ title }} to our platform
            </h3>

            <form class="space-y-6 pb-2" action="#">
              <div v-if="!isLogin">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your name</label
                >
                <input
                  v-model="userName"
                  @blur="v$.userName.$touch"
                  type="name"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div
                class="bg-red-300 rounded-lg px-2 py-1"
                v-show="!props.isLogin && v$.userName.$error"
              >
                Should be least 3 characters in length.
              </div>
              <div>
                <label
                  for="userEmail"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  v-model="userEmail"
                  @blur="v$.userEmail.$touch"
                  type="email"
                  name="email"
                  id="userEmail"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div class="bg-red-300 rounded-lg px-2 py-1" v-if="v$.userEmail.$error">
                Email field should contain a valid email.
              </div>

              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your password</label
                >
                <input
                  v-model="password"
                  @blur="v$.password.$touch"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div v-if="v$.password.$error" class="bg-red-300 rounded-lg px-2 py-1">
                Should be at least 6 characters in length.
              </div>
              <div v-if="!isLogin">
                <label
                  for="repeat"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Repeat password</label
                >
                <input
                  v-model="repeat"
                  @blur="v$.repeat.$touch"
                  type="password"
                  name="repeat"
                  id="repeat"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div
                v-if="!props.isLogin && v$.repeat.$error"
                class="bg-red-300 rounded-lg px-2 py-1"
              >
                Should be the same as Password and at least 6 characters in length.
              </div>
              <button
                @click.prevent="registerOrsignIn"
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                :class="{ disabled: isDisabled }"
                :disabled="isDisabled"
              >
                {{ title }} to your account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { authStore } from "@/stores/auth";
import { postsStore } from "@/stores/posts";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

const store = authStore();
const posts_Store = postsStore();
let userName: Ref<string> = ref("");
let userEmail: Ref<string> = ref("");
let password: Ref<string> = ref("");
let repeat: Ref<string> = ref("");

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true,
  },
});
const title: string = props.isLogin ? "Login" : "Sign up";
const dataModal: string = props.isLogin ? "login" : "signup";

let loginRules = {
  userEmail: { required, email },
  password: { required, minLength: minLength(6) },
};

let registrationRules = {
  userName: { required, minLength: minLength(3) },
  userEmail: { required, email },
  password: { required, minLength: minLength(6) },
  repeat: { required, sameAsPassword: sameAs(password) },
};
let rules = {};
let fields = {};
if (props.isLogin) {
  rules = loginRules;
  fields = { userEmail, password };
} else {
  rules = registrationRules;
  fields = { userEmail, password, userName, repeat };
}
const v$ = useVuelidate(rules, fields);
console.log("v$", v$);

const registerOrsignIn = () => {
  props.isLogin ? signin() : register();
};
const register = async () => {
  await store.registerUser(userEmail.value, password.value, userName.value).then(() => {
    userEmail.value = "";
    password.value = "";
    userName.value = "";
    repeat.value = "";
  });
};
const signin = async () => {
  await store.signInUser(userEmail.value, password.value).then(() => {
    userEmail.value = "";
    password.value = "";
  });
};

let isDisabled = computed(() => v$.value.$invalid);
</script>
<style>
#modal .disabled {
  @apply bg-gray-500;
}
</style>
