import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddBookView from "../views/AddBookView.vue";
import DetailBookView from "../views/DetailBookView.vue";
import Editbook from "@/components/editbook.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add-book",
      name: "add-book",
      component: AddBookView,
    },
    {
      path: "/detail/:id",
      name: "book detail",
      component: DetailBookView,
    },
    {
      path: "/detail/:id/edit",
      name: "edit book",
      component: Editbook,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      redirect(_) {
        return { path: "/" };
      },
    },
  ],
});

export default router;
