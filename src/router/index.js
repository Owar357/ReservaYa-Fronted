import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AdminEstadisticas from '@/views/AdminEstadisticas.vue'
import AdmiCrudHoteles from '@/views/AdmiCrudHoteles.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/AdminEstadisticas',
      name: 'AdminEstadisticas',
      component: AdminEstadisticas
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
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
      },
       {
      path: '/admi',
      name: 'Admi',
      component: AdmiCrudHoteles,
    },
  
  ]
});

export default router


 