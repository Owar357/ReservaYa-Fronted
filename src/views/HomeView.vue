<template>
  <div>
    <!-- Navbar -->
    <NavBar />

    <div class="flex gap-6 px-1 items-start">
      <!-- Sidebar filtros -->
      <HotelSidebar :selected="selected" @toggle="toggle" />

      <!-- Contenido derecho -->
      <div class="flex-1 flex flex-col">
        <h1 class="text-center text-2xl font-bold mb-6">
          Reserva con confianza, viaja con tranquilidad.
        </h1>
        <HotelListGrid :hotels="filteredHotels" @toggleFavorite="toggleFavorite" @verHabitaciones="verHabitaciones" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HotelSidebar from '@/components/home/HotelSidebar.vue'
import NavBar from '@/components/home/NavBar.vue'
import HotelListGrid from '@/components/home/HotelListGrid.vue'

const selected = ref({})

const hotels = ref([
  { id: 1, nombre: 'Hotel Villa Izalco', direccion: 'Sonsonate', departamento: 'Sonsonate', habitaciones_min_precio: '50.00' },
  { id: 2, nombre: 'Hotel Villa Dorada', direccion: 'San Salvador', departamento: 'San Salvador', habitaciones_min_precio: '100.00' },
])

const toggle = (groupId, value) => {
  if (selected.value[groupId] === value) {
    selected.value[groupId] = null
  } else {
    selected.value[groupId] = value
  }
}

const toggleFavorite = (hotel) => {
  hotel.favorite = !hotel.favorite
}

const verHabitaciones = (hotel) => {
  alert(`Ver habitaciones de: ${hotel.nombre}`)
}

const checkPrecio = (precio, rango) => {
  if (!precio) return false
  const p = parseFloat(precio)
  if (rango === '$0.00 - $50.00') return p <= 50
  if (rango === '$50.00 - $150.00') return p > 50 && p <= 150
  if (rango === '$150.00 - $300.00') return p > 150 && p <= 300
  if (rango === '$300.00 - $500.00') return p > 300 && p <= 500
  return true
}

const filteredHotels = computed(() => {
  return hotels.value.filter(hotel => {
    const matchDept = !selected.value.departamento ||
      hotel.departamento === selected.value.departamento
    const matchPrecio = !selected.value.precio ||
      checkPrecio(hotel.habitaciones_min_precio, selected.value.precio)
    return matchDept && matchPrecio
  })
})
</script>
