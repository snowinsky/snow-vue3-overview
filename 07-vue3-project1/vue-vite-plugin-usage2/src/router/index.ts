/* 千万不要随便引入RouteOptions之类的对象*/
import {createRouter, createWebHashHistory} from 'vue-router'
import routes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
})

export default router
