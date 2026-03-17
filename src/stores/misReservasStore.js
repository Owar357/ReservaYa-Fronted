import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import reservaService from '@/services/reservaService'

export const useMisReservasStore = defineStore('misReservas', () => {

  const reservas = ref([])
  const reservaDetalle = ref(null)
  const loading = ref(false)
  const fechaInicio = ref(null)
  const fechaFin = ref(null)

  // Filtro por rango de fechas en frontend
  const reservasFiltradas = computed(() => {
    if (!fechaInicio.value && !fechaFin.value) return reservas.value

    return reservas.value.filter(reserva => {
      const fechaEntrada = new Date(reserva.fecha_entrada)

      const desdeOk = !fechaInicio.value || fechaEntrada >= new Date(fechaInicio.value)
      const hastaOk = !fechaFin.value || fechaEntrada <= new Date(fechaFin.value)

      return desdeOk && hastaOk
    })
  })

  const fetchReservas = async () => {
    loading.value = true
    try {
      const { data } = await reservaService.getAll()
      reservas.value = data.data.data  // ← paginado
    } catch (error) {
      console.error('Error al cargar reservas:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchDetalle = async (id) => {
    try {
      const { data } = await reservaService.getById(id)
      reservaDetalle.value = data.data
    } catch (error) {
      console.error('Error al cargar detalle:', error)
    }
  }

  const cancelarReserva = async (id) => {
    try {
      await reservaService.cancelar(id)
      // actualiza el estado en el frontend sin recargar
      const reserva = reservas.value.find(r => r.id === id)
      if (reserva) reserva.estado = 'CANCELADA'
    } catch (error) {
      console.error('Error al cancelar reserva:', error)
      throw error
    }
  }

  return {
    reservas,
    reservaDetalle,
    loading,
    fechaInicio,
    fechaFin,
    reservasFiltradas,
    fetchReservas,
    fetchDetalle,
    cancelarReserva
  }
})