<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <div class="max-w-6xl mx-auto px-6 py-8 flex gap-6">

      <div class="w-64 shrink-0">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 class="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i class="pi pi-filter text-[#2a9db0]"></i>
            Filtrar por fechas
          </h3>

          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha inicio</label>
              <input type="date" v-model="store.fechaInicio" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-[#2a9db0]/30 focus:border-[#2a9db0]
                       hover:border-[#2a9db0]/50 transition-all bg-gray-50" />
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha final</label>
              <input type="date" v-model="store.fechaFin" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-[#2a9db0]/30 focus:border-[#2a9db0]
                       hover:border-[#2a9db0]/50 transition-all bg-gray-50" />
            </div>


            <button @click="store.fechaInicio = ''; store.fechaFin = ''" class="w-full mt-1 py-2 text-xs font-semibold text-gray-400 hover:text-[#2a9db0]
                     border border-dashed border-gray-200 hover:border-[#2a9db0]/50
                     rounded-xl transition-all hover:bg-[#2a9db0]/5">
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Panel principal -->
      <div class="flex-1">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <!-- Header de la tabla -->
          <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-lg font-bold text-gray-800">Mis Reservas de Hoteles</h3>
            <span class="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {{ store.reservasFiltradas?.length ?? 0 }} reservas
            </span>
          </div>

          <!-- Loading -->
          <div v-if="store.loading" class="flex items-center justify-center py-16 text-gray-400">
            <i class="pi pi-spin pi-spinner text-[#2a9db0]"></i>
            Cargando reservas...
          </div>

          <!-- Tabla -->
          <table v-else class="w-full">
            <thead>
              <tr class="bg-gray-50/80">
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Hotel</th>
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Fecha
                  inicio</th>
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Fecha fin
                </th>
                <th class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Acciones
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="reserva in store.reservasFiltradas" :key="reserva.id"
                class="hover:bg-gray-50/60 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#2a9db0]/10 flex items-center justify-center shrink-0">
                      <i class="pi pi-building text-[#2a9db0]"></i>
                    </div>
                    <span class="text-sm font-medium text-gray-800">
                      {{ reserva.detalles?.[0]?.habitacion?.hotel?.nombre }}
                    </span>
                  </div>
                </td>

                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ reserva.fecha_entrada }}
                </td>

                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ reserva.fecha_salida }}
                </td>

                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">

                    <span v-if="reserva.estado === 'CANCELADA'" class="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500
             border border-red-200 text-xs font-semibold rounded-xl">
                      <i class="pi pi-times-circle"></i>
                      Cancelada
                    </span>

                    <!-- Estado FINALIZADA -->
                    <span v-else-if="reserva.estado === 'FINALIZADA'" class="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600
             border border-emerald-200 text-xs font-semibold rounded-xl">
                      <i class="pi pi-check-circle"></i>
                      Finalizada
                    </span>

                    <!-- Botón cancelar -->
                    <button v-else @click="cancelar(reserva.id)" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500
                             border border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500
                             text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer">
                      <i class="pi pi-times "></i>
                      Cancelar
                    </button>

                    <!-- Botón ver detalles -->
                    <button @click="verDetalle(reserva.id)" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2a9db0]/10 text-[#2a9db0]
                             border border-[#2a9db0]/20 hover:bg-[#2a9db0] hover:text-white hover:border-[#2a9db0]
                             text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer">
                      <i class="pi pi-eye"></i>
                      Ver detalles
                    </button>

                  </div>
                </td>
              </tr>

              <!-- Empty state -->
              <tr v-if="!store.reservasFiltradas?.length">
                <td colspan="4" class="px-6 py-16 text-center text-gray-400 text-sm">
                  No se encontraron reservas para las fechas seleccionadas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal detalles -->
  <Transition name="modal">
    <div v-if="modalVisible"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="modalVisible = false">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

        <!-- Modal header -->
        <div class="bg-gradient-to-r from-[#2a9db0] to-[#1a8a9e] px-6 py-5">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-white">Detalle de Reserva</h2>
            <button @click="modalVisible = false"
              class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
              <i class="pi pi-times text-white"></i>
            </button>
          </div>
        </div>

        <!-- Modal body -->
        <div v-if="store.reservaDetalle" class="p-6 flex flex-col gap-4">

          <div class="grid grid-cols-2 gap-3">
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400 font-medium mb-0.5">Hotel</p>
              <p class="text-sm font-semibold text-gray-800">
                {{ store.reservaDetalle.detalles?.[0]?.habitacion?.hotel?.nombre }}
              </p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400 font-medium mb-0.5">Estado</p>
              <span :class="store.reservaDetalle.estado === 'CANCELADA'
                ? 'text-red-500 bg-red-50 border border-red-200'
                : 'text-emerald-600 bg-emerald-50 border border-emerald-200'"
                class="inline-block text-xs font-semibold px-2 py-0.5 rounded-lg">
                {{ store.reservaDetalle.estado }}
              </span>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400 font-medium mb-0.5">Fecha entrada</p>
              <p class="text-sm font-semibold text-gray-800">{{ store.reservaDetalle.fecha_entrada }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3">
              <p class="text-xs text-gray-400 font-medium mb-0.5">Fecha salida</p>
              <p class="text-sm font-semibold text-gray-800">{{ store.reservaDetalle.fecha_salida }}</p>
            </div>
          </div>

          <!-- Habitaciones -->
          <div>
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Habitaciones</h3>
            <div class="flex flex-col gap-2">
              <div v-for="detalle in store.reservaDetalle.detalles" :key="detalle.id"
                class="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-2.5">
                <span class="text-sm text-gray-700">{{ detalle.habitacion?.nombre }}</span>
                <span class="text-sm font-semibold text-[#2a9db0]">${{ detalle.precio }}</span>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="flex justify-between items-center border-t border-gray-100 pt-3">
            <span class="text-sm font-semibold text-gray-600">Total</span>
            <span class="text-lg font-bold text-gray-800">${{ store.reservaDetalle.total_precio }}</span>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="px-6 pb-6">
          <button @click="modalVisible = false" class="w-full py-2.5 bg-[#2a9db0] hover:bg-[#1a8a9e] text-white font-semibold
                   rounded-xl transition-all duration-200 text-sm">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMisReservasStore } from '@/stores/misReservasStore'
import NavBar from '@/components/home/NavBar.vue'
import Swal from 'sweetalert2'

const store = useMisReservasStore()
const modalVisible = ref(false)

onMounted(() => {
  store.fetchReservas()
})

const verDetalle = async (id) => {
  await store.fetchDetalle(id)
  modalVisible.value = true
}

const cancelar = async (id) => {
  const result = await Swal.fire({
    title: '¿Cancelar reserva?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e53e3e',
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No'
  })

  if (result.isConfirmed) {
    try {
      await store.cancelarReserva(id)
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Reserva cancelada',
        showConfirmButton: false,
        timer: 3000
      })
    } catch {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error al cancelar',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 2rem;
  padding: 0px;
  font-family: Arial, Helvetica, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  font: optional;
}


.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 140px;
  padding: 2rem;
}

.sidebar h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-group label {
  font-size: 15px;
  color: #0c0a0a;
}

.filter-group input[type="date"] {
  background: #94cae4;
  border: none;
  padding: 6px 10px;
  font-size: 15px;
  border-radius: 4px;
}


.main-panel {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.main-panel h3 {
  margin: 0 0 1rem;
  font-size: 18px;
  font-weight: 700;
}


table {
  width: 100%;
  border-collapse: collapse;
}

.thead-row {
  border-bottom: 2px solid #181717;
}

.th {
  padding: 12px 16px;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: #030303;
}

.fila {
  border-bottom: 1px solid #141518;
}

.td {
  padding: 14px 16px;
  font-size: 14px;
  color: #111827;
}



.btn-cancelar:hover {
  background: #c53030;
}
</style>