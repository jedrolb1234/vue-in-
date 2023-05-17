import { createRouter, createWebHistory } from 'vue-router';
import TheMainPage from '@/pages/TheMainPage';
import TheDashboard from '@/pages/TheDashboard';
import PageNotFound from '@/pages/PageNotFound.vue';
import RegisterUserPage from '@/pages/RegisterUserPage';
import LoginPage from '@/pages/LogInPage.vue';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import Games from '@/pages/GamesPage.vue';
import Friends from '@/pages/FriendsPage.vue';
import Rank from '@/pages/RankPage.vue';
import History from '@/pages/HistoryPage.vue';
import Settings from '@/pages/SettingsPage.vue';
import WarcabyDesc from '@/pages/gra-warcaby-description.vue';
import StatkiDesc from '@/pages/gra-statki-description.vue';
import Polacz4Desc from '@/pages/gra-polacz4-description.vue';
import Warcaby from '@/Games/gra-warcaby.vue';
import Statki from '@/Games/gra-statki.vue';
import Polacz4 from '@/Games/gra-polacz4.vue';
import Store from '@/state/index'
import ActivateUserPage from '@/pages/ActivateUserPage'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing-page', component: TheMainPage, meta: {requiresGuest: true} },
    { path: '/signup', name: 'signup', component: RegisterUserPage, meta: {requiresGuest: true} },
    { path: '/login', name:'login', component: LoginPage, meta: {requiresGuest: true} },
    { path: '/dashboard', name:'dashboard', component: TheDashboard, meta: {requiresAuth: true} },
    { path: '/activateuser/:id', name:'activateuser', component: ActivateUserPage, meta: {requiresGuest: true}, props: true },
    { path: '/resetpassword', name:'resetpassword', component: ResetPasswordPage, meta: {requiresGuest: true} },
    { path: '/resetpassword/:id', component: ResetPasswordPage, meta: {requiresGuest: true}, props: true },
    { path: '/games', name:'games', component: Games, meta: {requiresAuth: true} },
    { path: '/friends', name:'friends', component: Friends, meta: {requiresAuth: true} },
    { path: '/rank', name:'rank', component: Rank, meta: {requiresAuth: true} },
    { path: '/history', name:'history', component: History, meta: {requiresAuth: true} },
    { path: '/settings', name:'settings', component: Settings, meta: {requiresAuth: true} },
    { path: '/warcabydesc', name:'warcabydescription', component: WarcabyDesc, meta: {requiresAuth: true} },
    { path: '/statkidesc', name:'statkidescription', component: StatkiDesc, meta: {requiresAuth: true} },
    { path: '/polacz4desc', name:'polacz4description', component: Polacz4Desc, meta: {requiresAuth: true} },
    { path: '/warcaby', name:'warcaby', component: Warcaby, meta: {requiresAuth: true} },
    { path: '/statki', name:'statki', component: Statki, meta: {requiresAuth: true} },
    { path: '/polacz4', name:'polacz4', component: Polacz4, meta: {requiresAuth: true} },
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
