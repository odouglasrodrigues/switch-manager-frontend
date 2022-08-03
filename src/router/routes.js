
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/SwitchesList.vue'), meta: {
          requireAuth: true,
        },
      },
      {
        path: '/createswitch', component: () => import('pages/SwitchesCreate.vue'), meta: {
          requireAuth: true,
        },
      },
      {
        path: '/createuser', component: () => import('pages/UserCreate.vue'), meta: {
          requireAuth: true,
        },
      }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
