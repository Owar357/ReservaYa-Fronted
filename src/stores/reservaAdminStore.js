import { defineStore } from 'pinia'
import reservaService from '@/services/reservaAdminService'

export const useReservaStore = defineStore('reserva', {
  state: () => ({
    reservas: [],
    loading: false,
    error: null,
  }),

  actions: {
   async fetchReservas() {
  this.loading = true
  this.error = null
  try {
    const response = await reservaService.getReservas()
    this.reservas = Array.isArray(response.data?.data?.data)  
      ? response.data.data.data
      : Array.isArray(response.data?.data)
        ? response.data.data
        : []
  } catch (error) {
    console.error('ERROR:', error)
    this.reservas = []
    this.error = error.response?.data?.message || 'Error al cargar reservas'
  } finally {
    this.loading = false
  }
},

    async updateEstado(id, estado) {
      this.loading = true
      this.error = null
      try {
        await reservaService.updateEstado(id, estado)
        const index = this.reservas.findIndex(r => r.id === id)
        if (index !== -1) this.reservas[index].estado = estado
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al actualizar reserva'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    }
  }
})  