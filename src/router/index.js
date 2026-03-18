import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Login from '@/views/AuthViews/Login.vue';
import AdminEstadisticas from '@/views/AdminEstadisticas.vue';
import Register from '@/views/AuthViews/Register.vue';
import HomeView from '@/views/HomeView.vue';
import UsuarioHabitacionHotel from '@/views/UserViews/UsuarioHabitacionHotel.vue';



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
      name: "reservas",
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
       path: "reserva",        
        name: "reservados-admi",
        component: () => import("../views/AdminViews/Reserva/AdmiReservaUsuario.vue"),
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
