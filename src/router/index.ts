import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import { store } from '@/store/store';

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
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/models",
    name: "Models",
    component: () => import(/* webpackChunkName: "models" */ "../views/Models.vue"),
      meta: {requiresAuth: true}
  },
  {
    path: "/modelscreate",
    name: "ModelsCreate",
    component: () => import(/* webpackChunkName: "modelscreate" */ "../views/ModelsCreate.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/modelsedit",
    name: "ModelsEdit",
    component: () => import(/* webpackChunkName: "modelsedit" */ "../views/ModelsEdit.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/locations",
    name: "Locations",
    component: () => import(/* webpackChunkName: "locations" */ "../views/Locations.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/locationscreate",
    name: "LocationsCreate",
    component: () => import(/* webpackChunkName: "locationscreate" */ "../views/LocationsCreate.vue"),
    meta: {requiresAuth: true}
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
    component: () => import(/* webpackChunkName: "documents" */ "../views/Documents.vue"),
    meta: {requiresAuth: true}
  },

  {
    path: "/documentscreate",
    name: "DocumentsCreate",
    component: () => import(/* webpackChunkName: "documentscreate" */ "../views/DocumentsCreate.vue"),
    meta: {requiresAuth: true}
  },

  {
    path: "/documentsedit",
    name: "DocumentsEdit",
    component: () => import(/* webpackChunkName: "documentsedit" */ "../views/DocumentsEdit.vue"),
    meta: {requiresAuth: true}
  },

  {
    path: "/documentsitemcreate",
    name: "DocumentsItemCreate",
    component: () => import(/* webpackChunkName: "documentsitemcreate" */ "../views/DocumentsItemCreate.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/documentsitemedit",
    name: "DocumentsItemEdit",
    component: () => import(/* webpackChunkName: "documentsitemcreate" */ "../views/DocumentsItemEdit.vue"),
    meta: {requiresAuth: true}
  
  },
  {
    path: "/assets",
    name: "Asset",
    component: () => import(/* webpackChunkName: "assets" */ "../views/Asset.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/assetsedit",
    name: "AssetsEdit",
    component: () => import(/* webpackChunkName: "documentsedit" */ "../views/AssetEdit.vue"),
    meta: {requiresAuth: true}
  },

  {
    path: "/assetscreate",
    name: "AssetsCreate",
    component: () => import(/* webpackChunkName: "documentsitemcreate" */ "../views/AssetCreate.vue"),
    meta: {requiresAuth: true}
  },
  
  {
    path: "/dijagram",
    name: "DijagramPrikaz",
    component: () => import(/* webpackChunkName: "dijagramprikaz" */ "../views/DijagramPrikaz.vue"),
    meta: {requiresAuth: true}
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
 if(to.matched.some(record =>to.meta.requiresAuth)){

    if(sessionStorage.getItem('logged'))
    next()

    else next({name: "Login"}) 

 }
else next()
})
 export default router;

Vue.use(VueRouter);