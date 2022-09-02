import { createRouter, createWebHashHistory } from 'vue-router'
import MeetingsList from '@/views/MeetingsListView.vue'
import Meeting from '@/views/MeetingView.vue'
import About from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'meetings',
    component: MeetingsList,
  },
  {
    path: '/meeting',
    name: 'meeting',
    component: Meeting,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
