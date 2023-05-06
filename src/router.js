import { createRouter, createWebHistory } from 'vue-router'
import TheMainPage from './sites/TheMainPage'
import TheDashboard from '@/sites/TheDashboard'
import PageNotFound from './sites/PageNotFound'
import RegisterUserPage from './sites/RegisterUserPage'
import LogInPage from './sites/LogInPage.vue'
import EnterEmail from './sites/EnterEmail.vue'
import ChangePassword from './sites/ChangePassword.vue';
import RequestPassword from './sites/RequestPassword.vue'
import BadLink from './sites/BadLink.vue'
import ActiveAccount from './sites/ActiveAccount'
import Warcaby from './Games/gra-warcaby.vue';
import Statki from './Games/gra-statki.vue';
import Polacz4 from './Games/gra-polacz4.vue';
import Store from '@/state/index'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'main-page', component: TheMainPage, meta: {requiresGuest: true} },
    { path: '/signup', name: 'signup', component: RegisterUserPage, meta: {requiresGuest: true} },
    { path: '/login', name:'login', component: LogInPage, meta: {requiresGuest: true} },
    { path: '/dashboard', name:'dashboard', component: TheDashboard, meta: {requiresAuth: true} },
    { path: '/enteremail', component: EnterEmail }, //co to za endpoint? do resteowania hasła
    { path: '/changepassword', component: ChangePassword }, //do sprawdzenia
    { path: '/request', component: RequestPassword }, //to jest do wypierdolenia, bo to jest email 
    { path: '/bcount', component: ActiveAccount }, //to i to wyżej powinno być jedna strona z jednym komponentem, który zmienia swój wygląd w zalezności od statusu
    { path: '/warcaby', component: Warcaby },
    { path: '/statki', component: Statki },
    { path: '/polaadlink', component: BadLink },
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
