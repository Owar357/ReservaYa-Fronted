import api from "./api";

export default {
    store(reserva) {
        return api.post("/user/reserva", reserva);
    }
}