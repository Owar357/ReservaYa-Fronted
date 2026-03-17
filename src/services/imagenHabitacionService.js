import api from './api'

const imagenHabitacionService = {
  updateImagen(id, file) {
    const formData = new FormData()
    formData.append('imagen', file)
    formData.append('_method', 'PUT')
    return api.post(`/admin/imagenesHabitacion/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  storeImagenes(habitacion_id, imagenes) {
  const formData = new FormData()
  formData.append('habitacion_id', habitacion_id)
  imagenes.forEach(img => formData.append('imagenes[]', img))
  return api.post('/admin/imagenesHabitacion', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
},

  deleteImagen(id) {
    return api.delete(`/admin/imagenesHabitacion/${id}`)
  }
}

export default imagenHabitacionService