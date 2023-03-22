import { createRouter, createWebHashHistory } from 'vue-router'
import TheMainPage from './sites/TheMainPage'
import PageNotFound from './sites/PageNotFound'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: TheMainPage },
    { path: '/:any(.*)', component: PageNotFound }
  ]
})