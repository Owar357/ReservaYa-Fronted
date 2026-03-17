import api from './api'

const tipoHabitacionService = {
  getTipos(hotel_id) {
    return api.get('/admin/tipohabitaciones', { params: { hotel_id } })
  }
}

export default tipoHabitacionService