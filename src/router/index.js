import { createRouter, createWebHashHistory } from 'vue-router'
import MeetingsList from '@/views/MeetingsListView.vue'
import Meeting from '@/views/MeetingView.vue'
import MeetingTimer from '@/views/MeetingTimerView.vue'
import Settings from '@/views/SettingsView.vue'
import About from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'meetings',
    component: MeetingsList,
  },
  {
    path: '/meeting/:id',
    name: 'meeting',
    component: Meeting,
  },
  {
    path: '/timer/:id',
    name: 'timer',
    component: MeetingTimer,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
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
