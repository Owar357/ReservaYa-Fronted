<template>
  <div class="min-h-screen flex items-center justify-center bg-[#5bc8d8] px-4">
    <div class="flex rounded-2xl overflow-hidden shadow-2xl bg-white" style="width: 700px; max-width: 95vw; min-height: 460px;">

      <!-- IMAGEN (lado izquierdo) -->
      <div class="hidden md:block" style="width: 45%;">
        <img
          src="https://imgs.search.brave.com/dorzZFV7ZF93QFJ2wnMMpQgpZrOrofxw6j57IOE43ms/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9xLXh4/LmJzdGF0aWMuY29t/L3hkYXRhL2ltYWdl/cy9ob3RlbC9tYXg2/MDAvMzYyMDMyMTEw/LmpwZz9rPWRhOGM2/MTVlMTU3ZTJlOTRj/ZWU1ZDdiYWFlNTNh/ZDgzNDA3MzQ1OTY1/MGYxNjU2ZTViYTNk/MzlmMzJjMTVhMWEm/bz0mYT0xMzExMTE5"
          alt="Hotel"
          class="w-full h-full object-cover block"
        />
      </div>

      <!-- FORMULARIO (lado derecho) -->
      <div class="flex-1 flex flex-col justify-center px-10 py-12">

        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>

        <div class="flex flex-col gap-4">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Nombre"
              class="w-full px-4 py-3 bg-gray-200 border-none rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            /> 
            <span v-if="errors.name" class="text-red-500 text-xs mt-1">{{errors.name}}</span>

          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="E-mail"
              class="w-full px-4 py-3 bg-gray-200 border-none rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
              <span v-if="errors.email" class="text-red-500 text-xs mt-1">{{errors.email}}</span>
          </div>
        

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
               v-model="form.password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 bg-gray-200 border-none rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
              <span v-if="errors.password" class="text-red-500 text-xs mt-1">{{errors.password}}</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input
              v-model="form.password_confirmation "
              type="password"
              placeholder="Confirmar password"
              class="w-full px-4 py-3 bg-gray-200 border-none rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
              <span v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">{{errors.password_confirmation}}</span>
          </div>

          <button @click="sendRegister" :disabled="loading"  class="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-3 rounded-full transition duration-300 mt-2">
            Registrarse
          </button>

        </div>

        <p class="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?
          <router-link to="/" class="text-cyan-600 hover:underline font-medium">
            Inicia sesión
          </router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive } from "vue"; 
import { useRouter } from "vue-router"; 
import { useAuthStore } from "@/stores/authStore";

const router = useRouter(); 
const authStore = useAuthStore();

const loading = ref(false);
const errorMessage = ref(null);

const form = reactive({
  name:"",
  email:"",
  password:"",
  password_confirmation:""
});

const errors = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmation: null
})

const validaciones = () => {
 
  //limpia errores anteriores
  errors.name = null
  errors.email = null
  errors.password = null
  errors.password_confirmation = null

  let esValido = true

  if (!form.name) { 
    errors.name = "El nombre es requerido"
    esValido = false
  }
  if (!form.email) {
    errors.email = "El email es requerido"
    esValido= false
  }
  if (form.password.length < 8) {
    errors.password = "Mínimo 8 caracteres"
    esValido = false
  }
  if (form.password !== form.password_confirmation) {
    errors.password_confirmation = "Las contraseñas no coinciden"
    esValido = false
  }

  return esValido  
}




const sendRegister = async () =>{
 loading.value = true;

 const esValido = validaciones()

 if(!esValido){
   loading.value = false;
   return
 } 

 try {

  await authStore.register(form);
  
 } catch (error){

  errorMessage.value = "Error al registrarse"

 }
 finally{

  loading.value = false
 }
}

const goToLogin =() => {
  router.push("/login")
}

</script>
