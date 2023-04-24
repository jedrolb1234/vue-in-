import { createRouter, createWebHistory } from 'vue-router'
import TheMainPage from './sites/TheMainPage'
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


export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'main-page', component: TheMainPage },
    { path: '/signup', name: 'signup', component: RegisterUserPage },
    { path: '/login', name:'login', component: LogInPage },
    { path: '/:any(.*)', name: 'page-not-found', component: PageNotFound },
    { path: '/', redirect: '/polacz4' },
    { path: '/enteremail', component: EnterEmail },
    { path: '/changepassword', component: ChangePassword },
    { path: '/request', component: RequestPassword },
    { path: '/badlink', component: BadLink },
    { path: '/activeAccount', component: ActiveAccount },
    { path: '/warcaby', component: Warcaby },
    { path: '/statki', component: Statki },
    { path: '/polacz4', component: Polacz4 }
  ]
})/* background */
