// src/services/habitacionService.js
import api from './api'

const habitacionService = {

  getHabitaciones(hotel_id, estado = null) {
    const params = { hotel_id }
    if (estado) params.estado = estado
    return api.get('/admin/habitaciones', { params })
  },

  getHabitacion(id) {
    return api.get(`/admin/habitaciones/${id}`)
  },

  createHabitacion(habitacionData, imagenes = []) {
    const formData = new FormData()
    formData.append('habitacion', JSON.stringify(habitacionData))
    imagenes.forEach(img => formData.append('imagenes[]', img))
    return api.post('/admin/habitaciones', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  updateHabitacion(id, habitacionData) {
    return api.put(`/admin/habitaciones/${id}`, habitacionData)
  },

  deleteHabitacion(id) {
    return api.delete(`/admin/habitaciones/${id}`)
  }
}

export default habitacionService