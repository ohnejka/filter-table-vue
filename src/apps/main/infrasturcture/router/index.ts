import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: () => {
        return { path: "/table" };
      },
    },
    {
      path: "/table",
      name: "table",
      component: () => import("@/pages/Table/ui/index.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: () => {
        return { path: "/table" };
      },
    },
  ],
});

export default router;
