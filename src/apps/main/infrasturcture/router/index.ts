import { createRouter, createWebHistory } from "vue-router";
import TablePage from "@/pages/Table/ui/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "table",
      component: TablePage,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: () => {
        return { path: "/" };
      },
    },
  ],
});

export default router;
