import AdminEstadisticas from "@/views/AdminEstadisticas.vue";
import Login from "@/views/AuthViews/Login.vue";
import Register from "@/views/AuthViews/Register.vue";
import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
import ListaUsuarios from "../views/ListaUsuarios.vue";
import UsuarioHabitacionHotel from "@/views/UsuarioHabitacionHotel.vue";


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
      path: "/crudUsuarios",
      name: "crudUsuarios",
      component: ListaUsuarios,
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
      component: UsuarioHabitacionHotel
    },

    {
      path: "/reserva",
      name: "reserva",
      component: () => import("../views/VistaReservaU.vue"),
    },
    {
      path: "/agregar",
      name: "agregar",
      component: () => import("../views/AgregarUsuario.vue"),
    },
    {
      path: "/usuarios",
      name: "usuarios",
      component: () => import("../views/ListaUsuarios.vue"),
    },
  ],
});

export default router;
