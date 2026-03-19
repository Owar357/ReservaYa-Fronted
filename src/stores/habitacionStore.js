import { defineStore } from 'pinia'
import habitacionService from '@/services/habitacionService'

export const useHabitacionStore = defineStore('habitacion', {
  state: () => ({
    habitaciones: [],
    habitacionSeleccionada: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchHabitaciones(hotel_id, estado = null) {
      this.loading = true
      this.error = null
      try {
        const { data } = await habitacionService.getHabitaciones(hotel_id, estado)
        this.habitaciones = data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar habitaciones'
      } finally {
        this.loading = false
      }
    },

    async createHabitacion(habitacionData, imagenes = []) {
      this.loading = true
      this.error = null
      try {
        const { data } = await habitacionService.createHabitacion(habitacionData, imagenes)
        this.habitaciones.push(data.data)
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al crear habitación'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateHabitacion(id, habitacionData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await habitacionService.updateHabitacion(id, habitacionData)
        const index = this.habitaciones.findIndex(h => h.id === id)
        if (index !== -1) this.habitaciones[index] = data.data
        return { success: true }
      } catch (error) {
        console.log("Error completo:", error.response?.data);
        this.error = error.response?.data?.message || 'Error al actualizar habitación'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async deleteHabitacion(id) {
      this.loading = true
      this.error = null
      try {
        await habitacionService.deleteHabitacion(id)
        this.habitaciones = this.habitaciones.filter(h => h.id !== id)
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al eliminar habitación'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    }
  }
})