import api from "./api"

export  default {
    getHabitacionesById(hotelId){
        return api.get(`/principalpage/habitaciones/${hotelId}`)
    }
 }