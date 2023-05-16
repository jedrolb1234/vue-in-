import { createRouter, createWebHistory } from 'vue-router'
import TheMainPage from './sites/TheMainPage'
import TheDashboard from '@/sites/TheDashboard'
import PageNotFound from './sites/PageNotFound'
import RegisterUserPage from './sites/RegisterUserPage'
import LoginPage from './sites/LoginPage.vue'
import ResetPasswordPage from '@/sites/ResetPasswordPage'
import Warcaby from './Games/gra-warcaby.vue';
import Statki from './Games/gra-statki.vue';
import Polacz4 from './Games/gra-polacz4.vue';
import Store from '@/state/index'
import ActivateUserPage from '@/sites/ActivateUserPage'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'main-page', component: TheMainPage, meta: {requiresGuest: true} },
    { path: '/signup', name: 'signup', component: RegisterUserPage, meta: {requiresGuest: true} },
    { path: '/login', name:'login', component: LoginPage, meta: {requiresGuest: true} },
    { path: '/dashboard', name:'dashboard', component: TheDashboard, meta: {requiresAuth: true} },
    { path: '/activateuser/:id', name:'activateuser', component: ActivateUserPage, meta: {requiresGuest: true}, props: true },
    { path: '/resetpassword', name:'resetpassword', component: ResetPasswordPage, meta: {requiresGuest: true} },
    { path: '/resetpassword/:id', component: ResetPasswordPage, meta: {requiresGuest: true}, props: true },
    { path: '/warcaby', component: Warcaby },
    { path: '/statki', component: Statki },
    { path: '/activeAccz4', component: Polacz4 },
    { path: '/:any(.*)', name: 'page-not-found', component: PageNotFound }
  ]
})

//check if page requires logged in user
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(Store.getters.isAuthenticated) {
      next();
      return;
    }
    else {
      next('/login');
    }
  }
  else {
    next();
  }
})

//check if page requires user to be guest
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresGuest)) {
    if(Store.getters.isAuthenticated===false) {
      next();
      return;
    }
    else {
      next('/dashboard');
    }
  }
  else {
    next();
  }
})

export default router;
