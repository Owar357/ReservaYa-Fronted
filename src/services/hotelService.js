import api from "./api";

const hotelService = {
  getHoteles() {
    return api.get("/admin/hoteles");
  },

  getHotel(id) {
    return api.get(`/admin/hoteles/${id}`);
  },

  createHotel(hotelData, imagen = null) {
    const formData = new FormData();
    formData.append("hotel", JSON.stringify(hotelData));
    if (imagen) {
      formData.append("imagen", imagen);
    }
    return api.post("/admin/hoteles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateHotel(id, hotelData, imagen = null) {
    const formData = new FormData();
    Object.keys(hotelData).forEach((key) => {
      if (hotelData[key] !== null && hotelData[key] !== undefined) {
        formData.append(key, hotelData[key]);
      }
    });
    if (imagen) {
      formData.append("imagen", imagen);
    }
    formData.append("_method", "PUT");
    return api.post(`/admin/hoteles/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteHotel(id) {
    return api.delete(`/admin/hoteles/${id}`);
  },
};

export default hotelService;
