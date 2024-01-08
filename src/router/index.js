import { createRouter, createWebHistory } from "vue-router";
import RecordingView from "../views/RecordingView.vue";
import RequestedView from "../views/RequestedView.vue";

const routes = [
  {
    path: "/",
    name: "recording",
    component: RecordingView,
  },
  {
    path: "/requested",
    name: "requested",
    component: RequestedView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
