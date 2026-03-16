<template>
    <div class="room-card">
        <!-- Carrusel -->
        <div class="relative">
            <img 
                :src="imagenActual || 'https://via.placeholder.com/400x180?text=Sin+imagen'" 
                :alt="nombre" 
                class="room-img" 
            />
            
            <template v-if="imagenes?.length > 1">
                <button @click="prev" class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-7 h-7 rounded-full">‹</button>
                <button @click="next" class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-7 h-7 rounded-full">›</button>
                <span class="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {{ currentIndex + 1 }} / {{ imagenes.length }}
                </span>
            </template>
        </div>

        <div class="room-body">
            <h3 class="room-name">{{ nombre }}</h3>
            <p>Habitación tipo: <span>{{ tipo }}</span></p>
            <p>Habitación Numero: <span>{{ numero }}</span></p>
            <p>Capacidad para {{ capacidad }}</p>
            <p>Precio/Noche: <strong>${{ precio }}</strong></p>
            <button @click="$emit('reservar')" class="btn-reservar">Reservar</button>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    nombre: String,
    tipo: String,
    numero: Number,
    capacidad: Number,
    precio: String,
    imagenes: Array  
})


defineEmits(['reservar'])

const currentIndex = ref(0)

const imagenActual = computed(() => {
    return props.imagenes?.[currentIndex.value]?.url || null
})

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % props.imagenes.length
}

const prev = () => {
    currentIndex.value = (currentIndex.value - 1 + props.imagenes.length) % props.imagenes.length
}
</script>

<style scoped>
.room-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: block;
    overflow: hidden;
}

.room-img {
    width: 100%;
    height: 180px;

    object-fit: contain;
}

.room-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
    color: #444;
}

.room-name {
    font-size: 16px;
    font-weight: 600;
    color: #222;
}

.btn-reservar {
    margin-top: 10px;
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
}

.btn-reservar:hover {
    background: #ff5252;
}
</style>