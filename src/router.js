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
})/* background */
