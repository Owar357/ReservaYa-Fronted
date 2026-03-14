<template>
  <div class="room-card">
    <img :src="imagen" :alt="nombre" class="room-img" />
    <div class="room-body">
      <h3 class="room-name">{{ nombre }}</h3>
      <p class="room-detail"><span class="label">Habitación tipo:</span> {{ tipo }}</p>
      <p class="room-detail"><span class="label">Habitación Numero:</span> {{ numero }}</p>
      <p class="room-detail"><span class="label">Capacidad para</span> {{ capacidad }}</p>
      <p class="room-price"><span class="label">Precio/Noche: </span><strong>${{ precio.toFixed(2) }}</strong></p>
      <button class="btn-reservar">Reservar</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nombre:    String,
  tipo:      String,
  numero:    Number,
  capacidad: Number,
  precio:    Number,
  imagen:    String,
})
</script>

<style scoped>
.room-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  transition: transform 0.2s;
}
.room-card:hover {
  transform: translateY(-4px);
}
.room-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.room-body {
  padding: 16px;
}
.room-name {
  font-size: 15px;
  font-weight: bold;
  color: #222;
  margin-bottom: 12px;
}
.room-detail {
  font-size: 13px;
  color: #444;
  margin-bottom: 6px;
}
.label {
  color: #666;
}
.room-price {
  font-size: 14px;
  color: #222;
  margin-top: 12px;
  margin-bottom: 14px;
}
.room-price strong {
  font-size: 16px;
}
.btn-reservar {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #ff6b4a;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-reservar:hover {
  background-color: #e55535;
}
</style>