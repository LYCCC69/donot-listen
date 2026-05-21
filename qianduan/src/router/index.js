import { createRouter, createWebHistory } from 'vue-router'

const LEGACY_REDIRECTS = {
  '/index.html': '/home',
  '/player.html': '/player',
  '/favorites.html': '/favorites',
  '/settings.html': '/settings'
}

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/player',
    name: 'Player',
    component: () => import('../pages/PlayerPage.vue')
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('../pages/OnboardingPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../pages/FavoritesPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/learning-records',
    name: 'LearningRecords',
    component: () => import('../pages/LearningRecordsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/review',
    name: 'Review',
    component: () => import('../pages/ReviewPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/SettingsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/changelog',
    name: 'Changelog',
    component: () => import('../pages/ChangelogPage.vue')
  },
  {
    path: '/reset-password-request',
    name: 'ResetPasswordRequest',
    component: () => import('../pages/ResetPasswordRequestPage.vue')
  },
  {
    path: '/reset-password-confirm',
    name: 'ResetPasswordConfirm',
    component: () => import('../pages/ResetPasswordConfirmPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const legacy = LEGACY_REDIRECTS[to.path]
  if (legacy) {
    return next(legacy)
  }

  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const isAuthenticated = !!(token && user)

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/home')
  }

  next()
})

export default router
