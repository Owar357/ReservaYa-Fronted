<template>
  <div class="p-4">
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="text-xl font-semibold mb-6">Reporte de Ingresos</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Fecha Inicio -->
        <div>
          <label class="block text-sm text-gray-600 mb-2">Fecha Inicio</label>
          <Calendar v-model="fechaInicio" dateFormat="yy-mm-dd" showIcon class="w-full" />
        </div>

        <!-- Fecha Fin -->
        <div>
          <label class="block text-sm text-gray-600 mb-2">Fecha Final</label>
          <Calendar v-model="fechaFin" dateFormat="yy-mm-dd" showIcon class="w-full" />
        </div>

        <!-- Hotel -->
        <div class="md:col-span-2 lg:col-span-1">
          <label class="block text-sm text-gray-600 mb-2">Hotel</label>
          <Dropdown
            v-model="hotelId"
            :options="hoteles"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione un hotel"
            showClear
            class="w-full"
          />
        </div>
      </div>

      <!-- Botones -->
      <div class="mt-6 flex flex-col md:flex-row gap-3">
        <Button
          label="Generar Reporte"
          icon="pi pi-file-pdf"
          class="p-button-danger w-full md:w-auto"
          @click="generarReporte"
        />
        <Button
          label="Limpiar Filtros"
          icon="pi pi-filter-slash"
          class="p-button-secondary w-full md:w-auto"
          @click="limpiarFiltros"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Swal from "sweetalert2"
import hotelService from "@/services/hotelService"


const fechaInicio = ref(null)
const fechaFin    = ref(null)
const hotelId     = ref(null)
const hoteles     = ref([])


onMounted(async () => {
  const response = await hotelService.getHoteles()
  hoteles.value = response.data.data
})

// Formateamos la fecha para el backend
const formatearFecha = (fecha) => {
  if (!fecha) return ""
  const d     = new Date(fecha)
  const year  = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day   = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const generarReporte = () => {
  if (!fechaInicio.value || !fechaFin.value) {
    Swal.fire({
      icon: "error",
      title: "Validación",
      text: "Debe seleccionar el rango de fechas",
    })
    return
  }

  if (!hotelId.value) {
    Swal.fire({
      icon: "error",
      title: "Validación",
      text: "Debe seleccionar un hotel",
    })
    return
  }

  const f1  = formatearFecha(fechaInicio.value)
  const f2  = formatearFecha(fechaFin.value)
  const url = `http://localhost:8000/api/reportes/ingresos?fecha_inicio=${f1}&fecha_fin=${f2}&hotel_id=${hotelId.value}`
  window.open(url, "_blank")
}

const limpiarFiltros = () => {
  fechaInicio.value = null
  fechaFin.value    = null
  hotelId.value     = null
}
</script>
