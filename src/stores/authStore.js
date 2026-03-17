import { defineStore } from "pinia"; //* función de Pinia que registra y crea el store
import router from "@/router";
import authService from "@/services/authService";

//El store guarda datos y lógica que cualquier componente puede usar.
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null, //* ← el JWT que devuelve Laravel al hacer login
    user: null, //* ← los datos del usuario (name, email, roles...)
    hotelId: null,
  }),

  persist: true, //* permite la persistencia automática de datos

  getters: {
    //* son los getters del AuthStore

    //*  los !! convierte el token en un estado bool
    isAuthenticated: (state) => !!state.token, //* una propiedad calculada. Y state es el parámetro  que pasa datos al store

    isUsuario: (state) => {
      return state.user?.roles?.some((role) => role === "USUARIO"); //* busca en el array de roles para ver si existe uno igual al puesto aca y devuelve true o false segun el caso
    },

    isUsuarioAdmin: (state) => {
      return state.user?.roles?.some((role) => role === "USUARIOADMIN");
    },

    isPropietario: (state) => {
      return state.user?.roles?.some((role) => role === "PROPIETARIO");
    },

    isGerente: (state) => {
      return state.user?.roles?.some((role) => role === "GERENTE");
    },
    isRecepcionista: (state) => {
      return state.user?.roles?.some((role) => role === "RECEPCIONISTA");
    },
  },

  actions: {
    async login(credenciales) {
      try {
        const { data } = await authService.login(credenciales);

        this.token = data.access_token;
        this.user = data.user;
        this.hotelId = data.hotel_id;

        // Redirección según rol
        if (this.isUsuarioAdmin || this.isPropietario || this.isGerente || this.isRecepcionista) {
          router.push("/admin/crudusuarios");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error en login:", error);
        throw error
      }
    },

    async register(payload) {
      try {
        const { data } = await authService.register(payload);

        this.token = data.access_token;
        this.user = data.user;

        router.push("/");
      } catch (error) {
        console.error("Error en registro:", error);
        throw error;
      }
    },

    async logout() {
      try {
        if (this.token) {
          await authService.logout();
        }
      } catch (error) {
        console.warn("Error al cerrar sesión:", error);
      } finally {
        this.$reset();
        router.push("/");
      }
    },
  },
});
