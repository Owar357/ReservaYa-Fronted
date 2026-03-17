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
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/AdminEstadisticas",
      name: "AdminEstadisticas",
      component: AdminEstadisticas,
    },

    {
      path: "/register",
      name: "register",
      component: Register,
    },

 

    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },

    {
      path: "/habitacionesHotel/:id",
      name: "habitaciones",
      component: UsuarioHabitacionHotel,
    },

    {
      path: "/pago-exitoso",
      name: "pago-exitoso",
      component: () => import("@/views/UserViews/PagoExitoso.vue"),
    },
    {
      path: "/pago-cancelado",
      name: "pago-cancelado",
      component: () => import("@/views/UserViews/PagoCancelado.vue"),
    },

    {
      path: "/mis-reservas",
      name: "reserva",
      component: () => import("../views/UserViews/MisReservas.vue"),
    },

    //HomeAdmin
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminViews/HomeAdmin.vue"),
      children: [
        {
          path: "usuarios",
          name: "usuarios",
          component: () => import("../views/AdminViews/Usuarios/ListaUsuarios.vue"),
        },
          {
          path: "hoteles",
          name: "hoteles",
          component: () => import("../views/AdminViews/Hoteles/AdmiCrudHoteles.vue"),
        },
        {
          path: "habitaciones",
          name: "habitaciones",
          component: () => import("../views/AdminViews/Habitaciones/ListaHabitaciones.vue")
        },
        // agregar las demás rutas hijas  aquí igual
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login'
  }
})

export default router
