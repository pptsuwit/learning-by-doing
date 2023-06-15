import { createRouter, createWebHistory } from "vue-router";
import NestedChild from "@/components/NestedChild.vue";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/authentication/login.vue";
import UserIndex from "@/views/users/index.vue";
import UserForm from "@/views/users/form.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/users",
      component: NestedChild,
      children: [
        { path: "", name: "user.index", component: UserIndex },
        { path: "add", name: "user.form", component: UserForm },
        { path: "edit", name: "user.form", component: UserForm },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/PageNotFound.vue"),
    },
  ],
});

export default router;
