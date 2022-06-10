import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/register',
    name:'register',
    component:()=>import('@/views/CreateAccount')
  },
  {
    path:'/configurator',
    name:'configurator',
    component:()=>import('@/views/ConfiguratorView')
  },
  {
    path:'/dashboard',
    name:'Dashboard',
    component:()=>import('@/views/Dashboard')
  },
  {
    path:'/cart',
    name:'Cart',
    component:()=>import('@/views/CartView'),
  },
  {
    path:'/valid-order',
    name:'Valid',
    component:()=>import('@/views/ValidOrder'),
  },
  {
    path:'/confirm-order',
    name:'OrderIsValid',
    component:()=>import('@/views/OrderIsValid'),
  },
  {
    path:'/legal-policy',
    name:'LegalPolicy',
    component:()=>import('@/views/LegalPolicy'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/products',
    name:'products',
    component:()=>import('@/views/ProductsListView')
  },
  {
    path:'/travels',
    name:'travels',
    component:()=>import('@/views/TravelsListView')
  },
  {
    path:'/product/:id',
    name:'product',
    component:()=>import('@/views/ProductView')
  },
  {
    path:'/travel/:id',
    name:'travel',
    component:()=>import('@/views/TravelView')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
},  
  routes
})

export default router
