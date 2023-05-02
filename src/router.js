import { createRouter, createWebHistory } from 'vue-router'
import TheMainPage from './sites/TheMainPage'
import PageNotFound from './sites/PageNotFound'
import RegisterUserPage from './sites/RegisterUserPage'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'main-page', component: TheMainPage },
    { path: '/signup', name: 'signup', component: RegisterUserPage},
    { path: '/:any(.*)', name: 'page-not-found', component: PageNotFound }
  ]
})