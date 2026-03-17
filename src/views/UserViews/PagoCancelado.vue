<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
      <div class="text-red-500 text-6xl mb-4">❌</div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Pago Cancelado</h1>
      <p class="text-gray-500 mb-6">No se procesó ningún cobro. Puedes intentarlo de nuevo.</p>
      <button 
        @click="router.go(-1)"
        class="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition">
        Volver
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>