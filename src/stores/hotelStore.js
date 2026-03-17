import { defineStore } from "pinia";
import hotelService from "@/services/hotelService";

export const useHotelStore = defineStore("hotel", {
  state: () => ({
    hoteles: [],
    hotelSeleccionado: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchHoteles() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await hotelService.getHoteles();
        this.hoteles = data.data;
      } catch (error) {
        this.error = error.response?.data?.message || "Error al cargar hoteles";
      } finally {
        this.loading = false;
      }
    },

    async fetchHotel(id) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await hotelService.getHotel(id);
        this.hotelSeleccionado = data.data;
      } catch (error) {
        this.error = error.response?.data?.message || "Error al cargar hotel";
      } finally {
        this.loading = false;
      }
    },

    async createHotel(hotelData, imagen = null) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await hotelService.createHotel(hotelData, imagen);
        this.hoteles.push(data.data);
        return { success: true };
      } catch (error) {
        this.error = error.response?.data?.message || "Error al crear hotel";
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    async updateHotel(id, hotelData, imagen = null) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await hotelService.updateHotel(id, hotelData, imagen);
        const index = this.hoteles.findIndex((h) => h.id === id);
        if (index !== -1) this.hoteles[index] = data.data;
        return { success: true };
      } catch (error) {
        console.log("Error completo:", error.response?.data);
        this.error = error.response?.data?.message || "Error al actualizar hotel";
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    async deleteHotel(id) {
      this.loading = true;
      this.error = null;
      try {
        await hotelService.deleteHotel(id);
        this.hoteles = this.hoteles.filter((h) => h.id !== id);
        return { success: true };
      } catch (error) {
        this.error = error.response?.data?.message || "Error al eliminar hotel";
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },
  },
});
