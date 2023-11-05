import { createRouter, createWebHistory } from 'vue-router';
import TheMainPage from '@/pages/TheMainPage';
import PageNotFound from '@/pages/PageNotFound.vue';
import RegisterUserPage from '@/pages/RegisterUserPage';
import LoginPage from '@/pages/LogInPage.vue';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import Games from '@/pages/GamesPage.vue';
import Friends from '@/pages/FriendsPage.vue';
import Rank from '@/pages/RankPage.vue';
import Settings from '@/pages/SettingsPage.vue';
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
    { path: '/activateuser/:id', name:'activateuser', component: ActivateUserPage, meta: {requiresGuest: true}, props: true },
    { path: '/resetpassword', name:'resetpassword', component: ResetPasswordPage, meta: {requiresGuest: true} },
    { path: '/resetpassword/:token', component: ResetPasswordPage, meta: {requiresGuest: true}, props: true },
    { path: '/games', name:'games', component: Games, meta: {requiresAuth: true}},
    { path: '/games/:gameid', component: GameDescription, meta: {requiresAuth: true}, props: true },
    { path: '/play/:gameRoomID', name: 'play', component: PlayPage, meta: {requiresAuth: true}, props: true},
    { path: '/friends', name:'friends', component: Friends, meta: {requiresAuth: true}},
    { path: '/rank', name:'rank', component: Rank, meta: {requiresAuth: true} },
    { path: '/settings', name:'settings', component: Settings, meta: {requiresAuth: true} },
    { path: '/uhp/:id', name:'uhp', component: UserHomePage, props:true, meta: {requiresAuth: true} },
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
