
<template>
  <div class="hotel-page">

    
    <div class="hotel-hero">
      <img
        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80"
        alt="Hotel Las Primaveras"
        class="hotel-img"
      />

      <div class="hotel-info">
        <h1 class="hotel-name">{{ hotel.nombre }}</h1>
        <p class="hotel-location">{{ hotel.ubicacion }}</p>

        <p class="hotel-desc">
          {{ hotel.descripcion }}
        </p>
      </div>
    </div>

    <h2 class="section-title">Elige Tu Habitación</h2>

    <div class="rooms-grid">
      <HabitacionCard
        v-for="habitacion in habitaciones"
        :key="habitacion.numero"
        :nombre="habitacion.nombre"
        :tipo="habitacion.tipo"
        :numero="habitacion.numero"
        :capacidad="habitacion.capacidad"
        :precio="habitacion.precio"
        :imagen="habitacion.imagen"
      />
    </div>

  </div>
</template>

<script setup>
import HabitacionCard from '../components/HabitacionCard.vue'

const hotel = {
  nombre: "Hotel Las Primaveras 1",
  ubicacion: "Chalatenango",
  descripcion:
    "Disfruta de una desconexión total en nuestras áreas lounge, donde el diseño náutico y brisa marina crean el refugio perfecto para tus vacaciones de verano"
}

const habitaciones = [
  {
    nombre: "Cuarto Habitación Vista Beach Palm",
    tipo: "Size",
    numero: 2,
    capacidad: 3,
    precio: 150.00,
    imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80"
  },
  {
    nombre: "Amanecer Dorado",
    tipo: "Single",
    numero: 1,
    capacidad: 1,
    precio: 70.00,
    imagen: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80"
  },
  {
    nombre: "Sombra de Palma",
    tipo: "Hollywood Twin",
    numero: 3,
    capacidad: 2,
    precio: 125.00,
    imagen: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&q=80"
  }
]
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
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
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

