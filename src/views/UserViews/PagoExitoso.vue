<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
      <div class="text-green-500 text-6xl mb-4">✅</div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h1>
      <p class="text-gray-500 mb-6">Tu reserva ha sido confirmada correctamente.</p>
      <p class="text-sm text-gray-400 mb-6">Reserva #{{ reservaId }}</p>
      <button 
        @click="router.push('/')"
        class="px-6 py-2 bg-[#2a9db0] text-white rounded-lg hover:bg-[#1a8a9e] transition">
        Volver al inicio
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const reservaId = computed(() => route.query.reserva)
</script>