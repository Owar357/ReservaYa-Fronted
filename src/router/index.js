import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
     {
         path: '/hoteles',
         name: 'hoteles',
        component: () => import('../views/Index.vue'),
    },

    {
        path: '/reserva',
         name: 'reserva',
        component: () => import('../views/VistaReservaU.vue'),

    },
      {
          path: '/agregar',
          name: 'agregar',
         component: () => import('../views/AgregarUsuario.vue'),
      }

  ]
});

export default router


