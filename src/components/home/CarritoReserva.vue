<template>
  <div class="bg-white rounded-xl shadow-md p-5 w-72 flex-shrink-0">
    
    <h3 class="font-bold text-lg mb-4 text-gray-800">🛒 Tu Reserva</h3>

    <!-- Fechas -->
    <div class="flex flex-col gap-3 mb-4">
      <div>
        <label class="text-xs font-medium text-gray-600">Entrada</label>
        <input 
          v-model="reservaStore.fechaEntrada"
          type="date"
          :min="hoy"
          class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
        />
      </div>
      <div>
        <label class="text-xs font-medium text-gray-600">Salida</label>
        <input 
          v-model="reservaStore.fechaSalida"
          type="date"
          :min="reservaStore.fechaEntrada || hoy"
          class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
        />
      </div>
    </div>

    <!-- Noches -->
    <div v-if="reservaStore.noches > 0" class="text-sm text-gray-500 mb-3">
      Noches: <strong class="text-gray-800">{{ reservaStore.noches }}</strong>
    </div>

    <!-- Habitaciones -->
    <div v-if="reservaStore.carrito.length > 0" class="flex flex-col gap-2 mb-4">
      <div 
        v-for="hab in reservaStore.carrito" 
        :key="hab.id"
        class="flex justify-between text-sm border-b pb-2">
        <span class="text-gray-700">{{ hab.nombre }}</span>
        <span class="font-semibold">
          ${{ (parseFloat(hab.precio) * reservaStore.noches).toFixed(2) }}
        </span>
      </div>
    </div>

    <p v-else class="text-sm text-gray-400 mb-4">No hay habitaciones agregadas</p>

    <!-- Total -->
    <div class="flex justify-between font-bold text-gray-800 border-t pt-3 mb-4">
      <span>Total</span>
      <span>${{ reservaStore.total.toFixed(2) }}</span>
    </div>

    <!-- Botón confirmar -->
    <button 
      @click="confirmar"
      :disabled="!puedeConfirmar || reservaStore.loading"
      class="w-full py-2 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg transition disabled:opacity-50">
      {{ reservaStore.loading ? 'Procesando...' : 'Confirmar Reserva' }}
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useReservaStore } from '@/stores/reservaStore'
import Swal from 'sweetalert2'

const reservaStore = useReservaStore()

const hoy = new Date().toISOString().split('T')[0]

const puedeConfirmar = computed(() => {
  return reservaStore.fechaEntrada &&
         reservaStore.fechaSalida &&
         reservaStore.noches > 0 &&
         reservaStore.carrito.length > 0
})

const confirmar = async () => {
  try {
    await reservaStore.confirmarReserva()

     Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Reserva confirmada!',
      showConfirmButton: false,
      timer: 3000
    })

    reservaStore.carrito = []
    reservaStore.fechaEntrada = null
    reservaStore.fechaSalida = null


  } catch (error) {
     Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Error al confirmar reserva',
      showConfirmButton: false,
      timer: 3000
    })
  }
}
</script>