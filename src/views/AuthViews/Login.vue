<template>
 <div class="min-h-screen w-full flex items-center justify-center bg-[#2a9db0] ">
    <div
      class="flex rounded-2xl overflow-hidden shadow-2xl bg-white"
      style="width: 700px; max-width: 95vw; min-height: 460px"
    >

      <div class="hidden md:block" style="width: 45%">
        <img
          src="https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hotel"
          class="w-full h-full object-cover block"
        />
      </div>


      <div class="flex-1 flex flex-col justify-center px-10 py-12">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>

        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="@email.com "
              class="w-full px-4 py-3 bg-gray-200 border-none rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="********"
              class="w-full px-4 py-3 bg-gray-200 border-none rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
          </div>


          <div v-if="errorMessage" class="text-red-500 text-sm text-center">
              {{errorMessage}}
          </div>

          <button
           @click="sendLogin" :disabled="loading" class="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-3 rounded-full transition duration-300 mt-2">
             {{ loading ? "Ingresando..." : "Iniciar sesión" }}
          </button>
        </div>

        <p class="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?
          <span
            @click="goToRegister"
            class="text-cyan-600 hover:underline font-medium cursor-pointer"
          >
            Regístrate
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive } from "vue"; // herramientas de Vue para variables reactivas
import { useRouter } from "vue-router"; // para navegar entre rutas
import { useAuthStore } from "@/stores/authStore";  // el store de autenticación


const router = useRouter();  // instancia del router para hacer push
const authStore = useAuthStore();  // instancia del store

const loading = ref(false);  // controla si el botón dice "Ingresando..."
const errorMessage = ref(null); // guarda el mensaje de error si falla

 const form = reactive ({
   email:"",
   password:""
 });


 const sendLogin = async () => {
  loading.value = true; // deshabilita el botón
  errorMessage.value = null; // limpia errores anteriores

  try{
     
    await authStore.login(form);  // envía email y password al store

  }
  catch(err){

    errorMessage.value =  err.response?.data?.message || "Error al iniciar Sesión"; // guarda el mensaje para mostrarlo

  }
  finally{

     loading.value = false; // reactiva el botón

  }

 } 

const goToRegister = () => {
  router.push("/register");
};
</script>
