import { createRouter, createWebHistory } from 'vue-router';
import TheMainPage from './sites/TheMainPage';
import TheDashboard from '@/sites/TheDashboard';
import PageNotFound from './sites/PageNotFound.vue';
import RegisterUserPage from './sites/RegisterUserPage';
import LoginPage from './sites/LogInPage.vue';
import ResetPasswordPage from '@/sites/ResetPasswordPage';
import Games from './sites/GamesPage.vue';
import Friends from './sites/FriendsPage.vue';
import Rank from './sites/RankPage.vue';
import History from './sites/HistoryPage.vue';
import Settings from './sites/SettingsPage.vue';
import WarcabyDesc from './sites/gra-warcaby-description.vue';
import StatkiDesc from './sites/gra-statki-description.vue';
import Polacz4Desc from './sites/gra-polacz4-description.vue';
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
    { path: '/resetpassword/:id', component: ResetPasswordPage, meta: {requiresGuest: true}, props: true }, //do sprawdzenia
    { path: '/games', name:'games', component: Games },
    { path: '/friends', name:'friends', component: Friends },
    { path: '/rank', name:'rank', component: Rank },
    { path: '/history', name:'history', component: History },
    { path: '/settings', name:'settings', component: Settings },
    { path: '/warcabydesc', name:'warcabydescription', component: WarcabyDesc },
    { path: '/statkidesc', name:'statkidescription', component: StatkiDesc },
    { path: '/polacz4desc', name:'polacz4description', component: Polacz4Desc },
    { path: '/warcaby', name:'warcaby', component: Warcaby },
    { path: '/statki', name:'statki', component: Statki },
    { path: '/polacz4', name:'polacz4', component: Polacz4 },
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
