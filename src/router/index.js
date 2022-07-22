import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

function guest(to, from, next) {
  if (localStorage.activeUser) {
    next({ name: "Dashboard" });
  } else next();
}

function guard(to, from, next) {
  if (localStorage.activeUser) {
    next();
  } else next({ name: "Login" });
}

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: guest,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: guard,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: guest,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
