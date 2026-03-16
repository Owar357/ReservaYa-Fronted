import { defineStore } from 'pinia'
import { ref } from 'vue'
import habitacionesHotelService from '@/services/habitacionesHotelService'

export const useHabitacionStore = defineStore('habitaciones', () => {

  const habitaciones = ref([])
  const hotel = ref(null)
  const loading = ref(false)

  const fetchHabitaciones = async (hotelId) => {
    loading.value = true
    try {
      const { data } = await habitacionesHotelService.getHabitacionesById(hotelId)
      hotel.value = data.hotel        // ← info del hotel
      habitaciones.value = data.data  // ← habitaciones
    } catch (error) {
      console.error('Error al cargar habitaciones:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    habitaciones,
    hotel,
    loading,
    fetchHabitaciones
  }
})