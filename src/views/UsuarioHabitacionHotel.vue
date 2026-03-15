<template>

  <div>
    <NavBar />

    <div class="hotel-page">

      <div class="hotel-hero">
        <img :src="store.hotel?.imagen" :alt="store.hotel?.nombre" class="hotel-img" />

        <div class="hotel-info">
          <h1 class="hotel-name">{{ store.hotel?.nombre }}</h1>
          <p class="hotel-location">{{ store.hotel?.departamento }}</p>
          <p class="hotel-desc">{{ store.hotel?.descripcion }}</p>
        </div>
      </div>

      <h2 class="section-title">Elige Tu Habitación</h2>

      <div class="rooms-grid">
        <HabitacionCard v-for="habitacion in store.habitaciones" :key="habitacion.id" :nombre="habitacion.nombre"
          :tipo="habitacion.tipo_habitacion?.nombre" :numero="habitacion.num_habitacion"
          :capacidad="habitacion.capacidad" :precio="habitacion.precio" :imagenes="habitacion.imagenes" />
      </div>

    </div>
  </div>






</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHabitacionStore } from '@/stores/habitacionesHotelStore'
import HabitacionCard from '@/components/home/HabitacionCard.vue'
import NavBar from '@/components/home/NavBar.vue'

const route = useRoute()
const store = useHabitacionStore()

onMounted(() => {
  store.fetchHabitaciones(route.params.id)
})
</script>



<style scoped>
.hotel-page {
  font-family: Arial, sans-serif;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  background: #f9f9f9;
  min-height: 100vh;
}

.hotel-hero {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 32px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.hotel-img {
  width: 320px;
  height: 220px;
  object-fit: cover;
  flex-shrink: 0;
}

.hotel-info {
  padding: 20px;
}

.hotel-location {
  font-size: 13px;
  color: #888;
  margin-bottom: 6px;
}

.hotel-name {
  font-size: 24px;
  color: #222;
  margin-bottom: 10px;
}

.hotel-desc {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

.section-title {
  font-size: 20px;
  color: #222;
  margin-bottom: 20px;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {

  .hotel-hero {
    flex-direction: column;
  }

  .hotel-img {
    width: 100%;
    height: 200px;
  }

  .rooms-grid {
    grid-template-columns: 1fr;
  }

}
</style>
