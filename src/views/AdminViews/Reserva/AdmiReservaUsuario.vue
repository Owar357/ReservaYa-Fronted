<template>
  <div class="p-6 min-h-screen bg-gray-50">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Lista de Reservas</h1>
    </div>

    <!-- Loading -->
    <div v-if="reservaStore.loading" class="flex justify-center items-center h-48">
      <i class="pi pi-spin pi-spinner text-4xl text-gray-400"></i>
    </div>

    <!-- Tabla -->
    <div v-else class="bg-white rounded-2xl shadow-md overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 text-gray-500 text-left">
          <tr>
            <th class="py-3 px-6">Usuario</th>
            <th class="py-3 px-6">Fecha Entrada</th>
            <th class="py-3 px-6">Fecha Salida</th>
            <th class="py-3 px-6">Estado</th>
            <th class="py-3 px-6 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!reservaStore.reservas?.length">
            <td colspan="5" class="text-center py-20 text-gray-400">
              <i class="pi pi-inbox text-5xl mb-4 block"></i>
              <p class="text-lg">No hay reservas</p>
            </td>
          </tr>
          <tr
            v-for="res in reservaStore.reservas"
            :key="res.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td class="py-4 px-6 font-medium text-gray-800">{{ res.user.name }}</td>
            <td class="py-4 px-6 text-gray-600">
              <i class="pi pi-calendar text-gray-400 text-xs mr-1"></i>{{ res.fecha_entrada }}
            </td>
            <td class="py-4 px-6 text-gray-600">
              <i class="pi pi-calendar text-gray-400 text-xs mr-1"></i>{{ res.fecha_salida }}
            </td>
            <td class="py-4 px-6">
              <span :class="{
                'bg-yellow-100 text-yellow-700': res.estado === 'EN_PROCESO',
                'bg-green-100 text-green-700': res.estado === 'FINALIZADA',
                'bg-red-100 text-red-700': res.estado === 'CANCELADA',
              }" class="text-xs font-bold px-2 py-1 rounded-full">
                {{ res.estado }}
              </span>
            </td>
            <td class="py-4 px-6">
              <div class="flex gap-2 justify-end">
                <!-- Ver detalles — siempre visible -->
                <button @click="verDetalles(res)"
                  class="w-9 h-9 rounded-lg border border-blue-300 text-blue-500 hover:bg-blue-50 flex items-center justify-center"
                  title="Ver detalles">
                  <i class="pi pi-eye"></i>
                </button>

                <!-- Finalizar — solo si está EN_PROCESO -->
                <button
                  v-if="res.estado === 'EN_PROCESO'"
                  @click="confirmarReserva(res)"
                  class="w-9 h-9 rounded-lg border border-green-300 text-green-600 hover:bg-green-50 flex items-center justify-center"
                  title="Finalizar">
                  <i class="pi pi-check"></i>
                </button>
                <button
                  v-else
                  disabled
                  class="w-9 h-9 rounded-lg border border-gray-200 text-gray-300 flex items-center justify-center cursor-not-allowed"
                  title="No disponible">
                  <i class="pi pi-check"></i>
                </button>

                <!-- Cancelar — solo si está EN_PROCESO -->
                <button
                  v-if="res.estado === 'EN_PROCESO'"
                  @click="confirmarEliminar(res)"
                  class="w-9 h-9 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 flex items-center justify-center"
                  title="Cancelar">
                  <i class="pi pi-trash"></i>
                </button>
                <button
                  v-else
                  disabled
                  class="w-9 h-9 rounded-lg border border-gray-200 text-gray-300 flex items-center justify-center cursor-not-allowed"
                  title="No disponible">
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog Detalles -->
    <Dialog v-model:visible="showDetalles" header="Detalle de Reserva" :style="{ width: '420px' }" modal :draggable="false">
      <div v-if="reservaSeleccionada" class="flex flex-col gap-4 py-2">

        <!-- Info usuario -->
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
            {{ reservaSeleccionada.user.name.charAt(0).toUpperCase() }}
          </div>
          <div>
            <p class="font-bold text-gray-800">{{ reservaSeleccionada.user.name }}</p>
            <p class="text-xs text-gray-400">
              {{ reservaSeleccionada.fecha_entrada }} → {{ reservaSeleccionada.fecha_salida }}
            </p>
          </div>
          <span :class="{
            'bg-yellow-100 text-yellow-700': reservaSeleccionada.estado === 'EN_PROCESO',
            'bg-green-100 text-green-700': reservaSeleccionada.estado === 'FINALIZADA',
            'bg-red-100 text-red-700': reservaSeleccionada.estado === 'CANCELADA',
          }" class="ml-auto text-xs font-bold px-2 py-1 rounded-full">
            {{ reservaSeleccionada.estado }}
          </span>
        </div>

        <!-- Total -->
        <div class="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
          <span class="text-sm text-gray-500">Total</span>
          <span class="font-bold text-gray-800">${{ reservaSeleccionada.total_precio }}</span>
        </div>

        <!-- Habitaciones -->
        <div
          v-for="(detalle, index) in reservaSeleccionada.detalles"
          :key="index"
          class="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
        >
          <div class="flex items-center gap-2">
            <i class="pi pi-home text-gray-400"></i>
            <div>
              <p class="text-gray-700 font-medium">{{ detalle.habitacion.nombre }}</p>
              <p class="text-xs text-gray-400">{{ detalle.habitacion.hotel.nombre }}</p>
            </div>
          </div>
          <span class="text-sm font-bold text-gray-700">${{ detalle.precio }}</span>
        </div>

      </div>
      <template #footer>
        <Button label="Cerrar" icon="pi pi-times" @click="showDetalles = false"
          class="!bg-slate-900 !border-slate-900 !font-bold" />
      </template>
    </Dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useReservaStore } from '@/stores/reservaAdminStore'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

const reservaStore = useReservaStore()
const showDetalles = ref(false)
const reservaSeleccionada = ref(null)

onMounted(() => {
  reservaStore.fetchReservas()
})

function verDetalles(res) {
  reservaSeleccionada.value = res
  showDetalles.value = true
}

function confirmarReserva(res) {
  Swal.fire({
    title: '¿Finalizar reserva?',
    text: `¿Confirmas finalizar la reserva de "${res.user.name}"?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, finalizar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0f172a',
    cancelButtonColor: '#94a3b8',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const r = await reservaStore.updateEstado(res.id, 'FINALIZADA')
      if (r.success) {
        Toast.fire({ icon: 'success', title: 'Reserva finalizada correctamente' })
      } else {
        Toast.fire({ icon: 'error', title: 'Ocurrió un error inesperado' })
      }
    }
  })
}

function confirmarEliminar(res) {
  Swal.fire({
    title: '¿Cancelar reserva?',
    text: `¿Estás seguro de cancelar la reserva de "${res.user.name}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'Atrás',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#94a3b8',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const r = await reservaStore.updateEstado(res.id, 'CANCELADA')
      if (r.success) {
        Toast.fire({ icon: 'success', title: 'Reserva cancelada correctamente' })
      } else {
        Toast.fire({ icon: 'error', title: 'Ocurrió un error inesperado' })
      }
    }
  })
}
</script>