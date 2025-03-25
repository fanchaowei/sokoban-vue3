import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import PlayGame from '@/views/playGame.vue'
import EditGame from '@/views/editGame.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/game',
  },
  {
    path: '/game',
    component: PlayGame,
  },
  {
    path: '/edit',
    component: EditGame,
  },
]

export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  app.use(router)
}
