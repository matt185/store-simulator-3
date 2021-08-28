import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store/index";
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/Account.vue"),
  },
  {
    path: "/manager-view/:id?",
    name: "ManagerView",
    component: () => import("../views/ManagerView.vue"),
    // props(route) {
    //   const props = {
    //     id: route.params.id,
    //   };
    //   return props;
    // },
  },
  {
    path: "/register",
    name: "Register",

    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/change-password/:token?",
    name: "change-password",
    component: () => import("../views/ChangePassword.vue"),
    props(route) {
      console.log(route);
      const props = {
        token: route.params.token,
      };
      return props;
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot-password",
    component: () => import("../views/ForgotPassword.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
