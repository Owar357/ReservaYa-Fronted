import { defineStore } from 'pinia'
import { ref } from 'vue'
import { tipoHabitacionService } from '@/services/TipoHbitacionService'

export const useTipoHabitacionesStore = defineStore('habitacionesHotel', () => {

  const habitaciones = ref([])
  const loading      = ref(false)
  const error        = ref(null)

  async function fetchHabitaciones(hotelId) {
    if (!hotelId) return
    loading.value = true
    error.value   = null
    try {
      const { data } = await tipoHabitacionService.getByHotel(hotelId)
      habitaciones.value = data.data
    } catch (err) {
      error.value        = err.response?.data?.message || 'Error al cargar habitaciones'
      habitaciones.value = []
    } finally {
      loading.value = false
    }
  }


  async function agregarHabitacion(payload) {
    const { data } = await tipoHabitacionService.crear(payload)
    habitaciones.value.push(data.data)
    return data
  }

  // ── Editar ────────────────────────────────────────────
  async function editarHabitacion(id, payload) {
    const { data } = await tipoHabitacionService.editar(id, payload)
    const idx = habitaciones.value.findIndex(h => h.id === id)
    if (idx !== -1) habitaciones.value[idx] = data.data
    return data
  }

  // ── Eliminar ──────────────────────────────────────────
  async function eliminarHabitacion(id) {
    const { data } = await tipoHabitacionService.eliminar(id)
    habitaciones.value = habitaciones.value.filter(h => h.id !== id)
    return data
  }

  return {
    habitaciones,
    loading,
    error,
    fetchHabitaciones,
    agregarHabitacion,
    editarHabitacion,
    eliminarHabitacion,
  }
})
