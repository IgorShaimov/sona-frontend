function page(path) {
  return () =>
    import(/* webpackChunkName: '' */ `../pages/${path}`).then(
      m => m.default || m
    )
}

export default [
  {
    path: '/',
    name: 'basic',
    component: page('loading.vue'),
    meta: { layout: 'basic' }
  },

  {
    path: '/loading',
    name: 'loading',
    component: page('loading.vue'),
    meta: { layout: 'basic' }
  },

  {
    path: '/login',
    name: 'login',
    component: page('auth/login.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/register',
    name: 'register',
    component: page('auth/register.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/gotoAuth',
    name: 'gotoAuth',
    component: page('auth/gotoAuth.vue'),
    meta: { layout: 'basic' }
  },

  { path: '/terms', name: 'terms', component: page('legal/terms.vue') },
  {
    path: '/notifications',
    name: 'notifications',
    component: page('legal/notifications.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: page('legal/privacy.vue'),
    meta: { layout: 'basic' }
  },

  {
    path: '/password/reset',
    name: 'password.request',
    component: page('auth/password/email.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/password/reset/:token',
    name: 'password.reset',
    component: page('auth/password/reset.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/email/verify/:id',
    name: 'verification.verify',
    component: page('auth/verification/verify.vue')
  },
  {
    path: '/email/resend',
    name: 'verification.resend',
    component: page('auth/verification/resend.vue')
  },

  {
    path: '/alarm',
    name: 'alarm',
    component: page('alarm/index.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/alarm/tiredness',
    name: 'alarm.tiredness',
    component: page('alarm/tiredness.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/alarm/note',
    name: 'alarm.note',
    component: page('alarm/note.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/alarm/stop',
    name: 'alarm.stop',
    component: page('alarm/alarm.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/alarm/fall-asleep',
    name: 'alarm.asleep',
    component: page('alarm/fallAsleep.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/alarm/sleepness',
    name: 'alarm.sleepness',
    component: page('alarm/sleepness.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/alarm/mood',
    name: 'alarm.mood',
    component: page('alarm/mood.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/alarm/daily',
    name: 'alarm.daily',
    component: page('alarm/daily.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/sleep',
    name: 'labs.sleep',
    component: page('labs/sleep.vue'),
    meta: { layout: 'basic' }
  },

  { path: '/dashboard', name: 'dashboard.home', component: page('home.vue') },
  {
    path: '/dashboard/components',
    name: 'dashboard.components',
    component: page('components.vue')
  },

  {
    path: '/settings',
    component: page('settings/index.vue'),
    children: [
      { path: '', redirect: { name: 'settings.profile' } },
      {
        path: 'profile',
        name: 'settings.profile',
        component: page('settings/profile.vue')
      },
      {
        path: 'password',
        name: 'settings.password',
        component: page('settings/password.vue')
      }
    ]
  },

  { path: '*', component: page('errors/404.vue') }
]
