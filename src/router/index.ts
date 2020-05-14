import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/models",
    name: "Models",
    component: () => import(/* webpackChunkName: "models" */ "../views/Models.vue")
  },
  {
    path: "/modelsedit",
    name: "ModelsEdit",
    component: () => import(/* webpackChunkName: "modelsedit" */ "../views/ModelsEdit.vue")
  },
  {
    path: "/locations",
    name: "Locations",
    component: () => import(/* webpackChunkName: "locations" */ "../views/Locations.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
