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
import Warcaby from '@/components/games/gra-warcaby.vue';
import Statki from '@/components/games/gra-statki.vue';
import Polacz4 from '@/components/games/connectFour.vue';
import Store from '@/state/index';
import ActivateUserPage from '@/pages/ActivateUserPage';
import UserHomePage from '@/pages/UserHomePage';
import GameDescription from '@/pages/GameDescription';
import PlayPage from '@/pages/PlayPage'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing-page', component: TheMainPage, meta: {requiresGuest: true} },
    { path: '/signup', name: 'signup', component: RegisterUserPage, meta: {requiresGuest: true} },
    { path: '/login', name:'login', component: LoginPage, meta: {requiresGuest: true} },
    { path: '/dashboard', name:'dashboard', component: TheDashboard, meta: {requiresAuth: true} },
    { path: '/activateuser/:id', name:'activateuser', component: ActivateUserPage, meta: {requiresGuest: true}, props: true },
    { path: '/resetpassword', name:'resetpassword', component: ResetPasswordPage, meta: {requiresGuest: true} },
    { path: '/resetpassword/:token', component: ResetPasswordPage, meta: {requiresGuest: true}, props: true },
    { path: '/games', name:'games', component: Games },
    { path: '/games/:gameid', component: GameDescription, meta: {requiresAuth: true}, props: true },
    { path: '/play/:gameRoomID', name: 'play', component: PlayPage, meta: {requiresAuth: true}, props: true},
    { path: '/friends', name:'friends', component: Friends},
    { path: '/rank', name:'rank', component: Rank },
    { path: '/history', name:'history', component: History },
    { path: '/settings', name:'settings', component: Settings },
    { path: '/warcaby', name:'warcaby', component: Warcaby },
    { path: '/statki', name:'statki', component: Statki },
    { path: '/polacz4', name:'polacz4', component: Polacz4 },
    { path: '/uhp/:id/:isFriend/:invId', name:'uhp', component: UserHomePage, props:true },
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
      next('/games');
    }
  }
  else {
    next();
  }
})

export default router;
