import api from "./api";

export default {
    procesarPago(data) {
        return api.post("/pago", data);
    }
}