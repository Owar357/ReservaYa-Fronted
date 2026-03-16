import api from "./api";

export default {
  getAll() {
    return api.get("/user/reserva");
  },

  getById(id) {
    return api.get(`/user/reserva/${id}`);
  },

  cancelar(id) {
    return api.delete(`/user/reserva/${id}`);
  },

  store(reserva) {
    return api.post("/user/reserva", reserva);
  },
};
