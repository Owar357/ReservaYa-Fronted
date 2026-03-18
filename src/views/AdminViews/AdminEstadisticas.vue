<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-lg font-bold text-gray-800 mb-5">Estadísticas</h2>
      <div class="flex gap-4 mb-6">
        <div class="bg-white rounded-xl shadow px-6 py-4 flex items-center gap-4 min-w-[200px]">
          <div class="bg-blue-100 text-blue-600 rounded-full p-3">
            <i class="pi pi-dollar text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Ingresos Totales</p>
            <p class="text-2xl font-bold text-gray-800">${{ Number(ingresosTotales).toLocaleString() }}</p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow px-6 py-4 flex items-center gap-4 min-w-[200px]">
          <div class="bg-blue-100 text-blue-600 rounded-full p-3">
            <i class="pi pi-check-square text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Reservas Totales</p>
            <p class="text-2xl font-bold text-gray-800">{{ reservasTotales }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">Ingresos Mensuales</h3>

          <div class="flex gap-2" style="height: 180px">
            <div
              class="flex flex-col justify-between text-xs text-gray-400 text-right pb-5"
              style="min-width: 36px"
            >
              <span>$20k</span>
              <span>$15k</span>
              <span>$10k</span>
              <span>$5k</span>
            </div>
            <div class="flex-1 flex items-end gap-2 border-b border-l border-gray-200 pb-5">
              <div
                v-for="bar in bars"
                :key="bar.mes"
                class="flex-1 flex flex-col items-center gap-1"
              >
                <span class="text-[10px] font-semibold text-gray-600 whitespace-nowrap">{{
                  bar.label
                }}</span>
                <div class="w-full bg-blue-500 rounded-t" :style="{ height: bar.heightPx }"></div>
                <span class="text-[10px] text-gray-500">{{ bar.mes }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">Top 5 Habitaciones Más Rentadas</h3>

          <div class="flex flex-col gap-4">
            <div v-for="(hab, i) in habitaciones" :key="hab.nombre" class="flex flex-col gap-1">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-700 font-medium">{{ i + 1 }}. {{ hab.nombre }}</span>
                <span class="text-xs text-gray-500">{{ hab.reservas }} reservas</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  :style="{ width: hab.porcentaje }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Button from 'primevue/button'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const ingresosTotales = ref(0)
const reservasTotales = ref(0)
const ingresosMensuales = ref([])
const habitaciones = ref([])

const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

const bars = computed(() => {
  const maxTotal = Math.max(...ingresosMensuales.value.map(m => m.total), 1)
  return ingresosMensuales.value.map(m => ({
    mes: meses[m.mes - 1],
    label: '$' + Number(m.total).toLocaleString(),
    heightPx: Math.round((m.total / maxTotal) * 140) + 'px'
  }))
})

async function cargarEstadisticas() {
  try {
    const response = await api.get(`/admin/estadisticas?hotel=${authStore.hotelId}`)
    const data = response.data.data
    ingresosTotales.value = data.ingresos_totales
    reservasTotales.value = data.reservas_totales
    ingresosMensuales.value = data.ingresos_mensuales
    habitaciones.value = data.top_habitaciones
  } catch (error) {
    console.error('Error al cargar estadísticas', error)
  }
}

onMounted(() => cargarEstadisticas())
</script>
