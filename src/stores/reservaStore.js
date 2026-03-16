import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import reservaService from '@/services/reservaService'

export const useReservaStore = defineStore('reserva', () => {

  const carrito = ref([])
  const fechaEntrada = ref(null)
  const fechaSalida = ref(null)
  const loading = ref(false)

  const noches = computed(() => {
    if (!fechaEntrada.value || !fechaSalida.value) return 0
    const entrada = new Date(fechaEntrada.value)
    const salida = new Date(fechaSalida.value)
    const diff = salida - entrada
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  })

  const total = computed(() => {
    return carrito.value.reduce((acc, hab) => {
      return acc + (parseFloat(hab.precio) * noches.value)
    }, 0)
  })

  const agregarHabitacion = (habitacion) => {
    const existe = carrito.value.find(h => h.id === habitacion.id)
    if (!existe) {
      carrito.value.push(habitacion)
    }
  }

  const confirmarReserva = async () => {
    loading.value = true
    try {
      const payload = {
        fecha_entrada: fechaEntrada.value,
        fecha_salida: fechaSalida.value,
        total_precio: total.value,
        habitaciones: carrito.value.map(h => ({
          habitacion_id: h.id,
          precio: parseFloat(h.precio) * noches.value
        }))
      }
      console.log(payload)  // ← ver qué se manda
      await reservaService.store(payload)
        } catch (error) {
      console.error('Error al confirmar reserva:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    carrito,
    fechaEntrada,
    fechaSalida,
    loading,
    noches,
    total,
    agregarHabitacion,
    confirmarReserva
  }
})