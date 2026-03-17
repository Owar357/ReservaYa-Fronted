import AdminEstadisticas from '@/views/AdminEstadisticas.vue';
import Login from '@/views/AuthViews/Login.vue';
import Register from '@/views/AuthViews/Register.vue';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router'
import ListaUsuarios from '../views/VistaAdmin/ListaUsuarios.vue';
import AgregarUsuario from '@/views/VistaAdmin/AgregarUsuario.vue';
import EditarUsuario from '@/views/VistaAdmin/EditarUsuario.vue';
import { useAuthStore } from '@/stores/authStore';



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

    { path: '/admin/crudusuarios', name: 'crudUsuarios', component: ListaUsuarios, meta: { requiresAuth: true } },
     {
      path: '/Agregar',
      name: 'Agregarusuario',
      component: AgregarUsuario,
    },

    {
      path: '/Editar',
      name: 'EditarUsuario',
      component: EditarUsuario,
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
      path: '/reserva',
      name: 'reserva',
      component: () => import('../views/VistaReservaU.vue'),

    },
    {
      path: '/agregar',
      name: 'agregar',
      component: () => import('../views/VistaAdmin/AgregarUsuario.vue'),
    },
      {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/VistaAdmin/ListaUsuarios.vue'),
    }

  ]
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login'
  }
})

export default router


