import { createRouter, createWebHistory } from "vue-router";
import UserTimeline from "@/components/UserTimeline.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "timeline",
      component: UserTimeline,
    },
    {
      path: "/profile/:username",
      name: "UserProfile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/UserProfile.vue"),
    },
  ],
});

export default router;
