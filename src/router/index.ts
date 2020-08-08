import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import { store } from '@/store/store';

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
    path: "/modelscreate",
    name: "ModelsCreate",
    component: () => import(/* webpackChunkName: "modelscreate" */ "../views/ModelsCreate.vue")
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
  },
  {
    path: "/locationscreate",
    name: "LocationsCreate",
    component: () => import(/* webpackChunkName: "locationscreate" */ "../views/LocationsCreate.vue")
  },
  {
    path: "/locationsedit",
    name: "LocationsEdit",
    component: () => import(/* webpackChunkName: "locationsedit" */ "../views/LocationsEdit.vue"),
    meta: {requiresAuth: true}
    
  },
  {
    path: "/documents/:name",
    name: "Documents",
    component: () => import(/* webpackChunkName: "documents" */ "../views/Documents.vue")
  },

  {
    path: "/documentscreate",
    name: "DocumentsCreate",
    component: () => import(/* webpackChunkName: "documentscreate" */ "../views/DocumentsCreate.vue")
  },

  {
    path: "/documentsedit",
    name: "DocumentsEdit",
    component: () => import(/* webpackChunkName: "documentsedit" */ "../views/DocumentsEdit.vue")
  },

  {
    path: "/documentsitemcreate",
    name: "DocumentsItemCreate",
    component: () => import(/* webpackChunkName: "documentsitemcreate" */ "../views/DocumentsItemCreate.vue")
  }
  
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record =>to.meta.requiresAuth)){

    if(store.getters.status == 200)
    next()

    else next({name: "Login"})
  }
 else next()
})
export default router;
