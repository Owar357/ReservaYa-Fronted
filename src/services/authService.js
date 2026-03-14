import api from "./api";

export default {
    login(credenciales) {
        return api.post("/auth/login", credenciales);
    },
    register(payload) {
        return api.post("/auth/register", payload);
    },
    logout() {
        return api.post("/auth/logout");
    }
};