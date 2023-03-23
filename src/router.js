import { createRouter, createWebHistory } from 'vue-router'
import TheMainPage from './sites/TheMainPage'
import PageNotFound from './sites/PageNotFound'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TheMainPage },
    { path: '/:any(.*)', component: PageNotFound }
  ]
})