import api from './api'

const reservaService = {
  getReservas() {
    return api.get('/admin/reservas')
  },

  updateEstado(id, estado) {
    return api.put(`/admin/reservas/${id}`, { estado })
  }
}

export default reservaService