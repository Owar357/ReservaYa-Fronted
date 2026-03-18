import api from "./api"

const BASE = '/admin/tipohabitaciones'

export const tipoHabitacionService = {

  // GET /api/tipo-habitacion?hotel_id=X
  getByHotel(hotelId) {
    return api.get(BASE, { params: { hotel_id: hotelId } })
  },

  // POST /api/tipo-habitacion
  crear(payload) {
    // payload: { nombre, descripcion, hotel_id }
    return api.post(BASE, payload)
  },

  // PUT /api/tipo-habitacion/:id
  editar(id, payload) {
    // payload: { nombre, descripcion }
    return api.put(`${BASE}/${id}`, payload)
  },

  // DELETE /api/tipo-habitacion/:id
  eliminar(id) {
    return api.delete(`${BASE}/${id}`)
  },
}
