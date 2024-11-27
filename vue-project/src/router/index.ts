import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddBookView from "../views/AddBookView.vue";
import DetailBookView from "../views/DetailBookView.vue";

const router = createRouter({
  history: createWebHistory("http://localhost:5173"),
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
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      redirect(_) {
        return { path: "/" };
      },
    },
  ],
});

export default router;
