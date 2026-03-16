import { defineStore } from "pinia";
import { ref } from 'vue'
import homeService from '@/services/homeService'

export const useHomeStore = defineStore('hoteles', () => {
  
  const hoteles = ref([])
  const loading = ref(false)

  const fetchHoteles = async () => {
    loading.value = true
    try {
      const { data } = await homeService.getAll()
      hoteles.value = data.data  
    } catch (error) {
      console.error('Error al cargar hoteles:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    hoteles,
    loading,
    fetchHoteles
  }
})

